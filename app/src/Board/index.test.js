import React from 'react'; // for JSX
import { shallow, mount } from 'enzyme'; // how to mount the component
import toJson from 'enzyme-to-json';
import Board from '.'; // import the component itself

describe('<Board />', () => {
  let wrapper;
  it('renders', () => {
    // smoke test!!!
    wrapper = shallow(
      <Board
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
});
