import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PROJECT_PATH = path.join(
  __dirname,
  "templates/rag/src/project.tsx"
);

const SCENES_DIR = path.join(
  __dirname,
  "templates/rag/src/scenes"
);

const OUTPUT_FILE = path.join(
  __dirname,
  "src/rag_subtitles.js"
);

function extract() {
  console.log("Reading RAG project file...");

  const projectContent = fs.readFileSync(PROJECT_PATH, "utf-8");

  // Match scene imports
  const importRegex =
    /import\s+(\w+)\s+from\s+['"]\.\/scenes\/(\w+)['"]/g;

  const importsMap = {};

  let match;

  while ((match = importRegex.exec(projectContent)) !== null) {
    importsMap[match[1]] = match[2];
  }

  // Find scenes array
  const scenesArrayRegex =
    /scenes:\s*\[([\s\S]*?)\]/;

  const scenesArrayMatch =
    scenesArrayRegex.exec(projectContent);

  if (!scenesArrayMatch) {
    throw new Error("Could not find scenes array in project.tsx");
  }

  const scenesListRaw = scenesArrayMatch[1];

  const sceneVariableRegex = /(\w+)\s*,/g;

  const orderedScenes = [];

  while (
    (match = sceneVariableRegex.exec(scenesListRaw)) !== null
  ) {
    const variableName = match[1];

    if (importsMap[variableName]) {
      orderedScenes.push(importsMap[variableName]);
    }
  }

  console.log("Ordered RAG scenes:");
  console.log(orderedScenes);

  const subtitlesList = [];

  for (const sceneFileName of orderedScenes) {
    const filePath = path.join(
      SCENES_DIR,
      `${sceneFileName}.tsx`
    );

    if (!fs.existsSync(filePath)) {
      console.warn(
        `Scene file ${sceneFileName}.tsx not found`
      );

      subtitlesList.push(
        "Retrieval-Augmented Generation processes and enhances language model accuracy."
      );

      continue;
    }

    const sceneContent =
      fs.readFileSync(filePath, "utf-8");

    /*
      Supports:

      typeText(
        captionTxt,
        "text here",
        2.5
      )

      Also supports multiline text.
    */

    const typeTextRegex =
      /typeText\(\s*captionTxt\s*,\s*(['"`])([\s\S]*?)\1/;

    const typeMatch =
      typeTextRegex.exec(sceneContent);

    if (typeMatch) {
      const extractedText = typeMatch[2]
        .replace(/\s+/g, " ")
        .trim();

      subtitlesList.push(extractedText);

      console.log(
        `${sceneFileName}: ${extractedText}`
      );
    } else {
      console.warn(
        `No typeText found in ${sceneFileName}.tsx`
      );

      subtitlesList.push(
        "Retrieval-Augmented Generation processes and enhances language model accuracy."
      );
    }
  }

  const outputContent =
    `export const ragSubtitlesList = ${JSON.stringify(
      subtitlesList,
      null,
      2
    )};\n`;

  fs.writeFileSync(
    OUTPUT_FILE,
    outputContent
  );

  console.log(
    `\nSuccessfully extracted ${subtitlesList.length} RAG subtitles.`
  );

  console.log(
    `Saved to: ${OUTPUT_FILE}`
  );
}

extract();