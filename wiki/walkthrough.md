# How to win Stationfall

This is the critical path that scores **80 of 80** in Infocom's *Stationfall* (1987). It is the same order the port holds to the original: 335 commands, one night's sleep, a win on day 2 (the seed-1 route, `porting/route-seed1.cmds`, which `scripts/tests/walkthrough.mjs` plays to the win). It is not a transcript and not a tour. Optional jokes, empty rooms and dead-end objects are left out.

Commands are written as the original parser accepts them. File citations are to the 1987 ZIL, the same style as [Where we left the original](canon-deviations.md). Nothing from the original source listing is copied here.

## How to read this page

- **Every command you type is in `code`, in the order you type it.** Sections 1 to 10 hold all 335 commands of the route and nothing else in `code`. A word after a command, such as *twice* or *four times*, means type it that many times: `UP` four times is UP, UP, UP, UP. Room names in brackets say where each move takes you. `scripts/tests/walkthrough-doc.mjs` checks this page against the route, command for command, so the two cannot drift apart.
- **To follow it move for move, play seed 1.** Open the game with `?seed=1&fresh=1` added to its address: the seed fixes the chances, and `fresh` starts a new game instead of resuming the one the page kept. Do not use RESTART for this, as it starts with a new seed. Floyd's and Plato's wandering, the hull welders, Plato's ambush and the other chance events then happen exactly where this page says. On any other seed the puzzles and the order are the same, but a robot may be in a different room, or a welder in your way, and you adapt.
- **If Plato pulls a stun gun on you, stop reading the route.** It can happen from section 6 on, wherever you are standing, and it kills you in five turns if you do not know one command. Everything you need is in [If Plato pulls the stun gun on you](#if-plato-pulls-the-stun-gun-on-you), after section 10.
- **Save where it says Save here.** SAVE takes no game time (CLOCKER-VERB?, misc.zil 431-437), so saving never changes the course number or anything else on the route, and a restore puts the chances back as they were. The Save button does the same.

## Port notes

These are interface, not extra puzzles. Skip this section to play as in 1987.

- **Typed and click are the same game.** A click sends the words the 1987 parser would have read. The winning verbs below work either way. The click menus put physical verbs such as Kick, Scare and Look under on a shared "More…" row, so they are not singled out as answers ([canon-deviations.md](canon-deviations.md)).
- **Conveniences are on for players.** `?conveniences=0` plays the original word for word. With the switch on, two steps on this route print a one-time warning instead of acting: `DRILL SAFE` in section 5 and the second `TAKE BOOTS` in section 6. Type the same command again. The route still wins.
- **A blueprints binder.** With the conveniences on you also carry a red binder of the station's blueprints from the start (D96). `READ BLUEPRINTS` opens the plans at any time. It is not part of the route, and dropping the forms in section 2 no longer loses the plans.
- **Three bracketed hints.** The port prints three one-time hints in brackets, with the switch on or off (D93, [canon-deviations.md](canon-deviations.md)). This route meets only one of them, on waking on day 2 (section 4).
- **The course number depends on the time you type it.** The seed-1 route types `259`. If you waited, read Form QX-17-T at the current time, or compute the heading as below.

## What you must keep

| Thing | Where it first appears | Why |
|---|---|---|
| Floyd | Robot Pool, bin 3 | He fetches the medium bit, saves you from Plato, and must be present in the Factory |
| Survival kit | Spacetruck | Soup and later orange goo; the closed Thermos holds the explosive |
| Validation stamp | Under the bed, Commander's Quarters | Validates the village form |
| Village form FW-83-Q | Trash can, Level Seven | Ironed and stamped, it opens the iris hatch |
| Drill (small bit already in it) | Paper Recycling, Level Seven | Pencil-sized hole in the safe needs the **medium** bit |
| Medium bit | Heating chamber, Robot Shop | Only Floyd can take it from the chamber |
| Detonator | Main Storage, Level Two | The burnt diode in it is a dud; swap in the M-series diode |
| ID card, rank 7 or higher | Raised at Shady Dan's | Rank above 6 opens the Armory door |
| Magnetic boots | Junk Yard | Vac-yard footing; taking them while you hold the ID card scrambles the card |
| Headlamp | Village Field Office | 92 turns of charge, spent only while it is on; dark Storage, the vac yard, and lights-out |
| Zapgun | Armory | Strong box (the coin) and Floyd in the Factory |
| Ostrich nip | Pet Store ceiling panel | Leads the ostrich to the PX; feeding it anywhere else loses the timer |
| Spray can | Pawn Shop | Twelve charges; lures the balloon creature to the Chapel |
| Coin | Loan Shark strong box | PX item 6, the timer |
| Timer | PX dispenser | Wired to the detonator |
| Twenty-prong fromitz board | Astro Lab | Plugged into the jammer |
| Jammer, set to 710 and on | Dark Storage, west of North Connection | Freezes the exercise machine; turning it off then destroys the forklift |
| Reflective foil | Behind the barbershop mirror | Covers the pyramid |
| Space suit | Flophouse locker | Vac yard only; it will not pass the iris hatch |
| Explosive | Vac yard | Into the closed Thermos, then the safe hole, the same day |
| M-series diode | Inside the Chapel star | Replaces the detonator's burnt diode |
| Key | Commander's safe, after the blast | Unlocks the Dome fuel-cell bin |

Food on this path: the soup (docking), the nectar (Greasy Straw), the orange goo (kit). The gray goo and the taffy are spare. Eat when the hunger warning fires; eating resets the clock for 2250 millichrons (V-EAT, verbs.zil 686-692). The first warning is queued 1330 after the start (misc.zil 197). Collapse is hunger stage 5 (I-HUNGER-WARNINGS, globals.zil 1194-1219).

## 1. The Duffy: Floyd and the truck (0 → 5)

From Deck Twelve, `EAST` (Cargo Bay Entrance), then `NORTH` into the Robot Pool. `PUT ROBOT FORM IN SLOT` and `TYPE 3`. That is Floyd (ROBOT-TYPE, verbs.zil 2095-2112). Rex or Helen will follow, but they cannot fetch the medium bit or stop Plato.

`SOUTH` (Cargo Bay Entrance), `EAST` (Cargo Bay), `OPEN HATCH`, `ENTER SPACETRUCK`. `TAKE KIT`. `CLOSE HATCH`. `SIT IN PILOT SEAT` (Floyd takes the other). `PUT CLASS FORM IN SLOT`, then type the course.

> **The course depends on the time you type it. 259 is right only at time 5355.**
> There is no refuelling. If you die in space after the fuel "runs out", the course was wrong for the moment you typed it: the truck flies the wrong heading, the burn ends with "Fuel level now effectively at zero", and the oxygen runs out a while later (I-SPACETRUCK, ship.zil 1213-1218; I-SUFFOCATE).
> Read the time on the status line just before you type, then either:
> - **compute it:** time ÷ 50 (drop the remainder), − 132, square it, ÷ 4 (drop the remainder), + 103. At 5355: 107 − 132 = −25 → 625 → 156 → **259**. At 5405: 108 − 132 = −24 → 576 → 144 → **247**.
> - **or look it up** on Form QX-17-T ("Papers & blueprints…"), the original's time-and-course chart.
>
> Any extra command before typing (a LOOK, an INVENTORY, a wrong turn) moves the clock and changes the answer. Following this page from a fresh start, the status line reads 5355 here.

`TYPE 259`. Both seats must be occupied and the form accepted, or the keypad refuses (SPACETRUCK-TYPE, verbs.zil 2125-2157). Then `WAIT` six times: the truck launches, crosses, and docks. Docking scores 5 (ship.zil 1198-1205), and the first hunger warning comes with it.

`STAND`, `OPEN HATCH`, `OUT` (Docking Bay #2). `OPEN KIT`, `OPEN THERMOS`, `EAT SOUP`. Keep the empty Thermos: only the explosive and the drill bits fit its neck, and the closed bottle slows the explosive's melt to a quarter speed (I-EXPLOSIVE-MELT, interrupts.zil 358-365; THERMOS-F, ship.zil 1288-1313).

**Save here.**

## 2. Day 1 on the station: form, stamp, drill (5 → 11)

`EAST` (Level Five), `SE` (South Junction), `SE` (Commander's Office), then `EAST` into the Commander's Quarters. `LOOK UNDER BED` and `TAKE STAMP` (BED-F, globals.zil 876-882).

`WEST` (Commander's Office), `NW` (South Junction), `NW` (Level Five), then `DOWN` twice (Level Six, then the Printing Plant on Level Seven). `OPEN CAN` (the trash can) and `TAKE CRUMPLED FORM`. `NW` to Paper Recycling and `TAKE DRILL` (it already holds the small bit).

Back up to Level Three: `SE` (Printing Plant), `UP` four times, up the ladder (Levels Six, Five, Four, Three), then `NW` into the Laundry. `OPEN PRESSER`, `PUT CRUMPLED FORM IN PRESSER`, `CLOSE PRESSER`, `TURN ON PRESSER`, `OPEN PRESSER`, `TAKE IRONED FORM` (PRESSER-F, station.zil 1369-1411). (It has to be pressed: the slot you will feed it to later refuses a crumpled form, FORM-SLOT-F, globals.zil 706-708.) Now stamp it yourself. There is no slot here and none is needed: with the validation stamp in hand this works in any room, and the route happens to step `EAST` (Level Three) first. `VALIDATE IRONED FORM` ("Done."; V-VALIDATE / VILLAGE-FORM-F, verbs.zil 2282-2293; station.zil 2750-2763).

`UP` the ladder to the Mess Hall on Level Two, `NORTH` into Main Storage, `TAKE DETONATOR`. Main Storage has no way down: `SW` back into the Mess Hall, then `DOWN` three times, down the ladder (Level Three, Level Four, Level Five), `SE` (South Junction) and `SOUTH` into the South Connection, where the slot is. `PUT IRONED FORM IN SLOT`. A validated form opens the iris hatch about halfway and scores 6, to 11 (FORM-SLOT-F, globals.zil 735-751). An unstamped form is rejected. `DROP STAMP` and `DROP ASSIGNMENT FORM`; you will not need them again.

The space suit, when you have it, is too bulky for this hatch (VILLAGE-BOUNDARY-F, village.zil 10-15). Leave it in the Warehouse.

## 3. The Village: food, locker, nip, rank, boots (11 → 18)

`SOUTH` twice (Grimy Passage, Main Street), `NE` to the Greasy Straw. `SEARCH COUNTER` and `TAKE NECTAR`. `NE` (Trading Post), `EAST` twice (Saloon, Casino). `TURN WHEEL`: exits open above and north, and you score 4, to 15 (ROULETTE-WHEEL-F, village.zil 726-737). `UP` to the Flophouse and `OPEN LOCKER` (the space suit is here; you come back for it in section 8).

`DOWN` (Casino), `WEST` (Saloon), `NW` (Grocery): `TAKE BAG`, the bag of taffy. `NORTH` (Broadway), `EAST` (Field Office): `TAKE HEADLAMP`. `WEST` (Broadway), `SW` to the Pet Store. `EXAMINE CEILING`, `OPEN PANEL`, `TAKE NIP` (VALUE 3, to 18).

`SE` twice (Trading Post, Shady Dan's). `PUT ID CARD IN SLOT`, `TURN ON MACHINE`, `TYPE 8` (Admiral). Rank 7 or higher is enough: the Armory reader opens only when ID-RANK is greater than 6 (ID-CHANGER-TYPE, village.zil 1862-1881; ID-READER-F, station.zil 3061-3078). `TAKE ID CARD` and `PUT ID CARD IN UNIFORM`.

The magnetic boots are in the Junk Yard, below Shady Dan's. The boots are magnetic, and the card is magnetic tape: if the card and the boots are ever on you together while the boots are not on your feet, the card is wiped (ID-SCRAMBLED), and a wiped card cannot be rewritten and will not open the Armory. Taking the boots while you carry the card, taking the card while you carry unworn boots, or taking the boots off while you hold the card all wipe it (V-TAKE, verbs.zil 1917-1927; BOOTS-F, village.zil 1932-1944). Step by step, from Shady Dan's with the rank-8 card in your uniform pocket:

1. `DOWN` to the Junk Yard.
2. `WEAR HEADLAMP`. The Junk Yard is lit; this is only to have it on, hands free, for the dark places later.
3. `DROP ID CARD`. It comes out of the uniform pocket and floats here, safe from the boots.
4. `TAKE BOOTS`, then `WEAR BOOTS`. Worn, the boots no longer wipe the card.
5. `TAKE ID CARD`, then `PUT ID CARD IN UNIFORM`.
6. `UP` to Shady Dan's.

From now until the Armory door has opened, do not take the boots off while you hold the card.

**Save here.**

## 4. Armory and first night (18 → 26)

Back through the village and up to Level Six. From Shady Dan's: `NW` (Trading Post), `SW` (Greasy Straw), `SW` (Main Street), `NORTH` (Grimy Passage), `NORTH` through the iris hatch (South Connection), `NORTH` (South Junction), `NW` (Level Five), `DOWN` (Level Six), and `SE` to the End of Corridor, where the security door is. `PUT ID CARD IN READER`, then `NORTH`. The Armory scores 5, to 23 (station.zil 1055-1063). `TAKE ZAPGUN`. The door shuts a turn or two later if you walk away (ID-READER-F, station.zil 3074-3076; I-SECURITY-DOOR, 3043-3049).

`SOUTH` back to the End of Corridor. The first sleep warning fires here on this route (queued from 8100 on day 1; I-SLEEP-WARNINGS, globals.zil 899-928). `SW` to Officers' Quarters B and `ENTER BED`. Entering the bed once you are already tired queues sleep 22 later (BED-F, globals.zil 851-853), so one `WAIT` puts you to sleep. If you are already in the bed when a warning fires, that queue is 16 (I-SLEEP-WARNINGS, globals.zil 907-912). Waking begins day 2 and scores 3, to 26 (WAKING-UP, globals.zil 1059-1073). Only the first night scores.

On waking the port adds one bracketed line: the station is worse than yesterday and your rations will not last (D93). It is a reminder of the clock. This route finishes on day 2 with time to spare, so carry on.

Do not sleep on the floor after Docking Bay 2 has been visited: welder death is PROB of DAY*40 (WAKING-UP, globals.zil 1036-1045). Do not sleep with the nip while the ostrich is in the room. Do not sleep in the suit. Do not sleep with the explosive sitting in the drilled hole. If the explosive is not still in the vac yard, waking removes it (globals.zil 1081-1084).

`STAND` and `TAKE ALL`: everything you carried was dropped beside the bed. (It also tries to lift Floyd and Plato; that is harmless.)

**Save here.**

## 5. Medium bit, safe, coin, ostrich, timer (26 → 40)

The Robot Shop is west of the South Connection, and Floyd has to be with you there. `NORTH` (End of Corridor; Floyd bounds in), `WEST` (Level Six; a hull welder approaches, so keep moving), `UP` (Level Five), `SE` (South Junction), `SOUTH` (South Connection), `WEST` into the Robot Shop. On this route Floyd and Plato have stopped at Level Five, so go back for them: `EAST` (South Connection), `NORTH` (South Junction), `NW` (Level Five, where they are), then `SE`, `SOUTH` and `WEST` into the Robot Shop again, with them following. (On another seed, if Floyd is already with you on the first visit, skip the loop.)

`FLOYD, TAKE MEDIUM BIT`, then `TAKE MEDIUM BIT` from the deck (FLOYD-F, ship.zil 370-375). The boots cannot pull it from the heating chamber (BOOTS-F, village.zil 1945-1950). That take scores 3, to 29 (MEDIUM-BIT VALUE, station.zil 2530-2537).

To the Commander's Quarters: `EAST` (South Connection), `EAST` (Briefing Room), `NORTH` (Commander's Office), `EAST` (Commander's Quarters). `TAKE SMALL BIT` out of the drill, `PUT MEDIUM BIT IN DRILL` and `DRILL SAFE`. That hole is pencil-sized; the small bit's toothpick hole will not take the explosive (DESCRIBE-BIT-SIZE / DRILLED-HOLE-F, station.zil 940-974). The drill dies if you try a second hole in another room (MAKE-HOLE-WITH-DRILL, station.zil 996-1004). `DROP DRILL`, `DROP SMALL BIT` and `DROP DETONATOR`: they stay here. The hunger warning has just fired, so `EAT NECTAR`.

To the Loan Shark: `WEST` (Commander's Office), `SOUTH` (Briefing Room), `WEST` (South Connection), `SOUTH` twice through the hatch (Grimy Passage, Main Street), `SE` (Alley), `SOUTH` into the Loan Shark. `SHOOT BOX`, `TAKE COIN` (VALUE 5, to 34; village.zil 1620-1632).

To the Pawn Shop: `NORTH` (Alley), `SW` (Pawn Shop). `TAKE SPRAY CAN` (12 charges, village.zil 1535).

`NE` (Alley), `SE` into Doc Schuster's: the ostrich is here. Carry the nip in the open and it follows you, sniffing, except into a room with a bed (GOTO, verbs.zil 2974-3018). Lead it to the PX: `NW` twice (Alley, Main Street), `NORTH` three times (Grimy Passage, South Connection, South Junction), `NE` (East Junction), `NW` (North Junction), `NE` into the PX. `PUT COIN IN SLOT`, `TYPE 6`. Item 6 (the timer) and item 9 klunk inside and never appear in the hole (DISPENSER-TYPE, verbs.zil 2215-2228). Reaching into the hole yourself, or asking Floyd to, gets nothing; the port adds a one-time bracketed hint there (D93). `SCARE OSTRICH`: it jams its head in the dispenser and the timer falls out, scoring 6, to 40 (OSTRICH-F / OSTRICH-INTO-DISPENSER, village.zil 1743-1757; station.zil 319-326). `TAKE TIMER`, then `GIVE NIP TO OSTRICH` so it stays put. Shooting the dispenser before the timer is out, or feeding the nip anywhere but the PX, leaves the timer unreachable.

## 6. Balloon, Chapel, diode (40 → 47)

Back to the Pet Store by the east side: `SW` (North Junction), `SE` (East Junction), `EAST` three times (East Connection, Makeshift Connector, Broadway), `SW` into the Pet Store. `OPEN CAGE`. The balloon creature floats out (village.zil 388-393). Do not grab its leash here: it will not be dragged (the port adds a one-time bracketed hint if you try, D93).

Lead it with the spores instead, one spray in each room, back the way you came and up the ladders to Level Three. The creature follows the spores into the next room unless the Chapel flame is still on, in which case it puffs away from the doorway (SPRAY-CAN-F, village.zil 1470-1524):

- `NE`, `SPRAY CAN` (Broadway)
- `WEST`, `SPRAY CAN` (Makeshift Connector)
- `WEST`, `SPRAY CAN` (East Connection)
- `WEST`, `SPRAY CAN` (East Junction)
- `SW`, `SPRAY CAN` (South Junction)
- `NW`, `SPRAY CAN` (Level Five)
- `UP`, `SPRAY CAN` (Level Four)
- `UP`, `SPRAY CAN` (Level Three)

`SW` into the Chapel. `CLIMB PULPIT`, `OPEN PULPIT`, `PUSH SWITCH`. That puts the eternal flame out (PULPIT-F / switch, station.zil 1586-1632). `SPRAY CAN` once more, the ninth of the twelve charges, and the creature comes in. `TAKE LEASH`: it lifts you out of the boots and you hang from the balloon. `TAKE STAR`. The star holds the M-series diode; taking it scores the diode's 7 points, to 47 (STAR-F, station.zil 1496-1511). `DROP LEASH`, `OPEN STAR`, `TAKE DIODE`, `DROP STAR`, `DROP SPRAY CAN`.

`TAKE BOOTS` and `WEAR BOOTS`. Being lifted out of them did not scramble the card, but taking them back with the card in your pocket does (V-TAKE, verbs.zil 1917-1927). That no longer matters: the Armory is behind you, and nothing on this route reads the card again. With the conveniences on, this TAKE BOOTS prints the card warning once; type it again.

## 7. Board, jammer, foil (47 → 51)

To the Scientific Sub-Module: `EAST` (Level Three), `DOWN` twice (Level Four, Level Five), `NE` (North Junction), `NORTH` (North Connection), `NORTH` (Tube), `NORTH` (Engineering Lab), `UP` to the Astro Lab. `TAKE TWENTY-PRONG BOARD`.

`DOWN` (Engineering Lab), `SOUTH` (Tube), `SOUTH` back to the North Connection. `TURN ON HEADLAMP`, `WEST` into dark Storage, `TAKE JAMMER`, `EAST`, `TURN OFF HEADLAMP`. `PUT BOARD IN JAMMER` and `SET JAMMER TO 710` (JAMMER-F, station.zil 97-147). Frequency 710 is the exercise machine's diagnostic channel (the Gym sign, SIGN-F, globals.zil 450-454).

To the Barbershop: `SOUTH` (North Junction), `SE` (East Junction), `EAST` three times (East Connection, Makeshift Connector, Broadway), `SE` into the Barbershop. `KICK MIRROR`, `TAKE FOIL` (VALUE 4, to 51; village.zil 291-305).

## 8. Suit, Plato, explosive (51 → 61)

To the Flophouse locker: `WEST` (Grocery), `SE` (Saloon), `EAST` (Casino), `UP` (Flophouse). `DROP BAG`, `DROP ZAPGUN`, `DROP JAMMER`, `TAKE SUIT`, `WEAR SUIT`, then `TAKE ZAPGUN` and `TAKE JAMMER`.

**Save here.** Plato is close, and the explosive's clock starts in the airlock. His ambush has been armed since the Chapel and can begin on any turn from here on, wherever you are standing; read [If Plato pulls the stun gun on you](#if-plato-pulls-the-stun-gun-on-you) before you go on.

To the Warehouse: `DOWN` (Casino), `WEST` twice (Saloon, Trading Post), `DOWN` into the Warehouse. `DROP ZAPGUN`, `DROP JAMMER`, `DROP TIMER`. On this route, at this seed, the ambush comes as you drop the timer; in your game it comes on whatever turn Plato next walks in on you, which may be many turns earlier.

When it starts you are stunned and everything not worn is dropped (station.zil 3495-3504). Say it at once: `FLOYD, HELP` (or tell him to save you, or to kill Plato) sets FLOYD-TOLD (FLOYD-F, ship.zil 322-336). Then `WAIT` three times while Plato talks. Without Floyd's word the fifth turn is fatal; with it, Floyd knocks the gun away, Plato is destroyed, and you score 7, to 58 (station.zil 3579-3602). The whole drill is in [If Plato pulls the stun gun on you](#if-plato-pulls-the-stun-gun-on-you). After the attack, Floyd goes to the Factory once evilness passes 17.

`TAKE KIT`, and only the kit. `CLOSE KIT` before you open the outer door: an open kit in vacuum freezes the goo (OUTER-AIRLOCK-DOOR, village.zil 1236-1241). Wear the suit and the boots or the lock kills you (village.zil 1201-1206). `OPEN INNER DOOR`, `DOWN` into the Airlock, `CLOSE INNER DOOR`, `TURN ON HEADLAMP`, `OPEN OUTER DOOR`, `DOWN` into the vac yard. It scores 3, to 61 (VACUUM-STORAGE VALUE, village.zil 1339-1346). `TAKE EXPLOSIVE`, `UP` (Airlock), `CLOSE OUTER DOOR`. I-EXPLOSIVE-MELT starts when that door closes (village.zil 1249-1254). `OPEN KIT`, `PUT EXPLOSIVE IN THERMOS` and `CLOSE THERMOS`; at a melt count of 210 or more it sublimes (interrupts.zil 358-373). `TURN OFF HEADLAMP`, `OPEN INNER DOOR`, `UP` into the Warehouse. `TAKE OFF SUIT` and `DROP SUIT`; leave it. Recover what Plato's ambush made you drop: `TAKE DIODE`, `TAKE FOIL`, `TAKE TIMER`, `TAKE JAMMER`, `TAKE ZAPGUN`. If the ambush caught you earlier, those things are lying in the room where it caught you, not here; pick them up there before you go on, and the diode above all.

## 9. The charge and the key (61 → 71)

Straight back to the Commander's Quarters, the same day: `UP` (Trading Post), `SW` twice (Greasy Straw, Main Street), `NORTH` twice (Grimy Passage, South Connection), `EAST` (Briefing Room), `NORTH` (Commander's Office), `EAST` (Commander's Quarters). `EAT ORANGE GOO`.

`OPEN DETONATOR`, `TAKE BLACKENED DIODE`, `PUT M-SERIES DIODE IN DETONATOR`. Diode J burns out instead of firing (I-TIMER, interrupts.zil 396-407). `CONNECT TIMER TO DETONATOR`. `OPEN THERMOS`, `TAKE EXPLOSIVE`, `PUT EXPLOSIVE IN HOLE` (scores 3, to 64; station.zil 981-985). `CONNECT DETONATOR TO EXPLOSIVE`. `DROP TIMER`, `SET TIMER TO 30`, `WEST` to the Commander's Office, `WAIT`. You must not be in the same room as the explosive when it fires (META-LOC check, interrupts.zil 408-413). The timer counts down by C-ELAPSED (interrupts.zil 385-390).

The blast opens the safe and queues lights-out 20–220 millichrons later (interrupts.zil 414-418). `EAST`, `TAKE KEY` (VALUE 7, to 71; station.zil 1024-1030).

Now `TURN ON JAMMER`, and do not leave it for later. This is the most consequential command in the section and the easiest to lose, tacked onto the end of a paragraph about the safe: nothing between here and the end of the game mentions it again. The jammer running at 710 with its board in is what freezes the exercise machine in Computer Control, twenty-three commands from now, and brings the forklift down to be crushed. I-EXERCISE-MACHINE tests the four things together -- the jammer in the room with you, set to 710, switched on, its board in it (station.zil 3776-3791). Arrive with it off and the machine simply rolls at you and kills you on its fourth turn, no forklift comes, and the jammer's own menu reads Turn on rather than Turn off, which is the only warning you get. [Hard misses](#hard-misses-on-this-path) has the rescue.

**Save here.** From the Dome on, the endgame runs on a clock.

## 10. Dome, air shaft, Computer Control, Factory (71 → 80)

Climb the ladders to the Dome: `WEST` (Commander's Office), `NW` (South Junction), `NW` (Level Five), then `UP` four times (Level Four, Level Three, the Mess Hall on Level Two, the Dome). The elevator would also reach it on day 2; after day 2, typing a floor is immediately fatal (ELEVATOR-TYPE, verbs.zil 2163-2170). The ladders are safe on any day. This route never uses the elevator, so day 3's gravity in the shaft never arises.

Lights are out: `TURN ON HEADLAMP`. `UNLOCK BIN WITH KEY`, `OPEN BIN` (HOUSING-F, station.zil 2111-2138). The fuel cells explode, you are knocked out, and everything is dropped. Opening the bin loosens the air-shaft grating and queues the first launch announcement in 140 millichrons (station.zil 2123-2124). `TAKE FOIL`, `TAKE JAMMER`, `TAKE ZAPGUN`. `OPEN GRATING`, `ENTER GRATING` (the top of the shaft scores 2, to 73; GRATING-F, station.zil 2189-2218; TOP-OF-AIR-SHAFT VALUE, station.zil 3693-3703). A grating that is still affixed cannot be entered.

`DOWN` seven times to the Bottom of the Air Shaft, then `OPEN GRATING`. That spills you into Computer Control, starts the exercise machine, and forces the second announcement: launch in 200 millichrons (GRATING-F, station.zil 2174-2183; I-ANNOUNCEMENT, station.zil 3661-3676). If the jammer is here, set to 710, on, and holding the twenty-prong board, the machine freezes and a forklift lands (I-EXERCISE-MACHINE, station.zil 3776-3791). `TURN OFF JAMMER`: the machine clamps the forklift and both are destroyed (JAMMER-F, station.zil 151-161). Without that setup the machine exercises you to death in three turns (station.zil 3792-3804).

`UP` into the Factory (VALUE 2, to 75). `SHOOT FLOYD` (FLOYD-F, ship.zil 497-511). Then `PUT FOIL ON PYRAMID`. Covering the pyramid while Floyd is still active is refused; after he is shot it scores 5, to 80, and the game ends (PYRAMID-F, station.zil 3915-3954). The second announcement leaves 200 millichrons for jammer-off, up, shoot and foil (I-LAUNCH, station.zil 3678-3691).

## If Plato pulls the stun gun on you

This is the one event on this path that kills you for not knowing a single command, and it can happen anywhere from
section 6 on, in any lit room, several sections before the route meets it. If it has just happened to you, the answer is
one line:

> **`FLOYD, HELP`** -- say it now. The rest of this section is why it works and what to do afterwards.

- **What just happened.** Plato has been at your elbow since you met him in the Printing Plant. Once ROBOT-EVILNESS
  passes 11, I-PLATO-ATTACK runs every turn (I-ROBOT-EVILNESS, station.zil 3466-3471), but it cannot begin while he is
  already standing in your room (station.zil 3482-3484), so it fires on the first turn he walks back in after strolling
  off with Floyd (I-FLOYD, interrupts.zil 155-160). That turn is rolled, which is why your game need not match this page.
- **It is not a punishment for being slow.** The counter rises on every 1000-millichron tick, on each night's sleep
  (globals.zil 1052-1061), and on every scoring action: each thing whose points you take (SCORE-OBJ, verbs.zil
  2585-2592) and each room worth points you first walk into (DESCRIBE-ROOM, verbs.zil 2660-2666). Playing well raises it
  as surely as dawdling does. On this route it passes 11 at `TAKE STAR` in the Chapel, at 47 points -- 34 turns before
  the foil and 52 before the Warehouse. Nobody outruns it, and nobody is meant to: surviving it is worth 7 of the 80
  points.
- **What you can do while stunned: speak, and nothing else.** Every other action is refused, and you cannot move, take,
  drop or go (YOURE-STUNNED, station.zil 3605). Everything not worn fell where you stood, and the attack pulls Floyd
  into the room whatever he was doing (station.zil 3495-3502), so he is always there to be asked.
- **The words that count.** `FLOYD, HELP`, `FLOYD, SAVE ME`, `FLOYD, KILL PLATO`, `FLOYD, TURN OFF PLATO` and
  `FLOYD, TAKE THE STUN RAY` (FLOYD-F, ship.zil 322-336). Anything else gets "Floyd just looks at you with confusion and
  panic in his eyes" and spends the turn.
- **How long you have: four turns.** Plato's three speeches, then the turn he raises the gun. The words only set a flag
  that the last of those turns reads, so any one of the four does it, and even a turn wasted on an action you cannot
  perform is survivable. Say it on the first turn anyway.
- **Then wait** until he fires: `WAIT`, as many turns as the speeches take.
- **What you get.** Floyd leaps at the gun and knocks it from Plato's hands; Plato lands on it, ruptures its power pack
  and is blown apart. **7 points**, and the ambush can never come again -- Plato and the gun are gone and the interrupt
  is switched off (station.zil 3579-3602). Floyd is left shaking, with tears of oil streaming down his face, and he is
  changed for the rest of the game.
- **If you said nothing:** "Floyd burst into tears and dashes out of the room. A beam leaps from the gun..." That is the
  end of the game. Restore and ask him.
- **Afterwards, pick up what the ambush made you drop,** in the room where it caught you, before you go anywhere: the
  M-series diode above all, since without it the detonator cannot fire, then the foil, the timer, the jammer and the
  zapgun. Section 8's own list of takes assumes the ambush came in the Warehouse, as it does at seed 1.
- **Where it cannot start:** the Airlock, the vac yard, a bed, the dark, or a room with a hull welder in it
  (station.zil 3481-3491). None of that is worth planning a route around. The command is.

## Hard misses on this path

These are not optional colour. Each one ends the game or makes it unwinnable.

- **Hull welders.** They are roaming machines, not a tool you pick up. A welder that stays in your room reaches you on the third turn (I-WELDER / WELDER-F, interrupts.zil 5-42; globals.zil 1224-1258). Leave, or shoot it. Rooms flagged `NWELDERBIT` are safe. Sleeping on the floor after the station is reached can also bring one.
- **Plato's ambush.** Armed from the Chapel's star onward, it waits only for the turn Plato walks back into your room (I-PLATO-ATTACK, station.zil 3481-3491), so it can land in any lit room from section 6 on. While stunned every action is refused and only speech works, and without FLOYD-TOLD the fifth turn kills you (station.zil 3579-3602). The drill is above: [If Plato pulls the stun gun on you](#if-plato-pulls-the-stun-gun-on-you).
- **The elevator after day 2.** Typing a level plunges the car (verbs.zil 2167-2170). Do not wait for day 3.
- **The air-shaft grating.** It opens only after the Dome bin blast sets it loose (station.zil 2123, 2212-2218). You cannot skip the key and the bin.
- **The ID card and the boots.** One careless take scrambles the card for good (verbs.zil 1917-1927). It matters only until the Armory door has opened.
- **The ostrich and the timer.** The timer is physically inside the dispenser until the ostrich knocks it out in the PX (verbs.zil 2220-2228; station.zil 319-326).
- **The explosive's day.** Use it the day you fetch it. A closed Thermos buys time; an open one, or none, does not (interrupts.zil 358-373). Sleeping on an armed hole, or waking while the explosive is anywhere but the vac yard, ends it (globals.zil 1041-1045, 1081-1084).
- **Plato.** `FLOYD, HELP` while stunned, or he runs and you die (station.zil 3579-3602). That requires Floyd, not Rex or Helen.
- **Computer Control, and the jammer left off.** The machine freezes and the forklift descends only if the jammer is in the room with you, set to 710, switched on, and has its board in it; I-EXERCISE-MACHINE tests all four every turn (station.zil 3776-3791). Section 9's last command, `TURN ON JAMMER`, is what arms it, and nothing reminds you afterwards. Drop into the room with it off and the machine rolls at you bellowing "No pain, no gain!" instead of freezing, no forklift arrives, and the menu on your own jammer offers Turn on, not Turn off -- which is how you find out. It reaches you on its fourth turn (station.zil 3798-3804). **The rescue is to turn the jammer on where you stand:** the machine freezes and the forklift lands on that same turn, and turning it off again the turn after destroys them both, exactly as the route does it. The game is still winnable 80/80 from there.
- **The Factory.** Shoot Floyd, then foil the pyramid. Touching the pyramid first is refused (station.zil 3957-3960).
- **The headlamp.** Ninety-two turns, counted only while it is on (HEADLAMP-COUNTER, village.zil 240; I-HEADLAMP, interrupts.zil 45-62). Sleeping with it on drains it to zero (WAKING-UP, globals.zil 1085-1088). This route uses about a third of the charge.

The seed-1 route ends on day 2 at time 4999 with every point collected. A later day is not required.
