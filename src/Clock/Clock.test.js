import React from 'react';
import ReactDOM from 'react-dom';
import Clock from './Clock';
// import TestUtils from 'react-addons-test-utils';

// const clock = TestUtils.renderIntoDocument(<Clock />);

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Clock />, div);
});

it('shows the current time', () => {
  const clock = new Clock();
  expect(clock.showTime()).toBe('The time is now!');
});