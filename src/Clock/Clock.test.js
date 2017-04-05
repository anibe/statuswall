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
  let clock, rightNow;
  const props;

  beforeEach(() => {
    props.format = 24;
    clock = new Clock(props);
    rightNow = new Date()
  });

  it('shows the current time', () => {
    expect(clock.showTime()).toBe(rightNow.toLocaleTimeString());
  });

  
});
