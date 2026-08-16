# System Architecture: Hybrid Video LMS

The Hybrid Video LMS platform integrates dynamic video generation from structured source data (JSON) and AI Talking Head generation. It allows generating educational video modules that combine interactive code animations, flowcharts, transitions, and matching realistic AI human avatar videos.

## High-Level Overview

```mermaid
graph TD
    User([Content Creator / CLI / WebApp]) -->|JSON Configuration| AnimationService[Animation Service (Node.js/Revideo)]
    User -->|Audio / Text + Image| TalkingHeadService[Talking Head Service (Python/FastAPI)]
    
    subgraph Services
        AnimationService -->|Headless Render| RevideoRenderer[Revideo Renderer]
        TalkingHeadService -->|Avatar Gen| LatentSync[LatentSync / MuseTalk / LivePortrait]
    end

    subgraph Shared Resources
        SharedSchemas[(Shared Schemas)] <---> AnimationService
        SharedSchemas <---> TalkingHeadService
        SharedStorage[(Shared Storage / File Volume)] <---> AnimationService
        SharedStorage <---> TalkingHeadService
    end

    RevideoRenderer -->|Output Video Clips| Composer[Video & Audio Composer]
    LatentSync -->|Output Avatar Clip| Composer
    Composer -->|Final MP4 Module| User
```

---

## Service Components

### 1. Talking Head Service
* **Language/Framework:** Python, FastAPI.
* **Core Responsibilities:**
  * Process input audio or text + reference image/avatar selection.
  * Generate photorealistic lip-sync avatar videos (using LatentSync, MuseTalk, LivePortrait, or SadTalker).
  * Expose REST endpoints to trigger and query avatar rendering jobs.
  * Provide health checks and performance monitoring of PyTorch models.
* **Tech Stack:** PyTorch, FastAPI, OpenCV, FFmpeg, Docker.

### 2. Animation Service
* **Language/Framework:** Node.js, Revideo (built on Motion Canvas).
* **Core Responsibilities:**
  * Parse JSON configurations defining templates, flowchart nodes, code highlights, transitions, and timing parameters.
  * Render modular video sequences containing dynamic text, shapes, charts, and code walk-throughs.
  * Display **two-line synchronized subtitles** driven by word-level alignment JSON files (`src/assets/alignment/`), generated from TTS audio via the Sarvam AI API.
  * Render each scene in an **isolated child process** (`render-single.js`) to prevent Puppeteer/Vite memory leaks during batch rendering.
  * Mux TTS audio, normalize output, and concatenate all scenes into the final MP4 via FFmpeg.
* **Tech Stack:** Node.js, TypeScript, Revideo/Motion Canvas, Chromium (Puppeteer), FFmpeg, Python (audio generation + alignment).

### 3. Shared Directory
* **Location:** `/shared`
* **Purpose:** Ensures consistency between Python and Node.js domains.
  * `schemas/`: Shared JSON schema definitions specifying input formats.
  * `utils/`: Common scripts (e.g., FFmpeg runners).
  * `constants/`: Configuration keys, color palettes, and video layout definitions.
  * `config/`: Shared configuration settings (like resolution, framerate, and paths).

---

## Workflow Integration

1. **Input Submission:** A user submits a video specification (spec.json) and audio file.
2. **Animation Rendering:** The Animation Service processes the JSON to render background slides, code execution animations, and workflow diagrams.
3. **Avatar Synthesis:** The Talking Head Service synthesizes a matching avatar speaking the provided audio script.
4. **Final Composition:** The rendered animation overlays are merged with the avatar video using a compositor script, resulting in the final video.
