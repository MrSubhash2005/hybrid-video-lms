import { renderVideo } from "@revideo/renderer";
import fs from "fs";
import path from "path";

async function render() {
  try {
    console.log("Rendering synchronized RAG video...");

    const file = await renderVideo({
      projectFile: "./src/project.tsx",
      settings: {
        logProgress: true,
        puppeteer: {
          args: ["--no-sandbox", "--disable-setuid-sandbox"],
        },
      },
    });

    console.log("Finished!");
    console.log(file);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

render();