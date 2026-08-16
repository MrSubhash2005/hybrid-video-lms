import { renderVideo } from '@revideo/renderer';
renderVideo({ projectFile: './src/project.ts', settings: { outDir: 'out', outFile: 'out.mp4' } }).catch(console.error);
