# README Forge — profile README generator skill

Use this skill when the user asks for a polished GitHub profile README,
wants to turn a CV into a profile README, or asks for a README generator.

## What it is

`readme-forge` is a static web tool (no backend, no build step) that turns
a short form into a GitHub profile README in the clean badge-and-stats
style: centred header with contact badges, tech-stack shields, experience,
projects, education, certifications, and GitHub stats + streak cards.

Files: `index.html` (form + output), `styles.css`, `app.js` (badge map,
Markdown generation, preview renderer).

## How to generate a profile README for someone

1. Open `index.html` in a browser, or run the generator logic in `app.js`
   (`generateMarkdown(data)`) — the data shape is the `collectForm()`
   return value.
2. Fill in, at minimum: display name, headline (roles separated by ` · `),
   location, GitHub username, about paragraph, tech stack (comma-separated).
3. Add contact links (LinkedIn, email, X handle, website), one experience
   entry (role, organisation, period, bullets one per line), featured
   projects (one per line: `Name — description`), education (one per line:
   `School — degree (period)`), and certifications (one per line).
4. Pick a template:
   - **Clean** (default): badges, centred header, stats table.
   - **Minimal**: plain headings, skills as one line, no stats table.
5. Pick a stats theme (radical, dark, default, tokyonight, dracula,
   github_dark) and whether to include the stats + streak cards and the
   "open to work" closing line.
6. Copy the Markdown or download `README.md`, and commit it to the special
   repository named exactly like the GitHub username.

## Badge rules (in `app.js`, `BADGES` map)

- 45+ known techs get their brand colour + logo automatically
  (PHP, Laravel, JavaScript, TypeScript, HTML5, CSS3, Python, MySQL,
  PostgreSQL, MongoDB, Bootstrap, Tailwind, React, Vue, Node.js, Git,
  Docker, Postman, and more).
- Unknown techs fall back to a neutral grey badge with no logo — never
  invent a colour or logo for a tech you do not know.
- Badge style is always `flat-square`, matching the profile style.

## Quality rules

- Never put a phone number in a generated profile README.
- Keep the About paragraph to what the CV actually says — do not invent
  roles, employers, or skills.
- Stats cards use the username the user typed; verify it is their real
  GitHub username before publishing.
- The sample in the tool (`Load sample`) is a real profile — use it to
  demonstrate the output, not as a template to copy someone else's details
  into a different person's README.
