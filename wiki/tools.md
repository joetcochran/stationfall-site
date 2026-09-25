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
- `scripts/check-accept.mjs` and `scripts/lib/accept-checks.mjs`: every measurable accept as a check Greg runs (D25) (262bfc1); PASS* for by-eye lines, a send-time dry run (3713d3b).
