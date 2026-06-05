const projectsDOM = document.querySelector("main");

const renderTags = (tags = []) => {
  return tags.map((tag) => `<span class="tag ${tag}">${tag}</span>`).join("");
};

const renderProject = (project) => {
  const previewImage = `${project.folder}design/desktop-preview.jpg`;
  const fallbackImage = `${project.folder}preview.jpg`;

  return `
    <article class="card">
      <a href="${project.folder}">
        <img src="${previewImage}" alt="${project.title} preview" onerror="this.onerror=null; this.src='${fallbackImage}'">
      </a>

      <h2>${project.title}</h2>

      <p>${project.description}</p>

      <div class="tags">
        ${renderTags(project.tags)}
      </div>

      <div class="links">
        <a href="${project.folder}">Live</a>
        <a href="${project.orginalLink}" target="_blank" rel="noreferrer">Challenge</a>
      </div>

      <span class="level level-${project.level}">
        ${project.level}
      </span>
    </article>
  `;
};

fetch("./projects.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error(`Could not load projects.json: ${response.status}`);
    }
    return response.json();
  })
  .then((projects) => {
    projectsDOM.innerHTML = projects.map(renderProject).join("");
  })
  .catch((error) => {
    console.error("Error loading projects:", error);
    projectsDOM.innerHTML = `<p class="error">Could not load projects. Make sure you are running a local server from the project root.</p>`;
  });
