import * as React from 'react';
import { render } from '@testing-library/react';
import { ResetTimer } from '../ResetTimer';
import { APITime, TimerFrequency, TimeType } from '../../types';

test('ResetTimer', () => {
  const time: APITime = {
    type: TimeType.Reset,
    title: 'Daily Challenges',
    frequency: TimerFrequency.Daily,
    data: [{ time: 1678078800 }]
  };

  const createComponent = (currentTimestamp: number, time: APITime) => (
    <ResetTimer currentTimestamp={currentTimestamp} time={time} />
  );

  const { container: containerDaily } = render(createComponent(1678078801, time));
  expect(containerDaily.childNodes).toMatchSnapshot();

  time.title = 'Weekly Challenges';
  time.frequency = TimerFrequency.Weekly;

  const { container: containerWeekly } = render(createComponent(1678078801, time));
  expect(containerWeekly.childNodes).toMatchSnapshot();
});
