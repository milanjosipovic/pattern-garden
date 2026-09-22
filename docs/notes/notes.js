const treeRoot = document.getElementById("notes-tree");
const readerContent = document.getElementById("reader-content");

let entries = [];
let currentSourcePath = "";

function groupEntries(items) {
  return items.reduce((acc, item) => {
    if (!acc[item.group]) {
      acc[item.group] = [];
    }
    acc[item.group].push(item);
    return acc;
  }, {});
}

function updateSelectedPath(path) {
  const url = new URL(window.location.href);
  if (path) {
    url.searchParams.set("path", path);
  } else {
    url.searchParams.delete("path");
  }
  window.history.replaceState({}, "", url);
}

function selectTreeButton(path) {
  const buttons = treeRoot.querySelectorAll(".note-link");
  buttons.forEach((button) => {
    const active = button.dataset.path === path;
    button.classList.toggle("active", active);
  });
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
    button.onclick = (event) => {
      event.preventDefault();
      event.stopPropagation();

      const path = button.dataset.path;
      selectTreeButton(path);
      updateSelectedPath(path);

      closeMobileNav();

      loadMarkdown(path);
    };
  });
}

function closeMobileNav() {
  const nav = document.getElementById("site-nav");
  const sidebar = document.querySelector(".sidebar");
  const toggle = document.querySelector(".nav-toggle");
  const main = document.querySelector("main");

  if (nav) nav.classList.remove("open");
  if (sidebar) sidebar.classList.remove("open");
  if (toggle) toggle.setAttribute("aria-expanded", "false");
  document.body.classList.remove("menu-open");

  if (main) {
    main.style.opacity = "";
    main.style.filter = "";
    main.style.pointerEvents = "";
  }
}

function resolveNotePath(href) {
  const sourceBase = currentSourcePath || window.location.href;
  const targetUrl = new URL(href, sourceBase);
  const matchingEntry = entries.find(
    (entry) =>
      entry.path === targetUrl.href ||
      entry.path.endsWith("/" + targetUrl.pathname.split("/").pop()),
  );

  return matchingEntry ? matchingEntry.path : targetUrl.href;
}

function handleReaderLinkClick(event) {
  const link = event.target.closest("a[href]");
  if (!link) return;

  const href = link.getAttribute("href");
  if (!href || /^https?:\/\//i.test(href) || href.startsWith("#")) {
    return;
  }

  const targetUrl = new URL(href, currentSourcePath || window.location.href);
  if (!targetUrl.pathname.endsWith(".md")) {
    return;
  }

  event.preventDefault();
  event.stopPropagation();

  closeMobileNav();

  const resolvedPath = resolveNotePath(href);
  selectTreeButton(resolvedPath);
  updateSelectedPath(resolvedPath);
  loadMarkdown(resolvedPath);
}

function rewriteRelativeLinks(html) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(DOMPurify.sanitize(html), "text/html");

  doc.querySelectorAll("a[href]").forEach((link) => {
    const href = link.getAttribute("href");
    if (!href || /^https?:\/\//i.test(href) || href.startsWith("#")) {
      return;
    }

    const resolvedPath = resolveNotePath(href);
    const archiveUrl = "./index.html?path=" + encodeURIComponent(resolvedPath);
    link.setAttribute("href", archiveUrl);
    link.setAttribute("data-note-path", resolvedPath);
  });

  return doc.body.innerHTML;
}

async function loadMarkdown(path) {
  // Resolve path relative to the current location (docs/notes/index.html)
  const absoluteUrl = new URL(path, window.location.href).href;
  currentSourcePath = absoluteUrl;

  try {
    readerContent.innerHTML = '<p class="loading">Loading notes…</p>';
    const response = await fetch(absoluteUrl, { cache: "no-store" });

    if (!response.ok) {
      throw new Error(`Could not fetch ${absoluteUrl}`);
    }

    const markdown = await response.text();
    const html = marked.parse(markdown);
    readerContent.innerHTML = rewriteRelativeLinks(html);
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

    const requestedPath = new URL(window.location.href).searchParams.get(
      "path",
    );
    const selectedPath = requestedPath || entries[0]?.path;

    if (selectedPath) {
      selectTreeButton(selectedPath);
      loadMarkdown(selectedPath);
      if (requestedPath) {
        updateSelectedPath(selectedPath);
      }
    }
  } catch (error) {
    console.error(error);
    readerContent.innerHTML = `
      <p><strong>Unable to load the notes index.</strong></p>
      <p>Please check the site structure and try again.</p>
    `;
  }
}

readerContent.addEventListener("click", (event) => {
  const link = event.target.closest("a[data-note-path]");
  if (!link) return;

  const targetPath = link.getAttribute("data-note-path");
  if (!targetPath) return;

  event.preventDefault();
  event.stopPropagation();

  closeMobileNav();
  selectTreeButton(targetPath);
  updateSelectedPath(targetPath);
  loadMarkdown(targetPath);
});

initializeNotes();
