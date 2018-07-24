import React from 'react'; // for JSX
import { shallow, mount } from 'enzyme'; // how to mount the component
import toJson from 'enzyme-to-json';
import App from '.'; // import the component itself

describe('<Game />', () => {
  let wrapper;
  it('renders', () => {
    // smoke test!!!
    wrapper = shallow(
      <App
        board={[[null, null, null], [null, null, null], [null, null, null]]}
        frozen={true}
        takeTurn={jest.fn()}
      />
    );
    console.log(wrapper.debug());
  });

  it('matches snapshot', () => {
    const serialized = toJson(wrapper);
  });

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
});
