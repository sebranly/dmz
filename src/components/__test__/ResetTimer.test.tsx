import * as React from 'react';
import { render } from '@testing-library/react';
import { ResetTimer } from '../ResetTimer';
import { APITimer, TimerFrequency, TimeStatus, TimerType } from '../../types';

test('ResetTimer', () => {
  const timer: APITimer = {
    type: TimerType.Challenges,
    name: 'Daily Challenges',
    frequency: TimerFrequency.Daily,
    status: TimeStatus.Reset,
    time: 1678078800
  };

  const createComponent = (currentTimestamp: number, timer: APITimer) => (
    <ResetTimer currentTimestamp={currentTimestamp} timer={timer} />
  );

  const { container: containerDaily } = render(createComponent(1678078801, timer));
  expect(containerDaily.childNodes).toMatchSnapshot();

  timer.name = 'Weekly Challenges';
  timer.frequency = TimerFrequency.Weekly;

  const { container: containerWeekly } = render(createComponent(1678078801, timer));
  expect(containerWeekly.childNodes).toMatchSnapshot();
});
