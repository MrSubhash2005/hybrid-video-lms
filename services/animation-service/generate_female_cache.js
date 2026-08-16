import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function runJob(course) {
  console.log(`\n==================================================`);
  console.log(`Starting generation for Course: ${course.toUpperCase()}`);
  console.log(`==================================================`);

  const res = await fetch("http://localhost:3000/api/v1/course/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ celebrity: "alia", course: course, gender: "female" })
  });

  if (!res.ok) {
    throw new Error(`Failed to submit job for ${course}: ${res.status} ${res.statusText}`);
  }

  const { job_id, check_status_url } = await res.json();
  console.log(`Job queued successfully. Job ID: ${job_id}`);

  // Poll status
  const maxPolls = 300;
  for (let i = 0; i < maxPolls; i++) {
    await new Promise(resolve => setTimeout(resolve, 5000));
    
    const statusRes = await fetch(`http://localhost:3000${check_status_url}`);
    if (!statusRes.ok) {
      console.error(`[Poll ${i+1}] Status check failed: ${statusRes.status}`);
      continue;
    }

    const job = await statusRes.json();
    console.log(`[Poll ${i+1}] Status: ${job.status} | Progress: ${job.progress}%`);

    if (job.status === 'completed') {
      console.log(`SUCCESS! Video generation completed for ${course}.`);
      console.log(`Output: http://localhost:3000${job.output_url}`);
      break;
    }

    if (job.status === 'failed') {
      throw new Error(`Job ${job_id} failed: ${job.error}`);
    }
  }
}

async function startPipeline() {
  console.log("Starting animation service server...");
  const server = spawn('node', ['src/index.js'], { cwd: __dirname, stdio: 'inherit' });

  // Wait 3 seconds for server to start
  await new Promise(resolve => setTimeout(resolve, 3000));

  try {
    // Generate RAG first (quickest, native revideo compiler)
    await runJob("rag");
    
    // Generate Explainer (Playwright, moderate size)
    await runJob("explainer");

    // Generate Git (Playwright, largest size)
    await runJob("git");

    console.log("\nAll female cache videos successfully generated and cached!");
  } catch (error) {
    console.error("\nCache generation process failed:", error.message);
  } finally {
    console.log("Stopping server...");
    server.kill();
  }
}

startPipeline();
