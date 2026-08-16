/**
 * Cache Setup / Auto-Generation Script
 *
 * Generates all pre-rendered cache videos (4 courses × 2 genders) so that
 * first-time cloners and API consumers get instant video playback without
 * needing Sarvam API keys, ffmpeg, Playwright, or other heavy dependencies.
 *
 * Usage:
 *   npm run setup-cache            # Auto-detect & generate missing files
 *   npm run setup-cache --force    # Regenerate ALL cache files
 *
 * Prerequisites for generation:
 *   - Server must be running on port 3000 (`npm start`)
 *   - OR this script can start one automatically
 *   - Sarvam API key(s) in environment
 *   - ffmpeg on PATH
 *   - Playwright browsers installed
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { spawn, spawnSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const COURSES = ['git', 'rag', 'dsa', 'explainer'];
const GENDERS = ['male', 'female'];
const CELEBRITY_FEMALE = 'deepika';
const CELEBRITY_MALE = 'shahrukh';
const OUTPUT_DIR = path.join(__dirname, '..', 'public', 'outputs');
const SERVER_PORT = process.env.PORT || 3000;
const BASE_URL = `http://localhost:${SERVER_PORT}`;
const FORCE_MODE = process.argv.includes('--force');

// ─── Helpers ────────────────────────────────────────────────────────────────

function formatBytes(bytes) {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
}

function getExistingCache() {
  const result = [];
  for (const course of COURSES) {
    for (const gender of GENDERS) {
      const filePath = path.join(OUTPUT_DIR, `video_${course}_${gender}.mp4`);
      const exists = fs.existsSync(filePath);
      result.push({
        course,
        gender,
        filePath,
        exists,
        size: exists ? fs.statSync(filePath).size : 0,
      });
    }
  }
  return result;
}

async function fetchWithTimeout(url, options = {}, timeout = 5000) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeout);
  try {
    const res = await fetch(url, { ...options, signal: controller.signal });
    return res;
  } finally {
    clearTimeout(timer);
  }
}

async function waitForServer(maxRetries = 15, delayMs = 2000) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      const res = await fetchWithTimeout(`${BASE_URL}/health`, {}, 2000);
      if (res.ok) {
        console.log(`  ✅  Server is live on port ${SERVER_PORT}\n`);
        return true;
      }
    } catch {
      // server not ready yet
    }
    process.stdout.write('.');
    await new Promise(r => setTimeout(r, delayMs));
  }
  console.log('');
  return false;
}

function startServer() {
  return new Promise((resolve, reject) => {
    const server = spawn('node', ['src/index.js'], {
      cwd: path.join(__dirname, '..'),
      stdio: ['ignore', 'pipe', 'pipe'],
      env: { ...process.env },
    });

    let started = false;
    const onData = (data) => {
      const text = data.toString();
      if (!started && text.includes('running on port')) {
        started = true;
        resolve(server);
      }
    };

    server.stdout.on('data', onData);
    server.stderr.on('data', onData);

    server.on('error', (err) => reject(err));
    server.on('exit', (code) => {
      if (!started) reject(new Error(`Server exited with code ${code}`));
    });

    // Timeout safety
    setTimeout(() => {
      if (!started) {
        started = true;
        resolve(server); // try anyway
      }
    }, 8000);
  });
}

async function generateCacheVideo(course, gender) {
  const celebrity = gender === 'female' ? CELEBRITY_FEMALE : CELEBRITY_MALE;
  const label = `${course.padEnd(10)} ${gender.padEnd(6)}`;

  try {
    const res = await fetchWithTimeout(`${BASE_URL}/api/v1/course/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ course, celebrity, gender }),
    }, 10000);

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      console.log(`  ❌  ${label} HTTP ${res.status}: ${err.error || res.statusText}`);
      return false;
    }

    const job = await res.json();

    if (job.status === 'completed') {
      // Instant cache hit - no need to poll
      const filePath = path.join(OUTPUT_DIR, `video_${course}_${gender}.mp4`);
      if (fs.existsSync(filePath)) {
        const size = fs.statSync(filePath).size;
        console.log(`  ✅  ${label} ${formatBytes(size).padStart(8)} (instant cache hit)`);
        return true;
      }
      console.log(`  ✅  ${label} completed (job: ${job.job_id})`);
      return true;
    }

    // Poll for completion
    const maxPolls = 120; // 10 minutes max
    for (let i = 0; i < maxPolls; i++) {
      await new Promise(r => setTimeout(r, 5000));

      const statusRes = await fetchWithTimeout(`${BASE_URL}${job.check_status_url}`, {}, 5000);
      if (!statusRes.ok) continue;

      const status = await statusRes.json();

      if (status.status === 'completed') {
        console.log(`  ✅  ${label} completed (${i * 5 + 5}s)`);
        return true;
      }

      if (status.status === 'failed') {
        console.log(`  ❌  ${label} failed: ${status.error || 'unknown error'}`);
        return false;
      }

      if (i % 6 === 0) {
        process.stdout.write(`  ⏳  ${label} ${status.status} (${status.progress || '?'}%)      \r`);
      }
    }

    console.log(`  ❌  ${label} timed out after 10 minutes`);
    return false;
  } catch (err) {
    console.log(`  ❌  ${label} error: ${err.message}`);
    return false;
  }
}

// ─── Main ───────────────────────────────────────────────────────────────────

async function main() {
  console.log('\n╔══════════════════════════════════════════════╗');
  console.log('║     🎬  Cache Video Setup                     ║');
  console.log('╚══════════════════════════════════════════════╝\n');

  // 1. Check existing cache files
  const cacheState = getExistingCache();
  const missing = cacheState.filter(c => !c.exists);
  const present = cacheState.filter(c => c.exists);

  if (missing.length === 0 && !FORCE_MODE) {
    const totalSize = present.reduce((s, c) => s + c.size, 0);
    console.log('  ✅  All 8 cache files are already present!\n');
    console.log(`  💾  Total: ${formatBytes(totalSize)} across ${present.length} files\n`);
    console.log('  ℹ️   Use `--force` flag to regenerate all files.\n');
    process.exit(0);
  }

  if (present.length > 0 && !FORCE_MODE) {
    console.log(`  ✅  ${present.length}/8 cache files already present.`);
    console.log(`  🔄  ${missing.length} files need generation.\n`);
  }

  if (FORCE_MODE) {
    console.log('  🔄  Force mode: regenerating ALL cache files.\n');
  }

  const toGenerate = FORCE_MODE ? cacheState : missing;

  // 2. Check if server is already running
  let serverProcess = null;
  console.log('  🔍  Checking for running server...');
  const serverReady = await waitForServer(3, 2000);

  if (!serverReady) {
    console.log('  🚀  Starting local server...');
    try {
      serverProcess = await startServer();
      console.log('  ✅  Server started successfully.\n');
    } catch (err) {
      console.error(`  ❌  Failed to start server: ${err.message}`);
      console.log('\n  💡  Make sure port 3000 is free and try again.');
      console.log('     Or start the server manually: npm start\n');
      process.exit(1);
    }

    const ready = await waitForServer(15, 2000);
    if (!ready) {
      console.error('  ❌  Server failed to become ready.');
      if (serverProcess) serverProcess.kill();
      process.exit(1);
    }
  }

  // 3. Check for Sarvam API keys (warn if missing)
  const hasSarvamKey = process.env.SARVAM_API_KEY;
  if (!hasSarvamKey) {
    console.log('  ⚠️   No SARVAM_API_KEY found in environment.');
    console.log('     Generation may fall back to cache or fail.');
    console.log('     Set SARVAM_API_KEY to enable TTS voice generation.\n');
  }

  // 4. Generate each missing cache video sequentially
  console.log('  🎬  Generating cache videos...\n');
  
  let generated = 0;
  let failed = 0;

  for (const { course, gender } of toGenerate) {
    const ok = await generateCacheVideo(course, gender);
    if (ok) generated++;
    else failed++;
  }

  // 5. Summary
  console.log('\n────────────────────────────────────────────────');
  console.log(`  📊  Results: ${generated} generated, ${failed} failed`);
  console.log('────────────────────────────────────────────────');

  if (generated > 0) {
    // Run health check as child process
    console.log('\n  🔍  Running final health check...\n');
    const healthResult = spawnSync('node', ['./scripts/cache-health.js'], {
      cwd: path.join(__dirname, '..'),
      stdio: 'inherit',
    });
    if (healthResult.status !== 0) {
      console.log('\n  ⚠️   Cache health check reported issues after generation.\n');
    }
  }

  if (failed > 0) {
    console.log('\n  ⚠️   Some cache files could not be generated.');
    console.log('  💡  Ensure Sarvam API keys are set and retry.');
    console.log('     Or get the files from a working copy and commit them.\n');
  } else {
    console.log('\n  🎉  All cache videos ready for instant playback!\n');
  }

  // Cleanup
  if (serverProcess) {
    console.log('  🛑  Shutting down the auto-started server...');
    serverProcess.kill();
  }

  process.exit(failed > 0 ? 1 : 0);
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
