// ------------------------------
// Required Modules
// ------------------------------
const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");
const path = require("path");

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
const getData = async (url) => {
  try {
    const response = await axios.get(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:123.0) Gecko/20100101 Firefox/123.0",
        Accept: "text/html,application/xhtml+xml",
        "Accept-Language": "en-US,en;q=0.9",
      },
    });

    return response.data;
  } catch (error) {
    console.log("Fetch failed:", url, "|", error.message);
    return null;
  }
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
    if (!html) continue;

    const $ = cheerio.load(html);

    let tags = [];
    $(tagSelector).each((_, el) => tags.push($(el).text()));

    const title = $(headlineSelector).first().text().trim();
    const description = $(textSelector).first().text().trim();
    const levelNum = $(spanSelector).first().text().trim();
    const level = $(spanSelector).last().text().trim();

    const number = folder.split("_")[0];

    results.push({
      folder: `challenges/${folder}/`,
      title,
      orginalLink: url,
      description,
      tags,
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
build();
