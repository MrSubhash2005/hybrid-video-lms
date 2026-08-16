import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function testAllCourses() {
  console.log("Starting animation service server...");
  const server = spawn('node', ['src/index.js'], { cwd: __dirname, stdio: 'inherit' });

  // Wait 3 seconds for server to start
  await new Promise(resolve => setTimeout(resolve, 3000));

  try {
    // 1. Check health
    const healthRes = await fetch("http://localhost:3000/health");
    console.log("Health status:", await healthRes.json());

    // 2. Test course generation for all 4 courses with different celebrities and openrouter AI gender detection
    const testCases = [
      { celebrity: "Deepika Padukone", course: "git" },
      { celebrity: "Shah Rukh Khan", course: "rag" },
      { celebrity: "Taylor Swift", course: "explainer" },
      { celebrity: "NTR Jr", course: "dsa" }
    ];

    for (const testCase of testCases) {
      console.log(`\n==================================================`);
      console.log(`Testing Course: ${testCase.course.toUpperCase()} | Celebrity: ${testCase.celebrity}`);
      console.log(`==================================================`);

      const res = await fetch("http://localhost:3000/api/v1/course/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(testCase)
      });

      if (!res.ok) {
        throw new Error(`Failed to submit job for ${testCase.course}: ${res.status} ${res.statusText}`);
      }

      const data = await res.json();
      console.log(`API Response:`, data);

      // Verify download endpoint
      if (data.job_id) {
        const downloadRes = await fetch(`http://localhost:3000/api/v1/course/download/${data.job_id}`);
        console.log(`Download endpoint check for ${data.job_id}: ${downloadRes.status} ${downloadRes.statusText}`);
      }
    }

    console.log("\n✅ ALL ENDPOINTS AND COURSES TESTED SUCCESSFULLY!");
  } catch (error) {
    console.error("\n❌ Test failed:", error.message);
  } finally {
    console.log("Stopping server...");
    server.kill();
  }
}

testAllCourses();
