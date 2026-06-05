# Frontend Mentor Portfolio

A personal portfolio that automatically generates a list of completed Frontend Mentor challenges.

Each completed challenge is placed inside the `challenges/` directory. A build script then generates a `projects.json` file that the website uses to render the projects dynamically.

---

## 🚀 How It Works

1. Complete a Frontend Mentor challenge.
2. Place the challenge folder inside the `challenges/` directory.
3. Run:

```
npm run build
```

4. The build script will:
   - Read challenge folders
   - Extract metadata from the challenge README
   - Generate or update `projects.json`

The portfolio site then loads `projects.json` and renders the projects using a Handlebars template.

---

## 🛠 Tech Stack

- HTML
- CSS
- JavaScript
- Node.js
- Handlebars.js
- Axios
- Custom build script

---

## 📁 Project Structure

```
.
├── challenges/            # Completed Frontend Mentor challenges
├── projects.json          # Generated project metadata
├── build.js               # Script that generates projects.json
├── index.html             # Portfolio page
├── main.js                # Loads and renders projects
└── project-template.html  # Handlebars template for project cards
```

---

## 🎯 Purpose

This project was created to:

- Practice Frontend Mentor challenges
- Maintain a structured portfolio
- Automate project listing
- Experiment with templating and build scripts

---

## 📌 Usage

After finishing a new challenge:

1. Move the project folder into `challenges/`
2. Run the build script:

```
npm run build
```

3. The portfolio will automatically include the new project.

---

## 🔧 Possible Improvements

- Filter projects by difficulty
- Add project search
- Improve UI/animations
- Convert the build process into a static site generator
- Add deployment automation