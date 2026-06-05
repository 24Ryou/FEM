const fileUrl = "./project-template.html";
const projectsDOM = document.querySelector("main");

// Optional helpers (you may not even need these)
Handlebars.registerHelper("evaluateLink", function (folder, link, options) {
  if (!link) options.data.root.project.projectLink = folder;
});

Handlebars.registerHelper("githubLink", function (folder, options) {
  options.data.root.project.codeLink = folder;
});

// Fetch both template + JSON
Promise.all([
  fetch(fileUrl).then(r => r.text()),
  fetch("./projects.json").then(r => r.json())
])
.then(([templateHTML, projects]) => {

  const template = Handlebars.compile(templateHTML);

  let html = "";

  projects.forEach(project => {
    html += template({ project });
  });

  projectsDOM.innerHTML = html;

})
.catch(err => console.error("Error loading projects:", err));

