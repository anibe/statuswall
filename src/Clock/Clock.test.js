import React from 'react';
import ReactDOM from 'react-dom';
import Clock from './Clock';
// import TestUtils from 'react-addons-test-utils';

// const clock = TestUtils.renderIntoDocument(<Clock />);

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Clock />, div);
});

describe('When the Clock component has rendered',() => {
  let clock;
  beforeEach(() => {
    clock = new Clock();
  });

  it('shows the current time', () => {
    expect(clock.showTime()).toBe('The time is now!');
  });

  
});
