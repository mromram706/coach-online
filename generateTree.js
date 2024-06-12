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

function generateTree(dir, prefix = "") {
  let items;

  try {
    items = fs.readdirSync(dir);
  } catch (error) {
    console.error(`Error reading directory ${dir}: ${error.message}`);
    return;
  }

  const filteredItems = items.filter((item) => !ignoredItems.includes(item));

  filteredItems.forEach((item, index) => {
    const fullPath = path.join(dir, item);
    const isLast = index === filteredItems.length - 1;
    const connector = isLast ? "\\-- " : "|-- ";
    const newPrefix = prefix + (isLast ? "    " : "|   ");

    let stats;
    try {
      stats = fs.statSync(fullPath);
    } catch (error) {
      console.error(`Error stating file ${fullPath}: ${error.message}`);
      return;
    }

    console.log(prefix + connector + item);

    if (stats.isDirectory()) {
      generateTree(fullPath, newPrefix);
    }
  });
}

generateTree("./");
