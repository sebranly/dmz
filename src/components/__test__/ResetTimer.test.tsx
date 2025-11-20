import * as React from 'react';
import { render } from '@testing-library/react';
import { ResetTimer } from '../ResetTimer';
import { APITimer, TimerFrequency, TimerType } from '../../types';

test('ResetTimer', () => {
  const timer: APITimer = {
    type: TimerType.Reset,
    title: 'Daily Challenges',
    subtitle: 'They reset in',
    frequency: TimerFrequency.Daily,
    data: [
      {
        color: 'yellow',
        description: 'Daily Reset:',
        time: 1678078800
      }
    ]
  };

  const createComponent = (currentTimestamp: number, timer: APITimer) => (
    <ResetTimer currentTimestamp={currentTimestamp} timer={timer} />
  );

  const { container: containerDaily } = render(createComponent(1678078801, timer));
  expect(containerDaily.childNodes).toMatchSnapshot();

  timer.title = 'Weekly Challenges';
  timer.frequency = TimerFrequency.Weekly;
  timer.data[0].description = 'Weekly Reset:';

  const { container: containerWeekly } = render(createComponent(1678078801, timer));
  expect(containerWeekly.childNodes).toMatchSnapshot();
});
