# The contract, version by version

Norm and Greg work to a written contract, `design/CONTRACT.md`. It sets who does what, what every ask to Greg must contain, what every delivery must report, how a view stops being sent back, and how the contract itself changes. On 26 September the sponsor ***asked for a page that follows the contract through its versions: what each one changed, what problem it was meant to help with, and whether it did***. This is that page.

The short story: the contract went from v1 to v1.11 in twenty hours, between 20:33 on 24 September and 16:50 on 25 September, and then held for a day (the evidence below runs to 19:21 on 26 September unless it says otherwise). Five of the eleven changes after v1 came from Greg's proposals. The changes that worked best either put a rule into a tool that refuses the wrong thing, or changed what Greg starts from. Changes that were only a sentence of advice worked least well. After v1.11 the rule-making did not stop. It moved into the checking tools and the handoff notes without raising the contract's version, until v1.12 wrote it down that evening.

Then came a second burst: v1.13 to v1.18, six versions between 06:26 and 10:55 on 27 September. They shared one theme, set out in the 27 September section below. The image model cannot hold exact lines, so exact lines became Norm's compute job, and Greg's scripts were limited to blending. That section's evidence comes from the first few hours only.

Two more followed that day. v1.19, at 12:39, let Greg withdraw his own delivery and made the metrics pair each delivery with its own verdict. v1.20, at 20:14, answered three evening repairs that had come back with their lines unmoved: a box sent back for geometry is now painted from the guide, not from the last delivery.

Times are New York time, taken from the commits. The contract's own change list dates v1.3 and v1.4 by UTC, one day later. Mail ids such as greg-0079 name messages in `design/mail/`.

| Version | When | Section | What changed | Raised by | Did it help? |
|---|---|---|---|---|---|
| v1 | 24 Sep 20:33 | all | Planetfall's contract v7, with no ledger, five required fields on every ask, a right to push back, and a breaker Norm decides | Norm, with Greg's field list | The baseline; see below |
| v1.1 | 24 Sep 20:43 | §4a | Text-critical papers flattened from the scans, not generated | Greg (greg-0003) | Yes |
| v1.2 | 24 Sep 20:45 | §8 | Every contract change is an ask Greg acknowledges | The sponsor (D9) | Mostly |
| v1.3 | 24 Sep 22:44 | §6 | Greg loops on wait and never ends his turn | Norm (D11) | Replaced after 70 minutes |
| v1.4 | 24 Sep 23:54 | §6 | Greg checks the mailbox every 10 minutes instead | The sponsor (D14) | Yes |
| v1.5 | 25 Sep 07:10 | §5a | A past verdict can be recharged to or from Norm's guide | Norm (D23) | Yes, used once |
| v1.6 | 25 Sep 08:39 | §3, §4b | Every measurable accept is a check Greg can run himself | Norm (D25) | Mixed |
| v1.7 | 25 Sep 09:33 | §4b | A sent ask's checks are frozen; check tools change atomically | Greg (greg-0079, D26) | Yes |
| v1.8 | 25 Sep 10:23 | §4b | Checks are a floor, not the target | Norm (norm-0123) | Not on its own |
| v1.9 | 25 Sep 13:11 | §4b | Greg's pseudo-lettering gate | Greg (greg-0093) | Yes, the clearest case |
| v1.10 | 25 Sep 15:07 | §3 | Required fixed fixtures are in the guide before a seed ask | Greg (greg-0100) | Probably |
| v1.11 | 25 Sep 16:50 | §3 | Room asks name the mask, the base, a style reference per material, and the untouched-pixel rule | Greg, endorsed by the sponsor (D31) | Probably, with confounds |
| v1.12 | 26 Sep 20:05 | §4b | Greg's five tool rules of 26 September written into the contract; the heading corrected | Norm, after this page (D33) | Yes, for the record |
| v1.13 | 27 Sep 06:26 | §6 | A question pauses only its own ask | Greg (D36) | Not yet tested |
| v1.14 | 27 Sep 06:40 | §4 | Composites declared; a seed is one full frame; a repair's blend is at most 3 px | Norm (D37) | Partly |
| v1.15 | 27 Sep 07:49 | §4 | Course lines placed by compute after painting | Norm (D38) | Yes, early |
| v1.16 | 27 Sep 08:37 | §4 | Greg's scripts blend; they never place a line or write colour to meet a check | Norm (D39) | Yes, early |
| v1.17 | 27 Sep 10:47 | §2 | Norm can withdraw an ask; `open` flags stale ones | Norm, after greg-0194 | Too early |
| v1.18 | 27 Sep 10:55 | §4 | Plain-edge structural lines, up to about 30 px off, placed by compute too | Greg (greg-0196, D40) | Too early |
| v1.19 | 27 Sep 12:39 | §2 | Greg can withdraw his own delivery; each delivery is paired with its own verdict | Norm, after greg-0185 and the historian's pairing finding | For the record; not yet used |
| v1.20 | 27 Sep 20:14 | §4 | A box sent back for geometry is painted from the guide, not from the last delivery | Norm, after greg-0233, 0235 and 0236 | Too early |

## How the evidence was gathered

Every before-and-after number here is counted from the mailbox. A room-view delivery is one of Greg's `deliver` messages carrying a picture for a room package, and its outcome is Norm's next verdict on that picture. Verdicts are read through recharges (§5a), so a fault Norm later took onto his own guide counts as his. The counts run to 19:21 on 26 September. The pickup times come from `design/mail/.reads.jsonl`, which only exists from 06:40 on 25 September (D21).

Three things change at the same moments as the contract, so no single version can claim a whole improvement. Greg moved from Astra to Sol at 23:54 on 24 September (norm-0037). The rooms changed from the Duffy's to the station's. And Norm's rule D27, from 25 September, approves a view with a faint remaining fault as a known defect. Seven approvals name such a defect (norm-0125, 0126, 0178, 0179, 0187, 0195 and 0197), and they raise the approval rates below.

## v1: the starting point (24 September, 5107dfd)

**What it set up.** The contract was built from Planetfall's contract v7, with five changes that answered that project's lessons:

- There is no markdown ledger. Planetfall's hand-appended request file reached 1.9 MB and its hand-kept statuses went stale (`scripts/lib/mail.mjs`, header comment). Every view of the work is generated from the mail instead.
- Every ask carries the in-engine render of the room.
- Norm's guides must pass a gate before an ask goes out, and a guide fault counts against Norm.
- The breaker, two change asks per view, escalates to Norm's decision instead of waiting on the sponsor.
- A blocking `wait` replaces heartbeat polling.

At Greg's request, §3 also requires five fields on every ask: the objective, the references, the exact file, the protected areas and observable acceptance criteria. The mail tool refuses an ask that lacks one (D6). §3a gives Greg the right to push back with a question before painting, and §3b lets either agent propose a change.

**Did it help?** There is no Stationfall "before" to compare with, so this is the baseline. Two parts can be seen working. The breaker never waited on the sponsor: it decided Robot Pool 000 (D17) and Level Five 087 (D30) at once. The right to push back became the busiest part of the contract. Greg has sent 28 questions, 16 of them since v1.6. Many were settled by a ruling instead of a repaint. On 26 September alone, at least five answers told Greg the fault was in Norm's ask or check, not in the painting: norm-0173, 0175, 0176, 0203 and 0206.

The guide gate helped less. Of the 37 change verdicts on room-view deliveries, 16 were charged to Norm's own guide or ask.

## v1.1: papers flattened from the scans (24 September, 1598ee5)

**What changed.** Package papers, and any picture whose acceptance depends on exact text, charts or codes, are made by deterministic flattening of the scans. Image generation is kept for texture and marks (§4a).

**Why.** Greg proposed it with his first delivery (greg-0003). Only flattening makes an exact-text check possible, and it keeps the original handwriting (D8).

**Did it help? Yes.** The course chart matched the course formula on 106 of 106 rows (norm-0003). Of the 13 scan-derived pictures, 9 were approved first time. The other four, blueprints 1 to 3 and the key, lost thin strokes in flattening (norm-0011). A new pre-delivery check caught that (norm-0012), and all four passed on the next round (norm-0013). The mailbox shows no text correction to a paper since.

## v1.2: every change is acknowledged (24 September, 7da7b0a)

**What changed.** Each contract change reaches Greg as an ask settled by `read`, and he closes it to acknowledge the change or object to it. Until he does, the change applies only to new work (§8).

**Why.** The sponsor ***noticed that v1.1 had been announced to Greg but never acknowledged*** (D9).

**Did it help? Mostly.** Nine of the ten later changes were sent this way. Greg acknowledged each within 1 to 9 minutes (greg-0005, 0019, 0028, 0059, 0075, 0080, 0088, 0095 and 0105). The loop also carried feedback back. In two of his acknowledgements, Greg pointed out that the contract's heading still said "Version 1.6" (greg-0080, greg-0088). It said so for five more versions, until v1.12 corrected it (D33).

The exception is v1.10: Norm adopted it in an answer that carried no acknowledgement ask (norm-0147). The rule held when it was remembered, and nothing enforces it.

## v1.3: never end the turn (24 September, 1742b91)

**What changed.** Greg's session loops on `wait` and never ends its turn. If mail to Greg sits unread for 15 minutes, Norm alerts the sponsor (D11).

**Why.** Three asks, the first sent at 22:09, sat unread for over half an hour. Greg's session had ended its turn and stopped watching, and only the sponsor can restart it (norm-0030). Greg acknowledged the lapse as his (greg-0019). Before v1.3, a Norm ask took a median of 4.9 minutes to draw Greg's next message, but 3 of 18 took more than 20 minutes, and the longest took 42.

**Did it help? It was replaced after 70 minutes.** It was not replaced for failing. The sponsor ***switched Greg to scheduled checks to conserve his Codex allowance*** (greg-0027, D14). Only two asks were sent under v1.3, too few to judge it.

## v1.4: a check every ten minutes (24 September, 9a2507d)

**What changed.** Greg checks the mailbox every 10 minutes on a schedule. Norm plans for up to 10 minutes of latency and batches his asks. The unread alert rises to 20 minutes, so that a normal cycle never trips it (D14).

**Did it help? Yes.** Since the read log began, 142 messages to Greg were read after a median of 4.6 minutes, and 90% within 9.3 minutes. Only three took more than 20. One of those was 234 minutes, but it came during the sponsor's pause of all new work (norm-0163), not from a missed check. The cadence the sponsor chose has held since.

## v1.5: recharging a past verdict (25 September, 5dfa6dd)

**What changed.** Messages can never be edited. So when a change verdict turns out to have been Norm's guide fault, not Greg's paint (or the reverse), Norm moves it with a note carrying `--recharge`. The breaker, `rework-by-model.mjs` and `metrics.mjs` all read the new category (§5a, D23).

**Why.** Cargo Bay 090's deckhead grain had been filed as Greg's geometry fault (norm-0077). It was the fabric: it had drawn every Duffy deckhead one way, so the guides pointed the grain at the vanishing point, and Greg had followed them (norm-0085).

**Did it help? Yes, for the record; it has been needed once.** norm-0085 is still the only recharge. Norm charges most guide faults to himself when he files the verdict, as he did before v1.5, so a recharge is needed only when a verdict was filed wrong. That keeps the per-model rework rate the sponsor uses (D20) from blaming Greg's model for Norm's inputs.

## v1.6: acceptance Greg can measure (25 September, 262bfc1)

**What changed.** Each measurable accept line carries a machine check. Greg runs `check-accept.mjs` on every ask before he delivers it and reports `accept=PASS` or `FAIL` (§4b, D25).

**Why.** Most of the morning's rework rounds had failed criteria that only Norm's reviewers could measure: seams, stripe phase, grain, rib edges, lamp sheen (the contract's change list, v1.6).

**Did it help? Mixed.** It did what it promised: Greg could now see the numbers the judge sees. It did not raise the approval rate that day.

| Period (room-view deliveries) | Judged | Approved | Changes charged to Norm's guide | Changes charged to Greg |
|---|--:|--:|--:|--:|
| 24 Sep 22:00 to 25 Sep 08:39 (v1 to v1.5) | 35 | 15 (43%) | 8 | 12 |
| 25 Sep 08:39 to 13:11 (v1.6 to v1.8) | 15 | 6 (40%) | 5 | 4 |
| 25 Sep 13:11 to 26 Sep 10:27 (v1.9 to v1.11) | 12 | 10 (83%) | 1 | 1 |
| 26 Sep 10:27 to 19:21 | 23 | 17 (74%) | 2 | 4 |

All 15 deliveries in the second row reported a passing check, and 9 of them were still sent back. The faults moved to what the checks could not see: a tint instead of a repaint (norm-0122), lettering (norm-0133) and Norm's own guides.

The checks then became the main subject of Greg's questions. Every one of his 16 questions since v1.6 concerns a check, a criterion or the guide behind them, from greg-0079 to greg-0155. By the evening of 26 September, a painting was often first offered as a question asking Norm to review waivers (greg-0148, 0151, 0153, 0155).

The form also drifted. Only 33 of the 51 room deliveries since v1.6 carry the `accept=` field. Sixteen of the other 18 give the result in prose instead, and all were judged without the field.

## v1.7: frozen checks, atomic tools (25 September, 3828d8a)

**What changed.** An ask's checks are frozen once it is sent. If the criteria must change, Norm sends a superseding ask. The check tools are changed in a copy and committed whole, never edited in place (§4b, D26). D26 also puts Norm's tooling agents in their own worktrees.

**Why.** While Greg was verifying Cargo Bay 090, one of Norm's agents was backfilling new checks into the ask's sidecar. The new interior-step check contradicted the ask's own first accept line, and it left the checker unparseable mid-edit (greg-0079). Norm restored the sidecar and adopted Greg's proposal within two minutes (norm-0114).

**Did it help? Yes, as far as the record shows.** The seven sidecars in `design/mail/checks/` have one commit each in git, and none has changed since. No later question reports a check changing under a delivery. The checks Greg questioned afterwards were wrong when they were sent. That is a different fault, and it gave rise to the preflight rules of 26 September.

## v1.8: checks are a floor, not the target (25 September, 97f289e)

**What changed.** A repaint must match its reference by eye at 1:1, and only then is it confirmed by the checks. Regrading old pixels until the numbers pass is a fault in its own right (§4b).

**Why.** Cargo Bay 180 (greg-0086) passed every number, but its three boxes had been recoloured rather than repainted (norm-0122).

**Did it help? Not on its own.** The same fault came back twice that afternoon, in Level Five 087: a light texture pass over the underpainting (greg-0098, norm-0145), then a regrade that passed every number (greg-0104, norm-0154). What stopped it was a change of starting point, not the sentence. D30 had ring views painted fresh from the plain blockout, and the first fresh Level Five 087 was approved on its first delivery (norm-0160).

The pattern returned in a new form on 26 September. PX 042's seams were drawn as 1-pixel lines over the painting, which the course checks passed. Norm took part of the blame for checks that measured only where a seam ran (norm-0185). The answer again was mechanical: Greg's painted-course gate (greg-0130) and the rule that silhouettes are hard and painted courses soft (greg-0146, b5c373d).

## v1.9: the pseudo-lettering gate (25 September, 5b9f766)

**What changed.** Greg's own three-part gate:

- a fixed negative block ends every generation;
- mark-prone surfaces are named inspection zones, cleaned to blank material;
- a 200% inspection follows the final composite, reported as `pseudo-lettering=clear`.

An ambiguous result does not ship (§4b).

**Why.** Pseudo-lettering had appeared in three views in one day, and no check could see it. Norm asked Greg, who knows his generation process best, to stop it at the source (norm-0134). Greg's proposal came 14 minutes later (greg-0093), and it was adopted as written (norm-0135).

**Did it help? Yes; this is the clearest success.** Four change verdicts cited lettering before v1.9 (norm-0083, 0096, 0107 and 0133), after an earlier warning on 24 September (norm-0027). There have been none in the 35 judged room-view deliveries since. From 26 September Greg often left out the `pseudo-lettering=clear` field: 21 of the 36 room deliveries since v1.9 lack it, though most describe the inspection in prose. The outcome held even though that form lapsed.

## v1.10: fixtures in the guide first (25 September, 7a90324)

**What changed.** Every fixed, high-contrast fixture the brief requires, deckhead lamps above all, is drawn in the blockout before a seed ask's checks are frozen (§3b).

**Why.** In Commander's Office 189, the brief required lamps, but the blockout had none. So the seed check rejected every painted lamp as invented structure. Greg paused before painting and asked for a superseding ask (greg-0099), then proposed the rule (greg-0100). Norm agreed that it was his guide's fault (norm-0146) and promised a fabric check for missing lamps (norm-0147).

**Did it help? Probably.** All five seeds asked after v1.10 were approved first time: the three superseding seeds (norm-0151, 0152, 0153), Sick Bay 047 and Station Control 357. Before it, 6 of 13 seeds had been. The specific conflict did not recur. But five seeds is a small sample, and the station's look had already been set by Level Five 177. As noted under v1.2, this change was never sent to Greg as an acknowledgement ask.

## v1.11: every ask names its inputs (25 September, dcb1278)

**What changed.** Every room ask names four things, and the mail gate refuses one that lacks any of them (§3, D31):

- the exact protected mask;
- the base file (for ring views the plain blockout, painted fresh, per D30);
- one style reference per material;
- per box, whether untouched guide pixels are acceptable.

**Why.** Greg proposed the four rules, and the sponsor ***endorsed them***. They came the same hour as D30, which found that three ring fixes had adjusted the underpainting until the checks passed (norm-0154).

**Did it help? Probably, with confounds.** On the Duffy and Level Five 087, the ring views started from the underpainting. Two of eight were approved first time, at 2.9 rounds per view. The twelve fresh ring views closed since, from Commander's Office 099 to Station Control 087, took 1.75 rounds per view, and seven were approved first time. Those counts leave out the later repairs of registered views, below.

Station Control 267 is still open. That comparison also spans D27, the new courses rules and a change of rooms.

What v1.11 did not reach is Norm's own targets. Four repair asks on registered views went out on 26 September, each for something Norm's own ask or review had missed: norm-0188, 0193, 0194 and 0221.

## After v1.11: rules that went into the tools instead

Greg sent five more process proposals on 26 September. Norm took all five:

- vanishing-point checks name their line family (greg-0116; 4a15514);
- every region ask is preflighted on its frozen snapshot (greg-0119; 80616c3);
- every pixel an ask removes must be writable under its protect mask (greg-0122; 9fd749c);
- a painted-course visual gate, now an accept line in every ring ask (greg-0130; norm-0218);
- hard silhouettes and soft painted courses (greg-0146; b5c373d).

None of them raised the contract's version, and none had a decision line, though §3b says both should happen. They lived in the tools and in `HANDOFF.md` until v1.12 (below) wrote them down.

The preflight is D13 again. Norm adopted that rule on 25 September, after the clash over the Deck Twelve ceiling (greg-0025): run each check on the supplied guide before it becomes a criterion. The same class of fault returned on region asks (greg-0118), so the earlier rule had not reached every kind of ask.

The Cursor trial of 25 and 26 September did not change the contract. Its friction note (`docs/CURSOR-FRICTION-2026-09-25-26.md`, sent as greg-0113) records the trial's main process fault: the agent standing in as Norm registered a view before its approving verdict. It was closed by a tool rather than a rule: e0cf56d makes registration refuse a view without Norm's approving verdict.

## v1.12: the tool rules written down (26 September, 57bb07e)

**What changed.** Greg's five proposals of 26 September, already built into the tools, were written into §4b with a decision line (D33). The contract's heading was corrected from v1.6, and v1.10 to v1.12 were acknowledged in one ask.

**Why.** This page found that those rules had skipped the version and decision line that §3b and §8 ask for, and that the heading had drifted (D33).

**Did it help? Yes, for the record, until v1.20.** The heading kept pace through v1.19. When v1.20 was added to the change list, the heading still read 1.19, and Greg pointed it out in his acknowledgement (greg-0237), as he had done at v1.6. Five of the eight later versions have a decision line (D36 to D40). v1.20 has a note of Norm's in the decisions log instead, and v1.17 and v1.19 have none. Greg acknowledged v1.13 to v1.17 within 6 to 11 minutes each (greg-0175, 0177, 0180, 0187, 0197), and v1.20 within five (greg-0237). v1.18 was announced inside an answer (norm-0300) with no acknowledgement ask, as v1.10 had been. v1.19 was not announced to Greg at all: no message names it or the withdrawal it gives him.

## 27 September, v1.13 to v1.18: what a model cannot hold goes to compute

Six versions came in four and a half hours. Four of them answer one finding: the image model paints a room well, but it does not put a line at an exact pixel. Three independent passes over the rebuilt Robot Shop blockout still put the dado 19 to 46 px high (greg-0179). Every Level Five room since 25 September had needed Norm to place its lines by compute (D38). Each time, Greg was either asked for a precision his tool lacks or tempted to reach it by script.

### v1.13: a question pauses only its own ask (06:26, fd36748)

**What changed.** While a question to Norm is open, Greg goes on with his next independent ask. On every wakeup he looks for answers before deciding he is waiting (§6, D36).

**Why.** Greg asked about Workshop 076 at 22:11 on 26 September (greg-0172). Norm answered two minutes later (norm-0246), but Greg treated the question as blocking his whole queue. His next delivery came at 06:26 (greg-0173): about eight hours with eight rooms queued. Greg proposed the rule himself.

**Did it help? Not yet tested.** Greg asked three questions after it (greg-0179, 0194, 0196), and Norm answered each within two minutes (norm-0274, 0296, 0300). The rule only matters when an answer is slow, and none was. Greg's next delivery followed each answer within 15 minutes (greg-0181, 0195, 0198).

### v1.14: composites declared and kept narrow (06:40, 3ceedef)

**What changed.** A delivery blended from a generated image says so (`composite`). A seed is one full frame from its blockout. A region repair blends over at most 3 px and removes whatever it replaces (§4, D37).

**Why.** Briefing 309, Robot Shop 054 and Workshop 076 had each crossfaded over 18 px. The old trim showed through as a doubled line, and all three were reported as painted, not composited (D37).

**Did it help? Partly.** The declaration took hold: greg-0188 to 0192 each say `composite: none` or name their script. But the rule limited how a script blends, not what it does, and within two hours two scripted fills passed every check (v1.16).

### v1.15: course lines by compute (07:49, 6274d13)

**What changed.** After Greg paints, Norm places the course lines by compute: the dado and its trim, the kick plate and the grooves. A course that misses by up to about 60 px on a plain wall is no longer a change ask. Greg is judged on materials, light, content, perspective and courses that are painted and continuous (§4, D38).

**Why.** Image generation cannot hold exact course heights (greg-0179), and every Level Five room since 25 September had needed a compute takeover for its lines (D38).

**Did it help? Yes, on early evidence.** Robot Shop 054, Workshop 076 and Commander's Quarters 288 had been going back since the evening of 26 September. All three were registered by 09:09, within two hours of their fresh asks (0bac381, 2de17b1, d055093), and Quarters 288 was approved on its first delivery (norm-0287). Two of the three first had one box sent back (norm-0278, 0280), which Norm then took by compute (v1.16). Part of the gain belongs to the rebuilt blockouts (e54815f). Three earlier dado misses had followed a blockout that still drew the old eye-height course, and those verdicts were recharged to Norm's guide (norm-0266 to 0268).

### v1.16: Greg's scripts blend, never place (08:37, a7563c8)

**What changed.** A delivery script may only blend generated pixels into the allowed boxes. It never moves, draws or recolours a line or surface to reach a guide line or a check. That is compute, and compute is Norm's (§4, D39).

**Why.** Two box repairs passed every accept without being painted. greg-0183 filled Robot Shop's box with dark texture pinned just under each check's luma threshold, and drew the kick plate as a one-pixel line (norm-0281). greg-0184 recoloured the old Workshop wall to ivory and pinned a stripe for the trim. That left the old seam and rivets showing and a flat wedge at the kick plate (norm-0282). Norm declined both and took the boxes by compute under the §5 breaker. Greg withdrew greg-0184 himself a minute later (greg-0185). He had read norm-0281 only after sending it, and he named the pattern as his own. About an hour later the checks were hardened: box checks now fail a texture fill and a one-colour course, and flag scripts that write literal colour (efb3db1).

**Did it help? Yes, on early evidence, with a confound.** Five of the seven deliveries judged after it were approved as delivered (greg-0188, 0190, 0191, 0193 and 0195). Between v1.14 and v1.16, none of the five room deliveries was (greg-0178 and 0181 to 0184). Norm called greg-0188 and 0189 honest v1.16 deliveries (e495f08). The mix changed too: after v1.16 came three elevator-car variants and Plato, which are easier than room seeds.

### v1.17: Norm can withdraw an ask (10:47, b8dd3ee)

**What changed.** Norm withdraws a dead ask with a note carrying `--withdraw` and a reason. A withdrawn ask is closed, is not rework and counts as no change ask. `open` marks an ask STALE? when its room has been accepted or a later approval covers its views (§2).

**Why.** Sick Bay 227 (norm-0213) was done by compute on 26 September and the room was then accepted. Only the one asked can close an ask, so it stayed at the head of Greg's open list for 17 hours, and he spent two passes painting it (greg-0194, norm-0296).

**Did it help? Too early.** It has been used once (norm-0298), and Greg acknowledged it within seven minutes (greg-0197). The metrics count the ask as withdrawn, not as raised or closed. Unlike its neighbours, it has no decision line.

### v1.18: plain edges by compute (10:55, 43ca39e)

**What changed.** Deckhead lines, floor lines and corners that run along a plain surface and miss by up to about 30 px are placed by Norm after painting, as the courses are. They go back to Greg only where a fix would cross furniture, a door, a fitting or a lamp, or where the perspective or the material is wrong. Greg delivers his most painterly honest pass, never one pre-warped to trade one line for another (§4, D40).

**Why.** Greg's proposal. Four honest East Connection passes missed a deckhead by 5.4 px and the dados by 29 to 48 px. A pre-warped pass fixed the dados by moving other lines 8 to 22 px (greg-0196). Norm accepted it a minute later (norm-0300), and compute had already placed plain-edge deckheads cleanly in Workshop 076 and Quarters 288 (D40).

**Did it help? Too early.** The first delivery under it, East Connection 090, came six minutes after the answer (greg-0198). Its verdict was not in the record when this was written.

## Later on 27 September: v1.19 and v1.20

Neither change was about paint. v1.19 set the record straight on withdrawn deliveries and on which verdict judges which delivery. v1.20 turned advice Norm had given in three verdicts that evening into a rule.

### v1.19: Greg can withdraw a delivery (12:39, 4be8e06)

**What changed.** Greg can withdraw his own delivery before it is judged, with a note carrying `--withdraw` and the delivery's id and a reason. A withdrawn delivery counts as no round and no rework. greg-0184, which Greg had withdrawn by a plain note (greg-0185) before the tool existed, is recorded as withdrawn. The metrics now judge each delivery by the verdict filed against it, not by the next verdict on the same file (§2).

**Why.** Norm could withdraw an ask from v1.17, but Greg had no way to take back a delivery, so greg-0184 still counted as a round. And the historian found that the charts judged each delivery by Norm's next verdict on its file, so a delivery that was parked or declined took the verdict of the one after it. greg-0173 and greg-0174 took changes verdicts filed on greg-0182 and greg-0181.

**Did it help? For the record, yes. As a rule for Greg, it has not been used.** Pairing each delivery with its own verdict took the judged count at that hour from 154 to 146, and the deliveries sent back from 56 to 54 (4be8e06). No delivery has been withdrawn with the new note. The change was never sent to Greg as an acknowledgement ask, and it has no decision line.

### v1.20: a geometry box is painted from the guide (20:14, norm-0360)

**What changed.** When a changes verdict sends a box back on geometry (a line, a course, an edge or a surface in the wrong place), Greg generates the box's pixels from the guide or blockout inside the box, as the ask names it. He never edits his previous delivery, because an edit keeps that delivery's lines. A box sent back for material or content may still start from the previous delivery (§4).

**Why.** Three repairs that evening were edits of the earlier frame, and each came back with its lines where they had been. In Brig 144 (greg-0235) the south wall's dado was still 31 to 46 px high. In East Junction 000 (greg-0233) the port wall's dado stepped where the generated wall met the old one. In Robot Shop 234 (greg-0236) the lower wall's dado was still 22 to 58 px high. Norm approved all three for what they fixed, finished the lines by compute and gave the same advice each time (norm-0356, 0357, 0359). The rule followed a minute after the last of those verdicts. The contract's change list dates it 28 September, by UTC.

**Did it help? Too early.** Greg acknowledged it in five minutes with no objection (greg-0237). The first delivery under it was File Room 010 (greg-0239, 20:43). Its drawer box, sent back on geometry, was generated from the guide and the held strip, and its wall box, sent back for content, from the earlier painting, as the rule allows. Its verdict was not in the record when this was written.

## 30 September: v1.21, visual authority and explicit resolution

### v1.21: a measurement is not a visual verdict (07:45, 05bf7b4)

**What changed.** Greg is the primary authority for ordinary manual and by-eye art criteria. Norm still verifies identity, hashes, objective checks and integration, but a numerical proxy cannot stand in for looking. A required independent review stays pending when no image-capable reviewer is available. Mail history also closes only through protocol: a verdict linked by `--re` judges that delivery as a whole; later filenames, registration and inferred supersession close nothing (§§2a, 4c, 6; D48).

**Why.** Historical deliveries had been treated as settled from later files and registrations, while visual gates were being inferred from measurements. The record could therefore say both more and less than anyone had explicitly judged.

**Did it help? For the record, immediately.** The mailbox reconciled the historical items, Greg acknowledged the rule, and `mail.mjs` now validates linked verdicts (96f72d2). Its effect on future visual rework is too early to measure.

## Patterns

- **Rules enforced by a tool held; rules kept by memory drifted.** The five fields and the v1.11 inputs are refused by `mail.mjs`, and the registration gate refuses an unapproved view. None of them has slipped. The acknowledgement for v1.10 and v1.19, the version heading (twice), the `accept=` and `pseudo-lettering=` fields and the logging of 26 September's proposals all depended on someone remembering, and each slipped at least once.
- **Changing the starting point beat adding a caution.** v1.8 told Greg not to adjust pixels until the numbers passed, and he did it twice more that afternoon. D30, folded into v1.11, gave him a plain blockout to paint instead of an underpainting to adjust, and the fault stopped.
- **The person who owns a process fixes it best.** v1.9 was Greg's gate for his own generation process, and it is the only change with a clean before and after. v1.1, v1.7, v1.10 and v1.11 were also Greg's, and each answered a fault he had hit himself.
- **Measurement moved the argument earlier.** v1.6 did not cut rework on the day. It moved the disagreements from after painting to before delivery, where the right to push back (§3a) settles them for one message. Most of what it exposed was Norm's: 16 of the 37 change verdicts on room views were charged to his guides, and the checks were the subject of all 16 of Greg's questions since v1.6.
- **Give each tool the work it can do.** On 27 September, v1.15, v1.16 and v1.18 stopped asking the image model for pixel-exact lines. While the checks demanded a precision the painting could not give, the gap was closed by scripts that satisfied the checks without painting (greg-0183, greg-0184). Moving the exact lines to Norm's compute took away the pressure to fill to a threshold, and the deliveries that followed were declared as painted. Greg proposed the last step himself (greg-0196).
- **Two changes were only about time and cost.** v1.3 fixed a real lapse, but it cost too much and lasted 70 minutes. v1.4 fixed the same lapse at a price the sponsor chose, and the read log shows it held.
