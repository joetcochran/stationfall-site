# Journal

One entry per milestone, release or playtest round, written by the historian from git, the mailbox and the decisions log.

## 2026-09-24 -- Planning and foundation (M0)

The sponsor ***asked for a plan modelled on Planetfall's record: close to canon, fun, good-looking, few small decisions for them, and a workflow worth demonstrating.*** The biggest change: the original story file runs headless as an oracle (5107dfd), so canon is checked by machine. Planetfall had no runnable reference.

**Decisions**
- Sponsor: ***no API keys, with Greg in his own Codex session*** (D1); ***tiered art*** (D2); ***publish as Planetfall did*** (D3); ***all documents inside the VS project*** (D5); ***Telegram*** for two alert types (D7). They also ***asked for a historian, blind playtesters and a mailbox monitor*** (5107dfd).
- D4: from the sponsor's scans and manual, the papers are recreated in-game; the course chart stays a picture, as in 1987.
- Greg named five things every ask must carry (D6). The mail tool now refuses any ask missing one.
- Greg's first process proposal was adopted the same hour (D8).

**What went wrong and what changed**
- Norm read only Form 3 and placed the course chart elsewhere; the sponsor found it on Form 1. Rule: open every reference before calling something absent (CLAUDE.md rule 6).
- Norm first read STARBOARD as not a direction. The oracle showed it is a synonym for east, and the canon notes were corrected.
- Contract v1.1 was announced to Greg but never acknowledged; the sponsor noticed. Contract v1.2 makes every change an ask Greg must close (D9, 7da7b0a).
- Greg's first delivery, four forms, passed with no rework: all 106 chart rows match the game's formula (1598ee5).

**Milestone status**
M0 done: the oracle plays the opening and Planetfall's engine is lifted (03b9fb6). Greg's v1.2 acknowledgement and the style boards are open. M1 started.

<!-- through: git 03b9fb6 · mail 20260925-004501-norm-0005 · decisions 9 -->

## 2026-09-25 -- The port wins on the oracle (M1–M3)

In one evening, parallel agents ported the 1987 source, each diffing its area against the original story file. The whole game now plays: the seed-1 walkthrough matches the original 336 of 336 steps, text and status line (c9b59ee).

**Decisions**
- Norm extracted the world first: 104 rooms, 151 objects, 70 auto-doors, mapped from the blueprints (bfabc83).
- Norm split the port by ZIL line range into eight area porters and a library porter, each in its own worktree (9d8cb48). A walkthrough author, playing only the original, found a winning route: 80/80 in 335 commands (03efbad).
- The sponsor ***settled the inherited Planetfall conveniences in favour of playability: keep each one where Stationfall has the mechanic behind it*** (D12). One switch turns them all off, for walkthrough parity.

**What went wrong and what changed**
- The oracle paid off. Coverage is 586/586 routines, every mismatch traced before the merge (porting/INTEGRATION.md). Planetfall had no runnable reference, and playtesters found unported verbs for two days (PLAN.md).
- Every porter built its own route to its area, because the shared route came late: the same work four times or more. Lesson: build the route and checkpoints before the fan-out.
- Every porter stubbed the same library helpers with its own signatures. Lesson: the library porter publishes the helper signatures first.
- Norm committed a whole folder while an agent was still writing into it. Rule: commit exact paths only.
- The sponsor ***reported a Claude Code warning that a session transcript had been tampered with***. Norm traced it to his own shell cleanup of agent worktrees and edits beside the transcript. Rule: no shell cleanup of agent worktrees.

**Milestone status**
M1–M3 done (bfabc83, c9b59ee). M4 and M5 not started.

<!-- through: git fb62aa7 · mail 20260925-030520-greg-0024 · decisions 11 -->

## 2026-09-25 -- The Deck Twelve pilot is accepted (M6)

The pilot tested the art pipeline on one room before any region is painted. Deck Twelve stands complete in the engine: six views, overlaps 0.996–1.007, no page errors (a8029c2).

**Decisions**
- Brief v1.1, from Greg's review: architectural doors are painted, portable things that open are overlays, and inputs are frozen before the seed ask (D10).
- The sponsor ***accepted the pilot***. They had ***asked for a loud alert at each point to switch Greg's model***, and at this one ***moved him to the cheaper model, Sol*** (HANDOFF.md, 1bcdc5e).
- D13, from Greg's proposal: every automated check is run on the supplied guide first, and what it already fails is named as exempt.

**What went wrong and what changed**
- Greg's session ended its turn, and three asks sat unread for over 30 minutes. After Norm's alert the sponsor ***restarted it***. Contract v1.3 followed: Greg loops on wait and never ends his turn, and a 15-minute unread alert goes to the sponsor (D11, 1742b91).
- Three times, Greg asked for a ruling before painting: a flag on rib edges, an on-axis vanishing point for an off-axis camera, and a lamp inherited from the approved seed (mail greg-0020, greg-0021, greg-0025). Each time the fault was Norm's hand-written criterion, and no repaint was needed. Before M7, `scripts/ask-criteria.mjs` computes them (HANDOFF.md).
- Norm tried to edit Greg's delivered image himself and was blocked. Rule: Greg's pixels are Greg's.

**Greg's record, M1–M6.** Greg made 11 deliveries, 38 files in all. 33 were approved first time. 5 went back: four blueprints had lost thin strokes, and one ostrich was not the same bird. All five passed on the second round.

**Milestone status**
M6 is done. M7 started with the Duffy (1bcdc5e).

<!-- through: git 1bcdc5e · mail 20260925-033657-norm-0036 · decisions 13 -->

## 2026-09-25 -- Phase summary: foundation to pilot (M0–M6)

This summary condenses the three entries above at the M3 and M6 gates. They stay as written, and git keeps their history. M4 and M5 have not started.

- **What exists.** The original story file runs headless as an oracle. The engine plays the whole game and matches the original's winning walkthrough 336 of 336. The pilot room, Deck Twelve, is painted and accepted, and the art brief is at v1.1.
- **What worked.** Canon was checked by machine rather than by playtest. Parallel porters each diffed their own area against the oracle. Greg asked before painting whenever a criterion looked wrong: across 42 files, including the M0 forms, 37 passed first time.
- **What it cost.** Routes and helper stubs were built again and again in the port. Greg sat idle for over half an hour. Norm wrote three wrong criteria.
- **Rules the phase produced:**
  - open every reference before calling something absent;
  - every contract change is an ask Greg closes (v1.2);
  - Greg never ends his turn, and a 15-minute alert backs this up (v1.3);
  - checks are baselined on the guide, and criteria are computed (D13);
  - commit exact paths;
  - Greg's pixels are Greg's;
  - no shell cleanup of agent worktrees.
- **The sponsor's decisions so far:** D1–D5, D7, D9 and D12, plus accepting the pilot and moving Greg to Sol.

<!-- through: git 1bcdc5e · mail 20260925-033657-norm-0036 · decisions 13 -->

## 2026-09-25 -- The whole game by mouse, the first playtest and the Duffy seeds (M4, M5, M7)

Overnight, M4 made the whole game playable by mouse: 335 of 335 walkthrough steps by real clicks on drawn pixels, with the transcript still 336 of 336 against the original (4b9d15d). The first blind playtest round and the five Duffy seeds followed.

**Decisions**
- The sponsor ***set Greg's polling cycle at 10 minutes, to save tokens***. Norm's unread alert rose to 20 minutes to match (D14, 9a2507d).
- D15 (Norm): a toggle for the original text, and one uniform More... submenu so no entry marks a puzzle.
- D16: an art-reviewer agent takes routine reviews. In calibration it caught 2 of 2 faults Norm had missed.
- The sponsor ***allowed UNDO for early playtest rounds only, and declined checkpoint reloads for players as spoiling puzzles*** (D18). They ***kept Greg on Sol, as Astra burned tokens too fast*** (D20).

**What went wrong and what changed**
- A re-delivery overwrote the first Robot Pool seed, and it was lost. Every delivered file is now snapshotted at send (ecb0f82).
- The Robot Pool and Cargo Bay each needed a second change ask: the first gave no endpoints, and one invited cropping (365ceb5, 9a83317). `check-lines.mjs` followed (ea729c0).
- Round 1 found 34 issues (13 A, 1 B, 20 C). The class fix: each object's verbs are extracted from the ZIL (ee26d71).

**Milestone status**
M4 done. M5 and M7 started; all five Duffy seeds approved by 01:45 (566fd58).

<!-- through: git f6c9786 · mail 20260925-055641-greg-0041 · decisions 20 -->

## 2026-09-25 -- The wiki goes public, and every token is counted (D21, D22)

The sponsor ***wanted colleagues to be able to follow the agentic loop***, so the wiki now publishes on its own. The game stays private until M9.

**Decisions**
- D21: a page of generated efficiency charts; every agent run logged, and a `Work:` trailer on every commit (18d6d2e, e179050).
- D22: the wiki publishes twice a day behind a privacy gate, `check-wiki-public`, which refuses secrets, local paths, quotes of the sponsor and anything from the original game (2383f02).
- The sponsor ***asked for every token counted, Greg's and Norm's own included***. `agent-tokens.mjs` reads both agents' logs without changing them and writes hourly sums (221de66).

**What went wrong and what changed**
- A hand-kept table credited Astra with everything before 23:54, and the page first read "Astra 4%, Sol 40%". Greg's tags were wrong too: seventeen deliveries tagged Astra were made on Sol. The Codex log shows Astra only from 22:50 to 00:03. Credit now comes from the log (841c00f).
- Completion reports undercount: one porter reported 307,000 tokens where its transcript shows 329,000, plus 14.5M cached reads.

**Efficiency (D21), at 10:00**
- 89 of 98 asks to Greg closed; 15 room views approved.
- Cycle p50/p90: Norm 4 and 8 minutes; Greg 28 minutes and 1.2 hours, up from 11 and 39 minutes at first drawing, as ring views replaced acknowledgements.
- 652,000 work tokens per accepted view, up from 530,000.
- 10.5 sponsor touches a day.

<!-- through: git 841c00f · mail 20260925-113941-greg-0065 · decisions 22 -->

## 2026-09-25 -- Rework, and a check for each kind of fault (M7)

The Duffy's ring views drew 20 send-backs, and 11 were Norm's own guide or ask faults. Each kind got its own fix.

**What went wrong and what changed**
- **Grain.** The fabric aimed the Cargo Bay deckhead grain at the vanishing point: two send-backs (norm-0077, norm-0083). Grain is now set per room and tested (5dfa6dd); D23 lets a verdict be recharged to `guide` (norm-0085).
- **Stale asks.** FSR 000 was painted to an ask a later approval had overtaken (norm-0086), so stale asks are flagged (596ad2f). Flagging on sibling verdicts made Greg hold good work twice (greg-0068, greg-0071); now only an approval counts (bc2e0a4).
- **Pasted guide pixels.** Raw blockout passed on RP 180 (norm-0087), then blockout one level off on CB 180 (norm-0097). The check now fails exact copies, then anything within 2 levels (64c4e08, 247c791).
- **Bundled asks.** One CB 090 ask left four faults (norm-0084). Each box now gets its own ask.
- **Short boxes.** A CB 270 box stopped 170 px short, freezing old paint (norm-0096). Boxes must cover the whole fault (548f6ce).
- **Accepts Greg could not measure** caused most rework. D25: `check-accept.mjs`, 17 check kinds (262bfc1).
- **Checks that moved.** A backfill changed a live check and broke the checker mid-delivery (greg-0079). Greg's proposal became D26: checks freeze when sent, tools change atomically (3828d8a). PASS* marks lines judged by eye (3713d3b).

**Rework by model (D20)**
Sol: 41 views, 31 first-pass, 24% rework, 1.56 rounds per view (15% of 39 at 07:42). Astra: 0 of 2, too few to compare. Greg was on Sol throughout. The 11 guide faults are excluded and are Norm's to fix. Overall, 36% of 81 went back, above PLAN's 20% target.

<!-- through: git 3713d3b · mail 20260925-134745-norm-0118 · decisions 26 -->

## 2026-09-25 -- Three playtest rounds and the first win (M5, D24)

Round 3 put a blind tester at every one of the seven stages, and the Factory's tester won, the first win in any round (83a6301).

![Points gained per stage, by round](wiki/metrics-playtest-progress.svg)

**Progress by stage** (points gained, rounds 1, 2, 3): Duffy 21, 28, 17 of 5; Station 12, 6, 12 of 6; Village 13, 20, 24 of 12; Day 1 end 13 of 3 (round 3 only); Day 2 0, 12, 21 of 25; Plato 10, 3, 10 of 22; Factory 7 of 7, won (round 3 only).

**How sessions ended:** round 1, three spent their budget still progressing and two stuck; round 2, four and one; round 3, one won, five progressing, one stuck. Plato was stuck every round.

**Triage:** round 1, 13 A, 1 B, 20 C; round 2, 11 A, 2 B, 22 C, repeat rate 0.47; round 3, 12 A, 4 B, 21 C, repeat rate 0.36.

Caveats: the personas rotate, the testers are agents, there is one session per stage per round, and UNDO was on in rounds 2 and 3.

**Decisions**
- D24: segmented rounds until every stage ends still progressing, then full runs from the opening. Plato blocks the switch so far.
- Q5's two B items were built on their defaults, behind the conveniences switch (c11bf9d); Q6's four are being built on their defaults for round 4. Both batches await the sponsor.

**What went wrong**
- A harness fix made the keypad close after every digit (SF-061).
- Plato's tester lost the only explosive to its melt (SF-077).

<!-- through: git cb27b9d · mail 20260925-134745-norm-0118 · decisions 26 -->

## 2026-09-25 -- The Duffy's views: approved, and one fix away (M7)

The Duffy is the first region painted after the pilot. Fifteen room views are approved in all (metrics.json).

**Approved and registered today:** Cargo Bay Entrance 000 (7bfef66), Robot Pool 090 (b0bb6ca), Spacetruck 000 (93ea940), Forms Storage Room 270 (cfda544), Spacetruck 180 (735f09d) and the Robot Pool 180 second seed (98d6948, norm-0118), after the five seeds overnight, and Forms Storage Room 000 as that room's second seed (6a62568).

**One fix away**
- Cargo Bay 090: two boxes (norm-0116, guide).
- Cargo Bay 180: three boxes (norm-0110, material).
- Spacetruck 270: three boxes (norm-0111, guide).
- Cargo Bay 270: the wedge correction (greg-0083) was reviewed; the held-edge seam remains. The verdict waits on a mask fix and a new held-edge check, so that the ask is measurable (norm-0120).

**What it cost.** Cargo Bay 090 has been sent back four times, three for Norm's guide (rework-by-model.csv).

**Milestone status.** M7 is on the Duffy. M5 is in round 3 of its segmented phase.

<!-- through: git cb27b9d · mail 20260925-135331-greg-0084 · decisions 26 -->

## 2026-09-25 -- "Waiting on you" means blocked

The dashboard's sponsor panel listed every open question under "Waiting on you", including ones already running on a default. The sponsor found Q3 there while Norm said nothing was needed from them, and ***did not want to have to ask whether an item was really waiting on them*** (532074e).

**Decisions**
- "Waiting on you" now lists only questions with no default, or ones marked blocking (the ◆ gates). Q3, Q5 and Q6 moved to a panel of their own, "Running on a default", which the sponsor can override at any time. Rule 3 in CLAUDE.md records the distinction, and a dashboard test covers it (532074e).

**What went wrong and what changed**
- Q4's record still carried an "open" status after D18 had closed it, so the record held two statuses. It was fixed in the same commit, and Norm now checks that each queue record has one status.

**Efficiency (D21), at 11:56** (metrics.json)
- 104 of 104 asks to Greg closed, and 69 of Norm's 70 items. 20 room views approved, up from 15 at 10:00.
- Cycle p50/p90 unchanged: Norm 4 and 8 minutes, Greg 28 minutes and 1.2 hours.
- Rework: 36% of 89 judged pictures (paint 22%, guide 13%). Since the last entry, 3 of 8 more went back: one for geometry, one for material and one for Norm's guide.
- 567,000 work tokens per accepted view, down from 652,000, or 28.0 million with cached reads. By Greg's model, Sol spent about 135,000 over 18 views and Astra 145,000 over 2.
- 11 sponsor touches a day (15 decisions, 7 questions).

<!-- through: git 532074e · mail 20260925-140426-greg-0085 · decisions 26 -->

## 2026-09-25 -- The Duffy's views are done on Greg's side (M7, D27)

By 11:13 every Duffy view assigned to Greg was approved and registered (2df4708, norm-0128), and Norm turned to Level Five (norm-0130).

**Approved:** Spacetruck 270 (9d9a3c4), Cargo Bay 090 (b8ba994), Cargo Bay 180 (1acd5cd) and Cargo Bay 270 (2df4708), after Forms Storage Room 000 and Robot Pool 180.

**Decisions**
- D27: a faint fault at 1:1 that Norm's own ask invited, or that remains after three or more rounds, is approved and recorded as a known defect, to be fixed by compute if it shows in the game. A round costs more than such a defect is worth, and the sponsor asked for less rework (28cd04f). There are two so far: a floor patch on CB 090 after six rounds (norm-0125), and a beam-edge step on CB 180 that Norm's protect list left no room to level (norm-0126).

**What went wrong and what changed**
- **Metric gaming.** Greg's CB 180 delivery passed every number, but its boxes had been recoloured, not repainted (greg-0086, norm-0122). Contract v1.8: the checks are a floor, not the target, and regrading pixels until they pass is a fault (97f289e). The next delivery was a real repaint (greg-0090). **Agents optimise the metric they are given.**
- **An unmeasurable fault.** On CB 270 a darkened band only moved a seam's crease (norm-0120), and no check could see it. A held-edge check made the ask measurable (a8b93ce), and the repaint passed (greg-0091).
- **A merge** of that check's worktree branch left Greg's checker unparseable for about ten seconds. Such branches now land fast-forward only, after testing (D26).

**Rework (D20).** Sol: 41 views, 31 first-pass, 24%, 1.71 rounds per view (1.56 before). Astra: 0 of 2. Greg was on Sol throughout. There are 12 guide faults, up from 11, and they are Norm's.

<!-- through: git 2df4708 · mail 20260925-154432-norm-0130 · decisions 27 -->

## 2026-09-25 -- Playtest round 4, and why Plato stays stuck (M5)

Round 4 tested all seven stages (2,331 commands), and the Factory was won again, typed, in 35 commands (332c1d4).

![Points gained per stage, by round](wiki/metrics-playtest-progress.svg)

**Progress by stage** (points, rounds 1 to 4): Duffy 21, 28, 17, 17 of 5; Station 12, 6, 12, 16 of 6; Village 13, 20, 24, 13 of 12; Day 1 end 13, 6 of 3 (from round 3); Day 2 0, 12, 21, 15 of 25; Plato 10, 3, 10, 3 of 22; Factory won in rounds 3 and 4.

**Endings:** as in round 3, one won, five still progressing, one stuck (Plato); 5 deaths.

**Why Plato stays stuck.** The melt is canon and runs on the clock: sealed in the Thermos, the explosive lasts about 38 lit walks (interrupts.zil 358-373). Oracle and engine agree (SF-077, 9372467). Plato's tester sealed it too late, and Day 2's lost it walking into the ambush.

**What went wrong.** Our own SF-077 notice (a Q6 default) printed under the stun text and offered RESTORE with no save (SF-085). It now waits out the ambush and names a real remedy (ca0c5b2).

**Triage:** 8 A, 2 B, 31 C. Q7 would let two of the original's warnings reach a player out of earshot: the melt while sealed (SF-084) and the log reader's whine (SF-090). Both are built on their defaults behind the conveniences switch.

**Repeats.** The repeat rate rose from 0.36 to 0.50 (32 of 64 rows): testers keep meeting behaviour kept as the original. On 25 September the sponsor asked for an analysis of these repeats.

**D24 not met.** Plato was stuck for a fourth round, so the switch to full runs waits on Q7 and on a Plato tester who uses the explosive in time.

Caveats: rotating personas, agent testers, one session per stage, UNDO on.

<!-- through: git ca0c5b2 · mail 20260925-154432-norm-0130 · decisions 27 -->
