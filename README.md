# README Forge

A single-page web tool that turns a CV — or a short form — into a polished
GitHub profile README in the clean badge-and-stats style.

Fill in your name, headline, tech stack, experience, projects, education and
certifications, pick a template and a stats theme, and you get a live preview
plus Markdown you can copy or download as `README.md`.

**No backend. No build step. No sign-up. No data leaves your browser.**

## Who it's for

- Students and junior developers writing their first GitHub profile README.
- Anyone who wants the badge-and-stats profile style without hand-writing
  shields.io URLs and stats-card links.
- AI trainers and annotators who keep a profile README as part of their
  professional presence.

## Features

- **Two templates**
  - **Clean** — centred header with contact badges, tech-stack shields,
    experience / projects / education / certification sections, and a
    GitHub stats + streak table.
  - **Minimal** — plain headings, skills as a single line, no stats table.
- **45+ known tech badges** — PHP, Laravel, JavaScript, Python, MySQL,
  PostgreSQL, React, Docker, Git and more get their brand colour and logo
  automatically; anything else gets a neutral grey badge.
- **Live preview** — a rendered preview next to the raw Markdown, updating
  on every keystroke.
- **Stats themes** — radical, dark, default, tokyonight, dracula,
  github_dark (github-readme-stats + streak-stats cards).
- **Load sample** — fills the form with a complete real example so you can
  see the output end to end before typing anything.
- **Copy / Download** — copy the Markdown to the clipboard or download it
  as `README.md`, ready to paste into the special repository named exactly
  like your GitHub username.
- **Fully offline** — open `index.html` and it works, even with no
  connection (badge and stats images need the internet to render, as they
  do in any profile README).

## How to use

1. Open `index.html` in any modern browser (or host it on GitHub Pages).
2. Fill in the form — or press **Load sample** to see a full example.
3. Pick a template and a stats theme.
4. Check the **Preview** tab, then switch to **Markdown** to see the raw
   output.
5. **Copy Markdown** or **Download README.md**, and commit it to the
   repository named exactly like your GitHub username.

## Example output

`examples/sample-output.md` is the Clean-template output for the built-in
sample profile — the same Markdown the generator produces from the sample
form values.

## Project structure

```
readme-forge/
├── index.html              # Page structure: form + output panes
├── styles.css              # All styling (no frameworks)
├── app.js                  # Badge map, Markdown generation, preview renderer
├── SKILL.md                # Agent skill: generate a profile README from a CV
├── examples/
│   └── sample-output.md    # Clean-template output for the sample profile
├── README.md
└── LICENSE                 # MIT
```

## Host it on GitHub Pages

1. Push this folder to a GitHub repository.
2. In the repository, go to **Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**, select
   `main` and `/ (root)`, and save.
4. After a minute, the tool is live at
   `https://<your-username>.github.io/<repo-name>/`.

## Credits

- Badge images: [shields.io](https://shields.io)
- Stats cards: [github-readme-stats](https://github.com/anuraghazra/github-readme-stats)
  and [github-readme-streak-stats](https://github.com/DenverCoder1/github-readme-streak-stats)

## License

MIT — see [LICENSE](LICENSE).
