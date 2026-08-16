# Hybrid Video LMS

Hybrid Video LMS is a platform designed to create automated educational video modules. It integrates a web-based **Animation Service** (running Node.js/Revideo/Motion Canvas) with a deep-learning-based **AI Talking Head Service** (running Python/FastAPI/PyTorch) to synthesize rich instructional videos complete with code animations, dynamic flowcharts, transitions, and realistic AI human avatars.

---

## 📖 Key Documentation

Before contributing, please review the following reference guides:
* 🛠️ **[Contribution Workflow](CONTRIBUTING.md)** – Critical: Git workflow, branch naming conventions, commit conventions, and review rules.
* 📐 **[System Architecture](docs/architecture.md)** – System flowcharts, service boundaries, and design.
* 🔌 **[API Contracts](docs/api-contracts.md)** – Service endpoints, input schemas, and expected responses.
* 🚀 **[Deployment Guide](docs/deployment.md)** – Setup instructions using Docker Compose and production notes.
* 📜 **[Code of Conduct](CODE_OF_CONDUCT.md)** – Community standards of collaboration.

---

## 📂 Repository Structure

```text
hybrid-video-lms/
│
├── README.md
├── CONTRIBUTING.md
├── CODE_OF_CONDUCT.md
├── LICENSE
├── .gitignore
├── docker-compose.yml
├── .github/
│   ├── ISSUE_TEMPLATE/
│   │   ├── feature_request.md
│   │   ├── bug_report.md
│   │   └── task.md
│   ├── PULL_REQUEST_TEMPLATE.md
│   └── workflows/
│       ├── lint.yml
│       └── tests.yml
│
├── docs/
│   ├── architecture.md
│   ├── api-contracts.md
│   ├── workflow.md
│   ├── deployment.md
│   └── meeting-notes/
│
├── services/
│   │
│   ├── talking-head-service/
│   │   ├── src/
│   │   ├── Dockerfile
│   │   ├── requirements.txt
│   │   ├── tests/
│   │   └── README.md
│   │
│   └── animation-service/
│       ├── src/
│       ├── templates/
│       ├── assets/
│       ├── renderer/
│       ├── tests/
│       ├── Dockerfile
│       └── README.md
│
├── shared/
│   ├── schemas/
│   ├── utils/
│   ├── constants/
│   └── config/
│
├── scripts/
│
└── examples/
    ├── sample-json/
    └── sample-output/
```

---

## ⚡ Quickstart

### Prerequisites
- [Docker & Docker Compose](https://docs.docker.com/get-docker/)

### Run the Entire Platform Locally
Start both the Animation Service and Talking Head Service with one command:
```bash
docker-compose up -d --build
```

Access the service health checks:
* **Talking Head Service:** `http://localhost:8000/` (Swagger docs at `/docs`)
* **Animation Service:** `http://localhost:3000/`

---

## 🗺️ Project Milestones

* **Milestone 1:** Research & Architecture (Completed / Groundwork Set)
* **Milestone 2:** Talking Head Service Implementation
* **Milestone 3:** Animation Framework Integration
* **Milestone 4:** Template Development (Flowcharts, Code, Transitions)
* **Milestone 5:** Testing & Optimization
* **Milestone 6:** Final Integration

---

## 📝 Planned Issues & Assignments

These issues will be raised on GitHub for tracking:

### AI Talking Head Service
1. **Issue #1:** Research LatentSync vs SadTalker vs LivePortrait vs MuseTalk *(Assigned: Pranav, Sushmitha)*
2. **Issue #2:** Implement LatentSync inference pipeline *(Assigned: Pranav)*
3. **Issue #3:** Create Avatar Generation REST API *(Assigned: Sushmitha)*
4. **Issue #4:** Dockerize Talking Head Service *(Assigned: Pranav)*
5. **Issue #5:** Performance Benchmarking *(Assigned: Sushmitha)*

### Animation Service
6. **Issue #6:** Design Template Architecture *(Assigned: Yashwanth, Joel)*
7. **Issue #7:** Create JSON Rendering Pipeline *(Assigned: Yashwanth)*
8. **Issue #8:** Flowchart & Diagram Templates *(Assigned: Madhavi, Vivek)*
9. **Issue #9:** Code Animation Templates *(Assigned: Shankar, Subrat)*
10. **Issue #10:** UI Components & Transition Library *(Assigned: Subhash, Sumit)*
11. **Issue #11:** Asset Management System *(Assigned: Joel)*
12. **Issue #12:** Headless Revideo Renderer *(Assigned: Yashwanth)*
13. **Issue #13:** Performance Optimization *(Assigned: All)*
14. **Issue #14:** Documentation *(Assigned: All)*
15. **Issue #15:** Testing *(Assigned: All)*
16. CI verification test.
