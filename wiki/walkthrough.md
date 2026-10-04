# How to win Stationfall

This is the critical path that scores **80 of 80** in Infocom's *Stationfall* (1987). It is the same order the port holds to the original: 335 commands, one night's sleep, a win on day 2 (the seed-1 route, `scripts/tests/walkthrough.mjs`). It is not a transcript and not a tour. Optional jokes, empty rooms and dead-end objects are left out.

Commands are written as the original parser accepts them. File citations are to the 1987 ZIL, the same style as [Where we left the original](canon-deviations.md). Nothing from the original source listing is copied here.

## Port notes

These are interface, not extra puzzles. Skip this section to play as in 1987.

- **Typed and click are the same game.** A click sends the words the 1987 parser would have read. The winning verbs below work either way. The click menus put physical verbs such as Kick, Scare and Look under on a shared "More…" row, so they are not singled out as answers ([canon-deviations.md](canon-deviations.md)).
- **Conveniences are on for players.** `?conveniences=0` plays the original word for word. With the switch on, `TAKE BOOTS` and `DRILL SAFE` may print a one-time warning; do the same command again. The route still wins.
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
| Headlamp | Village Rec Shop | 92 turns of charge, spent only while it is on; dark Storage, the vac yard, and lights-out |
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

From Deck Twelve go east, then north into the Robot Pool. Put the robot-use form in the slot and `TYPE 3`. That is Floyd (ROBOT-TYPE, verbs.zil 2095-2112). Rex or Helen will follow, but they cannot fetch the medium bit or stop Plato.

East, open the hatch, enter the spacetruck. Take the survival kit. Close the hatch. Sit in the pilot seat (Floyd takes the other). Put the Class Three form in the slot, then type the course.

The accepted heading is computed when you type it, from the status time: divide by 50, subtract 132, square, divide by 4, add 103, all in integer arithmetic (SPACETRUCK-TYPE, verbs.zil 2125-2157). Both seats must be occupied and the form accepted, or the keypad refuses. Form QX-17-T is the same chart. On a prompt start the number is **259**. A wrong course leaves you dead in empty space when the fuel runs out (I-SPACETRUCK, ship.zil 1192-1218). Wait out the launch. Docking scores 5 (ship.zil 1198-1205).

Stand, open the hatch, go out. Open the kit and the Thermos, `EAT SOUP`. Keep the empty Thermos: only the explosive and the drill bits fit its neck, and the closed bottle slows the explosive's melt to a quarter speed (I-EXPLOSIVE-MELT, interrupts.zil 358-365; THERMOS-F, ship.zil 1288-1313).

## 2. Day 1 on the station: form, stamp, drill (5 → 11)

East and southeast twice, then east into the Commander's Quarters. `LOOK UNDER BED` and take the stamp (BED-F, globals.zil 876-882).

West, northwest twice, down twice to Level Seven. Open the trash can and take the crumpled village form. Northwest to Paper Recycling and take the drill (it already holds the small bit).

Back to Level Three, northwest into the Laundry. Open the presser, put the crumpled form in, close it, turn the presser on, open it, take the ironed form (PRESSER-F, station.zil 1369-1411). The crumpled form will not enter a slot (FORM-SLOT-F, globals.zil 706-708). East and `VALIDATE IRONED FORM` (V-VALIDATE / VILLAGE-FORM-F, verbs.zil 2282-2293; station.zil 2750-2763).

Up to Level Two, north into Main Storage, take the detonator. Down to the South Connection. `PUT IRONED FORM IN SLOT`. A validated form opens the iris hatch about halfway and scores 6, to 11 (FORM-SLOT-F, globals.zil 735-751). An unstamped form is rejected. Drop the stamp and the assignment form; you will not need them again.

The space suit, when you have it, is too bulky for this hatch (VILLAGE-BOUNDARY-F, village.zil 10-15). Leave it in the Warehouse.

## 3. The Village: food, locker, nip, rank, boots (11 → 18)

South twice, northeast to the Greasy Straw. `SEARCH COUNTER` and take the nectar. Northeast, east twice to the Casino. `TURN WHEEL`: exits open above and north, and you score 4, to 15 (ROULETTE-WHEEL-F, village.zil 726-737). Up, open the locker (the space suit is here; take it on the way back).

Down, west, northwest: take the bag of taffy. North, east: take the headlamp. West, southwest to the Pet Store. `EXAMINE CEILING`, open the panel, take the nip (VALUE 3, to 18).

Southeast twice to Shady Dan's. Put the ID card in the slot, turn the machine on, `TYPE 8` (Admiral). Rank 7 or higher is enough: the Armory reader opens only when `ID-RANK` is greater than 6 (ID-CHANGER-TYPE, village.zil 1862-1881; ID-READER-F, station.zil 3061-3078). Take the card and put it in the uniform.

Down to the Junk Yard for the magnetic boots. **Drop the ID card first.** Taking the boots while you carry the card, taking the card while you carry unworn boots, or taking the boots off while you hold the card, all set `ID-SCRAMBLED` (V-TAKE, verbs.zil 1917-1927; BOOTS-F, village.zil 1932-1944). A scrambled card cannot be rewritten and will not open the Armory. Wear the headlamp, take and wear the boots, then recover the card into the uniform.

## 4. Armory and first night (18 → 26)

Back through the village to Level Six, southeast to the security door. `PUT ID CARD IN READER`, then north. The Armory scores 5, to 23 (station.zil 1055-1063). Take the zapgun. The door shuts a turn or two later if you walk away (ID-READER-F, station.zil 3074-3076; I-SECURITY-DOOR, 3043-3049).

Southwest to Officers' Quarters B. After the first sleep warning (queued from 8100 on day 1; I-SLEEP-WARNINGS, globals.zil 899-928), `ENTER BED`. Entering the bed once you are already tired queues sleep 22 later (BED-F, globals.zil 851-853). If you are already in the bed when a warning fires, that queue is 16 (I-SLEEP-WARNINGS, globals.zil 907-912). Waking begins day 2 and scores 3, to 26 (WAKING-UP, globals.zil 1059-1073). Only the first night scores.

Do not sleep on the floor after Docking Bay 2 has been visited: welder death is `PROB` of `DAY*40` (WAKING-UP, globals.zil 1036-1045). Do not sleep with the nip while the ostrich is in the room. Do not sleep in the suit. Do not sleep with the explosive sitting in the drilled hole. If the explosive is not still in the vac yard, waking removes it (globals.zil 1081-1084).

Stand and `TAKE ALL`. Floyd may have wandered; if he is not with you at the Robot Shop, walk the Level Five loop until he is.

## 5. Medium bit, safe, coin, ostrich, timer (26 → 40)

Robot Shop, east of Level Five. `FLOYD, TAKE MEDIUM BIT`, then take it from the deck (FLOYD-F, ship.zil 370-375). The boots cannot pull it from the heating chamber (BOOTS-F, village.zil 1945-1950). That take scores 3, to 29 (MEDIUM-BIT VALUE, station.zil 2530-2537).

Commander's Quarters. Put the medium bit in the drill and `DRILL SAFE`. That hole is pencil-sized; the small bit's toothpick hole will not take the explosive (DESCRIBE-BIT-SIZE / DRILLED-HOLE-F, station.zil 940-974). The drill dies if you try a second hole in another room (MAKE-HOLE-WITH-DRILL, station.zil 996-1004). Leave the drill and the detonator here. Eat the nectar if you are hungry.

Loan Shark: `SHOOT BOX`, take the coin (VALUE 5, to 34; village.zil 1620-1632). Pawn Shop: take the spray can (12 charges, village.zil 1535).

Doc Schuster's: the ostrich is here. Carry the nip in the open and it follows you, sniffing, except into a room with a bed (GOTO, verbs.zil 2974-3018). Lead it to the PX. `PUT COIN IN SLOT`, `TYPE 6`. Item 6 (the timer) and item 9 klunk inside and never appear in the hole (DISPENSER-TYPE, verbs.zil 2215-2228). `SCARE OSTRICH`: it jams its head in the dispenser and the timer falls out, scoring 6, to 40 (OSTRICH-F / OSTRICH-INTO-DISPENSER, village.zil 1743-1757; station.zil 319-326). Then `GIVE NIP TO OSTRICH` so it stays put. Shooting the dispenser before the timer is out, or feeding the nip anywhere but the PX, leaves the timer unreachable.

## 6. Balloon, Chapel, diode (40 → 47)

Pet Store: `OPEN CAGE`. The balloon creature floats out (village.zil 388-393). `SPRAY CAN` in each room along the path, including across the village boundary and up the ladders: nine of the twelve charges on this route. The creature follows the spores into the next room unless the Chapel flame is still on, in which case it puffs away from the doorway (SPRAY-CAN-F, village.zil 1470-1524).

Chapel: `CLIMB PULPIT`, `OPEN PULPIT`, `PUSH SWITCH`. That puts the eternal flame out (PULPIT-F / switch, station.zil 1586-1632). Spray once more. Take the leash (you are now hanging from the balloon) and `TAKE STAR`. The star holds the M-series diode; taking it scores the diode's 7 points, to 47 (STAR-F, station.zil 1496-1511). Open the star, take the diode, drop the star, the leash and the spray can. Take and wear the boots again if the leash pulled you out of them (that removal does not scramble the ID).

## 7. Board, jammer, foil (47 → 51)

Scientific Sub-Module, up to the Astro Lab: take the twenty-prong fromitz board. Back to North Connection. `TURN ON HEADLAMP`, west into dark Storage, take the jammer, east, lamp off. Put the board in the jammer and `SET JAMMER TO 710` (JAMMER-F, station.zil 97-147). Frequency 710 is the exercise machine's diagnostic channel (the Gym sign, SIGN-F, globals.zil 450-454).

Barbershop: `KICK MIRROR`, take the foil (VALUE 4, to 51; village.zil 291-305).

## 8. Suit, Plato, explosive (51 → 61)

Flophouse locker: drop the bag, zapgun and jammer, take and wear the suit, then recover the gun and jammer. Warehouse: drop the gun, jammer and timer. Plato's attack is queued once `ROBOT-EVILNESS` is greater than 11 (I-ROBOT-EVILNESS, station.zil 3466-3471). Scoring actions, each 1000-millichron tick, and each sleep all raise it. The attack is postponed in the airlock, the vac yard, a bed, the dark, or with a welder present (I-PLATO-ATTACK, station.zil 3481-3491).

When it starts you are stunned and everything not worn is dropped (station.zil 3495-3504). `FLOYD, HELP` (or tell him to save you, or to kill Plato) sets `FLOYD-TOLD` (FLOYD-F, ship.zil 322-333). Without that, stage 5 is fatal; with it, Floyd knocks the gun away, Plato is destroyed, and you score 7, to 58 (station.zil 3579-3602). After the attack, Floyd goes to the Factory once evilness passes 17.

Take only the kit. **Close the kit** before you open the outer door: an open kit in vacuum freezes the goo (OUTER-AIRLOCK-DOOR, village.zil 1236-1241). Wear the suit and the boots or the lock kills you (village.zil 1201-1206). Close the inner door, lamp on, open the outer door, down. The vac yard scores 3, to 61 (VACUUM-STORAGE VALUE, village.zil 1339-1346). Take the explosive, up, close the outer door. I-EXPLOSIVE-MELT starts when that door closes (village.zil 1249-1254). Put the explosive in the Thermos and close it; at a melt count of 210 or more it sublimes (interrupts.zil 358-373). Open the inner door, up. Take off the suit and leave it. Recover the diode, foil, timer, jammer and zapgun.

## 9. The charge and the key (61 → 71)

Commander's Quarters. Eat the orange goo if you need it. `OPEN DETONATOR`, take the blackened diode, `PUT M-SERIES DIODE IN DETONATOR`. Diode J burns out instead of firing (I-TIMER, interrupts.zil 396-407). `CONNECT TIMER TO DETONATOR`. Open the Thermos, take the explosive, `PUT EXPLOSIVE IN HOLE` (scores 3, to 64; station.zil 981-985). `CONNECT DETONATOR TO EXPLOSIVE`. Drop the timer, `SET TIMER TO 30`, walk west, `WAIT`. You must not be in the same room as the explosive when it fires (META-LOC check, interrupts.zil 408-413). The timer counts down by `C-ELAPSED` (interrupts.zil 385-390).

The blast opens the safe and queues lights-out 20–220 millichrons later (interrupts.zil 414-418). East, take the key (VALUE 7, to 71; station.zil 1024-1030). `TURN ON JAMMER`.

## 10. Dome, air shaft, Computer Control, Factory (71 → 80)

Climb the ladders to the Dome. The elevator would also reach it on day 2; after day 2, typing a floor is immediately fatal (ELEVATOR-TYPE, verbs.zil 2163-2170). The ladders are safe on any day. This route never uses the elevator, so day 3's gravity in the shaft never arises.

Lights are out: lamp on. `UNLOCK BIN WITH KEY`, `OPEN BIN` (HOUSING-F, station.zil 2111-2138). The fuel cells explode, you are knocked out, and everything is dropped. Opening the bin loosens the air-shaft grating and queues the first launch announcement in 140 millichrons (station.zil 2123-2124). Take the foil, jammer and zapgun. `OPEN GRATING`, `ENTER GRATING` (the top of the shaft scores 2, to 73; GRATING-F, station.zil 2189-2218; TOP-OF-AIR-SHAFT VALUE, station.zil 3693-3703). A grating that is still affixed cannot be entered.

Down seven times, `OPEN GRATING`. That spills you into Computer Control, starts the exercise machine, and forces the second announcement: launch in 200 millichrons (GRATING-F, station.zil 2174-2183; I-ANNOUNCEMENT, station.zil 3661-3676). If the jammer is here, set to 710, on, and holding the twenty-prong board, the machine freezes and a forklift lands (I-EXERCISE-MACHINE, station.zil 3776-3791). `TURN OFF JAMMER`: the machine clamps the forklift and both are destroyed (JAMMER-F, station.zil 151-161). Without that setup the machine exercises you to death in three turns (station.zil 3792-3804).

`UP` into the Factory (VALUE 2, to 75). `SHOOT FLOYD` (FLOYD-F, ship.zil 497-511). Then `PUT FOIL ON PYRAMID`. Covering the pyramid while Floyd is still active is refused; after he is shot it scores 5, to 80, and the game ends (PYRAMID-F, station.zil 3915-3954). The second announcement leaves 200 millichrons for jammer-off, up, shoot and foil (I-LAUNCH, station.zil 3678-3691).

## Hard misses on this path

These are not optional colour. Each one ends the game or makes it unwinnable.

- **Hull welders.** They are roaming machines, not a tool you pick up. A welder that stays in your room reaches you on the third turn (I-WELDER / WELDER-F, interrupts.zil 5-42; globals.zil 1224-1258). Leave, or shoot it. Rooms flagged `NWELDERBIT` are safe. Sleeping on the floor after the station is reached can also bring one.
- **The elevator after day 2.** Typing a level plunges the car (verbs.zil 2167-2170). Do not wait for day 3.
- **The air-shaft grating.** It opens only after the Dome bin blast sets it loose (station.zil 2123, 2212-2218). You cannot skip the key and the bin.
- **The ID card and the boots.** One careless take scrambles the card for good (verbs.zil 1917-1927).
- **The ostrich and the timer.** The timer is physically inside the dispenser until the ostrich knocks it out in the PX (verbs.zil 2220-2228; station.zil 319-326).
- **The explosive's day.** Use it the day you fetch it. A closed Thermos buys time; an open one, or none, does not (interrupts.zil 358-373). Sleeping on an armed hole, or waking while the explosive is anywhere but the vac yard, ends it (globals.zil 1041-1045, 1081-1084).
- **Plato.** `FLOYD, HELP` while stunned, or he runs and you die (station.zil 3579-3602). That requires Floyd, not Rex or Helen.
- **Computer Control.** Jammer at 710, board in, on, then off after the freeze. Anything else is the exercise machine (station.zil 3776-3804).
- **The Factory.** Shoot Floyd, then foil the pyramid. Touching the pyramid first is refused (station.zil 3957-3960).
- **The headlamp.** Ninety-two turns, counted only while it is on (HEADLAMP-COUNTER, village.zil 240; I-HEADLAMP, interrupts.zil 45-62). Sleeping with it on drains it to zero (WAKING-UP, globals.zil 1085-1088). This route uses about a third of the charge.

The seed-1 route ends on day 2 at time 4999 with every point collected. A later day is not required.
