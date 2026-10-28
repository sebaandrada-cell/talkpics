# TalkPics

Free communication app (AAC) for non-speaking autistic people and their families. Built by Sebastián for his daughter Amelia. Single-file PWA, no build step, no backend.

## Files
- `TalkPics.html`: the whole app (HTML, CSS, JS in one file). Data lives in IndexedDB on the device.
- `index.html`: landing page (ES / EN / CA). It links to the app with `?lang=`.
- `sw.js`: service worker. Change `VERSION` on every release so installed copies update.
- `manifest.webmanifest`, icons, QR codes, `TalkPics-QR-hoja.pdf`: PWA and print material.

## Publishing
GitHub Pages serves `main` at https://sebaandrada-cell.github.io/talkpics/ . Pushing to `main` publishes immediately to real families. Short links: https://tinyurl.com/talkpics-caa (landing), https://tinyurl.com/talkpics-app (app). Never change file names or paths: the printed QR sheets and shared links point to them.

## Languages
App: Spanish (`es`, default), Catalan (`ca`), English (`en`). Strings live in the `I18N` object. Card and category names are stored as `name` (Spanish), `nameCa`, `nameEn`. New strings need all three where possible; missing keys fall back to Spanish.
First visit picks `?lang=` or the browser language (es/ca/en; any other language gets English).

## Rules
- Photos and recordings never leave the device. No analytics, no ads, no accounts.
- Pictograms are ARASAAC (CC BY-NC-SA). Keep the attribution text.
- Must work offline once installed. Keep touch targets large and motion reducible (calm mode).
- Test with Playwright at phone width before publishing. Show Sebastián the result first.
