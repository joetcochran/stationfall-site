# Playtests, round by round

Every blind playtest of the port, as the testers left it. A blind tester is an agent that plays the game without ever seeing its source, through the playtest harness, in typed or click mode ([How we work](how-we-work.md) has the charts). Rounds 1 to 6 were segmented: each session started from a checkpoint and played one leg of about 400 commands. From round 7 every session has played the whole game from the opening, over several legs, up to the 1,500-command cap; no full run has won yet, and some stopped earlier, stuck or dead.

Pick a round, then a session type and a session. Each session shows:

- its **diary**, which the tester wrote as they played, ending with a handoff to the next leg;
- its **friction rows**, each filed through the harness the moment it happened, with its kind, severity, room and command count;
- its round's **triage** document, each issue with its tier (A, B or C) and the evidence from the original game;
- its round's **stats**, counted from the harness's records.

Each session also has an **outcome**: won, stuck (stopped short of the cap because the game could no longer be won or the tester was blocked), cap reached, budget spent (a one-leg session), died, cut off (stopped short with no reason and never continued) or still playing. It is worked out from the records by `scripts/lib/playtest-outcome.mjs`, and the full-run charts use the same outcomes.

The transcripts, every command with the game's reply, are not published here: they are mostly the game's own text. Everything on this page is generated from the playtest records by `scripts/wiki-data.mjs`, so a new round appears here without any hand edits.

<!-- app: playtests -->
