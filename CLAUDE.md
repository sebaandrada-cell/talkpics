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
App: Spanish (`es`, default), Catalan (`ca`), English (`en`), French (`fr`), Italian (`it`), Portuguese (`pt`, Brazilian wording, prefers a pt-BR voice), German (`de`), Latvian (`lv`), Ukrainian (`uk`), Russian (`ru`, shown with a neutral 🌐 instead of a flag, on purpose: many Russian-speaking families in Latvia, Ukraine and elsewhere are not from Russia). The list lives in `LANGS` (label, voice preference, BCP-47 code); the settings sheet builds its language buttons from it.
- UI strings: `I18N` holds es/ca/en; `I18N_EXTRA` adds the newer languages and the Catalan keys that used to be missing. `{N}` inside a string is replaced by `STRIP_MAX`; `hManyAdded` may contain `{n}` (number of pictures). Missing keys fall back to English for the newer languages and to Spanish for es/ca.
- Card and category names: es/ca/en keep their historic storage (`name` = Spanish, `nameCa`, `nameEn`). The newer languages are NOT stored on the cards: `BASE_NAMES[lang][spanishName]` and `BASE_CATS[lang][catId]` translate the base set at display time, and a family's own translation goes in `p.names[lang]` (edit sheet field "name in <language>", only shown in the newer languages). No migration was needed; never rename the Spanish base names, they are the lookup key.
- Voice: each language only uses voices of its own language (Catalan may fall back to a Spanish voice). If the device has no voice for the chosen language, Settings shows a notice suggesting installing one or recording a family member. Do not fall back to another language's voice: it would mispronounce the words.
- ARASAAC search has no Latvian: `ARA_LANGS` lists the supported ones; Latvian searches go to English, then Spanish. ARASAAC answers 404 when it finds nothing, which the app treats as "no results", not as a connection error.
- First visit picks `?lang=` or the browser language among `LANG_CODES`; any other language gets English.
- Translations of the newer languages were written without native review. Latvian was promised to the Latvian Autism Association; ask a native speaker to review before relying on it.

## Rules
- Photos and recordings never leave the device. No analytics, no ads, no accounts.
- The multi-pictogram sentence strip is optional: toggle "Frases con varios pictogramas" in Settings (opened by holding the lock), setting key `strip`, OFF by default. Migration `seedV16` (2026-10-30) turned it off once on installs that had it on from the old default; users can turn it on again in Settings. Never force it on in a migration and do not reset it again.
- Pictograms are ARASAAC (CC BY-NC-SA). Keep the attribution text.
- Must work offline once installed. Keep touch targets large and motion reducible (calm mode).
- Test with Playwright at phone width before publishing. Show Sebastián the result first.
