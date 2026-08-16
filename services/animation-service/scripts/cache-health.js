/**
 * Cache Health Checker
 * 
 * Verifies that all pre-rendered cache videos are present in public/outputs/.
 * These files are tracked in git so first-time cloners get instant video playback
 * without needing Sarvam API keys, ffmpeg, Playwright, or other heavy dependencies.
 * 
 * Run: node scripts/cache-health.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const COURSES = ['git', 'rag', 'dsa', 'explainer'];
const GENDERS = ['male', 'female'];
const OUTPUT_DIR = path.join(__dirname, '..', 'public', 'outputs');

const CACHE_FILES = [];
for (const course of COURSES) {
  for (const gender of GENDERS) {
    CACHE_FILES.push({ course, gender, filename: `video_${course}_${gender}.mp4` });
  }
}

function formatBytes(bytes) {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
}

function checkCache() {
  console.log('\n╔══════════════════════════════════════════════╗');
  console.log('║     🎬  Cache Health Check Report           ║');
  console.log('╚══════════════════════════════════════════════╝\n');

  if (!fs.existsSync(OUTPUT_DIR)) {
    console.log('  ❌  Output directory does not exist!');
    console.log(`  📁  ${OUTPUT_DIR}\n`);
    console.log('  💡  Run `npm run setup-cache` to populate cache.\n');
    return false;
  }

  let allPresent = true;
  let totalSize = 0;
  let presentCount = 0;
  let missingCount = 0;

  for (const { course, gender, filename } of CACHE_FILES) {
    const filePath = path.join(OUTPUT_DIR, filename);
    const exists = fs.existsSync(filePath);

    if (exists) {
      const stats = fs.statSync(filePath);
      totalSize += stats.size;
      presentCount++;
      console.log(`  ✅  ${filename.padEnd(38)} ${formatBytes(stats.size).padStart(8)}`);
    } else {
      allPresent = false;
      missingCount++;
      console.log(`  ❌  ${filename.padEnd(38)} MISSING`);
    }
  }

  console.log('\n────────────────────────────────────────────────');
  console.log(`  📊  Total:     ${CACHE_FILES.length} files`);
  console.log(`  ✅  Present:   ${presentCount} files`);
  if (missingCount > 0) {
    console.log(`  ❌  Missing:   ${missingCount} files`);
  }
  console.log(`  💾  Size:      ${formatBytes(totalSize)}`);
  console.log('────────────────────────────────────────────────\n');

  if (!allPresent) {
    console.log('  ⚠️   Some cache files are missing!');
    console.log('  💡  Run `npm run setup-cache` to auto-generate them.');
    console.log('  💡  Or commit the missing files from a working copy.\n');
    return false;
  }

  console.log('  🎉  All cache files healthy! Ready for instant playback.\n');
  return true;
}

const healthy = checkCache();
process.exit(healthy ? 0 : 1);
