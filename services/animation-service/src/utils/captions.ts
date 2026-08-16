

export interface Cue {
  text: string;
  start: number;
  end: number;
}

/** Shape of each entry produced by align_audio.py */
export interface AlignmentSegment {
  text: string;
  start: number;
  end: number;
}

/**
 * Converts Whisper alignment segments directly into Cue objects.
 * Each segment is a natural sentence/pause boundary detected by Whisper,
 * so captions fire at the exact moment words are spoken in the audio.
 */
export function cuesFromAlignment(segments: AlignmentSegment[]): Cue[] {
  return segments
    .filter(seg => seg.text.trim().length > 0)
    .map(seg => ({
      text: seg.text.trim(),
      start: seg.start,
      end: seg.end,
    }));
}


/**
 * Groups an array of Cues into blocks of N lines (default 2).
 * This creates a subtitle-style reading experience.
 */
export function groupCues(cues: Cue[], linesPerGroup: number = 2): Cue[] {
  const grouped: Cue[] = [];
  for (let i = 0; i < cues.length; i += linesPerGroup) {
    const chunk = cues.slice(i, i + linesPerGroup);
    grouped.push({
      text: chunk.map(c => c.text).join('\n'),
      start: chunk[0].start,
      end: chunk[chunk.length - 1].end,
    });
  }
  return grouped;
}
