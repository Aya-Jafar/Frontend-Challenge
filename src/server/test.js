// test.js
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Rest of your code using fs and path...
const inputPath = path.join(__dirname, "data.json");
const outputPath = path.join(__dirname, "flattened-products.json");

// Your flattening functions...
function flattenProducts(data) {
  if (!data.content || !Array.isArray(data.content)) {
    throw new Error("Invalid JSON structure: missing content array");
  }

  const flattenedProducts = [];

  data.content.forEach((outerList) => {
    if (!Array.isArray(outerList)) return;

    outerList.forEach((item) => {
      if (item?.type === "products" && Array.isArray(item.content)) {
        flattenedProducts.push(...item.content);
      }
    });
  });

  return flattenedProducts;
}

// Read, process, and write files using fs promises
async function main() {
  try {
    const data = await fs.promises.readFile(inputPath, "utf8");
    const jsonData = JSON.parse(data);
    const flattened = flattenProducts(jsonData);
    await fs.promises.writeFile(outputPath, JSON.stringify(flattened, null, 2));
    console.log("Successfully processed file");
  } catch (error) {
    console.error("Error:", error);
  }
}

main();
