# Massimo Perfetti — Personal Site

`master` is a single static page: `index.html` with inline CSS, no framework, no build step. Netlify copies the public files into `dist/` and publishes that (`netlify.toml`); add new public files to that copy command. Keep it that way unless Massimo asks otherwise.

- Style: dark, Antemyth-like. Void black `#050506`, ice text `#DCEBF5`, muted `#8E9AA6`, light-blue accent `#8FB8DE`; Instrument Sans for the name, Chivo for body, Chivo Mono for labels.
- Content: photo, name, one short paragraph, underlined text links with ↗ (LinkedIn, GitHub, X) and a mail icon. No role line, no section labels, no Dual Energy, no CV. About paragraph links Antemyth, MIT, van Rees Lab, TU Delft, EPFL, PoliTo inline. Photo is a B&W orca crop.
- Deploy is author-owned: pushing `master` publishes. Don't run Netlify CLI or touch DNS.

The full Astro site (and its original CLAUDE.md) lives on the `astro-site` branch.
