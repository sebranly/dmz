import * as React from 'react';
import { render } from '@testing-library/react';
import { StatusTimer } from '../StatusTimer';
import { APITimer, TimerFrequency, TimerType } from '../../types';

test('StatusTimer', () => {
  const timer: APITimer = {
    type: TimerType.Status,
    title: 'Building 21',
    frequency: TimerFrequency.Weekly,
    // TODO: add color
    data: [
      { time: 1678471200 },
      { time: 1678125600 }
    ]
  };
  const createComponent = (currentTimestamp: number) => <StatusTimer currentTimestamp={currentTimestamp} timer={timer} />;

  const { container: containerOpen } = render(createComponent(1678471201));
  expect(containerOpen.childNodes).toMatchSnapshot();

  const { container: containerClosed } = render(createComponent(1678125601));
  expect(containerClosed.childNodes).toMatchSnapshot();
});
