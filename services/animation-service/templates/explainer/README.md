# Developer Documentary Player: Hybrid Video LMS — Issue #10

This is a premium, interactive React-based presentation player that acts as a documentary explainer for the frontend enhancement on the **Hybrid Video LMS** project. Specifically, it reviews the implementation of the **UI Components & Transition Library** contributed by **Sumit Prajapati** and **Subhash Maurya**.

The application functions like an educational documentary, featuring synchronized timelines, vector animation sequences, synthesized voice-over narration, and standard player HUD controls.

## Key Features

1. **8-Minute Timing Nodes**: Structured into exactly 8 chapters, each timed to 60 seconds (total 480 seconds / 8 minutes duration).
2. **Apple-Inspired Dark Aesthetic**: Modern glassmorphism panels, glowing neon accents, and customized fonts (Outfit and Fira Code).
3. **Web Audio Synthesizer**: Generates dynamic chord progressions, ambient digital bleeps, keyboard click inputs, and transition swooshes on-the-fly.
4. **Natural Narration Engine**: Synthesizes the ~1100 words narration script using the browser's Web Speech API.
5. **Interactive Chapters Sidebar**: Lets users monitor chapter headings and jump directly to specific scenes.
6. **Responsive HUD Controls**: Includes standard volume slider, mute, speed multipliers (0.75x to 2x), restart, play/pause, and fullscreen support.

---

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm (v9 or higher)

### Installation

1. Navigate to the project directory:
   ```bash
   cd C:\Users\hp\.gemini\antigravity\scratch\hybrid-video-lms-explainer-react
   ```
2. Install dependencies:
   ```bash
   npm install --legacy-peer-deps
   ```

### Running Locally

To launch the local development server, run:
   ```bash
   npm run dev
   ```

Once started, open [http://localhost:5173](http://localhost:5173) in your web browser to play the interactive documentary.

---

## File Structure

```
├── index.html                  # Root template with metadata
├── tailwind.config.js          # Tailwind CSS style system configurations
├── package.json                # Project dependencies
├── src/
│   ├── main.jsx                # App entrypoint mounting React
│   ├── index.css               # Base Tailwind imports & custom animations
│   ├── App.jsx                 # Player controller orchestrator
│   ├── components/
│   │   ├── AudioEngine.js      # Web Audio synthesizers (swoosh, typing, pad)
│   │   ├── Chapters.js         # Chapter names & ~1100-word voiceover script
│   │   ├── VideoControls.jsx   # Playback timeline slider HUD
│   │   └── VisualScenes.jsx    # Graphics display switcher
│   └── scenes/
│       ├── Scene1Intro.jsx     # Glowing branding cover (Ch. 1)
│       ├── Scene2Architecture.jsx # Dynamic folder list explorer (Ch. 2)
│       ├── Scene3Problems.jsx  # Red warning hotspot diagram (Ch. 3)
│       ├── Scene4Design.jsx    # SVG Component parent-child hierarchy (Ch. 4)
│       ├── Scene5Walkthrough.jsx # VS Code & browser compiler simulation (Ch. 5)
│       ├── Scene6Workflow.jsx  # 6-step workflow render loop (Ch. 6)
│       ├── Scene7Demo.jsx      # Snapping vs Transition comparison (Ch. 7)
│       └── Scene8Summary.jsx   # Glowing review & contributor credits (Ch. 8)
```
