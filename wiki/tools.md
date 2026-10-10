# Tools

The project's own tools, one line each, in the order they arrived.

## M0 (2026-09-24)
- `scripts/oracle.mjs`: runs the original story file headless and writes a reference transcript, as text or JSON (5107dfd).
- `scripts/diff-oracle.mjs`: diffs one of our transcripts against the oracle's (5107dfd).
- `scripts/mail.mjs`: the Norm-Greg mailbox; refuses an ask to Greg that lacks the five contract fields (5107dfd).
- `wwwroot/dashboard/mail.js`: the mailbox monitor on the dashboard (5107dfd).
- `scripts/notify.mjs`: one-line Telegram alerts (5107dfd).
- `scripts/deliveries.mjs`: registers Greg's delivered pictures from the mailbox (5107dfd).
- The Planetfall tool set (checks, browser harness, playtest harness, site build and release), lifted with the engine (03b9fb6).

## M1–M6 (2026-09-24 to 25)
- `scripts/check_paper.py`: checks a flattened package paper against its scan; Greg's pre-delivery gate for papers (50a1c26).
- `scripts/plan-milestones.mjs` and the dashboard's sponsor panels (Waiting on you, Milestones, Decisions) (c3be1d7).
- Per-area oracle diff tests, `scripts/tests/<area>.mjs`, one per porter (92ba155).
- `scripts/fabric-duffy.mjs`: the Duffy's administrative level as one layout, with each room's fabric cut from it (d4ab6c7).
- `scripts/lib/transcript.mjs`: the shared transcript comparison used by the tests and `diff-oracle.mjs` (c9b59ee).

## M4–M7 and D21–D26 (2026-09-25)
- `scripts/playtest-registry.mjs` and `scripts/playtest-stats.mjs`: the cross-round issue registry and triage report, and playtest stats from the transcripts (d904bc3).
- `scripts/ask-criteria.mjs`: computed acceptance criteria for every paint ask, baselined on the guide (D13) (94e1b81).
- `scripts/check-lines.mjs`: Greg's pre-delivery check of structural lines against the guide (ea729c0); band search (fab4445); a line found on pasted guide pixels fails, exact (64c4e08), then within 2 levels (247c791).
- `scripts/extract-answers.mjs`: reads the verbs each ZIL routine answers into `engine/answers.js`, so click menus are not hand-typed (ee26d71).
- `scripts/rework-by-model.mjs`: rework rate per Greg model from the mailbox, with Norm's guide faults excluded (D20) (f6c9786).
- `scripts/metrics.mjs` and `scripts/lib/complexity.mjs`: the generated efficiency and playtest charts, and the complexity stamp on each ask (D21) (e179050).
- `scripts/check-wiki-public.mjs` and `build-site.mjs --wiki-only`: the public wiki build and its privacy gate (D22) (2383f02).
- `scripts/lib/grain.mjs` and `scripts/tests/grain.mjs`: deckhead grain set per room in the fabric, and measured in the guides (5dfa6dd).
- `mail.mjs --recharge`: moves a past verdict to or from the `guide` category by a note (D23) (5dfa6dd).
- `mail.mjs` stale asks: flags an open ask when a later approval lands in its room (596ad2f); approvals only (bc2e0a4).
- `scripts/agent-tokens.mjs`: every agent's tokens from the local session logs, read-only, written as hourly sums (221de66); Greg's model switch times too (841c00f).
- `scripts/check-accept.mjs` and `scripts/lib/accept-checks.mjs`: every measurable accept as a check Greg runs (D25) (262bfc1); PASS* for by-eye lines, tone and interior-step checks, banded seams and a send-time dry run (3713d3b).
- `check-accept.mjs` held-edge check: measures a seam, a level gap or a moved crease along the boundary between held and new paint, with `release` boxes that hand held pixels back to Greg (a8b93ce).
- Process, not a tool: D27 stops repaint rounds at diminishing returns, recording a faint fault as a known defect to fix by compute (28cd04f); contract v1.8 makes the checks a floor, not the target (97f289e); worktree branches that change Greg's tools land by fast-forward only (D26).
- `scripts/lib/memories.mjs` and `data/checkpoints/<id>.memories.json`: what the character would remember at each playtest checkpoint, added to the tester's briefing as facts, never advice (9d39ba0).
- `playtest.mjs` checkpoint restart: "Start this checkpoint again" for checkpoint sessions (193caca), keeping the saved positions (9d39ba0).
- `scripts/tests/sponsor.mjs`: every decision log is one JSON object per line (6dc54cb).
- Process, not a tool: contract v1.9, Greg's pseudo-lettering gate (negative prompt block, inspection zones, a 200% pass, `pseudo-lettering=clear` on each delivery) (5b9f766).
- Root `AGENTS.md`, `design/AGENTS.md` and `docs/AGENT_HANDOFF.md`: role-neutral start-up and handoff rules for any agent working as Norm or entering Greg's tree, from the Cursor trial (1627aa9).
- `.cursor/rules/norm-autonomy.mdc`: the sponsor's autonomy rule for a stand-in Norm, recorded as D32 (1627aa9).
- `underpaint.mjs restore` for fresh ring views: restores without a fit search, with held masks and a doorway-graze rule (632cbd2).
- `deliveries.mjs register` gate: no view registers without Norm's approving verdict, and `npm run check` looks for orphans (e0cf56d).
- `scripts/lib/courses.mjs` and the `course` check: asks carry the held strip's own wall courses; region asks are preflighted on their snapshot and tone is compared on the same surface (80616c3, 9fd749c).
- `ask-criteria.mjs`: a line the guide itself cannot pass or be judged on goes out by eye (553e7ed); silhouettes are checked hard and painted courses soft away from the held edge (b5c373d).
- Room review page: every switch is tagged "no view for this" or "look at N deg", with a note on what it does (fce21d7).
- `metrics-rooms-accepted.svg`: the cumulative count of rooms the sponsor has accepted (698fdb1).
- `scripts/room-status.mjs`: regenerates the dashboard's room stages (eight of them) from the mailbox and registrations after every send and registration; `--check` runs in `npm run check` (ae96dd6).
- `scripts/inputs.mjs`: writes and verifies a package's `INPUTS.sha256`, leaving out the room metadata that registrations change (efd3870).
- `playtest-registry.mjs reopen`, and round triage driven through the registry, so every round has a repeat rate (dfefb76, 58dc099).
- A `cutout-frame` check kind for character asks, first used for Plato (4251000).
- Box checks that resist fills: a texture floor on every region box, one-colour drawn courses fail, and scripts that write literal colour are flagged (efb3db1).
- `mail.mjs` withdrawal: Norm takes back a dead ask with a note and a reason, and `open` flags STALE? asks (contract v1.17, b8dd3ee).
- `fabric-core`: a shared builder library for the fabric scenes, with curved walls, sector and outline rooms and arc doors, first used for Levels Four and Three (ad98f00).
- Default plain door-leaf checks in `ask-criteria.mjs`: texture and warm-stroke share by tile on every leaf in frame, calibrated on 21 approved leaves (274985e).
- The `?models3d=1` switch: characters with a `model3d` block in `characters.json` draw as 3D models instead of cutouts (2334edc, 590c764).
- `mail.mjs --args-file`: a send's arguments from a JSON file, past Windows' command-line limit (4bfdefe).
- Cap coverage: `scripts/lib/cap-coverage.mjs` models how the page samples the ring and caps, `underpaint.mjs caps` sizes a cap for 99% coverage, `review-room.mjs` reports coverage, and `cap-probe.mjs` shows gaps in magenta (44eb78d).
- Check-tool fixes: courses matched by type (a step, not a lip), a restore on a guide that holds nothing, and seams told apart from creases at a held edge (c73644d).
- Full-run charts split into early and late groups, with round, type and outcome filters (1604a9b, 51b5c7e).
- `scripts/wiki-data.mjs` and `scripts/lib/playtest-outcome.mjs`: the data for the playtests page and the contract-versions page, and each session's outcome, from the records (57410d6, 51b5c7e).
- `wwwroot/scene/headlamp.js`: dark painted rooms are visible through a player-centred headlamp cone while lit rooms stay unchanged (942ba09).
- Whole-room plate-cover check: a name plate over readable text or state art is a review problem (47567cb).
- `mail.mjs openItems`: actionable deliveries and questions appear with asks, instead of only asks being surfaced (99d6b2e).
- Contract v1.21 mailbox linkage: a `--re` verdict judges its whole delivery and is validated; later references no longer imply closure (05bf7b4).
- Process, not a tool: contract v1.24 R5 generation breaker (D52; greg-0386): after five raster attempts on one view and fault, no R6 until the loop is diagnosed; guide, check, mask, restore and tool causes stay with Norm; canon or geometry changes need the sponsor.
- `planRequiresCaps` / `reviewTurnComplete` in `scripts/lib/room-status.mjs`: a closed ring on a level-only plan is a complete planned turn; missing caps are a PROBLEM only when the plan names them.
- `design/review/_place-shell.mjs`: moves a painting's deckhead and floor lines onto its guide by a per-column vertical remap from measured lines, drawing nothing new; used for the Trading Post and Saloon seed takebacks after R5 (norm-1033, norm-1039; uncommitted).
- `POST /design/playtest-answer` (`Program.cs`) and the dashboard answer box: the sponsor answers Norm's question on a playtest report, and the report goes back to Norm marked `answerPending` (uncommitted).
- `scripts/playtest-answers.mjs`: lists, waits for, and clears answered playtest reports waiting on Norm (uncommitted).
- `scripts/playtest-gate.mjs`: holds round 13's testers until 22:00 Eastern and a clean, committed game build; every leg starts with `--wait` (7d9518ba).
- `design/papers/text/`: a Markdown transcription of every package paper (three forms, the validated form, the blueprint key and nine blueprints) for testers that cannot view images; QX-17-T's 106-row course table is checked against verbs.zil:2140-2152 (99ce75cc).
- The harness names each paper's text transcription beside its image, in the paper viewer and in `--paper` (SF-249; `scripts/playtest.mjs`, uncommitted).
- Live TAKEBIT in `wwwroot/scene/graybox.js`: loose things are chosen by the flag as it stands in play, so the stun ray Floyd drops lies on the Factory deck instead of inside the elevator well (364af384).
- `ARRIVAL_FLAGS` in `wwwroot/dashboard/uat.js`: the review page's state switch gives a thing the flags canon gives it on reaching the floor (the stun ray's TAKEBIT, ship.zil:504-506) (364af384).
- `scripts/lib/playtest-leaderboard.mjs` and [the playtesters' leaderboard](playtest-leaderboard.md): ranks every full run by score, friction, frustration and blocking, with each leg's host, generated by `wiki-data.mjs` (98351aa7).
- Tester model stamp in `scripts/playtest.mjs`: every record carries the tester's model (`--model`, or the launcher's setting, which wins), and a change is its own event (216701b3).
- `scripts/lib/actor-sight.mjs`, wired into `review-room.mjs`: raycasts each actor cutout from the eye, and a figure the room's own walls hide by more than half is a PROBLEM (affabc34).
- `mail.mjs` batch asks: an approval within a batch of asks to one room no longer marks its siblings STALE (fc14aacd; greg-0591).
- Harness write retry (SF-296): when another program holds the transcript open, the harness waits, and an unwritten line is kept and written first on the next call (c93d609a).
