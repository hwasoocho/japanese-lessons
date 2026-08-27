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
| 4 — Getting around | taxi scene + Taxi cards, airport + rental car + hotel sentence cards | 🔄 taxi built end to end 2026-08-07 (scene + 52 cards + run) — still needs airport / rental car / hotel scenes |
| 5 — Golf logistics | check-in scene (partial), course sentence cards | 🔜 needs caddie/cart/onsen/lunch scenes |
| 6 — On-course talk | on-course sentence cards, ナイスショット in phrase kit | 🔜 needs a scene |
| 7 — Small talk | clubhouse scene (partial) | 🔜 needs deeper branches (handicap, LINE exchange) |
| 7.5 — Casual peer register | halfway-break scene (plain form), Casual card pill | 🔄 built 2026-07-23 — first casual/plain-form content; needs Henry to play it |
| 8 — Problem solving | ゆっくり/もう一度 in phrase kit | not built |

## Decisions (binding for future sessions)

- **The app is three decks, nothing else.** (2026-08-25, supersedes the
  conversation-first entry point below for the *app's navigation*.) Henry only
  uses phrase cards, word cards and numbers, so the nav is Phrases / Words /
  Numbers and the app opens straight into the phrase deck. Path, Talk, Kana
  chart and the Phrases kit still exist in `index.html` but are off the nav and
  off the router. Do not add a fourth tab without asking; new content goes into
  an existing deck (a `SENT_THEMES` theme for phrases, `kanji-data.js` for
  words).

- **Conversation-first.** No drill-warmup rounds, no Duolingo-style recognition.
  Sessions start inside a roleplay scene. (2026-07-04)
- **Talk is the main surface, and every line there is the same reveal card.**
  No your-turn framing, no grading in Talk: read the kanji out loud, reveal
  romaji + meaning + breakdown, next. Every sentence card is also playable in
  Talk as a per-category sentence run. Self-grading and the weighted Review ★
  deck live in Cards only. (2026-07-29)
- **HTML app, not terminal.** All drilling happens in `index.html`, served by
  GitHub Pages: **https://hwasoocho.github.io/japanese-lessons/** (repo
  https://github.com/hwasoocho/japanese-lessons — push to main = deploy;
  no claude.ai artifact). Terminal is only for updating this repo. (2026-07-04)
- **Kanji is recognition-only** (2026-07-29, amends the rule below). Henry asked
  for kanji in the Kana section and Cards, so `kanji-data.js` holds 182 kanji
  (signage + everything with 3+ uses in the app's own lines) with ON/kun readings
  and a real word. He reads them; he still produces everything in kana. Lesson
  and scene text stays kana-first, and the wallpapers stay kana-only.
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

- **2026-08-27 (session 17b, Endings nav tab):** Henry wanted the Endings cards
  surfaced as their own tab, not buried as a Phrases checkbox ("it's important i
  learn those with priority"). New **Endings 文末** nav button, placed FIRST in
  the nav. It's the sentence deck pinned to the `ending` theme: `navTab('ending')`
  stashes the current Phrases checkboxes (`sentThemesPrev` in localStorage), sets
  themes to `["ending"]`, and the nav highlight derives from state
  (`endingOnly()` in `navFor()`), so the `#cards/sent/ending/j2e` deep link also
  lights the tab. Clicking Phrases restores the stashed checkboxes. Browser-
  verified at 390px: tab click → 37-card all-ending deck + correct hash, Phrases
  restores all themes, deep link highlights Endings, no nav/body overflow, 0
  console errors. sw v28.

- **2026-08-27 (session 17, Endings theme):** Henry: the ending phrases (imasuka,
  moraemasuka, iidesuka, desu, masu, imasu) are the high-leverage thing to learn;
  he wants a section for them, same card format, and mid-session added "refer to
  existing phrases for more end phrases." New **Endings** theme in the phrase deck
  (`ending` in SENT_THEMES, placed first), **37 cards, one per ending pattern**,
  each a real sentence with the pattern explained in the en gloss: です / ですか /
  は何ですか / はどこですか / はいくらですか / ます / ますか / ません / ませんか /
  ました / でした / ましょう / ましょうか / ますね / います / いますか / あります /
  ありますか / ございます / ませ (くださいませ) / をください / をお願いします /
  でお願いします / てください / ないでください / てもいいですか / てもらえますか /
  いただけますか / できますか / いいですか / でいいです / ですね / ですよ / そうです /
  んです / たいです / ています. The corpus mining (per his mid-session ask) is what
  added はどこですか (23 uses in the deck), でお願いします (15), staff-speak
  ございます/ませ, ましょうか, ますね, んです. Sentences are all fresh (script-checked
  0 exact-jp dups against the 544; three drafts collided — 辛くしないでください,
  これは何ですか, あちらにございます — and were replaced). kana chunked to corpus
  conventions to reuse existing glosses; 35 new GLOSS entries (814 → 849). Also a
  `RUN_META.ending` entry (文末表現) so the run coverage invariant holds. Deck
  581 total. Verified by script (0 dups, 0 kana leaks, 0 unglossed chunks, 0
  middots/em-dashes) and in a real browser at 390px: Endings pill renders,
  `#cards/sent/ending/j2e` deep link shows Card 1 of 37, 5 space-cards advance
  with grades written to `gj_sentStats`, all-themes deck reads 581, breakdown
  rows gloss every word, 0 console errors, no horizontal overflow.
  sw VERSION → gj-v27.

- **2026-08-25 (session 16, cards-only app):** Henry: "fix the page so i get
  immediately greeted with the phrases cards, it's the only thing i care about
  now, no useless tabs. only phrases cards, word cards and numbers."
  The six-tab nav (Path / Talk / Kana / Cards / Numbers / Phrases) is replaced by
  **three deck-shaped tabs**: **Phrases 表現** (the 544 sentence cards),
  **Words 単語** (漢字 Kanji cards, with a Kana characters sub-pill for the old
  character deck), **Numbers 数**. The nav is now deck-shaped rather than
  view-shaped: Phrases and Words are the same Cards view with a different
  `cardMode`, so `navFor()` / `renderNav()` derive the highlight from
  `tab` + `cardMode`, and `navTab()` maps a nav press to showTab + setCardMode.
  Words remembers whichever sub-deck was last open.
  **Landing.** A launch with no hash now opens the phrase cards directly
  (`replaceState` to `#cards/sent/all/j2e`, no extra history entry) instead of
  Path. `ROUTE_TABS` is `["cards","num"]`, so every stale link from the old
  layout (`#path`, `#talk/taxi`, `#kana/kata`, `#phrase`, `#bogus`, bare
  `#cards`) resolves to the phrase deck and the URL is rewritten to match, which
  matters because the installed PWA reopens on whatever hash it was left at.
  `#cards/sent/...`, `#cards/char/...`, `#cards/kanji/...` and `#num/...` deep
  links all still work.
  **Chrome trimmed so the card is the first thing on screen.** The long Cards
  section note is gone (the per-mode card hint already says it), the deck filters
  (themes, Check all / Uncheck all, Review ★, Romaji + meaning always on,
  direction, kana set, kanji groups) fold into one closed `<details>` whose
  summary relabels per mode, and the header is smaller on phones with the title
  cut to ゴルフ日本語 / Golf Japanese. First card top: **205px** at 390px wide,
  down from ~380px on the old Path landing.
  The Path / Talk / Kana / Phrases views and all their code stay in the file,
  just unreachable from the nav and from routing; the footer Export button is
  untouched, so pasting progress here still works.
  Verified in a real browser at 390 / 375 / 1200px, light and dark: lands on
  `#cards/sent/all/j2e` with card 1 of 544, all 9 stale and deep-link hashes
  resolve as listed above, nav highlight follows the deck through
  Phrases → Words → Kanji/Kana sub-pill → Numbers → Phrases, 5 space-key cards
  with 0 repeats, ✗ Missed writes `gj_sentStats` and the card is the one the
  Review ★ filter then shows, unchecking a theme drops the deck 544 → 490 and
  survives a reload, numbers drill still deals a price, 0 console or page
  errors, 0 horizontal overflow. sw VERSION → gj-v26.

- **2026-08-09 (session 15, sentences become one list):** Henry finished the kana
  cards ("worked really well, I got to learn them really fast") and wants to move
  to grammar through sentences, cards only. His complaint about the old format:
  too many category entries, and he had to click to see romaji + meaning. He chose
  the one-at-a-time deck over a scrolling feed, then asked for **checkboxes on the
  themes, all checked by default**.
  Built in Cards → Sentences: the exclusive category pill row is gone, replaced by
  `SENT_THEMES` rendered as **12 checkbox pills** (☑/☐ + count) that union into ONE
  merged list, plus Check all / Uncheck all, **Review ★ only** as an independent
  filter on top (no longer a category that hides the others), and **Romaji +
  meaning always on** (default checked) which renders each card already revealed so
  the kanji, kana with romaji, written form, meaning and word breakdown are all
  there without a tap, with the ✗/✓ grade row live immediately. Uncheck it and the
  old flip behaviour is back. All three persist to localStorage (`gj_sentThemes`,
  `gj_sentReview`, `gj_sentShow`) so the browser remembers the setup, and the hash
  carries them too (`#cards/sent/airport,taxi,golf/j2e`, `all`, `none`, `review`).
  **Real duplicate fix.** He insisted on no duplicate sentences. Exact `jp`,
  punctuation-normalized `jp` and `en` were all already 0, but the deck itself
  repeated sentences: `weightedDeck` pushes 2 copies of every unseen card, so a
  545-card list played as "Card 1 of 1090" with literal repeats inside one pass.
  New `orderedDeck()` spends weight on **position instead of copies**
  (Efraimidis-Spirakis: sort by `random()^(1/w)`), so each pass is every sentence
  **exactly once**, missed cards drift to the front, and the end of the list
  reshuffles. Extracted `cardWeight(st)` as the shared weight formula; the kanji
  deck keeps `weightedDeck`. Also extracted `revealCard()` out of `cardAdvance()`
  so sentNext() can open a card without firing the audio.
  **Quality pass on the 544 sentences** (his goals: next golf trip first, living in
  Japan second). Fixed 7 real defects: 「これチップです」taught tipping a caddie,
  which Japan does not do and the caddie fee is already on the bill (→
  キャディさん、今日はありがとうございました。);「領収書はください」is ungrammatical, は
  cannot mark what you are requesting (→ 領収書もお願いします);「駐車場はどこに停めれば」
  parks the car park (→ 車はどこに停めれば);「夜は静かにしてもらえますか」tells the
  front desk clerk to pipe down (→ 隣の部屋に注意してもらえますか);「お飲み放題」takes an
  honorific it never takes (→ 飲み放題);「これは乗りますね」was glossed "that'll play"
  when 乗る means landing ON the green; 「レンタルクラブは何番まで」counts rentals by
  club number instead of 何本セット. Deleted rental's
  「支払いは現金ですか、カードですか？」, a 0.96-similarity twin of course's
  「お支払いは…」 (545 → 544). Kept the pattern families (〜をください, 〜までお願いします)
  and the 今日/本日 and これをください/これください pairs, but rewrote their glosses so
  they read as register and particle-drop lessons rather than repeats.
  Added 4 `GLOSS` words (ちゅうい, なんぼん, セット, キャディさん).
  Verified in browser at 390px light and dark: 544 cards, deck length 544 with 544
  unique, 40 cards walked with 0 repeats, 0 unglossed chunks, 0 duplicate jp/en/
  gloss keys, 0 kana leaks, 0 em-dashes or middots, theme checkboxes filter and
  persist across reload, Uncheck all shows its own empty message and tapping it is
  a no-op, Review ★ composes with the checkboxes, deep links restore state, all 13
  Talk runs still cover every card, kanji and character decks untouched, 0 console
  errors, no horizontal overflow. sw VERSION → gj-v25.
  **Open, needs Henry's call:** the content gaps found in the same pass. Golf is
  missing the Japan-specific course furniture (2グリーン, スループレー vs 昼食休憩,
  乗り入れ, プレイング4/前進4打, OK/コンシード, 組み合わせ), and the living-in-Japan goal
  has almost nothing behind it: Casual is only 14 cards and there is no 役所 /
  住まい / 銀行・携帯 / 病院 / ゴミ出し / 職場 material at all.

- **2026-08-07 (session 14, taxi scene):** Henry asked for a taxi scene, the
  first Unit 4 conversation entry point (airport / rental car / hotel still have
  cards but no scene). New Talk scene **タクシー** (18 steps, です・ます, driver as
  npc), covering the whole ride start to finish: どちらまでですか (dochira, the
  polite "where to"), この住所までお願いします, luggage into the トランク, the
  automatic-door warning ドアは自動です。触らないでください (the pattern payoff of the
  scene: 触らないで ＋ ください as the standard "please don't ~", and the fact that
  Japanese taxi doors really do open by themselves), どのくらいかかりますか →
  三十分ぐらいです, 高速を使いますか → その方が早いですよ (sono hou ga as the comparison
  frame), このあたりですか → そこで止めてください, the fare さんぜん にひゃく えん,
  カードは使えますか, and 領収書をお願いします (the formal receipt, not レシート).
  Added the 12 new words the reveal breakdown needed to `GLOSS` (768 → 780):
  トランク, ドア, じどう, さわらないで, わかりました, さんじゅっぷん, つかいますか,
  その, ほう, あたり, とめて, いれますね.
  Verified: all 18 lines tokenize clean against the real `tokenize()` (0 leaked
  kanji/Latin, 0 missing romaji; は reads wa as a particle and ha inside はい,
  さんじゅっぷん → sanjuppun, りょうしゅうしょ → ryoushuusho), 0 unglossed chunks,
  no duplicate scene ids or gloss keys. Browser-verified at 390px light and dark:
  `#talk/taxi` deep link opens the scene, the picker shows タクシー, reveal gating
  goes hidden → visible on Space (matched against proshop as the control), played
  through to 18/18 which wrote `gj_sceneDone {"taxi":{"ok":18,"miss":0}}`,
  breakdown rows render on every card, 0 console errors, no horizontal overflow.
  sw VERSION → gj-v23. Caught one self-inflicted rule break mid-session: the
  door line's teaching note used an em-dash, rewritten before shipping.
  Follow-up same session ("phrases in cards too"): the taxi lines are now a
  sentence-card category as well, so they enter the weighted Review ★ deck
  instead of living only inside the scene. New **Taxi** pill in `SENT_CATS`
  (placed after Airport, the trip order) with **52 cards**, bringing the deck to
  545, plus a `RUN_META.taxi` entry so it is also playable in Talk as the
  `run-taxi` sentence run. Coverage beyond the scene: catching one (空車ですか,
  タクシーを一台お願いします), five destination frames on the same 〜までお願いします
  pattern, luggage (ゴルフバッグは入りますか), riding (シートベルト, 窓を開けてもいいですか,
  エアコンを弱くしてください), time and traffic (何分ぐらいかかりますか, 道が混んでいます,
  九時までに着きますか teaching までに as a deadline vs まで as until), route
  (高速代は別です, 下道でお願いします), directions (まっすぐ, 次の信号を右, 左に曲がって),
  four ways to stop the car, waiting (ここで待っていてください, 十分で戻ります), and
  paying (現金で払います, おつりはいいです, 助かりました). Added 32 more words to
  `GLOSS` (780 → 810). Three of my drafted lines collided with existing cards
  (タクシー乗り場はどこですか was already in Airport, ありがとうございました and
  どのくらいかかりますか in Konbini); per the session-9 dedupe rule I kept the first
  occurrences and replaced mine with taxi-specific lines, so the deck still has
  0 exact-jp duplicates. Also caught myself writing してください as one chunk when
  the corpus splits it as して ください in all 10 other places, fixed to match so
  it reuses the existing glosses. Verified: 52 cards tokenize clean, 0 unglossed
  chunks, 0 duplicate gloss keys, 0 em-dashes or middots in the new copy.
  Browser-verified at 390px: the Taxi pill renders and filters, deep link
  `#cards/sent/taxi/j2e` selects it, flip reveals the written form, meaning and
  word breakdown, ✗ Missed writes to `gj_sentStats` and the card then shows up
  under Review ★, and `#talk/run-taxi` plays it as a 52-line run. The deck
  counter reading "Card 1 of 104" for 52 cards is the existing `weightedDeck`
  behavior (unseen cards get weight 2), matching airport 54 → 108 and izakaya
  50 → 100, not a regression. sw VERSION → gj-v24.
  **Next up:** airport / rental car / hotel scenes to finish Unit 4.

- **2026-07-29 (session 13c, readings explainer):** Henry asked in chat whether
  a kanji has one reading and whether the set is infinite like Mandarin, then
  asked to fold the answer into the app. Extended `#kanji-explainer` (Kana tab,
  漢字 pill) with three things: why one kanji carries several ON readings (呉音 vs
  漢音 borrowed centuries apart, 行 = コウ in 銀行 but ギョウ in 行事), the two sound
  rules that bend readings inside words framed as his dakuten pattern (rendaku
  手 ＋ 紙 = てがみ, counter gemination 一 ＋ 杯 = いっぱい, 六 ＋ 百 = ろっぴゃく),
  and the punchline that a reading belongs to the word, not the character. Second
  new paragraph bounds the set: tens of thousands in Chinese dictionaries vs
  2,136 常用漢字 plus ~863 name kanji in Japan, a few hundred for signs and menus.
  New example row 手紙 / 一杯 / 六百. Verified at 390px light and dark: both rows
  render, the kata pill still swaps back to the kana explainer, no overflow,
  0 console errors. sw VERSION → gj-v22.

- **2026-07-29 (session 13b, no red in the charts):** Henry: "for kana grid I
  don't want you to show the red bordering, idk what that is for." It was the
  `weak` marker (missed more than got). The charts now draw only `strong`, via a
  new `chartCls()` that filters `statClsIn` down to it; `statClsIn` itself stays
  as the shared status function because the Path chips and the export still count
  weak and solid. Dropped the now-unused `.kana-cell.weak` CSS and the kana note
  line that promised red. Verified with seeded stats: a 0-right/3-wrong kana and
  kanji both render with the normal sage border, a solid one still goes green,
  Path still reads 1/182 solid, 0 console errors. sw VERSION → gj-v21.

- **2026-07-29 (session 13, kanji romaji + every menu is a link):** Two asks.
  (1) Henry can't pronounce the kanji readings, so both kanji surfaces now print
  romaji under the kana: the 漢字 chart cell gets a `.rm` line and the kanji card's
  `#card-roma` shows the kana readings with romaji beneath (入 → ニュウ / はい.る /
  い.れる → nyuu / hai.ru / i.reru). New `readingRomaji()` next to `wordRomaji`
  splits a reading on its non-kana separators, romanizes each kana run, and puts
  the dots and slashes back, so okurigana dots and alternative readings survive;
  `kanaRomaji()` forces は to ha because a reading is a word, never a particle
  (張 は.る = ha.ru, which the tokenizer's end-of-word wa rule got wrong). Checked
  all 182 entries: 0 leaked kana, 0 empty.
  (2) "Make every menu have links" → hash routing, Henry picked deep-linkable
  URLs. `routeHash()` builds the hash from state, `applyHash()` applies it, and
  each menu setter calls `syncHash()` (pushState); a `routing` flag stops the
  setters pushing while a hash is being applied. Grammar: `#talk/<sceneOrRunId>`,
  `#kana/<kata|hira|both|kanji>`, `#cards/char/<set>/<dir>`,
  `#cards/sent/<cat>/<dir>`, `#cards/kanji/<cat>`, `#num/<say|hear>`, `#path`,
  `#phrase`. `oneOf()` validates every segment against the real pill keys, and a
  partial or unknown link is rewritten to what's actually shown (#cards →
  #cards/char/kata/k2r, #bogus → #path). Back/forward walks the menu history
  instead of dropping out of the app, and a no-hash launch replaceStates to #path
  so the installed PWA still opens on Path. Drill and 筆順 stay toggles, not routes.
  Browser-verified at 390px light and dark: deep links into the kanji/sentence/
  numbers/scene menus restore their pills, pill clicks push, Back restores the
  previous pill state, forward works, romaji stays hidden until flip, 182 chart
  cells render with romaji, 0 console errors, no horizontal overflow.
  sw VERSION → gj-v20.

- **2026-07-29 (session 12b, kanji):** Henry asked for common kanji in the Kana
  section, then "also cards for kanjis". This reverses the old "kanji no" rule
  for *recognition* (he still writes and speaks in kana; kanji is read-only).
  He picked the set: signage kanji + every kanji appearing 3+ times in the app's
  own lines. New `kanji-data.js`: 182 entries, `{g,k,on,kun,en,w,wk,wg}`, where
  g is "sign" (53: doors, stations, ticket machines, clinics, calendar) or "app"
  (129, and a script confirmed all 132 kanji with 3+ uses are covered).
  Kana tab: a 漢字 pill renders a wider grid grouped by those two headings, with
  ON reading (katakana) / kun reading (hiragana, dot before okurigana) / meaning
  / a real word, tap to hear the word. Kanji mode hides the 筆順 pill (the stroke
  font is kana-only, verified against its cmap) and the drill pill (the drill
  types romaji), and swaps in a kanji explainer: ON vs kun, why 空港 is kuukou but
  空 alone is sora, and that kana came from worn-down kanji (安→あ, 宇→ウ).
  Cards tab: a third mode 漢字 with pills All / Review ★ / Signs / From your
  lines. Front is the kanji alone, flip shows both readings, meaning, and the
  word, then ✗/✓ self-grade into `kanjiStats` (localStorage `gj_kanjiStats`),
  which also colors the chart red/green. Refactors instead of copies: extracted
  `weightedDeck(items,keyOf,stats)` (sentence deck and kanji deck share it) and
  `statClsIn(stats,ch)` (kana chart and kanji chart share it); the kanji card
  reuses the character-card DOM slots and the sentence grade row via
  `gradeCard()`. Path gains level 5 "Kanji, the 182 you'll actually meet"
  (old 5-8 shifted to 6-9), and the export now reports kanji practiced/solid/weak.
  Browser-verified at 390px light and dark: 182 cells, group headings, pill
  toggles restore the kana chart and drill, flip gating, grade writes to
  localStorage, Review deck picks up the missed kanji, chart marks it weak,
  char and sentence modes still work, 0 console errors, no overflow.
  sw VERSION → gj-v19, kanji-data.js added to the cache list.

- **2026-07-29 (session 12, Talk becomes the main surface):** Henry: the card
  system is fine but he wants to live in the Talk tab, with "the same kanji and
  reveal like the 'them' card throughout everything" and no your-turn framing.
  Two decisions from him: (a) every sentence card becomes a **sentence run** in
  Talk, one per category, played in authored order; (b) **no grading anywhere in
  Talk** ("don't need to record got it or missed for anything").
  Built: `RUN_META` + `RUNS` (generated from `SENTENCES` by `cat`, plus a
  `run-phrases` run over `PHRASES`) and `TALK = SCENES.concat(RUNS)`. Talk picker
  now has two sections, Scenes and Sentence runs, with line counts. 12 runs,
  508 lines, and a coverage check confirmed 0 sentence cards left out.
  `renderTurn()` (the red your-turn card with intent, hint, mic and ○/✗ grading)
  is deleted; one `renderStep()` renders every line as the same reveal bubble:
  kanji, kana readings with romaji hidden, then Reveal shows meaning, hint (if
  any), source caption (if any), and the word-by-word breakdown. Scene "you"
  steps fall back to `intent` for the meaning so nothing was lost. `.turn-card`
  CSS gone; `.bubble.you` is the same card right-aligned with a vermilion label.
  Mic survives as a 🎤 tool button on every card. Space/Enter/→ now drives Talk
  (reveal, then next), same rhythm as Cards. Progress is now "played to the end"
  (`sceneRun()`, `sceneDone[id]={ok:lines,miss:0}`), so Path levels 3/5/6 read
  "played" instead of "perfect". Cards keeps its ✗/✓ self-grade and the weighted
  Review ★ deck: retention lives there, Talk is for reading volume.
  Browser-verified at 390px in light and dark: reveal gating hidden→visible,
  npc and you cards identical apart from side/label, run picker, phrases run,
  end-of-run recap, localStorage write, 0 console errors, no horizontal
  overflow. sw VERSION → gj-v18.

- **2026-07-25 (session 11, word-by-word breakdown on reveal):** Henry wanted
  the Phrases and Cards reveals to show the *decomposed* meaning, the way I break
  a sentence into words when he asks in chat, not just the whole-sentence gloss.
  Built a shared word-gloss dictionary `GLOSS` (768 entries, one per unique
  space/punct-separated word across every scene + phrase + sentence card) plus a
  `decompose(kana)` + `partsHtml(kana)` primitive next to `kbHtml`. Reuses the
  word boundaries already encoded as spaces in the `kana` strings; particles get
  their grammatical role in [brackets] (は [topic marker], を [object marker],
  の [of / 's], と [and / with], etc.), the pattern Henry likes. Wired the same
  breakdown into three surfaces (he chose "stacked list below the meaning" and
  "also Talk scenes"): Cards Sentences reveal (`#sent-parts`, cw-back so hidden
  until flip, works in both j2e and e2j directions), the Phrases kit (under each
  phrase, blurred with the rest in Hide mode), and Talk reveal cards (NPC bubble
  `.parts-reveal` unhidden on Reveal, your-turn card inside the already-gated
  `.answer`). Each word row is tap-to-hear (reuses `say()`). Glossed via 6
  parallel agents against a pinned convention spec, then merged and verified:
  all 768 keys present, 0 unglossed chunks across all 588 kana lines, 0
  em-dashes/middots. Browser-verified at 390px: reveal gating hidden→visible in
  both card directions, 15 phrases + Talk NPC/turn all render the breakdown, no
  horizontal overflow, 0 console errors, dark-mode colors resolve. Sample card
  now reads: ポイントカードはありません。/ "I don't have a point card." /
  ポイントカード = point card / は = [topic marker] / ありません = there isn't.
  sw VERSION → gj-v17. Future mined/chat cards auto-decompose; add any new word
  to `GLOSS` (a missing word just shows blank, never breaks).

- **2026-07-23 (session 10, casual register + Talk reveal cards):** Two changes
  from Henry. (1) He pointed out every scene is a polite service transaction
  (です・ます, you-vs-staff) with zero casual peer register — no plain-form
  banter like the roll-cake exchange we did in chat (食べない？ negative-invitation,
  なら conditional, いいね, おごる). Added a **casual track**, not a rewrite of the
  service scenes: a new Talk scene **ハーフの休憩** (halfway break with a golf buddy,
  Tanaka, plain form, 12 turns — 疲れた？/なにか食べる？/ロールケーキ食べない？/食べるなら
  僕も食べる/僕がおごるよ/え、いいの？/後半も頑張ろう/行こう), plus a **Casual** sentence-card
  pill (`["casual","Casual"]` in SENT_CATS after Answers) with 13 banter one-liners.
  (2) Henry wanted the Talk conversation to be reveal cards too — no romaji
  spoilers. Reworked `renderNpc`: NPC lines now hide romaji (CSS
  `.bubble.npc .kb .tr{visibility:hidden}` until `.revealed`) AND the meaning,
  show them together on a **Reveal romaji + meaning** tap, and require a manual
  **Next →** (removed the 600ms auto-advance). Your-turn cards were already
  reveal-style (unchanged). Verified in browser: casual scene 12 steps + 13 cards
  all tokenize clean (0 leaked kanji/latin — punctuation-only empties expected;
  つぎ は→wa, こうはん→ha inside word, all volitionals read right), 0 dups, Casual
  pill renders + filters, NPC reveal hides→shows romaji+meaning→Next advances,
  existing konbini greeting is now a reveal card too. sw VERSION → gj-v15.

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
