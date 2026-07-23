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
| 3 — Restaurant and bar | restaurant scene (partial), resto + izakaya sentence cards | 🔜 needs izakaya/allergy/split scenes |
| 4 — Getting around | airport + rental car + hotel sentence cards | 🔜 needs scenes |
| 5 — Golf logistics | check-in scene (partial), course sentence cards | 🔜 needs caddie/cart/onsen/lunch scenes |
| 6 — On-course talk | on-course sentence cards, ナイスショット in phrase kit | 🔜 needs a scene |
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

- **2026-07-23 (session 9, dedupe + massive card expansion):** Henry asked to
  dedupe the sentence cards and add way more, "like 50 each." Expanded SENTENCES
  from 149 → **434** across the 8 scenario pills, each now ~50+ (airport 54,
  rental 51, hotel 53, course 51, golf 63, resto 55, izakaya 50, konbini 54;
  video 3 untouched). Generated in parallel (one agent per scenario, each fed the
  existing phrases to avoid) then merged, deduped globally by exact `jp` keeping
  first occurrence (collapsed 4 real dups: 予約しています。ヘンリーです。 was in
  rental+hotel+course → kept in rental; 別々でお願いします。 and 何名様ですか？
  were in resto+izakaya → kept in resto), and validated every `kana` reading
  against the real `tokenize()` (0 leaked kanji/Latin chars; fixed one ATM →
  エーティーエム). New coverage fills each scenario with the phrases a golf tourist
  actually hits: immigration Q&A + baggage + customs + takkyubin (airport); SUV/
  ETC/map-code/gas/breakdown (rental); early-checkin/onsen-tattoo/packed-breakfast
  (hotel); dress code/self-play/halfway-lunch/settle-bill (course); shot calls
  (fore/sit/get-up), yardage+club to caddie, green reading, penalties, small talk,
  scoring (golf); ticket machine/allergies/less-oil/vegetarian (resto); nomihoudai/
  drink variety/pouring/last-order (izakaya); point-card/warm-bento/PayPay/ATM/
  stamps (konbini). Cards regrouped by category with comment headers, video cards
  kept last with their `src`. Verified in browser: 434 cards load, 0 kana leaks,
  0 console errors, category filter + reveal (romaji under each kana + meaning) +
  Missed/Got-it all work. sw VERSION → gj-v13.
  Follow-up same session: Henry wanted the *replies* he'll hear back when he asks
  どこですか/ありますか/いくらですか/何時ですか, not just his own lines. Added a new
  **Answers** category pill (`["reply","Answers"]` in SENT_CATS, placed after
  From videos) with 45 npc comprehension cards: directions (まっすぐ, 右/左,
  つきあたり, 二階, エレベーターの横, 五分ほど), availability (ございます, 売り切れ),
  yes/included (付いています, 別料金, 無料, できます/できません), price (五百円です,
  お一人様千円), time/hours (九時から, 二十四時間営業, 準備中, 本日は終了), and staff
  acknowledgements (少々お待ちください, かしこまりました, 承知しました). All who:"npc"
  so the card front reads "YOU'LL HEAR". Deck now 479 total (reply 45). Validated
  0 kana leaks, 0 dups; verified Answers pill filters + reveal in browser. sw → gj-v14.

- **2026-07-21 (session 8, mined-video cards + retention):** Henry wants an
  ongoing loop: mine natural Japanese out of YouTube videos (via the new
  `jp-transcribe` skill), save the phrases in the trainer, and get *tested on
  whether he remembers*. Built three things into the Cards → Sentences mode:
  (1) a standing **"From videos"** category (`["video","From videos"]` in
  SENT_CATS) that accumulates mined lines, each carrying a new `src` field
  ("추성훈 · ホッピー通り") shown as an italic caption on reveal; (2) a **Review ★**
  category that filters to net-missed cards (`sentWeak`: w>r); (3) **self-grade
  retention** — on reveal, sentence cards show ✗ Missed / ✓ Got it (tap/space =
  Got it, Missed is a deliberate click); grades persist in `sentStats` (keyed by
  jp, {r,w}), the deck is now weighted so missed/new cards resurface more often
  (mirrors the kana `drillPick`), and each card shows its ✓/✗ memo. Export now
  lists sentence cards practiced + the due-for-review list. Saved the first
  mined lines from the Choo Sung-hoon short (お父さんのために…, おすすめなんか
  ありますか, おすすめありますか). Verified in browser: 3 mined lines tokenize
  clean, Missed→Review flow, weighted deck, empty-review message, e2j direction,
  char-mode button restore, no overflow at 390px, no console errors. sw VERSION
  → gj-v12. That short was Choo speaking Korean; the only real Japanese was the
  0:27 shop-owner exchange (rest = Korean narration about ホッピー通り/焼酎).

- **2026-07-21 (session 7, expand sentence cards):** Henry asked for way more
  sentences per category, covering all common phrases even within those
  categories. Expanded SENTENCES 66 → 149 across the same 8 scenario pills
  (airport 19, rental 16, hotel 19, course 17, golf 21, resto 20, izakaya 18,
  konbini 19). Filled each category with the common phrases a golf-trip tourist
  actually hits: airport immigration Q&A + customs + SIM/exit/toilet; rental
  automatic/insurance/nav-to-course/accident; hotel walk-in/AC-broken/no-hot-
  water/wake-up-call; course green-fee/caddie/range/lunch-after-front-nine;
  golf ナイスオン/パット/バーディー, ドンマイ, 惜しい, OB/池/バンカー/暫定球,
  distances to caddie; restaurant allergy/卵はだめ/取り皿/ごちそうさま; izakaya
  お通し/焼き鳥 塩orタレ/レモンサワー/日本酒; konbini いらっしゃいませ/温めて/
  お箸/現金/Suica/ATM/氷. Data shape unchanged (cat/who/jp/kana/en) so render,
  direction pills, and category filter needed no code change. Verified in
  browser: all 149 tokenize with no missing romaji (punctuation excluded),
  spot-checked romaji (こうそく, スイカ, ATM=eetii emu, おとおし, まんタン),
  golf deck shows "Card 1 of 21", flip reveals jp+en, no overflow at 1200px.
  sw VERSION → gj-v11. Avoided ウェ (not in ROMA) by using 高速 for highway.
  **Next up:** scenes for airport / rental car / hotel / izakaya still owed
  (the new categories have cards but no conversation entry point yet).

- **2026-07-19 (session 6, reverse sentence cards):** Henry asked for the
  reverse direction on sentence cards. Added a Japanese → meaning /
  English → Japanese pill row (mirrors the char cards' direction pills). In
  English → Japanese the front shows the English meaning (production
  practice: say it in Japanese out loud); flip reveals the kana tokens with
  romaji, the written form, and plays TTS. Implemented as an `e2j` class on
  #card-sent (flex order puts the meaning on top, kb hidden until reveal).
  Verified both directions, direction switching mid-deck, char mode
  unaffected, 390px, no console errors. sw VERSION → gj-v10.

- **2026-07-19 (session 6, sentence cards):** Henry finished the kana card
  phase and asked for a sentence flashcard mode: guess the sentence, flip to
  see romaji + meaning, themed around the golf trip. Cards tab now has a
  Characters / Sentences (trip) mode row. Sentences mode: 66 sentences across
  8 scenario pills (Airport, Rental car, Hotel, Course check-in, On course,
  Restaurant, Izakaya, Konbini) + All. Front = the kana sentence tokenized
  (kbHtml, per-token romaji hidden via the existing cw-back reveal), each card
  tagged "You say" / "You'll hear". Flip reveals per-token romaji, the natural
  written form (kanji), and the English meaning, and auto-plays TTS; space/tap
  flow identical to character cards. Content reuses lines verbatim from the 5
  scenes where they fit; new lines written for airport arrival, car rental,
  hotel, on-course talk, and izakaya (とりあえずビールで, なま ふたつ, かんぱい,
  おかわり, べつべつ), which have no scene yet. Verified in-browser: all 66
  sentences tokenize with no missing romaji, は reads wa, hide/reveal both
  modes, category filter, char mode restore, no overflow at 390px, light +
  dark. sw VERSION → gj-v9. **Next up:** scenes for airport / rental car /
  hotel / izakaya (Units 3-5) so the new sentence categories get conversation
  entry points too.

- **2026-07-14 (session 5, stroke-order toggle):** Henry asked whether a font
  exists that shows stroke order with numbers, for the kana page. It does:
  **KanjiStrokeOrders** (nihilist.org.uk, BSD-licensed) prints a small number
  at the start of each stroke and covers all kana. Subset the 18MB TTF to the
  kana block (U+3040–30FF) → `fonts/kana-stroke-order.woff2` (48KB), bundled +
  cached in the sw. Added a **筆順 Stroke order** pill toggle. FIRST put it on
  the drill (misread the ask) — Henry corrected: he wants it on the **kana
  table (chart)**, not the drill. MOVED it: the toggle now lives in the chart's
  control row and adds `.stroke-mode` to `#kana-chart`, which swaps every cell's
  character to the stroke-order font at 54px (word/derivation hide to make room,
  romaji stays, 5-column gojuon rows preserved). State persisted via
  store.set("stroke"). Tradeoff flagged to Henry: at 5 columns on a phone the
  character maxes ~54px, so the numbers are present but small (legible up close
  on retina; bigger would need fewer columns or tap-to-enlarge). Verified light
  + dark, hira + kata, toggle-off restores words/Noto, no overflow at 390px.
  sw VERSION → gj-v8.

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
