# Progress

**This file is the source of truth.** Claude: read this file (and the latest
session log entry) at the start of every session to know where Henry is and
what to build next. Do not rely on Claude-side memory for lesson state.

## Status

| Unit | Material | Status |
|------|----------|--------|
| 0 — Sounds + kana + cheat codes | lesson-01, app 가나 tab | 🔄 in progress — kana drilling started, katakana first |
| 1 — Survival core | app 표현 tab (15 phrases), scenes | 🔄 in progress via scenes |
| 2 — Numbers, money, shopping | Numbers tab (patterns + 2-way price drill), proshop scene | 🔄 built — needs Henry to drill + play the scene |
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

- **2026-07-14 (session 5, legible font):** Henry flagged the Japanese font was
  muddying strokes for him — it was `--jp: Hiragino Mincho ProN` (a Mincho
  *serif* with thick/thin strokes + うろこ flicks). Swapped `--jp` app-wide to
  `"Noto Sans JP","Hiragino Kaku Gothic ProN","Hiragino Sans",-apple-system` —
  a clean modern gothic (the "Pretendard of Japanese"), loaded via Google Fonts
  `<link>` with a system-gothic fallback so the offline PWA still renders gothic
  (never reverts to Mincho). Verified in light + dark, kana chart + scenes.
  sw VERSION → gj-v6. **Open:** Henry also said "romaji → hiragana as well" and
  picked "Cards reverse is broken for hiragana," but I reproduced the Cards
  Romaji → kana mode on the hiragana set and it works correctly (front shows
  romaji, flip reveals the kana + words). Either his phone is on a stale PWA
  cache predating session 4's reverse cards, or he actually wants a reverse
  direction on the Kana *drill* (which really is one-way, kana → romaji only).
  Awaiting his confirmation before building.

- **2026-07-13 (session 4, reverse cards + word audio):** Henry asked for (a) a
  reverse flashcard direction — see the romaji, picture the character in his
  head, flip to see it — and (b) tap-to-hear pronunciation on every word on a
  card. Added a Kana → romaji / Romaji → kana pill row to the Cards tab; in
  reverse mode the big slot shows romaji (mono, 48px) and the words are hidden
  until flip (they contain the answer character), flip swaps in the character.
  Every card word is now tappable → say(word) via the existing TTS, without
  advancing the card. Verified in-browser both directions, word tap, mode
  switching, no overflow at 390px. sw VERSION → gj-v5.

- **2026-07-12 (session 3, richer flashcards):** Henry asked for 3-5 words per
  character on the cards (was often 1). Added a shared WORDS pool to
  kana-data.js (~140 words, same golf/food/travel themes; を gets particle
  phrases like これをください since it never appears inside words) and
  cardWordsFor now falls through to it after the set's example words, cap
  raised 4 → 5. Verified in-browser: every character in all three sets shows
  3-5 words, flip still hides romaji, no page overflow at 390px. Wallpapers
  untouched (they only read HIRA/KATA). sw VERSION → gj-v4.

- **2026-07-12 (session 3, stale-PWA fix):** Henry's installed app wasn't
  picking up deploys even after relaunch. Root causes: (1) GitHub Pages serves
  Cache-Control max-age=600 and the sw's plain fetch() honored the HTTP cache —
  "network-first" was returning 10-min-stale files; now fetch(…, cache:
  "no-cache") forces ETag revalidation. (2) The page renders before a new sw
  takes over, so an update needed TWO relaunches; now the page reloads itself
  once on controllerchange (guarded for first install), and reg.update() runs
  on every return to foreground, not just launch. Verified end-to-end on a /tmp
  copy: mutate files → dispatch visibilitychange → page auto-reloads with new
  content. sw VERSION now gj-v3.

- **2026-07-12 (session 3, PWA polish):** (a) Pull-to-refresh built for the
  installed app — iOS standalone PWAs have NO native reload gesture (no browser
  chrome), so #ptr + touch handlers reload past a 60px pull; only activates in
  display-mode standalone (Safari keeps its native one), native rubber band
  disabled via overscroll-behavior in a standalone media query. (b) Henry
  flagged the tab menu still extends horizontally — swipe-scroll nav replaced
  with flex-wrap at ≤560px (two rows, smaller padding). Verified: no page
  overflow at 390/375px, pull simulation reloads, small pull springs back.

- **2026-07-12 (session 3, mobile fixes):** Henry flagged horizontal scroll on
  mobile — the 6-tab nav (471px) and the Numbers 1-10 table (494px) were wider
  than the 390px viewport and stretched the page. Both now scroll within
  themselves (nav scrollbar hidden); page scrollWidth verified == viewport on
  every tab at 390px and 375px. Also replaced the 🌙 emoji theme button with a
  proper toggle switch (pine track + sliding knob, role="switch").

- **2026-07-12 (session 3):** PWA + flashcards promoted. (a) The trainer is
  now installable on iPhone: manifest.webmanifest, app icons (the vermilion 語
  seal, icons/), apple-touch meta tags, safe-area padding, and a network-first
  service worker (sw.js — pushes still show up on next load, cache only used
  offline; bump VERSION in sw.js when cached files change). Henry installs via
  Safari → Share → Add to Home Screen. (b) Flashcards are now a first-class
  Cards tab (カード) with its own Katakana/Hiragana/Both pills and independent
  set state, instead of a sub-mode buried in the Kana tab; deck starts
  automatically on first open. Kana tab keeps chart + drill.

- **2026-07-11 (session 2, flashcards):** Henry flagged that the kana chart
  invites romaji-peeking — he wants exposure without the answer visible.
  Shipped a 🃏 Flashcards mode in the Kana tab: one character per card plus up
  to 4 real words containing it (pulled from the set's example words, character
  highlighted, romaji hidden). Space / Enter / → / tap flips to romaji +
  dakuten derivation + word readings and glosses; press again for the next
  card. Deck is the whole set shuffled, recycles when exhausted. Mutually
  exclusive with the drill; switching kana set reshuffles. Added a **Both**
  set pill (Katakana + Hiragana combined, 137 cards) — applies to the chart
  and drill too.

- **2026-07-11 (session 2, Unit 2 build):** Numbers and money lesson shipped:
  new Numbers tab (数) with the pattern explainer (10 base words, the five
  sound-shift blocks 300/600/800/3000/8000 framed as the dakuten pattern,
  まん 10,000-grouping, ひとつ/ふたつ ordering counters) + a two-direction
  price drill (see ¥ → say it, self-grade; hear it → type digits, auto-check)
  over 30 realistic golf/food prices; `yenKana()` generates readings
  programmatically (verified against 15 ground-truth cases incl. まん compounds).
  New Talk scene: プロショップ (15 turns — glove 3,800, cheaper 2,500, balls
  ろっぴゃく each, total さんぜん ななひゃく, card payment). Path level 6
  unlocked with chip (30 right + perfect proshop = done). Export now includes
  numbers stats.

- **2026-07-11 (session 2, continued):** Exposure tooling + chart polish:
  (a) wallpaper.html + generated wallpapers (muted gruvbox, characters-only
  desktop set on Henry's Mac, phone PNGs in wallpapers/ to save from Safari);
  (b) dark mode on the trainer (muted gruvbox, 🌙/☀️ header toggle, saved
  choice wins over OS); (c) voiced cells show their derivation (だ = た ＋ ゛,
  computed via NFD decomposition) in chart and drill; (d) dropped unused kana
  ヲ ヂ ヅ ぢ づ from data (chart, drill, wallpapers) — を kept (particle).

- **2026-07-11 (session 2):** Kana chart upgraded for word-anchored learning:
  every cell now shows a high-frequency example word (kana + romaji + meaning
  — menus, stations, golf: すし, ごはん, ゴルフ, バーディー…), tap plays the
  character then the word. Added the voiced dakuten/handakuten rows (が ざ だ
  ば ぱ + katakana equivalents, +25 per script) to the chart AND the drill —
  prompted by Henry asking where ご of ごはん was. Drill now shows the example
  word after each answer and accepts di/du/zi typings.

- **2026-07-04 (session 1, continued):** Henry asked for longer conversations,
  per-character readings, and a dead-simple 0→100 path. Shipped: Path tab
  (levels 0-100, auto progress from kana stats + scene scores; levels 6-100 are
  the build queue: numbers/money → on-course talk → small talk deep dive →
  free mic conversation), kana+romaji breakdown under every conversation line
  (tokenizer handles digraphs, sokuon, long vowels, particle は/へ), all 4
  scenes lengthened to 11-15 turns, slow-audio (🐢) buttons.

- **2026-07-04 (session 1):** Repo + curriculum created. Mid-session pivots:
  (a) drill rounds rejected → conversation-first; (b) hangul-only glosses
  rejected → kana track added to Unit 0; (c) terminal rejected → built
  `index.html` trainer (4 roleplay scenes with TTS + self-grade, kana chart/drill
  with weighted repetition, 15-phrase kit with hide mode, Chrome mic optional).
  No graded drilling recorded yet. **Next up:** Henry plays the scenes + starts
  katakana drill; then build number/money lesson (Unit 2) and more golf scenes
  (Unit 5-6), expand scene pool based on what he misses.
