# Progress

**This file is the source of truth.** Claude: read this file (and the latest
session log entry) at the start of every session to know where Henry is and
what to build next. Do not rely on Claude-side memory for lesson state.

## Status

| Unit | Material | Status |
|------|----------|--------|
| 0 — Sounds + kana + cheat codes | lesson-01, app 가나 tab | 🔄 in progress — kana drilling started, katakana first |
| 1 — Survival core | app 표현 tab (15 phrases), scenes | 🔄 in progress via scenes |
| 2 — Numbers, money, shopping | konbini scene (partial) | 🔜 needs number lessons + more scenes |
| 3 — Restaurant and bar | restaurant scene (partial) | 🔜 needs izakaya/allergy/split scenes |
| 4 — Getting around | — | not built |
| 5 — Golf logistics | check-in scene (partial) | 🔜 needs caddie/cart/onsen/lunch scenes |
| 6 — On-course talk | ナイスショット in phrase kit only | not built |
| 7 — Small talk | clubhouse scene (partial) | 🔜 needs deeper branches (handicap, LINE exchange) |
| 8 — Problem solving | ゆっくり/もう一度 in phrase kit | not built |

## Decisions (binding for future sessions)

- **Conversation-first.** No drill-warmup rounds, no Duolingo-style recognition.
  Sessions start inside a roleplay scene. (2026-07-04)
- **HTML app, not terminal.** All drilling happens in `index.html`, served by
  GitHub Pages: **https://hwasoocho.github.io/japanese-lessons/** (repo
  https://github.com/hwasoocho/japanese-lessons — push to main = deploy;
  no claude.ai artifact). Terminal is only for updating this repo. (2026-07-04)
- **Kana yes, kanji no.** Henry chose to learn hiragana + katakana properly
  (hangul glosses distort the sounds). Katakana is priority — golf/food vocab
  is katakana loanwords. (2026-07-04)
- **English + Japanese ONLY.** No Korean in the app UI, lesson materials, or
  teaching chat. App fully converted to English 2026-07-04. `lessons/lesson-01`
  predates this rule (Korean-heavy) — treat as legacy; future lessons in
  English/Japanese only. (2026-07-04)
- App progress lives in browser localStorage → use the app's **내보내기** button,
  paste the export here each session, commit.

## App state (paste 내보내기 export below, newest on top)

_(none yet — export after first app session)_

## Vocab learned

~15 phrases exposed (phrase kit + 4 scenes), 0 confirmed by self-grade yet.

## Review queue

Populated from scene misses and kana drill stats after each export.

## Session log

- **2026-07-04 (session 1):** Repo + curriculum created. Mid-session pivots:
  (a) drill rounds rejected → conversation-first; (b) hangul-only glosses
  rejected → kana track added to Unit 0; (c) terminal rejected → built
  `index.html` trainer (4 roleplay scenes with TTS + self-grade, kana chart/drill
  with weighted repetition, 15-phrase kit with hide mode, Chrome mic optional).
  No graded drilling recorded yet. **Next up:** Henry plays the scenes + starts
  katakana drill; then build number/money lesson (Unit 2) and more golf scenes
  (Unit 5-6), expand scene pool based on what he misses.
