const treeRoot = document.getElementById("notes-tree");
const readerContent = document.getElementById("reader-content");

let entries = [];

function groupEntries(items) {
  return items.reduce((acc, item) => {
    if (!acc[item.group]) {
      acc[item.group] = [];
    }
    acc[item.group].push(item);
    return acc;
  }, {});
}

function renderTree(items) {
  const groups = groupEntries(items);

  treeRoot.innerHTML = Object.entries(groups)
    .map(
      ([groupName, groupItems]) => `
    <div class="tree-group">
      <p class="tree-group-title">${groupName}</p>
      ${groupItems
        .map(
          (item) => `
        <button class="note-link" data-path="${item.path}" type="button">
          ${item.label}
        </button>
      `,
        )
        .join("")}
    </div>
  `,
    )
    .join("");

  const buttons = treeRoot.querySelectorAll(".note-link");
  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      buttons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");
      loadMarkdown(button.dataset.path);
    });
  });
}

async function loadMarkdown(path) {
  try {
    readerContent.innerHTML = '<p class="loading">Loading notes…</p>';
    const response = await fetch(path, { cache: "no-store" });

    if (!response.ok) {
      throw new Error(`Could not fetch ${path}`);
    }

    const markdown = await response.text();
    const html = marked.parse(markdown);
    readerContent.innerHTML = DOMPurify.sanitize(html);
  } catch (error) {
    console.error(error);
    readerContent.innerHTML = `
      <p><strong>Unable to load this note.</strong></p>
      <p>Please try another item in the sidebar.</p>
    `;
  }
}

async function initializeNotes() {
  try {
    const response = await fetch("./manifest.json", { cache: "no-store" });
    if (!response.ok) {
      throw new Error("Manifest could not be loaded.");
    }

    const data = await response.json();
    entries = data.entries || [];

    renderTree(entries);

    if (entries.length > 0) {
      const first = entries[0];
      const firstButton = treeRoot.querySelector(`[data-path="${first.path}"]`);
      if (firstButton) {
        firstButton.classList.add("active");
      }
      loadMarkdown(first.path);
    }
  } catch (error) {
    console.error(error);
    readerContent.innerHTML = `
      <p><strong>Unable to load the notes index.</strong></p>
      <p>Please check the site structure and try again.</p>
    `;
  }
}

initializeNotes();
