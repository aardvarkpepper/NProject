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

Phase 1:  One-Time Enhancement (E.g. battleship create temporary unit)
Phase 2:  One-Time Combat (e.g. AA gun, IC AA)
Phase 3:  First Strike Enhancement (also debuffs like destroyer vs sub)
Phase 4:  First Strike Combat
Phase 5:  Regular Unit Enhancement
Phase 6:  Regular Combat
Phase 7:  Resolve, retreat, partial retreat and continue from phase 2, or repeat from phase 3.
Phase 8:  Cleanup (e.g. remove battleship fake hit unit, remove hindered submarines, add regular sub, remove boosted inf, add boosted inf . .. ? or is this just part of phase 3 more or less?)

Mouseover a unit to see more info (source of buff/debuff for example);

1 ('Infantry', 1, 3, 1, 1, 2, 1, 1),           
2 ('Artillery', 1, 4, 1, 2, 2, 1, 1),
3 ('Tank', 1, 6, 2, 3, 3, 1, 1),
4 ('Antiaircraft Gun', 1, 5, 1, 0, 1, 0, 3),
5 ('Industrial Complex', 1, 15, 0, 0, 1, 0, 3),
6 ('Transport', 2, 7, 2, 0, 0, 0, 0),
7 ('Submarine', 2, 6, 2, 2, 1, 1, 1),
8 ('Destroyer', 2, 8, 2, 2, 2, 1, 1),
9 ('Aircraft Carrier', 2, 14, 2, 1, 2, 1, 1),
10 ('Cruiser', 2, 12, 3, 3, 1, 1),
11 ('Battleship', 2, 20, 2, 4, 4, 1, 1),
12 ('Fighter', 3, 10, 4, 3, 4, 1, 1),
13 ('Bomber', 3, 12, 6, 4, 1, 1, 1);
14 ('Infantry, Enhanced', 1, 3, 1, 2, 2, 1, 1);

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