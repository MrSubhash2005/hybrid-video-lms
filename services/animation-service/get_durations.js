import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const AUDIO_DIR = path.join(__dirname, 'public/assets/audio_job_f75e5003');
const durations = [];

for (let i = 0; i < 60; i++) {
  const filePath = path.join(AUDIO_DIR, `step_${i}.wav`);
  if (!fs.existsSync(filePath)) {
    console.error(`Missing file: ${filePath}`);
    durations.push(5.0); // fallback
    continue;
  }
  
  try {
    const output = execSync(`ffprobe -i "${filePath}" -show_entries format=duration -v quiet -of csv="p=0"`);
    const duration = parseFloat(output.toString().trim());
    // Add a tiny buffer (e.g. 0.4s) to prevent words cutting off too abruptly at transitions
    durations.push(duration + 0.2);
  } catch (err) {
    console.error(`Error probing ${filePath}:`, err.message);
    durations.push(5.0);
  }
}

console.log(JSON.stringify(durations));
