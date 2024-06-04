import fs from "fs";
import path from "path";

// Lista de directorios y archivos a ignorar
const ignoredItems = [
  "node_modules",
  ".git",
  ".github",
  ".vscode",
  "dist",
  "build",
  "coverage",
  ".next",
  "out",
  "yarn.lock",
  "package-lock.json",
  "firebase-debug.log",
  "firestore-debug.log",
  "ui-debug.log",
];

function generateTree(dir, depth = 0) {
  const indent = " ".repeat(depth * 2);
  let items;

  try {
    items = fs.readdirSync(dir);
  } catch (error) {
    console.error(`Error reading directory ${dir}: ${error.message}`);
    return;
  }

  for (const item of items) {
    const fullPath = path.join(dir, item);

    // Ignorar directorios y archivos especificados
    if (ignoredItems.includes(item)) {
      continue;
    }

    // Imprimir el nombre del archivo o directorio
    console.log(`${indent}${item}`);

    let stats;
    try {
      stats = fs.statSync(fullPath);
    } catch (error) {
      console.error(`Error stating file ${fullPath}: ${error.message}`);
      continue;
    }

    if (stats.isDirectory()) {
      generateTree(fullPath, depth + 1);
    }
  }
}

generateTree("./");
