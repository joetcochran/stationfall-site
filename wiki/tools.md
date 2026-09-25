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
