# Deployment Guide

This document describes how to deploy the Hybrid Video LMS services locally or to production.

---

## 1. Local Development via Docker Compose

Both services can be run locally using the pre-configured `docker-compose.yml` file.

### Prerequisites:
- Docker installed (v20.10+)
- Docker Compose installed (v2.0+)
- (Optional) NVIDIA Container Toolkit for GPU acceleration on Linux.

### Commands:
```bash
# Build and run the services in the background
docker-compose up -d --build

# View logs
docker-compose logs -f

# Stop the services
docker-compose down
```

---

## 2. Environment Variables Configuration

Create a `.env` file in the root directory to customize the environment.

```env
# Talking Head Service settings
PORT=8000
MODEL_CACHE_DIR=/app/models

# Animation Service settings
PORT=3000
NODE_ENV=production

# Sarvam AI — Required for TTS audio generation (scripts/generate_all_audio.py)
# Get your key at: https://dashboard.sarvam.ai
SARVAM_API_KEY=your_sarvam_api_key_here
```

---

## 3. Production Deployment Notes

### Talking Head Service (GPU Recommended)
Because the Talking Head Service uses deep learning models (LatentSync/MuseTalk), running it on a CPU is extremely slow. We recommend deploying to a GPU-enabled instance (e.g., AWS g4dn/g5 instances or equivalent cloud GPUs).

Ensure the NVIDIA runtime is configured on your Docker daemon:
```json
{
  "default-runtime": "nvidia",
  "runtimes": {
    "nvidia": {
      "path": "nvidia-container-runtime",
      "runtimeArgs": []
    }
  }
}
```

### Animation Service (Headless Chrome)
The Animation Service relies on Revideo and Chromium to render canvas animations. Ensure your container has sufficient memory allocations (at least 2GB RAM per concurrent render worker).
