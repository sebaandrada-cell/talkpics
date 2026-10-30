# TalkPics

Free communication app (AAC) for non-speaking autistic people and their families. Built by Sebastián for his daughter Amelia. Single-file PWA, no build step, no backend.

## Files
- `TalkPics.html`: the whole app (HTML, CSS, JS in one file). Data lives in IndexedDB on the device.
- `index.html`: landing page (ES / EN / CA). It links to the app with `?lang=`.
- `sw.js`: service worker. Change `VERSION` on every release so installed copies update.
- `manifest.webmanifest`, icons, QR codes, `TalkPics-QR-hoja.pdf`: PWA and print material.

## Publishing
GitHub Pages serves the `TalkPics` branch (root) at https://sebaandrada-cell.github.io/talkpics/ . Pushing to `TalkPics` publishes immediately to real families. `main` is only an empty root (the account default for new projects) and holds no app files: do all work on `TalkPics` or on a short branch from it, and open pull requests against `TalkPics`, never `main`. Short links: https://tinyurl.com/talkpics-caa (landing), https://tinyurl.com/talkpics-app (app). Never change file names or paths: the printed QR sheets and shared links point to them.

## Languages
App: Spanish (`es`, default), Catalan (`ca`), English (`en`). Strings live in the `I18N` object. Card and category names are stored as `name` (Spanish), `nameCa`, `nameEn`. New strings need all three where possible; missing keys fall back to Spanish.
First visit picks `?lang=` or the browser language (es/ca/en; any other language gets English).

## Rules
- Photos and recordings never leave the device. No analytics, no ads, no accounts.
- The multi-pictogram sentence strip is optional: toggle "Frases con varios pictogramas" in Settings (opened by holding the lock), setting key `strip`, OFF by default. Migration `seedV16` (2026-10-30) turned it off once on installs that had it on from the old default; users can turn it on again in Settings. Never force it on in a migration and do not reset it again.
- Pictograms are ARASAAC (CC BY-NC-SA). Keep the attribution text.
- Must work offline once installed. Keep touch targets large and motion reducible (calm mode).
- Test with Playwright at phone width before publishing. Show Sebastián the result first.
