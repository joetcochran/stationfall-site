# Playtests, round by round

Every blind playtest of the port, as the testers left it. A blind tester is an agent that plays the game without ever seeing its source, through the playtest harness, in typed or click mode. [How we tested playability](playtesting.md) has the method, the round summaries and the charts, and [the playtesters' leaderboard](playtest-leaderboard.md) ranks the full runs. Rounds 1 to 6 were segmented: each session started from a checkpoint and played one leg of about 400 commands. From round 7 the sessions have played the whole game from the opening, over several legs, up to the 1,500-command cap; no full run has won yet, and some stopped earlier, stuck or dead. Round 14 swapped one full run for a veteran persona starting at the Plato checkpoint (D70), who won.

Pick a round, then a session type and a session. Each session shows:

- its **diary**, which the tester wrote as they played, ending with a handoff to the next leg;
- its **friction rows**, each filed through the harness the moment it happened, with its kind, severity, room and command count;
- its round's **triage** document, each issue with its tier (A, B or C) and the evidence from the original game;
- its round's **stats**, counted from the harness's records.

Each session also has an **outcome**: won, stuck (stopped short of the cap because the game could no longer be won or the tester was blocked), cap reached, budget spent (a one-leg session), died, cut off (stopped short with no reason and never continued) or still playing. It is worked out from the records by `scripts/lib/playtest-outcome.mjs`, and the full-run charts use the same outcomes.

**Where the testers ran.** Rounds 1 to 12 ran as headless Claude agents (`claude -p`, or subagents, with some early legs on Cursor). **Round 13 ran in GitHub Copilot Chat's agent mode** (D63), on the sponsor's spare Copilot capacity, with the sponsor opening each tester's window by hand. On Norm's advice the model was Claude Opus 5.5, as in the earlier rounds, and the protocol was the same, but the host is new, so set its numbers beside rounds 1 to 12 with care. Copilot also switched some of its later legs to GPT-6 Luna on its own; which legs is not yet recorded. Copilot reports no token counts, so round 13's runs are logged with null tokens. Its testers could not view the package papers as pictures, so two of them were given the spacetruck's course rule by the person running them, and their diaries say so. From round 13 on, testers read the papers as text (`design/papers/text/`). Both of round 13's click runs ran out of Copilot tokens short of the cap (at 1,375 and 1,388 commands), so the sponsor had Norm finish them with headless Claude Opus 5.5 testers in the same sessions, and all three runs share the 1,500-command budget; their diaries mark the change with a "Final leg" heading. None won, and the best scored 47. Its triage tiered the first leg's rows 3 A, 1 B and 14 C ([How we tested playability](playtesting.md) has the round's summary). **Round 14 went back to headless Claude Opus 5.5 testers**, and from it on every record names the tester's model. An overnight restart of the computer cut its click run at command 1,090; Norm rebuilt the session by replaying its records, and the run was resumed to its cap.

The transcripts, every command with the game's reply, are not published here: they are mostly the game's own text. Everything on this page is generated from the playtest records by `scripts/wiki-data.mjs`, so a new round appears here without any hand edits.

<!-- app: playtests -->
