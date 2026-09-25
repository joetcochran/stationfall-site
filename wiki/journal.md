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
