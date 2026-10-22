# Sree Sowmya - Portfolio

A static portfolio site. No build step, no dependencies.

## Files
- `index.html`   page content (about, projects, skills, education, certifications, contact)
- `styles.css`   all styling; colours are CSS variables at the top (`:root`)
- `script.js`    typing line, scroll progress, jump menu (Ctrl+K or /), skill-to-project highlight, copy email
- `portrait.jpg`   your photo (600x600). Replace it with another square image to change it.

## Run it
Open `index.html` in a browser, or serve the folder:

    python3 -m http.server 8000

then visit http://localhost:8000

## Edit your links
Open `script.js` and change the `LINKS` object at the top (GitHub, LinkedIn, project repos and demos).

## Change colours
In `styles.css`, edit the variables in `:root`:
`--bg` (background), `--accent` (pale purple), `--red` (the small highlight, currently sky blue).

## Deploy
Any static host works: drag the folder to Netlify or Vercel, or push to a GitHub repo and enable GitHub Pages.
The page loads its fonts (Bricolage Grotesque, DM Sans, JetBrains Mono) from Google Fonts.
