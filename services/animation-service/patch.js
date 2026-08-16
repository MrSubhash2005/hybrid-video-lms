import fs from 'fs';

// Fix 1: Remove --single-process flag (causes crashes on Windows)
const renderFile = 'node_modules/@revideo/renderer/lib/server/render-video.js';
let renderContent = fs.readFileSync(renderFile, 'utf8');
if (renderContent.includes("args.includes('--single-process')")) {
    renderContent = renderContent.replace(
        "args.includes('--single-process') || args.push('--single-process');",
        "// args.push('--single-process'); // disabled - causes crashes on Windows"
    );
    fs.writeFileSync(renderFile, renderContent);
    console.log('✓ Fix 1 applied: removed --single-process flag');
} else {
    console.log('✓ Fix 1 already applied');
}

// Fix 2: Replace fluent-ffmpeg lavfi call with direct child_process
const utilsFile = 'node_modules/@revideo/ffmpeg/dist/utils.js';
let utilsContent = fs.readFileSync(utilsFile, 'utf8');
if (utilsContent.includes(".inputFormat('lavfi')")) {
    utilsContent = utilsContent.replace(
        `async function createSilentAudioFile(filePath, duration) {
    ffmpeg.setFfmpegPath(settings_1.ffmpegSettings.getFfmpegPath());
    return new Promise((resolve, reject) => {
        ffmpeg()
            .addInput(\`anullsrc=channel_layout=stereo:sample_rate=\${48000}\`)
            .inputFormat('lavfi')
            .duration(duration)
            .on('end', () => {
            resolve(filePath);
        })
            .on('error', err => {
            console.error('Error creating silent audio file:', err);
            reject(err);
        })
            .save(filePath);
    });
}`,
        `async function createSilentAudioFile(filePath, duration) {
    const { execSync } = require('child_process');
    const ffmpegPath = settings_1.ffmpegSettings.getFfmpegPath();
    try {
        execSync(\`"\${ffmpegPath}" -f lavfi -i anullsrc=channel_layout=stereo:sample_rate=48000 -t \${duration} -y "\${filePath}"\`, { stdio: 'pipe' });
        return filePath;
    } catch (err) {
        console.error('Error creating silent audio file:', err);
        throw err;
    }
}`
    );
    fs.writeFileSync(utilsFile, utilsContent);
    console.log('✓ Fix 2 applied: replaced fluent-ffmpeg lavfi with direct ffmpeg call');
} else {
    console.log('✓ Fix 2 already applied');
}

console.log('\nAll patches applied! Run npm run render:full');
