import { execFileSync } from "child_process";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const AUDIO_DIR = path.join(
  __dirname,
  "public/assets/audio_rag"
);

const OUTPUT_FILE = path.join(
  __dirname,
  "src/rag_durations.ts"
);

if (!fs.existsSync(AUDIO_DIR)) {
  throw new Error(`Audio directory does not exist: ${AUDIO_DIR}`);
}

const audioFiles = fs
  .readdirSync(AUDIO_DIR)
  .filter(file => /^step_\d+\.wav$/.test(file))
  .sort((a, b) => {
    const aNumber = parseInt(a.match(/\d+/)[0]);
    const bNumber = parseInt(b.match(/\d+/)[0]);

    return aNumber - bNumber;
  });

if (audioFiles.length !== 24) {
  throw new Error(
    `Expected 24 audio files, but found ${audioFiles.length}`
  );
}

const durations = [];

for (const file of audioFiles) {
  const filePath = path.join(AUDIO_DIR, file);

  const output = execFileSync(
    "ffprobe",
    [
      "-v",
      "error",
      "-show_entries",
      "format=duration",
      "-of",
      "default=noprint_wrappers=1:nokey=1",
      filePath
    ],
    {
      encoding: "utf8"
    }
  );

  const rawDuration = parseFloat(output.trim());

  if (Number.isNaN(rawDuration)) {
    throw new Error(`Invalid duration for ${file}`);
  }

  const duration = Number((rawDuration + 0.3).toFixed(2));

  durations.push(duration);
}

const outputContent = `
// Automatically generated.
// Do not manually edit this file.

export const ragDurations = ${JSON.stringify(
  durations,
  null,
  2
)} as const;
`;

fs.writeFileSync(
  OUTPUT_FILE,
  outputContent.trim() + "\n"
);

const totalDuration = durations.reduce(
  (sum, duration) => sum + duration,
  0
);

console.log(`Generated: ${OUTPUT_FILE}`);
console.log(`Audio files: ${durations.length}`);
console.log(`Total duration: ${totalDuration.toFixed(2)} seconds`);