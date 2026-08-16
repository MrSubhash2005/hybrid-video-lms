import { spawn, execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const FRAMES_DIR = path.join(__dirname, 'public/assets/frames');
const ASSETS_DIR = path.join(__dirname, 'public/assets');
const OUTPUT_MP4 = path.join(__dirname, 'output.mp4');

async function render() {
  console.log("Cleaning old frames directory...");
  if (fs.existsSync(FRAMES_DIR)) {
    fs.rmSync(FRAMES_DIR, { recursive: true });
  }
  fs.mkdirSync(FRAMES_DIR, { recursive: true });

  // 1. Start the express dev server gracefully
  console.log("Ensuring web server is running on port 3000...");
  const server = spawn('node', ['src/index.js'], { cwd: __dirname });
  server.on('error', (err) => {
    console.log("Notice: Node process spawn error (possibly port 3000 in use):", err.message);
  });
  
  // Wait 3 seconds for server binding
  await new Promise(resolve => setTimeout(resolve, 3000));

  let page;
  try {
    // Import Playwright
    const { chromium } = await import('playwright');
    
    console.log("Launching sandboxed Playwright Chromium...");
    const browser = await chromium.launch({
      headless: true
    });
    
    const context = await browser.newContext({
      viewport: { width: 1920, height: 1080 }
    });
    
    page = await context.newPage();
    page.on('console', msg => console.log('PAGE LOG:', msg.text()));
    page.on('pageerror', err => console.error('PAGE ERROR:', err.message));

    console.log("Loading animation preview player...");
    await page.goto('http://localhost:3000/index.html', { waitUntil: 'load' });
    
    // Pause auto-playback loop
    await page.evaluate(() => {
      if (typeof window.pause === 'function') {
        window.pause();
      }
    });

    // Wait for client-side JS initialization
    await page.waitForFunction(() => typeof window.stepDurations !== 'undefined' && window.stepDurations.length > 0, { timeout: 10000 });

    // Query step durations
    const { stepDurations, totalDuration } = await page.evaluate(() => {
      return {
        stepDurations: window.stepDurations || [],
        totalDuration: window.totalDuration || 0
      };
    });
    
    console.log(`Video total duration: ${totalDuration.toFixed(2)} seconds.`);
    
    const fps = 15;
    const totalFrames = Math.ceil(totalDuration * fps);
    console.log(`Rendering ${totalFrames} frames...`);
    
    for (let f = 0; f < totalFrames; f++) {
      const time = f / fps;
      
      // Force render frame at exact playhead time
      await page.evaluate((t) => {
        window.currentTime = t;
        window.renderFrame(t);
      }, time);
      
      // Capture screenshot of the #video-canvas element
      const element = page.locator('#video-canvas');
      const filename = `frame_${String(f).padStart(5, '0')}.png`;
      const filePath = path.join(FRAMES_DIR, filename);
      
      await element.screenshot({ path: filePath });
      
      if (f % 100 === 0 || f === totalFrames - 1) {
        console.log(`Rendered frame ${f}/${totalFrames} (${Math.round((f / totalFrames) * 100)}%)`);
      }
    }
    
    console.log("Headless rendering complete. Closing browser...");
    await browser.close();

    // 2. Concatenate audio voiceover files
    console.log("Preparing audio track concatenation...");
    const concatListPath = path.join(__dirname, 'concat_list.txt');
    let concatListContent = "";
    for (let i = 0; i < 60; i++) {
      const stepAudio = path.join(__dirname, `public/assets/audio/step_${i}.wav`);
      concatListContent += `file '${stepAudio}'\n`;
    }
    fs.writeFileSync(concatListPath, concatListContent);

    const finalAudioWav = path.join(ASSETS_DIR, 'final_audio.wav');
    console.log("Compiling audio tracks with ffmpeg...");
    execSync(`ffmpeg -f concat -safe 0 -i "${concatListPath}" -y "${finalAudioWav}"`, { stdio: 'inherit' });
    fs.unlinkSync(concatListPath);

    // 3. Compile screenshots to video
    console.log("Compiling video frames with ffmpeg...");
    const finalVideoMp4 = path.join(ASSETS_DIR, 'final_video.mp4');
    execSync(`ffmpeg -framerate 15 -i "${FRAMES_DIR}/frame_%05d.png" -c:v libx264 -pix_fmt yuv420p -y "${finalVideoMp4}"`, { stdio: 'inherit' });

    // 4. Multiplex audio and video
    console.log("Multiplexing audio and video into final output.mp4...");
    execSync(`ffmpeg -i "${finalVideoMp4}" -i "${finalAudioWav}" -c:v copy -c:a aac -shortest -y "${OUTPUT_MP4}"`, { stdio: 'inherit' });

    // Cleanup temp files
    console.log("Cleaning up temporary render files...");
    fs.unlinkSync(finalAudioWav);
    fs.unlinkSync(finalVideoMp4);
    fs.rmSync(FRAMES_DIR, { recursive: true });

    console.log(`SUCCESS! Final exported course video saved to: ${OUTPUT_MP4}`);
  } catch (err) {
    console.error("Renderer Pipeline Failed:", err);
    try {
      if (typeof page !== 'undefined') {
        await page.screenshot({ path: path.join(__dirname, 'public/error_page.png'), fullPage: true });
        console.log("Saved error page screenshot to public/error_page.png");
      }
    } catch (ssErr) {
      console.error("Failed to capture error page screenshot:", ssErr);
    }
  } finally {
    console.log("Cleaning up server processes...");
    server.kill();
  }
}

render();
