# Animation Service

This service renders dynamic educational video modules using **Revideo** (built on Motion Canvas). It produces fully composed MP4 scenes — including code animations, linked-list diagrams, and synchronized two-line subtitles — driven by structured TypeScript scene files and word-level audio alignment data.

---

## Architecture Overview

```
scripts/
  generate_all_audio.py   ← Generates TTS audio for all 9 scenes via Sarvam AI
  align_audio.py          ← Produces word-level alignment JSON from audio + transcript
  render-all.js           ← Orchestrates the full render pipeline (all scenes → final MP4)
  render-single.js        ← Isolated per-scene renderer (spawned as a child process)
  setup-cache.js          ← Generates pre-rendered cache videos for instant API playback
  cache-health.js         ← Verifies all cache files are present

src/
  index.js                ← Express API server with cache-first video serving
  scenes/                 ← Scene001.tsx … Scene009.tsx  (Revideo animation scenes)
  utils/
    captions.ts           ← Caption cue parsing: cuesFromAlignment() + groupCues()
  assets/
    alignment/            ← Scene00X-alignment.json  (word-level timing data)

api/
  index.js                ← Vercel Serverless Function (CDN-backed cache serving)

public/
  outputs/                ← Pre-rendered cache video files (tracked in git)
    video_git_male.mp4
    video_git_female.mp4
    video_rag_male.mp4
    video_rag_female.mp4
    video_dsa_male.mp4
    video_dsa_female.mp4
    video_explainer_male.mp4
    video_explainer_female.mp4

render-output/
  raw/                    ← Intermediate per-scene MP4s
  normalized/             ← Audio-muxed & normalized per-scene MP4s

final-hybrid-video.mp4    ← Fully stitched final output
```

---

## 🚀 Quick Start (Zero Dependencies)

The easiest way to get started is with the **pre-rendered cache system**. The repo includes 8 pre-rendered course videos (4 courses × 2 voice genders) that are tracked in git and served instantly by the API — no API keys, ffmpeg, or browser automation needed.

### 1. Install & start
```bash
cd services/animation-service
npm install        # Runs postinstall cache health check automatically
npm start          # Starts server on port 3000
```

### 2. Make an API call
```bash
# Get a Git course video with a female voice (instant - served from cache)
curl -X POST http://localhost:3000/api/v1/course/generate \
  -H "Content-Type: application/json" \
  -d '{"course": "git", "celebrity": "deepika", "gender": "female"}'

# Available courses: git, rag, dsa, explainer
# Available genders: male, female
# Celebrity name is used for voice selection but cache serves any → same gender
```

> **No API keys required!** The cache videos are already in the repo.
> The response is returned in **under 500ms** since the video is pre-rendered.

Open [http://localhost:3000](http://localhost:3000) to use the built-in web sandbox UI.

---

## 📦 Cache System

### How it works

1. **Pre-rendered cache**: 8 video files (`video_{course}_{gender}.mp4`) are tracked in git under `public/outputs/`.
2. **Cache-first API**: When you POST to `/api/v1/course/generate`, the server checks if a matching cache file exists.
3. **Instant response**: If found, it copies the file and returns `{ status: 'completed' }` immediately.
4. **Fallback rendering**: If no cache exists (e.g., new course), it runs the full rendering pipeline.

### Cache files included

| Course     | Male (size) | Female (size) |
|------------|-------------|---------------|
| Git        | 11 MB       | 11 MB         |
| RAG        | 82 MB       | 82 MB         |
| DSA        | 65 MB       | 63 MB         |
| Explainer  | 21 MB       | 10 MB         |

**Total: ~345 MB** — a small price for instant-first-load on fresh clones.

### Scripts

```bash
# Verify all cache files are present (auto-runs on npm install)
npm run cache-health

# Regenerate cache files (requires Sarvam API key + ffmpeg + Playwright)
npm run setup-cache

# Force-regenerate all cache files
npm run setup-cache -- --force
```

### Adding new cache files

```bash
# 1. Generate the video via the API
curl -X POST http://localhost:3000/api/v1/course/generate \
  -H "Content-Type: application/json" \
  -d '{"course": "rag", "celebrity": "shahrukh", "gender": "male"}'

# 2. The server auto-saves it to public/outputs/video_rag_male.mp4
# 3. Update .gitignore if needed (add !negation pattern)
# 4. Force-add to git
# 5. Commit
```

---

## Full Setup (Development with Live Rendering)

### Prerequisites
- Node.js 20.x
- Python 3.9+
- FFmpeg (available on `PATH`)
- Chromium / Chrome (path configured in `render-single.js`)

### 1. Install Node dependencies
```bash
cd services/animation-service
npm install
```

### 2. Set environment variables

Create a `.env` file or export variables in your shell:

```bash
# Required for live TTS audio generation (not needed for cache)
export SARVAM_API_KEY=your_key_here   # Linux/macOS
set SARVAM_API_KEY=your_key_here      # Windows
```

> **Never commit your API key.** The `.gitignore` already excludes `.env` files.

---

## Generating Audio

Generates TTS audio for all 9 scenes using the Sarvam AI `bulbul:v3` model (voice: Tarun, pace: 1.05×, 48 kHz stereo).

```bash
python scripts/generate_all_audio.py
```

Output is saved to `generated_audio/Scene00X-audio.wav`. Already-generated files are skipped automatically.

---

## Generating Caption Alignment Data

Produces word-level timing JSON from the generated audio + the scene transcript:

```bash
python scripts/align_audio.py
```

Output is saved to `src/assets/alignment/Scene00X-alignment.json`. These files are committed to the repo and drive the subtitle system at render time.

---

## Rendering

### Full pipeline (all 9 scenes → final MP4)
```bash
npm run render:full
# Equivalent to: node scripts/render-all.js
```

This will:
1. Render each scene in an **isolated child process** (prevents Vite/Puppeteer memory leaks across scenes).
2. Mux in the TTS audio and normalize each scene to 1920×1080 @ 25fps.
3. Concatenate all normalized scenes into `final-hybrid-video.mp4`.

### Preview a single scene in the editor
```bash
npm start
# Opens the Revideo editor at http://localhost:9003
```

---

## Subtitle System

Captions are rendered as **two lines simultaneously**, driven by `src/assets/alignment/Scene00X-alignment.json`.

**Data flow:**
```
alignment JSON
  → cuesFromAlignment()   (parses word timestamps into Cue[])
  → groupCues()           (groups words into display-timed cues with \n separating line 1 and line 2)
  → captionText / captionText2  (two Txt refs rendered inside a Rect container)
```

Each scene runs two parallel generator threads inside `all()`:
- **Caption thread** — iterates `allCues`, splits on `\n`, and animates both text refs.
- **Animation thread** — handles all scene-specific visual animations.

---

## Running Tests
```bash
npm run test
```

---

## Docker

Build and run via Docker Compose from the repo root:
```bash
docker-compose up -d animation-service
```

> Ensure your container has **≥ 2 GB RAM** per concurrent render worker (Chromium is memory-intensive).
