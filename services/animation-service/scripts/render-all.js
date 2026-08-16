import fs from 'fs/promises';
import { renderVideo } from '@revideo/renderer';
import path from 'path';
import { execSync } from 'child_process';

const scenes = [
  'Scene001',
  'Scene002',
  'Scene003',
  'Scene004',
  'Scene005',
  'Scene006',
  'Scene007',
  'Scene008',
  'Scene009'
];

async function main() {
  const rawDir = path.join(process.cwd(), 'render-output', 'raw');
  const normDir = path.join(process.cwd(), 'render-output', 'normalized');
  await fs.mkdir(rawDir, { recursive: true });
  await fs.mkdir(normDir, { recursive: true });

  for (const scene of scenes) {
    console.log(`\n=== Rendering ${scene} ===`);
    const outPath = path.join(process.cwd(), 'render-output', 'raw', `${scene}.mp4`);
    try {
      execSync(`node scripts/render-single.js ${scene}`, { stdio: 'inherit' });
    } catch (err) {
      console.error(`Failed to render ${scene}:`, err);
    }

    console.log(`\n=== Normalizing & Muxing Audio for ${scene} ===`);
    const normPath = path.join(normDir, `${scene}.mp4`);
    const audioPath = path.join(process.cwd(), 'generated_audio', `${scene}-audio.wav`);
    
    try {
      // Check if audio file exists
      await fs.access(audioPath);
      // Mux audio and apply standardization protocol
      // Source audio files are MP3-in-WAV containers, so we explicitly decode and re-encode
      // -ar 48000 forces resampling to 48kHz, -ac 2 forces stereo
      execSync(`ffmpeg -y -i "${outPath}" -i "${audioPath}" -map 0:v:0 -map 1:a:0 -vf scale=1920:1080 -c:v libx264 -profile:v high -r 25 -pix_fmt yuv420p -c:a aac -ar 48000 -ac 2 -b:a 192k -shortest "${normPath}"`, { stdio: 'inherit' });
    } catch (e) {
      console.warn(`\n⚠️ Audio file ${audioPath} not found! Rendering without audio.`);
      execSync(`ffmpeg -y -i "${outPath}" -vf scale=1920:1080 -c:v libx264 -profile:v high -r 25 -pix_fmt yuv420p -an "${normPath}"`, { stdio: 'inherit' });
    }
  }

  console.log('\n=== Generating concat list ===');
  const concatListPath = path.join(process.cwd(), 'render-output', 'concat.txt');
  const concatContent = scenes.map(s => `file 'normalized/${s}.mp4'`).join('\n');
  await fs.writeFile(concatListPath, concatContent);

  console.log('\n=== Concatenating videos ===');
  const finalPath = path.join(process.cwd(), 'final-hybrid-video.mp4');
  execSync(`ffmpeg -y -f concat -safe 0 -i "${concatListPath}" -c copy "${finalPath}"`, { stdio: 'inherit' });

  console.log('\n✅ Render pipeline complete! Final file: ' + finalPath);
}

main().catch(console.error);
