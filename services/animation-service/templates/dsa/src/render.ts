import { renderVideo } from "@revideo/renderer";

async function render() {
  try {
    console.log("Rendering DSA video...");

    const file = await renderVideo({
      projectFile: "./src/project.tsx",
      settings: {
        logProgress: true,
        puppeteer: {
          args: ["--no-sandbox", "--disable-setuid-sandbox"],
        },
      },
    });

    console.log("Finished rendering DSA video!");
    console.log(file);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

render();
