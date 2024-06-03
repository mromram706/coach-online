const fs = require("fs");
const path = require("path");

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
];

function generateTree(dir, depth = 0) {
  const indent = " ".repeat(depth * 2);
  const items = fs.readdirSync(dir);

  for (const item of items) {
    const fullPath = path.join(dir, item);

    // Ignorar directorios y archivos especificados
    if (ignoredItems.includes(item)) {
      continue;
    }

    // Imprimir el nombre del archivo o directorio
    console.log(`${indent}${item}`);

    if (fs.statSync(fullPath).isDirectory()) {
      generateTree(fullPath, depth + 1);
    }
  }
}

generateTree("./");
