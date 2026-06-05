// ------------------------------
// Required Modules
// ------------------------------
const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");
const path = require("path");
const readline = require("readline/promises");

// ------------------------------
// Selectors for Scraping
// ------------------------------
const tagSelector = "#content ul:first li";
const headlineSelector = "#content h1";
const textSelector = "#content p";
const spanSelector = "#content section span span";

const regex = /\(https:\/\/www.frontendmentor.io\/challenges.*\)/gm;

// ------------------------------
// Utility Helpers
// ------------------------------
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const levels = ["newbie", "junior", "intermediate", "advanced", "guru"];

const titleFromFolder = (folder) => {
  return folder
    .replace(/^\d+_/, "")
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

const readLocalFile = (folder, fileName) => {
  const file = path.join("challenges", folder, fileName);
  return fs.existsSync(file) ? fs.readFileSync(file, "utf8") : "";
};

const getLocalLevel = (folder) => {
  const content = `${readLocalFile(folder, "AGENTS.md")}\n${readLocalFile(folder, "README.md")}`;
  const match = content.match(/\b(newbie|junior|intermediate|advanced|guru)\b/i);
  return match ? match[1].toLowerCase() : "";
};

const getLocalTags = (folder) => {
  const content = readLocalFile(folder, "README-template.md");
  const tags = [];

  if (/html/i.test(content)) tags.push("HTML");
  if (/css|scss|sass/i.test(content)) tags.push("CSS");
  if (/javascript|\bjs\b/i.test(content)) tags.push("JS");
  if (/api/i.test(content)) tags.push("API");

  return tags;
};

const askForLevel = async (folder) => {
  if (!process.stdin.isTTY) {
    console.warn(`Level missing for ${folder}. Defaulting to newbie because the terminal is not interactive.`);
    return "newbie";
  }

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  try {
    const answer = await rl.question(
      `Level for ${folder}? (${levels.join("/")}) [newbie]: `
    );
    const level = answer.trim().toLowerCase();

    if (!level) return "newbie";
    if (levels.includes(level)) return level;

    console.warn(`Invalid level "${answer}". Defaulting to newbie.`);
    return "newbie";
  } finally {
    rl.close();
  }
};

const getLevel = async (folder, scrapedLevel) => {
  return scrapedLevel || getLocalLevel(folder) || await askForLevel(folder);
};

// Load existing JSON (cache)
let existingProjects = [];
if (fs.existsSync("projects.json")) {
  existingProjects = JSON.parse(fs.readFileSync("projects.json"));
}

const existingFolders = existingProjects.map((p) =>
  p.folder.replace("challenges/", "").replace("/", "")
);

// ------------------------------
// Step 1 — Directory Handling
// ------------------------------
const pathDir = "challenges";
const dirs = fs.readdirSync(pathDir);

// Check if directory name is missing number prefix
const invalidDir = (folderName) => {
  return !/\d/.test(folderName.split("_")[0]);
};

// Auto-rename directories if missing numeric prefix
const renameDirs = () => {
  dirs.forEach((folder, index) => {
    const oldPath = path.join("challenges", folder);
    const newName = `${(index + 1)
      .toLocaleString("en-US", {
        minimumIntegerDigits: 3,
        useGrouping: false,
      })}_${folder}`;
    const newPath = path.join("challenges", newName);

    if (invalidDir(folder)) {
      fs.renameSync(oldPath, newPath);
      console.log(`Renamed: ${folder} → ${newName}`);
    }
  });
};

// ------------------------------
// Step 2 — Extract FEM challenge link from README
// ------------------------------
const getLink = (folder) => {
  const file = path.join("challenges", folder, "README-template.md");

  if (!fs.existsSync(file)) {
    console.warn("README-template.md missing in:", folder);
    return null;
  }

  const content = fs.readFileSync(file).toString();
  const match = content.match(regex);

  return match ? match[0].replace(/[()]/g, "") : null;
};

// ------------------------------
// Step 3 — Safe Request With Headers
// ------------------------------
const getData = async (url, retries = 3) => {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const response = await axios.get(url, {
        timeout: 15000,
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:123.0) Gecko/20100101 Firefox/123.0",
          Accept: "text/html,application/xhtml+xml",
          "Accept-Language": "en-US,en;q=0.9",
        },
      });

      return response.data;
    } catch (error) {
      console.log(`Fetch failed (${attempt}/${retries}):`, url, "|", error.message);

      if (attempt < retries) {
        await sleep(1500 * attempt);
      }
    }
  }

  return null;
};

// ------------------------------
// Step 4 — Main Data Builder
// ------------------------------
const prepare = async () => {
  let results = [];

  await renameDirs();

  const allFolders = fs.readdirSync(pathDir);
  const newFolders = allFolders.filter((f) => !existingFolders.includes(f));

  if (newFolders.length === 0) {
    console.log("No new projects found.");
    return [];
  }

  console.log("New projects:", newFolders);

  for (let folder of newFolders) {
    const url = getLink(folder);
    if (!url) continue;

    console.log("Fetching:", url);

    const html = await getData(url);
    const number = folder.split("_")[0];
    let title = "";
    let description = "";
    let tags = [];
    let level = "";

    if (html) {
      const $ = cheerio.load(html);

      $(tagSelector).each((_, el) => tags.push($(el).text()));

      title = $(headlineSelector).first().text().trim();
      description = $(textSelector).first().text().trim();
      const levelNum = $(spanSelector).first().text().trim();
      level = $(spanSelector).last().text().trim();
    } else {
      console.warn(`Scrape failed. Using local fallback data for ${folder}.`);
    }

    title = title || titleFromFolder(folder);
    description = description || "Frontend Mentor challenge project.";
    tags = tags.length ? tags : getLocalTags(folder);
    level = await getLevel(folder, level);

    results.push({
      folder: `challenges/${folder}/`,
      title,
      orginalLink: url,
      description,
      tags: tags.length ? tags : ["HTML", "CSS"],
      number,
      level,
    });


    console.log(`✔ Saved: ${title}`);

    await sleep(1200); // avoid Cloudflare blocks
  }

  return results;
};

// ------------------------------
// Step 5 — Write JSON
// ------------------------------
const build = async () => {
  const newData = await prepare();

  const finalData = [...existingProjects, ...newData];

  finalData.sort((a, b) => Number(a.number) - Number(b.number));


  fs.writeFileSync("projects.json", JSON.stringify(finalData, null, 2));

  console.log("✨ Build complete! Updated projects.json");
};

// ------------------------------
build().catch((error) => {
  console.error("Build failed:", error.message);
  process.exit(1);
});
