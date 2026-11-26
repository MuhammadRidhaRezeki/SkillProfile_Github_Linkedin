"use strict";

/* README Forge — turns the form into a GitHub profile README.
   Everything runs locally; no data leaves the browser. */

const $ = (id) => document.getElementById(id);

/* Known techs: shields.io badge colour + logo. Unknown techs fall back
   to a neutral dark badge with no logo. Keys are lower-cased. */
const BADGES = {
  "php":        ["777BB4", "php", "white"],
  "laravel":    ["FF2D20", "laravel", "white"],
  "javascript": ["F7DF1E", "javascript", "black"],
  "typescript": ["3178C6", "typescript", "white"],
  "html5":      ["E34F26", "html5", "white"],
  "html":       ["E34F26", "html5", "white"],
  "css3":       ["1572B6", "css3", "white"],
  "css":        ["1572B6", "css3", "white"],
  "python":     ["3776AB", "python", "white"],
  "java":       ["ED8B00", "openjdk", "white"],
  "go":         ["00ADD8", "go", "white"],
  "rust":       ["000000", "rust", "white"],
  "c++":        ["00599C", "cplusplus", "white"],
  "c#":         ["239120", "csharp", "white"],
  "ruby":       ["CC342D", "ruby", "white"],
  "mysql":      ["4479A1", "mysql", "white"],
  "postgresql": ["4169E1", "postgresql", "white"],
  "postgres":   ["4169E1", "postgresql", "white"],
  "sqlite":     ["003B57", "sqlite", "white"],
  "mongodb":    ["47A248", "mongodb", "white"],
  "redis":      ["DC382D", "redis", "white"],
  "bootstrap":  ["7952B3", "bootstrap", "white"],
  "tailwind":   ["06B6D4", "tailwindcss", "white"],
  "tailwindcss":["06B6D4", "tailwindcss", "white"],
  "react":      ["61DAFB", "react", "black"],
  "vue":        ["4FC08D", "vuedotjs", "white"],
  "vue.js":     ["4FC08D", "vuedotjs", "white"],
  "angular":    ["DD0031", "angular", "white"],
  "node.js":    ["339933", "nodedotjs", "white"],
  "nodejs":     ["339933", "nodedotjs", "white"],
  "express":    ["000000", "express", "white"],
  "django":     ["092E20", "django", "white"],
  "flask":      ["000000", "flask", "white"],
  "git":        ["F05032", "git", "white"],
  "github":     ["181717", "github", "white"],
  "docker":     ["2496ED", "docker", "white"],
  "linux":      ["FCC624", "linux", "black"],
  "postman":    ["FF6C37", "postman", "white"],
  "figma":      ["F24E1E", "figma", "white"],
  "vscode":     ["007ACC", "visualstudiocode", "white"],
  "firebase":   ["FFCA28", "firebase", "black"],
  "aws":        ["232F3E", "amazonaws", "white"],
  "wordpress":  ["21759B", "wordpress", "white"],
  "jquery":     ["0769AD", "jquery", "white"]
};

function badgeUrl(tech) {
  const key = tech.trim().toLowerCase();
  const known = BADGES[key];
  const label = encodeURIComponent(tech.trim()).replace(/-/g, "--");
  if (!known) return `https://img.shields.io/badge/${label}-555555?style=flat-square`;
  const [color, logo, logoColor] = known;
  return `https://img.shields.io/badge/${label}-${color}?style=flat-square&logo=${logo}&logoColor=${logoColor}`;
}

function lines(text) {
  return text.split("\n").map((s) => s.trim()).filter(Boolean);
}

/* ---------- form state ---------- */

function collectForm() {
  const exp = document.querySelector(".entry[data-exp]");
  return {
    name: $("f-name").value.trim(),
    headline: $("f-headline").value.trim(),
    location: $("f-location").value.trim(),
    ghuser: $("f-ghuser").value.trim(),
    about: $("f-about").value.trim(),
    linkedin: $("f-linkedin").value.trim(),
    email: $("f-email").value.trim(),
    x: $("f-x").value.trim().replace(/^@/, ""),
    website: $("f-website").value.trim(),
    stack: lines($("f-stack").value.replace(/,/g, "\n")),
    expRole: exp.querySelector(".exp-role").value.trim(),
    expOrg: exp.querySelector(".exp-org").value.trim(),
    expPeriod: exp.querySelector(".exp-period").value.trim(),
    expBullets: lines(exp.querySelector(".exp-bullets").value),
    projects: lines($("f-projects").value).map((p) => {
      const i = p.indexOf(" — ");
      return i === -1 ? { name: p, desc: "" } : { name: p.slice(0, i), desc: p.slice(i + 3) };
    }),
    education: lines($("f-education").value).map((e) => {
      const i = e.indexOf(" — ");
      return i === -1 ? { school: e, detail: "" } : { school: e.slice(0, i), detail: e.slice(i + 3) };
    }),
    certs: lines($("f-certs").value),
    template: $("f-template").value,
    theme: $("f-theme").value,
    stats: $("f-stats").checked,
    closing: $("f-closing").checked
  };
}

/* ---------- markdown generation ---------- */

function contactBadges(d) {
  const out = [];
  if (d.linkedin) out.push(`[![LinkedIn](https://img.shields.io/badge/LinkedIn-%230077B5.svg?style=flat-square&logo=linkedin&logoColor=white)](${d.linkedin})`);
  if (d.email) out.push(`[![Email](https://img.shields.io/badge/Email-D14836?style=flat-square&logo=gmail&logoColor=white)](mailto:${d.email})`);
  if (d.x) out.push(`[![X](https://img.shields.io/badge/X-000000?style=flat-square&logo=x&logoColor=white)](https://x.com/${d.x})`);
  if (d.website) out.push(`[![Website](https://img.shields.io/badge/Website-0969DA?style=flat-square&logo=googlechrome&logoColor=white)](${d.website})`);
  if (d.ghuser) out.push(`[![GitHub](https://img.shields.io/badge/GitHub-181717?style=flat-square&logo=github&logoColor=white)](https://github.com/${d.ghuser})`);
  return out.join("\n");
}

function statsBlock(d) {
  if (!d.stats || !d.ghuser) return "";
  const stats = `https://github-readme-stats.vercel.app/api?username=${d.ghuser}&show_icons=true&theme=${d.theme}`;
  const streak = `https://streak-stats.demolab.com?user=${d.ghuser}&theme=${d.theme}`;
  return [
    "## GitHub stats",
    "",
    `| ![GitHub stats](${stats}) | ![GitHub streak](${streak}) |`,
    "| --- | --- |",
    ""
  ].join("\n");
}

function closingLine(d) {
  if (!d.closing) return "";
  const contact = d.linkedin ? `[LinkedIn](${d.linkedin})` : d.email ? `[email](mailto:${d.email})` : null;
  const tail = contact ? ` — reach me on ${contact}.` : ".";
  return [
    "---",
    "",
    "<div align=\"center\">",
    "",
    `*Open to internships, freelance web projects, and AI training work${tail}*`,
    "",
    "</div>",
    ""
  ].join("\n");
}

function generateClean(d) {
  const parts = [];
  const badges = contactBadges(d);
  parts.push("<div align=\"center\">", "");
  if (badges) parts.push(badges, "");
  parts.push(`# ${d.name || "Your Name"}`, "");
  if (d.headline) parts.push(`**${d.headline}**`, "");
  if (d.location) parts.push(`📍 ${d.location}`, "");
  parts.push("</div>", "");

  if (d.about) parts.push("## About me", "", d.about, "");
  if (d.stack.length) {
    parts.push("## Tech stack", "");
    parts.push(d.stack.map((t) => `![${t}](${badgeUrl(t)})`).join("\n"));
    parts.push("");
  }
  if (d.expRole || d.expOrg) {
    parts.push("## Experience", "");
    parts.push(`**${d.expRole}${d.expOrg ? " — " + d.expOrg : ""}**${d.expPeriod ? ` *(${d.expPeriod})*` : ""}`, "");
    d.expBullets.forEach((b) => parts.push(`- ${b}`));
    parts.push("");
  }
  if (d.projects.length) {
    parts.push("## Featured projects", "");
    d.projects.forEach((p) => parts.push(`- **${p.name}**${p.desc ? " — " + p.desc : ""}`));
    parts.push("");
  }
  if (d.education.length) {
    parts.push("## Education", "");
    d.education.forEach((e) => parts.push(`- **${e.school}**${e.detail ? " — " + e.detail : ""}`));
    parts.push("");
  }
  if (d.certs.length) {
    parts.push("## Certification", "");
    d.certs.forEach((c) => parts.push(`- ${c}`));
    parts.push("");
  }
  const stats = statsBlock(d);
  if (stats) parts.push(stats);
  const close = closingLine(d);
  if (close) parts.push(close);
  return parts.join("\n").replace(/\n{3,}/g, "\n\n").trim() + "\n";
}

function generateMinimal(d) {
  const parts = [];
  parts.push(`# ${d.name || "Your Name"}`, "");
  if (d.headline) parts.push(d.headline, "");
  if (d.location) parts.push(`📍 ${d.location}`, "");
  if (d.about) parts.push(d.about, "");
  if (d.stack.length) parts.push("## Skills", "", d.stack.join(" · "), "");
  if (d.expRole || d.expOrg) {
    parts.push("## Experience", "");
    parts.push(`**${d.expRole}${d.expOrg ? " — " + d.expOrg : ""}**${d.expPeriod ? ` (${d.expPeriod})` : ""}`, "");
    d.expBullets.forEach((b) => parts.push(`- ${b}`));
    parts.push("");
  }
  if (d.projects.length) {
    parts.push("## Projects", "");
    d.projects.forEach((p) => parts.push(`- **${p.name}**${p.desc ? " — " + p.desc : ""}`));
    parts.push("");
  }
  if (d.education.length) {
    parts.push("## Education", "");
    d.education.forEach((e) => parts.push(`- **${e.school}**${e.detail ? " — " + e.detail : ""}`));
    parts.push("");
  }
  if (d.certs.length) {
    parts.push("## Certifications", "");
    d.certs.forEach((c) => parts.push(`- ${c}`));
    parts.push("");
  }
  if (d.stats && d.ghuser) {
    parts.push("## GitHub stats", "");
    parts.push(`![GitHub stats](https://github-readme-stats.vercel.app/api?username=${d.ghuser}&show_icons=true&theme=${d.theme})`, "");
  }
  const contact = [];
  if (d.email) contact.push(`[Email](mailto:${d.email})`);
  if (d.linkedin) contact.push(`[LinkedIn](${d.linkedin})`);
  if (d.x) contact.push(`[X](https://x.com/${d.x})`);
  if (d.website) contact.push(`[Website](${d.website})`);
  if (contact.length) parts.push("---", "", contact.join(" · "), "");
  return parts.join("\n").replace(/\n{3,}/g, "\n\n").trim() + "\n";
}

function generateMarkdown(d) {
  return d.template === "minimal" ? generateMinimal(d) : generateClean(d);
}

/* ---------- tiny markdown renderer (preview only) ---------- */

function escapeHtml(s) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function inline(s) {
  let out = escapeHtml(s);
  out = out.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img alt="$1" src="$2">');
  out = out.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>');
  out = out.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  out = out.replace(/\*([^*]+)\*/g, "<em>$1</em>");
  return out;
}

function renderPreview(md) {
  const rawLines = md.split("\n");
  let html = "";
  let inList = false;
  let inCenter = false;
  let inTable = false;

  const closeList = () => { if (inList) { html += "</ul>\n"; inList = false; } };
  const closeTable = () => { if (inTable) { html += "</table>\n"; inTable = false; } };

  for (const raw of rawLines) {
    const line = raw.trim();
    if (line === '<div align="center">') { closeList(); closeTable(); html += '<div style="text-align:center">\n'; inCenter = true; continue; }
    if (line === "</div>") { closeList(); closeTable(); html += "</div>\n"; inCenter = false; continue; }
    if (line === "") { closeList(); continue; }
    if (line === "---") { closeList(); closeTable(); html += "<hr>\n"; continue; }

    if (line.startsWith("|")) {
      const cells = line.split("|").slice(1, -1).map((c) => c.trim());
      if (cells.every((c) => /^:?-+:?$/.test(c))) continue; // separator row
      if (!inTable) { closeList(); html += "<table>\n"; inTable = true; }
      html += "<tr>" + cells.map((c) => `<td>${inline(c)}</td>`).join("") + "</tr>\n";
      continue;
    }
    closeTable();

    if (line.startsWith("### ")) { closeList(); html += `<h3>${inline(line.slice(4))}</h3>\n`; continue; }
    if (line.startsWith("## ")) { closeList(); html += `<h2>${inline(line.slice(3))}</h2>\n`; continue; }
    if (line.startsWith("# ")) { closeList(); html += `<h1>${inline(line.slice(2))}</h1>\n`; continue; }
    if (line.startsWith("- ")) {
      if (!inList) { html += "<ul>\n"; inList = true; }
      html += `<li>${inline(line.slice(2))}</li>\n`;
      continue;
    }
    closeList();
    html += `<p>${inline(line)}</p>\n`;
  }
  closeList();
  closeTable();
  if (inCenter) html += "</div>\n";
  return html;
}

/* ---------- wiring ---------- */

const SAMPLE = {
  "f-name": "Muhammad Ridha Rezeki",
  "f-headline": "Informatics Engineering Student · Web Developer · Backend Developer · AI Trainer",
  "f-location": "Lhokseumawe, Indonesia",
  "f-ghuser": "MuhammadRidhaRezeki",
  "f-about": "Informatics Engineering student at Politeknik Negeri Lhokseumawe with a strong focus on web and backend development. I build web applications and academic database systems with PHP, Laravel, JavaScript, MySQL, and PostgreSQL, and I work as an AI Trainer at Outlier — evaluating and ranking AI model responses, writing and refining prompts, and fact-checking technical content.",
  "f-linkedin": "https://www.linkedin.com/in/muhammad-ridha-rezeki",
  "f-email": "muhammadridharezki3@gmail.com",
  "f-x": "",
  "f-website": "",
  "f-stack": "PHP, Laravel, JavaScript, HTML5, CSS3, MySQL, PostgreSQL, Bootstrap, Git, Postman",
  "f-projects": "WiFi Provider Management System — Web application supporting a WiFi provider's service management: role-based access (Admin, Technician, User), service data management, and provider service workflows\nMini Blog Web Application — Laravel · MySQL · Bootstrap blog with authentication (login & registration), article CRUD, MVC architecture, and a relational database for users and articles\nPHP Native CRUD Application — PHP · MySQL system for creating, reading, updating, and deleting data, with a simple interface for data input and display\nAcademic Database System — PostgreSQL database design for courses and student grades, structured SQL operations, and reporting queries including total credits and grade calculations",
  "f-education": "Politeknik Negeri Lhokseumawe — D4 (Bachelor of Applied Science), Informatics Engineering (2024 – present)\nSMA Negeri 1 Lhokseumawe — Science major (IPA) (2021 – 2024)",
  "f-certs": "Junior Web Developer — Digital Talent Scholarship (Kominfo)"
};

function currentMarkdown() {
  return generateMarkdown(collectForm());
}

function refresh() {
  const md = currentMarkdown();
  $("pane-markdown").textContent = md;
  $("pane-preview").innerHTML = renderPreview(md);
  $("copy-status").textContent = "";
}

function setTab(which) {
  const preview = which === "preview";
  $("tab-preview").classList.toggle("active", preview);
  $("tab-markdown").classList.toggle("active", !preview);
  $("tab-preview").setAttribute("aria-selected", String(preview));
  $("tab-markdown").setAttribute("aria-selected", String(!preview));
  $("pane-preview").hidden = !preview;
  $("pane-markdown").hidden = preview;
}

async function copyMarkdown() {
  const md = currentMarkdown();
  try {
    await navigator.clipboard.writeText(md);
    $("copy-status").textContent = "Copied ✓";
  } catch (e) {
    const ta = document.createElement("textarea");
    ta.value = md;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand("copy");
    document.body.removeChild(ta);
    $("copy-status").textContent = "Copied ✓";
  }
}

function downloadMarkdown() {
  const blob = new Blob([currentMarkdown()], { type: "text/markdown" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "README.md";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(a.href), 1000);
  $("copy-status").textContent = "Downloaded README.md ✓";
}

function loadSample() {
  for (const [id, value] of Object.entries(SAMPLE)) $(id).value = value;
  const exp = document.querySelector(".entry[data-exp]");
  exp.querySelector(".exp-role").value = "AI Trainer";
  exp.querySelector(".exp-org").value = "Outlier";
  exp.querySelector(".exp-period").value = "February 2026 – May 2026";
  exp.querySelector(".exp-bullets").value = "Evaluate and compare AI model responses based on accuracy, completeness, clarity, and compliance with instructions\nWrite and refine prompts and high-quality reference answers to support Indonesian language model training\nFact-check to identify hallucinations, logic errors, and content that does not meet guidelines";
  $("f-template").value = "clean";
  $("f-theme").value = "radical";
  $("f-stats").checked = true;
  $("f-closing").checked = true;
  refresh();
}

function clearForm() {
  document.querySelectorAll("input[type=text], input[type=url], input[type=email], textarea").forEach((el) => { el.value = ""; });
  $("f-template").value = "clean";
  $("f-theme").value = "radical";
  $("f-stats").checked = true;
  $("f-closing").checked = true;
  refresh();
}

document.querySelectorAll("input, textarea, select").forEach((el) => {
  el.addEventListener("input", refresh);
  el.addEventListener("change", refresh);
});
$("tab-preview").addEventListener("click", () => setTab("preview"));
$("tab-markdown").addEventListener("click", () => setTab("markdown"));
$("btn-copy").addEventListener("click", copyMarkdown);
$("btn-download").addEventListener("click", downloadMarkdown);
$("btn-sample").addEventListener("click", loadSample);
$("btn-clear").addEventListener("click", clearForm);

refresh();
