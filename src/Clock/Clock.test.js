import React from 'react';
import ReactDOM from 'react-dom';
import Clock from './Clock';
// import TestUtils from 'react-addons-test-utils';

// const clock = TestUtils.renderIntoDocument(<Clock />);

it('Clock renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Clock />, div);
});

describe('When the Clock component has rendered',() => {
  let clock, rightNow;
  const props = {
    format: 24
  };

  beforeEach(() => {
    clock = new Clock(props);
    rightNow = new Date()
  });

  it('shows the current time', () => {
    expect(clock.showTime()).toBe(rightNow.toLocaleTimeString());
  });
  
});
