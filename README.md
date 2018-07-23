# React Tic Tac Toe

This repository contains a Tic Tac Toe app which is currently BROKEN! There are at least 5 things wrong with it. Some bugs are subtle, some are not-so-subtle.

This repository is designed for the purposes of learning how to test React apps.

## Run the App

1.  `cd app`
1.  `npm i && npm start`

## Run the Tests

1.  `npm test -- --coverage`

## Exercise

There are two parts to this exercise!

### Part I

1.  Identify the 4 (or quite possibly more) bugs that are preventing this game from working properly. Document them in markdown in the file called `BUG_REPORT.md`.
1.  In addition to documenting the bugs, you must write failing test cases that prove the bug is occurring. Tests should be placed inside the folder next to the code to be tested and named `index.test.js`. Include these assertions (written in JavaScript / Jest syntax) in your bug report.

### Part II

1.  Fix the app so that all the obvious bugs are gone.
1.  Every component should have a smoke test (`it('renders')`) and a snapshot tests. Components that have state should be fully mounted via `mount` and tested with Enzyme selectors to ensure the stateful functions are properly working.
1.  (BONUS) Achieve 100% coverage for every component and the `helpers`.

## Rules & Working Version

Here's a refresher on the rules of tic tac toe:

1.  There are 9 squares organized in 3 rows of 3.
1.  Player One marks a square using 'X', then Player Two marks a _different_ square using 'O'.
1.  Step 2 repeats until there are three 'X's or 'O's in a horizontal row, a vertical column, or a diagonal; ALTERNATIVELY, if entire board is filled with no winner, it's a draw.

The (apparently) working version is in `solution`; just:

```sh
cd solution
npm i && npm start
```

If you want to see the intended behaviors.
