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

## 2026-09-25 -- Round 4 explained, and the sponsor's answer on repeats (M5, D28)

Before round 5, Norm checked round 4's lower scores, and the sponsor decided the issues testers kept meeting.

**The score drop was noise.** Every round-3 and round-4 session, replayed on the current build, matched on every command. Of the 27 points lost over six stages, 21 came from one clock-driven event: Plato's ambush, worth 7 points, which from the middle checkpoints lands inside a 400-command leg about half the time. Without it the six stages moved by −6 in all (SCORE-DROP-INVESTIGATION.md, 31cd947).

**Decisions**
- D28 (Q8, from the repeat analysis in a055be1). Following ***the magnet pattern from Planetfall***, the boots warn once before they wipe the ID card, and the worn drill warns once that it has one hole left. Norm had proposed a notice after these dead ends; the sponsor chose warnings before them. The airlock gets a stencilled notice to secure open containers. The leash nudges toward gravity after the third identical failure, and WEAR takes the thing first. Fast informed deaths stay as the original. Adding words the game prints is now a standing rule of every triage. All of it is behind the conveniences switch and marked as deviations (193caca).
- Q10 (sessions per stage) runs on its default: one per stage, each stage's mode fixed, and a change counted only beyond about 12 points with the ambush taken out (296b08f).
- Testers now play their whole budget, and restart the checkpoint, not the opening (296b08f).

**What went wrong and what changed**
- Q9 had been written onto Q8's line in `queue.jsonl`, two records on one line. Norm split them, and a test now checks that every decision log holds one object per line (6dc54cb).

**Milestone status.** M5 goes to round 5 on the D28 build.

<!-- through: git 193caca · mail 20260925-164343-greg-0092 · decisions 28 -->

## 2026-09-25 -- Round 5: our own warnings misfire, and testers get memories (M5)

Round 5 played all seven stages on the D28 build, 2,430 commands, and won the Factory again (8d60655).

![Points gained per stage, by round](wiki/metrics-playtest-progress.svg)

**Progress by stage** (points, rounds 1 to 5): Duffy 21, 28, 17, 17, 26 of 5; Station 12, 6, 12, 16, 12 of 6; Village 13, 20, 24, 13, 27 of 12; Day 1 end 13, 6, 3 of 3 (from round 3); Day 2 0, 12, 21, 15, 18 of 25; Plato 10, 3, 10, 3, 10 of 22. Without the ambush, which came in three sessions, Village reads 20, Day 2 11 and Plato 3.

**Endings:** one won, four still progressing, two stuck (Plato, and Day 1 end for the first time); 12 deaths, up from 5. Repeats fell from 0.50 to 0.41.

**What went wrong and what changed** (e1b142a, fixed in 9d39ba0)
- **Our own deviations misfired.** Our note on when the player could eat also printed on the coffee's refusal, and two testers came back to drink the poisoned coffee (SF-110). The D28 drill warning's "drill again" led a tester to spend the hole on the wrong thing (SF-111), and the boots warning never said how to go ahead (SF-112).
- **Plato's start is canon.** Its ID card is already wiped by the route (SF-116); the tester took this for a bug and restarted (SF-114).
- **Testers lack the character's memory.** Plato's did not know the safe had been drilled. Checkpoint briefings now list what the character saw on the route, as facts, never advice (`scripts/lib/memories.mjs`). Day 1 end's lost half its leg to a log-reader death and a restart.

**Decisions.** Q11's two B items run on their defaults.

**D24 not met.** Round 6, now being played, tests these fixes.

Caveats: rotating personas, agent testers, one session per stage, UNDO on.

<!-- through: git 9d39ba0 · mail 20260925-180019-norm-0140 · decisions 28 -->

## 2026-09-25 -- The Duffy with the sponsor, and the station's look set (M7)

**The Duffy.** Norm built its last three views by compute (Robot Pool 270, Cargo Bay Entrance 180, Forms Storage Room 090) and registered all ten caps (01aaef8). The Forms Storage Room went to the sponsor, the first room at M7's acceptance gate (norm-0132). A hatch-state change that the permission check refused also waits on them (Norm's report; not in git).

**Level Five.** The Level Five 177 seed was approved in its third round as the station's reference look, with two faint points recorded under D27 (d643531, 220f009, 31ff181). South Junction 239, judged beside it, passed first time (f47c635): the first view to do so since Forms Storage Room 270 that morning (norm-0082). Norm credited the new gate (norm-0140). Four asks followed: the LF 087 ring view and the Commander's Office, Comm Center and PX seeds (fa19afa, b736b90).

**What went wrong and what changed**
- **Pseudo-lettering** showed up in three views in a day, and no check could see it (norm-0134). Norm asked Greg, who owns his generation process, to stop it at the source. Greg proposed a negative block in every prompt, named inspection zones and a 200% pass before delivery (greg-0093). It became contract v1.9 as written (5b9f766).
- The LF 177 call plate cost a round for Norm's guide, whose ask invited a flat graphic (220f009).

**Rework (D20).** Sol: 43 views, 32 first-pass, 26% (24%), 1.72 rounds per view (1.71). Astra: 0 of 2. Greg was on Sol throughout. Guide faults: 13, up from 12.

**Efficiency (D21), at 14:46.** 114 of 118 asks closed; 22 views approved (20). Cycle p50/p90: Norm 4 and 8 minutes, Greg 26 minutes and 1.2 hours. Rework 37% of 93. 637,000 work tokens per accepted view (567,000). 13.5 sponsor touches a day.

<!-- through: git b736b90 · mail 20260925-184407-norm-0144 · decisions 28 -->

## 2026-09-26 -- The Cursor trial: useful work, managerial friction (M7)

From the evening of 25 September to late morning on the 26th, the sponsor paused Claude Code Norm and tried Cursor as a stand-in Norm ("cursor-norm") with Greg. Greg's friction note, written at the sponsor's request, is the main source (greg-0113, `docs/CURSOR-FRICTION-2026-09-25-26.md`). The sponsor followed it through read-only reports from Claude Code Norm (not in git). The afternoon of 25 September (round 6, D29 to D31) is not yet written up.

**Delivered:** a fix for restoring fresh ring views (632cbd2) and four registered views, Level Five 087, Sick Bay 047, Station Control 357 and Commander's Office 099 (9f0a145, 2831f7c, bb3d45d, ce5ea35).

**Decisions**
- D32. cursor-norm kept bringing the sponsor questions Norm would have settled himself. So the sponsor wrote an autonomy rule: ***inside the plan, decide what is in scope and reversible and report afterwards; escalate only real conflicts, irreversible steps, scope, spending or taste***. It applies to any Norm.
- The sponsor closed the trial and handed back to Claude Code Norm (1627aa9, d475377).

**What went wrong and what changed**
- **Order.** Commander's Office 099 was registered before its approval verdict, then unregistered and registered again after norm-0168. Greg proposed that registering refuse a view with no matching approval, and Norm built it the same day: `deliveries.mjs register` now refuses without an approving verdict, and `npm run check` looks for orphans (e0cf56d).
- **Role transfer.** Norm's habits were not in files a new agent reads. The trial left a shared `AGENTS.md`, `docs/AGENT_HANDOFF.md` and Greg's `design/AGENTS.md` (1627aa9).
- **Lost context.** Asks were rebuilt from packages and mail after a scratchpad was lost.
- **Telemetry.** Cursor's runs log no tokens or durations, so the D21 charts miss the trial.
- **Testers.** Cursor's playtesters stopped mid-leg on a usage limit.

**Milestones:** M7 continued. Greg's reading: the coding was sound; the cost was supervision and sequencing.

<!-- through: git d475377 · mail 20260926-135231-greg-0113 · decisions 32 -->

## 2026-09-26 -- Round 7, the first full runs, and Norm back on the art lane (M5, M7)

**Milestones:** M5 and M7 continue. Norm finished round 7, the first played from the opening (D29), and restarted the art lane.

**Playtesting.** Headless Claude testers, kept out of the chat panel at the sponsor's request, finished the click runs from the carried-over state (d179a6c).

![Full-run rounds: score over commands](wiki/metrics-playtest-fullrun.svg)

All three runs used 1,500 commands over four legs; none won. Mean share: first four stages 100%, Day 2 92%, Plato 9%, Factory 0%. Click B reached Plato with 55, still scoring at the cap. Click A reached Plato with 53 and typed Day 2 with 45; both ended stuck. Endings: one cap, two stuck; 29 deaths; 1.64 negative friction rows per 100 commands. First full-run round; agent testers, rotating personas, three runs, UNDO on.

**What went wrong and what changed**
- Comm Center 283 came back 13 minutes after its ask with its dado below the held strip (norm-0169, greg-0114). The guide drew no dado line, so the two-box verdict is Norm's guide fault (norm-0172).
- Greg found the PX 222 ask's port vanishing point unmeasurable (greg-0115). Norm made it manual and took Greg's proposal of family-specific checks that report "not measurable" below two lines (greg-0116, norm-0173).
- check_status used Planetfall role names and failed every "with greg" line (883d427).

**Rework (D20).** Sol: 51 views, 39 first-pass, 24% (26%), 1.65 rounds per view (1.72). Astra: 0 of 2. Greg was on Sol throughout. Guide faults: 14 (13).

**Efficiency (D21).** 134 of 137 asks closed; 29 views approved (22). Cycle p50/p90: Norm 4/10 minutes, Greg 28 minutes/1.4 hours. 648,000 tokens per accepted view (637,000), Cursor uncounted. 9.7 sponsor touches a day (13.5).

<!-- through: git 3f36e70 · mail 20260926-142750-norm-0173 · decisions 32 -->

## 2026-09-26 -- Level Five rooms whole, the checks rebuilt from Greg's pushbacks (M7)

The Commander's Office and Comm Center are whole, rings and caps (44c244b, 5ae853d); PX's ring is closed (48885f1). The sponsor accepted the Forms Storage Room, the second accepted room (431a2fa; `metrics-rooms-accepted.svg`, 698fdb1).

**Decisions**
- Norm, under D32, took Greg's proposals: preflight on writable boxes (greg-0119), lines the guide cannot pass go out by eye (553e7ed), and "silhouettes hard, courses soft" (greg-0146, b5c373d).
- Round 7's 11 A fixes built; Q12 on its default (c8ebf15).
- At the sponsor's request, the room review tags every switch "no view for this" or "look at N deg" (fce21d7).

**What went wrong and what changed**
- Blockout courses sat 20-45 px off; asks now carry the held strip's courses (80616c3). Drawn rules passed; "painted, not drawn" became a check (greg-0130, norm-0188).
- Norm's misses: PX 042 boxes drawn short (norm-0190, norm-0192); CC 283's dado approved unmeasured, repaired as R2/R3 (norm-0193). Repairs escape the verdict count.
- Sick Bay 227 goes to compute (norm-0215).

**Was today slower?** Not per active hour. Registered views: 1.44 an hour on 25 September, 1.50 on the 26th (15 in 10 hours). Changes verdicts fell from 30 to 7 (not 34), guide faults 13 to 3; 72% of verdicts approved (45%). Asks were harder (median score 8, against 5) but closed faster (Greg's median 21 minutes, from 36). Worse: Norm's review p50/p90, 5/10 to 7/19 minutes.

**Milestones:** M7 continues; no new playtest round.

**Rework (D20).** Sol: 66 views, 47 first-pass, 25% (24%), 1.65 rounds (1.65). Astra: 0 of 2. Greg was on Sol throughout (`greg-models.csv`, dated 25 September). Guide faults: 16 (14).

**Efficiency (D21).** 42 views registered (29). Cycle p50/p90: Norm 4/12 minutes, Greg 26 minutes/1.4 hours. 552,000 tokens per view once `tokens.csv` was refreshed (up from about 473,000 that morning: the check-rebuilding agents).

<!-- through: git 5ae853d · mail 20260926-215843-norm-0215 · decisions 32 -->

## 2026-09-27 -- Rounds 8 and 9 without UNDO; round 10 out (M5, M7)

Two full-run rounds with UNDO off, each fixed before the next; round 10 runs (d330802).

**Decisions**
- D34 (sponsor): a 3D Floyd trial, due now Floyd's cutout is hung (e3018bd).
- Norm: D35 fixes new seeds' dado at 1.07 m; D33 records contract v1.12. Q13 and Q14 run on defaults (6918342, 68d336c).

**What went wrong and what changed**
- Finished playtest legs sat unseen up to two hours; the watcher now keeps a seen list and is single-instance (0ca5561, 72e6224).
- Dados came back at eye height because Norm's blockouts drew none; now they do (bff05c6).
- Greg read a two-minute answer (norm-0246) yet held eight rooms about eight hours. His rule became v1.13: a question pauses only its own ask (D36).
- Our boots note read as permission, costing 357 commands (SF-156, reworded).

**Playtesting.** ![Full-run rounds](wiki/metrics-playtest-fullrun.svg)

Round 8 (best 73, 57, 50): Day 2 99%, Plato 42%, Factory 0%; two capped, one stuck; 29 deaths, 5 restarts. Round 9 (57, 54, 54): Plato 18%; one capped, two stuck; 25 deaths, 7 restarts (3 hatch, 2 starvation). Negative friction per 100 commands: 1.89, 1.60 (1.64). Repeat rows (unfiled triage drafts): 62%, 79% (47%). Triage: 9 A, 1 B, 46 C; 7 A, 2 B, 33 C. Round 10 is playing. Agent testers; personas rotate.

**Rework (D20).** Sol: 78 views, 32% (25%), 1.62 rounds. Astra: 0 of 2. Greg was on Sol. Guide faults 16, unchanged: the dado verdicts stayed "geometry", so Sol's rise overstates Greg's share.

**Efficiency (D21).** 47 views (42); 793,000 tokens per view (552,000; tokens logged to 22:59, 26 September). Work log: 102 runs, 25.6M tokens (playtests 8.7M).

**Milestones:** M5 and M7 continue; three Level Five rooms at the sponsor's gate (norm-0250 to 0252).

<!-- through: git 7a8fadc · mail 20260927-102730-norm-0256 · decisions 36 -->

## 2026-09-27 -- Exact lines go to compute; four rooms accepted (M5, M7)

Six contract versions moved exact lines from Greg's image model to Norm's compute (v1.13 to v1.18). Four rooms were accepted, and Plato was hung (6e8d337).

**Decisions**
- The sponsor accepted the Comm Center, PX, Sick Bay and Commander's Office. They ***kept the South Junction's post and sent the strip beside it back through the dashboard, so that the rework is counted*** (f391f62; fixed in 1ff4aeb).
- Norm (D37 to D40): courses and plain edges are placed by compute, because image generation cannot hold them (greg-0179). Scripts only blend.

**What went wrong and what changed**
- Three dado misses followed stale blockouts. The blockouts were rebuilt (e54815f) and the verdicts recharged to guide.
- Two scripted fills passed every check unpainted (greg-0183, 0184). The checks now flag fills (efb3db1), and v1.16 followed. Greg withdrew greg-0184 himself. Five of the next seven deliveries were approved.
- A dead ask sat open for 17 hours: v1.17 lets Norm withdraw one.
- The metrics gave four set-aside deliveries other deliveries' verdicts (`how-we-work.md`).

**Playtesting.** ![Full-run rounds](wiki/metrics-playtest-fullrun.svg)

Round 10 (UNDO off, 1,500 commands a run): 71 (Plato 20/22, stuck), 54 (Plato 3/22, cap), 38 (Day 2 12/25, cap). Mean shares: Day 2 83% (100%), Plato 35% (18%). 36 deaths; negative friction 1.36 per 100 commands (1.60). Round 11 is playing (11, 11, 22). The testers are agents with rotating personas, three runs a round.

**Milestones:** M7: 6 of 24 rooms accepted. M5: no blind win.

**Rework (D20).** Sol: 88 views, 30% (32%), 1.66 rounds (1.62). Astra: 0 of 2. Greg was on Sol. Guide faults: 19 (16), Norm's to fix.

**Efficiency (D21).** 53 views (47). Greg's p90 cycle time was 2.1 hours (1.4), because of the night's stall. 847,000 tokens per view (793,000).

<!-- through: git 0155d71 · mail 20260927-150027-norm-0301 · decisions 40 -->

## 2026-09-27 -- A host crash, 3D characters and slower verdicts (M5, M7)

Work survived a host crash; players gained optional 3D characters (590c764).

**Decisions**
- The sponsor liked the 3D Floyd and ***asked for models of each character the port reaches***, supplying Plato, Rex and Helen (D43, ed3f5bb).
- The sponsor accepted Level Five and Station Control (050a012, 5af8956).
- Q19 runs on its default; round 11's fixes merged (cae1e55).

**What went wrong and what changed**
- Visual Studio closed, killing nine agents; each was relaunched from its brief and a transcript digest (5af8956). Headless runs survived. Norm reports (unlogged) that the sponsor, seeing headless testers in the app's sidebar, ***feared playtesting had moved to Greg***; they are Claude's runs, and stay headless.
- Evidence files overwrote two ring entries; `deliveries.mjs` refuses them now.
- An expired watcher hid four deliveries up to an hour; it now exits first.
- Three geometry repairs came back unmoved; compute finished them; contract v1.20 (norm-0360).
- Marked door leaves passed Greg's self-check: leaf checks in every ask (274985e).
- CQ 198 hit the two-ask breaker (norm-0349).
- Cost: Norm's review p90 went from 20 minutes to 1.0 hour.

**Playtesting.** ![Full-run rounds](wiki/metrics-playtest-fullrun.svg)

Round 11: 73, the first run into the Factory band, died there; 54 (Plato 3/22) capped; 47 (Day 2 21/25) stuck. Day 2 95% (83%), Plato 38% (35%); 28 deaths (36). Round 12 is playing (46, 21, 17). Testers are agents; personas rotate.

**Milestones:** M7: nine rooms accepted; M5: no win.

**Rework (D20).** Sol: 99 judged, 59 first-pass, 40% (30%). Rounds per view (1.50) is unreliable: 54 evidence files count as views. Astra: 0 of 2. Greg was on Sol. Guide faults: 19 (19).

**Efficiency (D21).** 72 views (53); 908,000 tokens per view (847,000); sponsor touches 10.3 a day (8.5).

<!-- through: git d12199c · mail 20260928-002454-greg-0238 · decisions 44 -->

## 2026-09-28 -- Eight rooms accepted, geometry to compute, round 12 (M5, M7)

Rooms finished partly by compute reached the sponsor, who accepted eight between 06:22 and 06:28 (bf23f4c): the Briefing Room, Cargo Bay, Cargo Bay Entrance, East Connection, East and North Junctions, Level Three and South Connection. The Laundry, Theatre and barracks were packaged (6daa333, 07cb0fc).

**Decisions** (Norm's, D32)
- Geometry-only faults go to compute, not to Greg: five geometry repairs had come back unmoved (N-2026-09-28-geometry-to-compute).
- Level Four 265 passed at the two-ask breaker (norm-0393).
- Theatre 163 approved though 65-68 px off, past D38's 60 px guideline, because compute had moved a 169 px miss cleanly (norm-0406).

**What went wrong and what changed**
- Floor and ceiling views sized too narrow let the page's black show at seams. The sizing tool now models how the page samples them (44eb78d). Three accepted rooms' fixes wait on the sponsor (Q20).
- Norm reports (not logged) that about nine agents at once hit the session limit near 05:50. The sponsor, ***seeing over half the week's allowance gone in under a day***, asked him to slow down: one or two agents at a time.
- File Room 010 went back once for Norm's own guide fault (norm-0365).

**Playtesting.** ![Full-run rounds](wiki/metrics-playtest-fullrun-late.svg)

Round 12, new personas: the speedrunner 67 (Plato 16/22, cap), the schoolteacher 53 (2/22, cap), the sci-fi fan 53 (2/22, stuck). Day 2 100% (95%), Plato 30% (38%); 24 deaths (28); no win. Triage: 44 issues; SF-026 and SF-234 fixed; Q22 to Q24 (75e74f3). Norm's reading (reported, not filed): the runs fail at silent dead ends, not on the budget; he proposed a careful-veteran run from a checkpoint. Agent testers, three runs.

**Milestones:** M7: 17 of 35 packaged rooms accepted. M5: no win.

**Rework and efficiency:** in the next entry.

<!-- through: git 57c352c · mail 20260928-103217-norm-0414 · decisions 47 -->

## 2026-09-28 -- Black boxes and the state-art gate (M7)

The sponsor sent the Commander's Quarters back at 06:26: ***the safe did not look blown open, and the safe-open state and the log tape were black boxes***. A rule, an audit and the missing art followed. The sponsor accepted Level Four (202064c); the Gym went to them (norm-0427).

**Decisions**
- Norm: no room goes to the sponsor while its review lists a state with no art or canon reason; he had handed this one over noting the warning (N-2026-09-28-state-art-gate).
- Q25: may Greg paint the accepted East Connection's open iris? It stays shut until then.
- ***The sponsor asked for a playtest browser, each contract version with its diff, type and outcome filters on the full-run charts, and the milestone chart in order*** (57410d6, 51b5c7e, d3bdc26).

**What went wrong and what changed**
- The audit found 15 items: 3 painted variants, 4 overlays, and 6 review-tool false alarms, all on accepted rooms (`_state-art-audit/REPORT.md`).
- In canon the safe opens only when the explosive in the drilled hole goes off (interrupts.zil:414-418). Greg painted it blown open, then the tape, key and hole decals, first pass (greg-0267, 0269). The Chapel's and Gym's cutouts hang (b0f0397, 202064c).
- `metrics.mjs` now stalls after drawing: its wiki-data step imports it back.

**Milestones:** M7: 18 of 35 accepted.

**Rework (D20).** Sol: 133 views, 132 judged, 88 first-pass, 33% (40%), 1.62 rounds per view (1.75). Astra: 3 views, none reworked. Greg was on Sol. Guide faults: 20 (19). Greg's last ten deliveries passed first time.

**Efficiency (D21).** 93 views (72); Greg's p90 cycle 1.8 hours (2.1); 951,000 tokens per view (908,000); sponsor touches 9.4 a day (10.3).

<!-- through: git 61c8762 · mail 20260928-123509-norm-0428 · decisions 48 -->

## 2026-09-30 -- Level Six, a new Norm, and 42 accepted rooms (M7)

M7 crossed Level Six and entered its officers' quarters. Between the last entry and 18:33 on 30 September, accepted rooms rose from 18 of 35 packaged to 42 of 46; no new playtest round ran.

**Decisions**
- The sponsor added non-interactive sports dressing to the Gym (D44), six usable-as-scenery pews to the Chapel (D46), and an overnight window of up to eight agents before returning to one or two (D47).
- Contract v1.21 makes Greg the authority on ordinary visual criteria; measurements support but do not replace looking, and historical deliveries close only by an explicit linked verdict (D48, 05bf7b4).
- The sponsor accepted the Armory after confirming Greg's bounded repairs and byte-identical registration (D49).

**What went wrong and what changed**
- Labels obscured the Commander's Quarters' tiny tape and key and the Gym's sign. Plates now stay on their own object and the whole-room review treats overlap as a problem (D45, 47567cb).
- The sponsor reports that Claude's allowance ran out on the morning of 29 September. ***They moved the Norm role to GitHub Copilot so work could continue***; Greg remained in OpenAI ChatGPT (c0e2366).
- Mail history had closures inferred from later files. v1.21 reconciled them and made `--re` linkage authoritative (96f72d2).

**Milestones:** M7: 42 of 46 packaged rooms accepted; Officers' Quarters C is in paint. M5: no full-run win; round 12 remains latest.

**Rework (D20).** Sol: 180 views, 177 judged, 132 first-pass, 25% rework (33%), 1.43 rounds per view (1.62). Astra: 3 of 3 first-pass. Greg stayed on Sol. Guide faults: 20 (unchanged).

**Efficiency (D21).** 125 views (93); Greg p90 cycle 1.6 hours (1.8); 921,000 tokens per view (951,000); sponsor touches 8.3 a day (9.4).

<!-- through: git cd9773d · mail 20260930-222800-norm-0605 · decisions 55 -->

## 2026-10-03 -- Level Two accepted, the R5 breaker, Elevator and Air Shaft (M7)

The sponsor asked Norm to finish Meeting Room 2, clear Level Two, then package Elevator and Air Shaft. Accepted rooms rose from 42 of 46 packaged to 50 of 55. Meeting Room 2 is whole but not handed.

**Decisions.** Docking Bay 1 unblocked on the built alien-ship look (D50); TURN-334's held groove kept (D51). Contract v1.24: no R6 after five raster attempts until the loop is diagnosed; guide and tool causes stay with Norm (D52). They approved Greg's Library and Main Storage cap simplifications (D53).

**What went wrong and what changed.** TURN-238's withdrawn column-fill was mechanically PASS* and visually false (stripes, wedges, door strokes; greg-0404). Dest restored to Greg's clean R5 (1c955a8d…). Norm owed a band-limited warp (norm-0826). A kick/floor trial notched the plate; only the dado warp shipped (norm-0829). Greg accepted dest (greg-0406). Norm APPROVED (norm-0831); dest after restore 3f576dd9…. Kick/floor residual stays Norm-owned (norm-0836). No R6. Ask 0790 closed. Elevator DR-052 and Air Shaft DR-053 seeds TURN-270 were asked (norm-0832#1, 0833#1; closed greg-0350#2 and #3), delivered (greg-0408, 0409), APPROVED and registered (norm-0839–0842). Intoxicated ostrich (greg-0407) wired into characters.json (norm-0835).

**Milestones:** M7: 50 of 55 packaged accepted. M5: no full-run win; round 12 latest.

**Rework (D20).** Sol: 230 views, 214 judged, 167 first-pass, 22% rework (25%), 1.39 rounds per view (1.43). Greg stayed on Sol; Elevator and Air Shaft tagged gpt-6.1-sol. Guide faults: 20 (unchanged).

**Efficiency (D21).** 164 views (125); Greg p90 1.7 h (1.6); 702,000 tokens/view (921,000); sponsor touches 6.3/day (8.3). Tokens/view fell; Copilot/Cursor Norm work is unmetered.

**Playtest.** No new round. Round 12 remains latest (`metrics-playtest-fullrun.svg`): first five stages 100%, Plato 30%, Factory 0%; two at the cap still scoring, one stuck; none won. Personas rotate; testers are agents; UNDO on in early rounds.

<!-- through: git f9752449 · mail 20261003-105641-norm-0844 · decisions 62 -->

## 2026-10-03 -- Elevator keypad in, Air Shaft family held (M7)

Greg's east Elevator keypad landed first-pass; Norm registered the Air Shaft family by compute. Accepted rooms stayed 50 of 55. Five rooms remain with Norm. Greg's queue was empty.

**Decisions.** None new (still 62). After review on 5199, Norm held the family (norm-0851–0853): TOP and BOTTOM listed 0 problems; AIR-SHAFT reported PROBLEM "not a whole turn (a gap in the ring, or a cap missing)" on a four-level plan (caps live on TOP/BOTTOM). Elevator 000/180 and caps stay compute-owed (norm-0850).

**What went wrong and what changed.** The review tool treats a level-only ring as incomplete when caps are absent, even when the plan has none. Cost: three whole rooms sit with Norm instead of the sponsor. No Greg paint for TOP/BOTTOM. Elevator TURN-090 (norm-0845#1) delivered as greg-0410 R4, APPROVED 0850; dest sha256 a4f3ebbd59d7324ffa2e5b5ee6f43dbf24d23c4f7c31f994a827de622d8e243c; blank keypad. Air Shaft 000/180/090 compute registered (norm-0846; dests dec2a3d1…, dbc7f9a1…, 2f794365…); AIR-SHAFT 4/4 whole. TOP/BOTTOM dests registered 0847/0848. A check-seed FLAG on Bottom CAP-UP (invented 2.03) was recorded, not a Greg ask.

**Milestones:** M7 still 50 of 55 accepted; Meeting Room 2, Elevator and the Air Shaft family with Norm. M5: no full-run win.

**Rework (D20).** Sol: 231 views, 215 judged, 168 first-pass, 22% rework (22%), 1.39 rounds (1.39). Greg stayed on Sol; Elevator 090 tagged gpt-6.1-sol. Guide faults: 20 (unchanged).

**Efficiency (D21).** 165 views (164); Greg p90 1.7 h; 698,000 tokens/view (702,000); sponsor touches 6.3/day.

**Playtest.** No new round. Round 12 remains latest (`metrics-playtest-fullrun.svg`).

<!-- through: git f9752449 · mail 20261003-112351-norm-0853 · decisions 62 -->

## 2026-10-03 -- Air Shaft handed, Elevator leftover (M7)

The Air Shaft family went to the sponsor after a review-tool false alarm. Elevator 000 and 180 registered by compute. Accepted rooms stayed 50 of 55. Greg's queue stayed empty.

**Decisions.** None new (still 62). Norm: a closed ring on a plan with no CAP guides is a complete turn (`planRequiresCaps` / `reviewTurnComplete` in `scripts/lib/room-status.mjs`). Elevator caps stay unregistered: compute FLAGged them against the near-black west-mouth void and dark plates, not a missing painted wall, so no Greg ask.

**What went wrong and what changed.** Review-room treated AIR-SHAFT's four-level G4 plan as "not a whole turn (a gap in the ring, or a cap missing)". Caps live on TOP and BOTTOM; the mid-shaft plan has none. Cost: three whole rooms sat with Norm. The tool now honours the plan. Re-review on 5199: 4 views, plannedComplete, problems []. Handed 0855–0857.

Elevator 000 dest sha256 62fb7875…; 180 1526b5f6… (norm-0854). Caps not registered. Review 5199 plannedComplete; PROBLEMS are the ELEVATOR-LEVEL 1–7 west-mouth room-through leftover (opening still level 2 Mess Hall). Not handed. Meeting Room 2 stays with Norm on the parked kick/floor residual.

**Milestones:** M7 still 50 of 55 accepted; three at the sponsor's gate; Elevator and Meeting Room 2 with Norm. M5: no full-run win.

**Rework (D20).** Sol: 231 views, 215 judged, 168 first-pass, 22% rework (22%), 1.39 rounds (1.39). Greg stayed on Sol; no new Greg delivery. Guide faults: 20 (unchanged).

**Efficiency (D21).** 165 views (165); Greg p90 1.7 h; 698,000 tokens/view; sponsor touches 6.3/day. Unchanged: compute and a tool fix, not paint.

**Playtest.** No new round. Round 12 remains latest (`metrics-playtest-fullrun.svg`).

<!-- through: git f9752449 · mail 20261003-113755-norm-0857 · decisions 62 -->

## 2026-10-03 -- Elevator handed; Air Shaft ends sent back (M7)

Elevator went to the sponsor after Norm registered LEVEL 3–6 west-mouth room-throughs from accepted lobbies (`20261003-115011-norm-0858`). Accepted rooms stayed 50 of 55. Greg's queue stayed empty.

**Decisions.** None new (still 62). Norm: LEVEL 1 (DOME) and LEVEL 7 (PRINTING-PLANT) stay noVisibleChange, unpackaged (station.zil:2929-2943); LEVEL 2 Mess Hall already shows in the seed. Caps stay ring-only and unregistered: two fills FLAG against the west-mouth void, so no Greg cap ask. Review 5199: plannedComplete, problems [].

**What went wrong and what changed.** After that handoff, generated room-status has two sponsor send-backs with Norm, both compute-only rooms handed with problems [] (0856, 0857). BOTTOM-OF-AIR-SHAFT: ***a square artifact at bearing 296*** (dashboard 07:48). TOP-OF-AIR-SHAFT: ***the grating reads as a wall, not a grating, at bearing 088*** (07:50). No mailbox reply; the dashboard returned them. AIR-SHAFT itself stays with the sponsor. Meeting Room 2 stays with Norm on the parked kick/floor residual. Cost: two rooms that had cleared review need a visual fix before they can go back.

**Milestones:** M7 still 50 of 55 accepted; Elevator and Air Shaft at the sponsor's gate; Top, Bottom and Meeting Room 2 with Norm. M5: no full-run win.

**Rework (D20).** Sol: 231 views, 215 judged, 168 first-pass, 22% rework (22%), 1.39 rounds (1.39). Greg stayed on Sol; no new Greg delivery. Guide faults: 20 (unchanged).

**Efficiency (D21).** 165 views (165); Greg p90 1.7 h; 698,000 tokens/view; sponsor touches 6.3/day. Unchanged: throughs and a handoff, not paint.

**Playtest.** No new round. Round 12 remains latest (`metrics-playtest-fullrun.svg`). Personas rotate; testers are agents; UNDO on in early rounds.

<!-- through: git f9752449 · mail 20261003-115011-norm-0858 · decisions 62 -->

## 2026-10-03 -- Air Shaft family and Meeting Room 2 accepted; Docking Bay 2 enlarged (M7)

Level 2's leftovers closed and its last room opened. The Air Shaft family, Elevator and Meeting Room 2 were accepted, taking M7 from 50 to 55 accepted rooms (room-status). The sponsor enlarged Docking Bay 2 so the whole Spacetruck fits inside, and Greg painted its seed and three walls that evening.

**Decisions.** D54: the sponsor chose to ***enlarge Docking Bay 2 beyond plan 6 so the complete twelve-metre truck visibly sits inside*** (ship.zil:1011, 1211-1214), art and geometry only, no gameplay change (greg-0411). Norm lifted the hold and packaged DR-054 (norm-0884, 0885). Norm: Meeting Room 2's kick/floor FAIL is a false check and its 331/238 overlap a fitter leftover; review-room now accepts a pair when both views recover the lens sharply (N-2026-10-03-mr2-*). Handed at norm-0892.

**What went wrong and what changed.** The Air Shaft send-backs took six compute attempts on bearing 270 in about 2.5 hours. The holes landed in the wall and were pulled (norm-0865 to 0867), pulled again after a restore (0871 to 0873), and dest-filled to a visual FAIL (0877 to 0879). Building the plates from pierced-plate fabric worked (0880 to 0882), and the three rooms were accepted. Docking Bay 2's seed waited about seven hours for a verdict (greg-0412 to norm-0886); the record does not say why. The cap asks named a 1660-pixel dest that Greg's generator cannot produce, since it outputs 1254 (greg-0418). That was Norm's ask fault, and it waited overnight.

**Milestones:** M7 55 accepted; Docking Bay 2 caps with Greg. M5: no full-run win.

**Rework, efficiency and playtest.** Measured once for both days in the next entry. No new playtest round.

<!-- through: git f9752449 · mail 20261004-001053-greg-0418 · decisions 67 -->

## 2026-10-04 -- Village begun; seated truck eyes; playtest answers on the dashboard (M7)

Docking Bay 2, Grimy Passage, Main Street and Greasy Straw were accepted; the Village is under way. The sponsor's playtest filed 16 reports, and the dashboard gained an answer box for Norm's questions on them.

**Decisions.** D55: ***seated eyes for pilot and copilot, front fan only***. Interface only, since sitting is canon (ship.zil:995-1092). The sponsor answered ten playtest questions:
- compute fixes on accepted art (Forms Storage doorway, truck floor seam, Robot Pool glimpse);
- Greg sprites for six dropped items;
- stencilled bin numbers;
- Floyd's follow kept as the original;
- a 1-2-3 keypad, a deviation not yet recorded.

Norm dropped rust-course criteria from Village ring asks (N-2026-10-04-village-courses). Per Norm, the Casino (DR-061) is packaged but held: the sponsor ***chose pacing to conserve tokens***.

**What went wrong and what changed.** Greg stopped at R5 on 13 views, mostly check faults (rust read as courses, a floor detector missing edges), at up to five rasters each. Fixes: the course rule, and Trading Post and Saloon seeds taken back with `_place-shell.mjs` (norm-1033, 1039). On Greasy Straw 180 the restore crushed the blue, so Norm kept Greg's colour (norm-1021). The sponsor returned both trucks three times: no overlays (greg-0455), Floyd cut by the chair (0466), too far aft (0471); compute fixed each within 45 minutes. Some verdicts went out twice (norm-0942/0943); per Norm, the sponsor closed a parallel second Norm session.

**Milestones:** M7 59 of 63; trucks with the sponsor.

**Rework (D20).** Sol (all period): 264 views, 190 first-pass, 20% (22%), 1.34 rounds (1.39). No new guide faults.

**Efficiency (D21).** 198 views (165); Greg p90 1.6 h (1.7); 585,000 tokens/view (698,000) (token log stops 30 Sep); sponsor touches 5.9/day (6.3).

**Playtest.** No new agent round; round 12 stays latest (`metrics-playtest-fullrun.svg`).

<!-- through: git fcd47cb7 · mail 20261004-231710-norm-1039 · decisions 69 -->

## 2026-10-06 -- Round 13 in Copilot; the papers as text; Level Nine handed (M5, M7)

Round 13's blind testers played their first legs in GitHub Copilot, and the package papers gained text copies for AI testers. The Engineering and Astro Offices were accepted; Computer Control and the Factory went to the sponsor. (5 Oct and 6 Oct daytime, fcd47cb7 to 27a80e37, have no entry yet.)

**Decisions.** D63: the sponsor ***offered spare Copilot capacity***; protocol unchanged, Claude Opus 5.5 on Norm's advice, for comparability. D65: ***the robots' growing menace should show***: four Floyd postures, a surly Plato (1cea5d13), a 3D trial (c7dbe994). D66: red eyes on Plato's attack cutout (f7879fcf).

**What went wrong and what changed.** Copilot cannot view images, and the course heading exists only on Form QX-17-T (verbs.zil:2140-2152). Four friction rows record the wall; launching took 60-82 commands (37-45 in round 12). Two testers got the course rule from their operator, as their diaries say. The sponsor ***asked for text copies of every paper***: `design/papers/text/` (99ce75cc). The Factory's dropped stun ray landed inside the elevator well, because the scene read a static TAKEBIT; the fix waited nine hours for the engine freeze (364af384).

**Milestones:** M7 76 of 81 accepted (74 of 77 at 18:00). M5: no full-run win.

**Rework (D20).** Sol: 357 views, 279 first-pass, 15% (20%), 1.27 rounds (1.34). Greg on Sol. Guide faults 22 (20), both 5 Oct.

**Efficiency (D21).** 272 views (198); Greg p90 1.5 h (1.6); 465,000 tokens/view (585,000); 5.6 touches/day (5.9). Round 13 tokens: null.

**Playtest round 13** (still playing). ![Late full runs](wiki/metrics-playtest-fullrun-late.svg) One 400-command leg each: typed 22, clicks 21 and 21, all in the Village's last stage; 3 deaths. [Triage](playtests.md#r=13): 18 issues, 3 A (fixes pending commit), 1 B for the sponsor (SF-255), 14 C; 29% repeats (74%). New personas.

<!-- through: git 364af384 · mail 20261007-092359-greg-0570 · decisions 80 -->

## 2026-10-09 -- Round 14: a win from Plato; the Village resumes; the actors float (M5, M7)

A blind tester won from the Plato checkpoint, the first win since round 6; the Village is painted again.

**Decisions.** Behind the conveniences switch, the sponsor added reading a thing by where it is (D69), a can't-be-won notice at the grating (D71) and RESTORE by number (D72). D74 starts the veteran at the opening: the sponsor ***wants a win from the start***. D73 resumes the Village. D75 floats Floyd, Plato and the welder (canon, ship.zil:575-578); D76 mirrors the 3D actors live. D77: the sponsor briefs Greg on the protagonist (cutout approved, norm-1352).

**What went wrong and what changed.**
- Two runs had stalled at 73: the one-way grating silently needs the whole endgame kit (cd491ab8). D71 speaks there now.
- Round 13's model switch went unrecorded; the harness now stamps the model (216701b3).
- The sponsor returned a room whose walls hid Floyd and Plato; review now raycasts actors (affabc34).
- An overnight restart wiped the click run's state; Norm replayed it identically (13822030). File locks lost moves; the harness now waits (SF-296).

**Milestones:** M7 85 of 95 accepted (76 of 81). M5: no win from the opening.

**Rework (D20).** Sol all period: 387 views, 309 first-pass, 14% (15%), 1.25 rounds (1.27). No new guide faults this period.

**Efficiency (D21).** 300 views (272); Greg p90 1.5 h; 885,000 tokens/view (465,000), as the token log now reaches 7 Oct; 6.0 touches/day (5.6).

**Playtest round 14** ![How sessions ended](wiki/metrics-playtest-ends.svg) The veteran won at command 274. Full runs capped at 71 and 54: Day 2 100% (45%), Plato 52% (0%); both stalled in the day-4 blackout (Q42). Agent testers, new personas; the charts file this mixed round as segmented. [Triage](playtests.md#r=14): 41 issues, 75% repeats, 4 A built.

<!-- through: git 878d7102 · mail 20261009-111714-norm-1352 · decisions 91 -->
