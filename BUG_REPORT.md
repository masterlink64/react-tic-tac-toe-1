# Bug Report

For markdown tips and tricks, check out [this guide](https://guides.github.com/features/mastering-markdown/).
Make sure you include proper syntax highlighting for your supporting JavaScript snippets.

## Bug #1

_<-- Game ends after 8 turns instead of 9. -->_

```javascript
it('ends after 9 turns', () => {
  wrapper = mount(<App />);
  // first assert that the game isnt over
  expect(wrapper.state().over).toBe(false);
  // then set the state to just BEFORE the bug happens
  wrapper.setState({
    board: [['X', 'X', 'O'], ['O', 'X', 'O'], [null, null, null]],
    currentPlayer: 'X',
    over: false,
    turn: 8,
    winner: null
  });
  // then select a square
  let sq20 = wrapper.find('#sq20');
  console.log(sq20.debug());

  // click on the square
  sq20.simulate('click');

  // assert that the game should still not be over
  expect(wrapper.state().over).toBe(true);
});
```

## Bug #2

_<-- Players can overwrite squares that the opponent already clicked and turn count increases -->_

```javascript
it('players can overwrite squares that have already been clicked and turn count increases', () => {
  wrapper = mount(<App />);

  wrapper.setState({
    board: [['X', 'X', 'O'], ['O', 'X', 'O'], [null, null, null]],
    currentPlayer: 'O',
    over: false,
    turn: 7,
    winner: null
  });

  let sq00 = wrapper.find('#sq00');
  expect(wrapper.state().board[0][0]).toBe('X');
  expect(wrapper.state().turn).toBe(7);
  sq00.simulate('click');
  expect(wrapper.state().turn).toBe(7);
  expect(wrapper.state().board[0][0]).toBe('X');
});
```

## Bug #3

_<-- Winning alerts the wrong player won -->_

```javascript
it('Winning alerts the wrong player won', () => {
  wrapper = mount(<App />);

  wrapper.setState({
    board: [['X', 'X', 'O'], ['O', 'X', 'O'], [null, null, null]],
    currentPlayer: 'X',
    over: false,
    turn: 7,
    winner: null
  });

  let sq21 = wrapper.find('#sq21');
  expect(wrapper.state().winner).toBe(null);
  sq21.simulate('click');
  expect(wrapper.state().winner).toBe('X');
});
```

## Bug #4

_<-- The algorithm that checks for left to right diagonal wins is incorrect. -->_

```javascript
it('The algorithm that checks for left to right diagonal wins is incorrect.', () => {
  wrapper = mount(<App />);

  wrapper.setState({
    board: [[null, 'X', null], ['O', 'X', null], ['O', null, null]],
    currentPlayer: 'X',
    over: false,
    turn: 6,
    winner: null
  });

  let sq22 = wrapper.find('#sq22');
  expect(wrapper.state().winner).toBe(null);
  expect(wrapper.state().over).toBe(false);
  sq22.simulate('click');
  expect(wrapper.state().winner).toBe('X');
  expect(wrapper.state().over).toBe(true);
});
```
