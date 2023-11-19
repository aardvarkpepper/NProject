# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

2023 Oct 19:

Read https://vitejs.dev/guide/

Started with /Screenshot/Screenshot 2023-10-19 at 1.54.27 PM.png

Exited vite interface with "q" then in terminal typed code. to start VSCode.

Have to rethink how data is handled.  Edwin Codrington suggested essentially game as a service.  This is not what I was thinking, but I think I would have arrived at it in time.  Rather than having some rather complicated authentication issues, instead the game logic is handled by the front end, request passed to a back end, back end verifies the game move is legal (requires its own verification coding, which requires some understanding of game map, legal moves, etc, origin, destination) - note that the AIRCRAFT LANDING is going to be interesting for legal routing, so write something for that.

CHECKLIST:  Think about load balancing (multiple backend), sharding (multiple database), event bus (switching from monolith to distributed; avoid distributed monolith).  Probably just set up monolith to begin with, but think about how these large datasets will be handled.

Okay, so.  The program looks like this.

Client:  Reads "map" data, renders "map" locally, UI allows control of pieces, renders pieces and piece count, renders control of territory, switches colors, that sort of thing.  Also reads "commander" data, renders "commander" animations and such.

Backend:  Backend and client BOTH "understand" map data.  LOOK UP how much of a problem it is for backend to store data, e.g. a game map, as opposed to retrieving it from a database.  But the backend would constantly be retrieving the thing for each request, right?  So it would make sense to avoid all those calls . . . . anyways, stuff like FIGHTERS LANDING ON CARREIRS is an issue; client sends move list to backend; the client should have run local checks on their end, but backend runs checks anyways, because otherwise just horribly dirty.  The backend sends request to ANOTHER backend API that generates PRNG (or whatever, same backend), and game record goes to database.

Design:  Problem with war games is they involve too much thinking, too much calculations.  So we have user assists to "advise" players on predicted outcomes, rendered as PREDICTIONS of GAME MAP STATE that RENDER.  OK?  And maybe we COMPARE the PREDICTION to the ACTUAL game state, ha ha.  Because we're just cool like that.  And we use that feedback to change how the prediction engine works.  And we SIMPLIFY the game by allowing user to choose from LIMITED NUMBER OF CHOICES, where they see the long-term, the short-term, that sort of thing.  And we can contrast the long term and short term using the maneuverability of tanks, say.  And think about how this reflects with W US tanks, Baltic States tanks was it (can hit to Ukraine and W Europe while defending infantry reinforcement to Karelia)

To prevent the game from being simple rote optimization, we introduce COMMANDERS and SUBCOMMANDERS, each with COMMAND DECKS that users collect cards and switch up over time.  Each commander / subcommander has access to limited cards (But commander specific cards would mean content that people don't see if they don't use that commander.  SO probably at least, a particular card may be used for multiple commanders, if not all.  And how does unlocking work?) AND/OR each commander/subcommander CHANGES card text and/or in-game abilities in some way, and what's more, each commander/subcommander COMBINATION is different too.  So let's say commander/subcommander both sea, then they get a . . . I don't know, COMBINATION bonus; if one is sea and other land then a SYNERGY bonus?  And maybe the animations combine in a cool and/or unique way too.  Who knows.  And we make up stuff like commander/subcommander graduated from same academy, or they are in the same secret society, or they both like cats, or drinking, or just really silly stupid stuff that players discover.

And let's say maybe the whole synergy / etc whatever add up to a POWER bonus, and players can choose the MAXIMUM COMMANDER POWER, meaning they can decide if the game is super commander focused, or if it's super not commander focused.

And since all this involves different playstyles, maybe some players like auto-assist, maybe some don't.  But identifying players by preference and ranking them creates STRESS and STIGMA (but also engagement).  Hm.  Like players that want to *pretend* that they don't use calculation tools just run multiple clients.

For DATA ANALYSIS - game log query to server, this is a PREMIUM feature.  And it's just a big ol' relational database.  But we also give tools to the user so they can look at files locally.  What are the limits on this?

User:  Who is the user?  How do they use it?  So we have, for example, pizza delivery skin / story; the story's about pizza delivery; dogs carry cats, that sort of nonsense.  Or we have WW2 skin / story.  So the TEXT of the CONTROLS is dependent not just on LANGUAGE but on the SKIN - as is the story itself.

Notes:
https://snyk.io/learn/what-is-mit-license/
https://sql.js.org/#/

2023 Nov 2 -

Have to catch up on cleaning, cleaning up notes and documents, cleaning up obligations in Slack notes.

Battle Calculator:

Phase 1:  Define units, rules, methods for use in SQL database.  Look at image hosting.  UI input converts to att/def array, data visualizations.  Concentrate on functionality, user authent last.  Simple OOL UI drag and drop.  Local PRNG generation, feeds to OOL handler.

Phase 2:  Takes PRNG APIs.  Lookup tables instead of PRNG integration, compares result on chart to "ideal" binomial distributio.

Phase 3:  UI for OOL AI.

Phase 4:  Relational database queries by user.  User-added specified fields.

Phase 5:  Investigate force allocation algorithms - multivariate calculus?  Normal distribution to the mean.  Combine with battle calculator

Data structure:
Mmm, use classes, I suppose?  But data has to be stored in database, so users can query, pass around, that sort of thing.  Unit abilities like submarine strike are stored in third relational database table (unit is one table, ability aother, unit-ability linking unit to ability a third).  Remember that I need language conversion.  Write up the ERD, I suppose.

REFERENCE:
What are the phases of combat?

Phase 1:  One-Time Enhancement (E.g. battleship create temporary unit, naval bombardment created)
Phase 2:  One-Time Combat (e.g. AA gun, IC AA.  Note that naval bombard units are NOT removed, but hits from naval bombards must be allocated in this separate step.  (defender has less info to work with))
Phase 3:  First Strike Enhancement (also debuffs like destroyer vs sub)
Phase 4:  First Strike Combat
Phase 5:  Regular Unit Enhancement
Phase 6:  Regular Combat
Phase 7:  Resolve, retreat, partial retreat and continue from phase 2, or repeat from phase 3.  Remove any existing naval bombards.
Phase 8:  Cleanup (e.g. remove battleship fake hit unit, remove hindered submarines, add regular sub, remove boosted inf, add boosted inf . .. ? or is this just part of phase 3 more or less?)

Mouseover a unit to see more info (source of buff/debuff for example);

Note:  Outside of combat, must be combat handling - strat bombing, amphib, then regular combats.  But player can freely select within each context which they want to handle first.

How do we handle naval bombardment?  We have to "remember" results of a previous combat?  No; if there's naval battle then there's no naval bombard.  So the bombard unit is created CONDITIONAL to being no combat, this must be handled outside the combat phase.  Remember cancellation of combat should not leave naval bombard.  Make an error test for this.

VALUES
1, (1, 6, 6, 'Infantry', 3, 1, 1, 2, 1, 1),           
2, (1, 6, 6, 'Artillery', 4, 1, 2, 2, 1, 1),
3, (1, 6, 6, 'Tank', 6, 2, 3, 3, 1, 1),
4, (1, 0, 2, 'Antiaircraft Gun', 5, 1, 0, 1, 0, 3),
5, (1, 0, 2, 'Industrial Complex', 15, 0, 0, 1, 0, 3),
6, (2, 0, 0, 'Transport', 7, 2, 0, 0, 0, 0),
7, (2, 4, 4, 'Submarine', 6, 2, 2, 1, 1, 1),
8, (2, 6, 6, 'Destroyer', 8, 2, 2, 2, 1, 1),
9, (2, 6, 6, 'Aircraft Carrier', 14, 2, 1, 2, 1, 1),
10, (2, 6, 6, 'Cruiser', 12, 3, 3, 1, 1),
11, (2, 6, 6, 'Battleship', 20, 2, 4, 4, 1, 1),
12, (3, 6, 6, 'Fighter', 10, 4, 3, 4, 1, 1),
13, (3, 6, 6, 'Bomber', 12, 6, 4, 1, 1, 1);
14, (1, 6, 6, 'Infantry, Buffed', 3, 1, 2, 2);
15, (2, 6, 6, 'Submarine, Debuffed', 6, 2, 2, 1, 1, 1),
16, (2, 6, 6, 'Battleship, Damage Counter', 0, 2, 0, 0, 0, 0);
17, (1, 2, 0, 4, 0, 'Cruiser, Naval Gunfire Support', 0, 0, 3, 0, 1, 0),
18, (1, 2, 0, 4, 0, 'Battleship, Naval Gunfire Support', 0, 0, 4, 0, 1, 0);

Things like "types" (land/sea/air), "phases" (combat phases) put into SQL so . . . can . . . update?

UNRESOLVED
How to handle fighter landing
How to have subs and transports not constitute hostile sea zones.
Enemy and friendly units may both be in a sea zone.  (mobilization)
When units retreat, where do they retreat to?  How is this handled?
Abbreviate description, you don't need 400 characters in 'Phases'.



Antiaircraft fire (or IC fire)
Regular Combat

Battleship Creates Temporary Unit
Sub Strike
Regular Combat
Sub Strike
Regular Combat

2023 Nov 8
What MVP?  User, visual settings (text size, font, color), language, pass attacker unit object array and defender unit object array into function that creates a "hit array"; for n attacks creates n+1 array for 0 hits through n hits.  Then we take those probabilities and multiply by one another recursively to generate binomial.  A shortening function or discarding below a certain fraction is done (this could be problematic) with earlier rounds folding into later rounds, and the overall aggregate is . . . 

Create a tutorial explaining data visualization; two-peak graph, "target" analogy where dart doesn't miss the bullseye but actually hits the thrower in the face (because there's just two "targets" out there.)

Create something that feeds PRNG array in; program takes rolls, computes hits etc, spits out final result.  Then maps to binomial to COMPARE.

And so we will also need PRNG implementation.

And if we're doing binomial table lookups, we don't want to tax the server, so we include ability to have all files saved locally.  User settings, at least.

Need forms to input all this stuff.  Some images too, source.

Naval bombards.  AA and IC only hit air.  Subs only hit sea.

Restrict restrict restrict.

Why is 85% a benchmark?  Why not 90%?  80%?

What is a suspicious roll?  For example, suppose there's an overkill attack, and a player misses a load of rolls.  But those misses didn't really matter.  So should they be counted?

Suppose there's a strafe, and a player misses a lot, by so doing enemies remain and the attacker can retreat.  Here misses are not only "cloaking" good rolls, the misses *themselves* are the cheat objective.

So we have to set up these scenarios where we know that the attacker retreated, where we know that there was overkill.  And how do we do that?  We record the data.

2023 Nov 9

And how would we know, systematically, to test what happens if, in a round, a player R1 attacked W Rus and Ukraine?  A custom inquiry sure, but what about *also* UK1 flying fighters to W Rus?

Write article re: why players should know sealion (opponents may be unfamiliar, the concepts of sealion can be learned quickly, and player should be prepared if it's pulled on them.)

Naval Support shot requires UI.  IC bombing too.

How does the app know how to apply phases?  It's programmed to do so.  This must be reflected in a database - what subroutines are named, what subroutines run during which phase.  However, that's future implementation; for now just hard-code.

Re: get all unit_x_abilities:  Store in state?  Probably a cost per request, compare to cost per amount of data requested.

We need to have a data bible.  Who controls it.  This is - what is the data names?  Infantry vs infantry (cap vs lowercase)

https://www.postgresql.org/files/documentation/pdf/16/postgresql-16-US.pdf

CREATE TABLE cities (
 name varchar(80) primary key,
 location point
);
18
Advanced Features
CREATE TABLE weather (
 city varchar(80) references cities(name),
 temp_lo int,
 temp_hi int,
 prcp real,
 date date
);
CREATE TABLE cities (
 name varchar(80) primary key,
 location point
);
18
Advanced Features
CREATE TABLE weather (
 city varchar(80) references cities (name),
 temp_lo int,
 temp_hi int,
 prcp real,
 date date
);

price numeric CHECK (price > 0) 
price numeric CONSTRAINT positive_price CHECK (price > 0)
 product_no integer UNIQUE,

CREATE TABLE tree (
 node_id integer PRIMARY KEY,
 parent_id integer REFERENCES tree,
 name text,
 ...
);
A top-level node would have NULL parent_id, while non-NULL parent_id entries would be constrained to reference valid rows of the table.

2023 Nov 16
OOL amphib units taken first, or last.
undamaged battleship places in OOL as well (no autohit), relevant sub/air attack
fig fig car, fig car fig, car fig fig, repeats, permuatations.  User defines loops.
Steam overlay
How to handle stalling?  Suggestion re: forcing players to move in games based on timers, ugh.  Note Jan and Matzestinkt thought it was a good idea, ugh.
unit select shows attack range.
ibomb damage visual not shown max zoom, fix
perv on profile; games won, rank, winrate, list ignored users . . . really how much perving is fun, how much intrusive? Honestly should be able to view last few games . .. prep oppoennt
Breakdown by setup (oob or lhtr), dice type, win %, um.
replays (and comments), you remember the timestamp implementation you wrote up.
password lobbies (and autoignore, autoset preferences like < platinum, gold only, etc.)
email spam lessened; only if 10 minutes since your turn, but also maybe daily digest.  Or uh.  Yeah.  and include screenshot (this is going to cost) so actually send data and have it rendered locally with app?  Mmmm . . . think about this.  Nobody wants to open separate app, can build email extension that renders component?
Official discord.  Community servers not officially affiliated.  Set the rules (remember!  loose, sigh)
prominent low luck vs dice etc. visualization.  Even sort options.  Yes.  Not just dice sort either.
Defensive profiles modular (e.g. sea OOL module, land OOL module)
Rewind phase (ofc).  Popovitsj suggests purchase phase comes after non-combat move phase, sigh.  Ignore.
Warning when exit game "have not finished turn".
Minute timer on time to move. (but this update cost? Um no?)
"war diary" lists surviving units (and perhaps % outcome)
Remember to make section on cheat detection; lucky does not mean cheating, some games will be lucky, flagging lucky player as cheating not tolerated (accusations limited!)  But if players want to pay premium, they can investigate all the people.  No, seriously.
Movement overlay with numbers, select one territory, all other territories in range get a number.  Um.
banlist chat banlist casual games
Select all units on territory
Autocomplete mobilization phase if capital occupied.  Autocomplete turn if no units left and capital occupied.
How to handle issue reports?  How to make easy for dvs to review?
customize profile pic etc.
Increase time limit on ranked games . .. um.  No.  Fischer timer.
Press button for max resolution image (um).  Don't want to take mulitple screenshots.  Well what is the effing point of that, just have handler to recreate and share?  Well it does need to have some sort of photo export, though that is horribly expensive on bandwidth.
OOL single destroyer last um.  Popo says only when attacker has subs (ok) and defender has fighters? Because data shows if defender doesn't have fighters, destroyer last doesn't help much? Um?
Player wants to track other players' timelines; they played them on x date, then that player went on to become platinum or whatever. Or otherwise track ranking and visibility.
Default sz for France sz 14 to sz8.  Um.  No.  BOth are problems.  FriskyCow
Map notes include power and turn they were created.
// end 2023 Nov 09, "suggestions" on Discord.

2023 Nov 18

Microoptimizations: re: Shakey. Also preferrs 1 inf Buryatia 1 inf Burma.
US1 trn build East.  WTrn to Mexico.
US2 trn East to Africa.  WTrn to E US.  (Alternately, US trn to Can, W Trn to none)
UK1 Aus to Solomons cap. Followup US post-Pearl; btl 2 inf, cru 2 inf, 44% mutual wipe.

Need to discover and write formula for allocations and counters.  But how?  Must be some unifying principle.  Normal distribution to the mean and wave combination.
