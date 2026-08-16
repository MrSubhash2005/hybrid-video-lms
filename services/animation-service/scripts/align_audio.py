"""
Audio alignment using WhisperForConditionalGeneration + WhisperProcessor directly.
Bypasses transformers.pipeline (which imports av/PyAV, blocked by Application Control).
Uses: torch (CUDA), soundfile, scipy, transformers model classes only.
"""
import json
import os
import re
import torch
import soundfile as sf
import numpy as np
from math import gcd
from scipy.signal import resample_poly
from transformers import WhisperProcessor, WhisperForConditionalGeneration

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
AUDIO_DIR  = os.path.join(SCRIPT_DIR, '..', 'generated_audio')
OUTPUT_DIR = os.path.join(SCRIPT_DIR, '..', 'src', 'assets', 'alignment')
os.makedirs(OUTPUT_DIR, exist_ok=True)

MODEL_ID = 'openai/whisper-medium'
DEVICE   = 'cuda' if torch.cuda.is_available() else 'cpu'
DTYPE    = torch.float16 if DEVICE == 'cuda' else torch.float32
TARGET_SR = 16000          # Whisper expects 16 kHz
CHUNK_S   = 30             # 30-second sliding window

print(f"Device : {DEVICE}")
print(f"Loading {MODEL_ID} ...")
processor = WhisperProcessor.from_pretrained(MODEL_ID)
model     = WhisperForConditionalGeneration.from_pretrained(MODEL_ID, torch_dtype=DTYPE)
model     = model.to(DEVICE)
model.eval()
print("Model ready.\n")

# ── helpers ──────────────────────────────────────────────────────────────────

def load_audio(path: str) -> np.ndarray:
    """Load audio as float32 mono @16 kHz (soundfile handles MP3-in-WAV)."""
    audio, sr = sf.read(path, dtype='float32', always_2d=False)
    if audio.ndim > 1:                      # stereo → mono
        audio = audio.mean(axis=1)
    if sr != TARGET_SR:                     # resample
        g     = gcd(int(sr), TARGET_SR)
        audio = resample_poly(audio, TARGET_SR // g, sr // g)
    return audio.astype(np.float32)


def parse_timestamps(raw: str, time_offset: float) -> list:
    """
    Parse Whisper's timestamp-embedded string into segment dicts.
    transformers 5.x returns a raw string like:
      " <|0.00|> Hello world. <|2.34|> <|2.34|> More text. <|4.56|>"
    re.split with a capture group gives alternating [pre, ts, text, ts, text, ts, ...]
    """
    parts = re.split(r'<\|(\d+\.\d+)\|>', raw)
    # parts[0] = prefix (empty), parts[1]=ts, parts[2]=text, parts[3]=ts, ...
    segs = []
    i = 1  # skip the prefix
    while i < len(parts):
        try:
            start = float(parts[i]) + time_offset
            text  = parts[i + 1].strip() if i + 1 < len(parts) else ''
            end   = float(parts[i + 2]) + time_offset if i + 2 < len(parts) else start + 2.0
            if text:
                segs.append({
                    'text':  text,
                    'start': round(start, 3),
                    'end':   round(end,   3),
                })
        except (ValueError, IndexError):
            pass
        i += 2
    return segs


def transcribe_chunk(chunk: np.ndarray, time_offset: float) -> list:
    """Run Whisper on a single ≤30 s chunk; return list of segment dicts."""
    inputs = processor(chunk, sampling_rate=TARGET_SR, return_tensors='pt')
    feats  = inputs.input_features.to(DEVICE, DTYPE)

    forced_ids = processor.get_decoder_prompt_ids(language='en', task='transcribe')
    n_forced   = len(forced_ids) if forced_ids else 0

    with torch.no_grad():
        ids = model.generate(
            feats,
            return_timestamps=True,
            forced_decoder_ids=forced_ids,
            max_new_tokens=448 - n_forced - 1,
        )

    raw = processor.decode(ids[0], decode_with_timestamps=True)
    return parse_timestamps(raw, time_offset)


# ── main loop ─────────────────────────────────────────────────────────────────

scenes = [f'Scene{i:03d}' for i in range(1, 10)]

for scene in scenes:
    audio_path  = os.path.join(AUDIO_DIR,  f'{scene}-audio.wav')
    output_path = os.path.join(OUTPUT_DIR, f'{scene}-alignment.json')

    if not os.path.exists(audio_path):
        print(f'WARNING: {audio_path} not found – skipping.')
        continue

    print(f'=== {scene} ===')
    audio        = load_audio(audio_path)
    chunk_size   = TARGET_SR * CHUNK_S
    all_segments = []

    for start_sample in range(0, len(audio), chunk_size):
        chunk       = audio[start_sample : start_sample + chunk_size]
        time_offset = start_sample / TARGET_SR
        segs        = transcribe_chunk(chunk, time_offset)
        all_segments.extend(segs)
        print(f'  chunk @{time_offset:.1f}s -> {len(segs)} segments')

    with open(output_path, 'w', encoding='utf-8') as f:
        json.dump(all_segments, f, indent=2, ensure_ascii=False)

    words = sum(len(s['text'].split()) for s in all_segments)
    dur   = len(audio) / TARGET_SR
    print(f'  -> {len(all_segments)} segs, {words} words, {dur:.1f}s audio')
    print(f'  -> Saved: {output_path}\n')

print('DONE Alignment complete for all scenes.')
