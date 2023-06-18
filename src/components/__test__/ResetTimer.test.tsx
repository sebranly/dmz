import * as React from 'react';
import { render } from '@testing-library/react';
import { ResetTimer } from '../ResetTimer';
import { APITimer, TimeFrequency, TimeStatus, TimeType } from '../../types';

test('ResetTimer', () => {
  const time: APITimer = {
    type: TimeType.Challenges,
    name: 'Daily Challenges',
    frequency: TimeFrequency.Daily,
    status: TimeStatus.Reset,
    time: 1678078800
  };

  const createComponent = (currentTimestamp: number, time: APITimer) => (
    <ResetTimer currentTimestamp={currentTimestamp} time={time} />
  );

  const { container: containerDaily } = render(createComponent(1678078801, time));
  expect(containerDaily.childNodes).toMatchSnapshot();

  time.name = 'Weekly Challenges';
  time.frequency = TimeFrequency.Weekly;

  const { container: containerWeekly } = render(createComponent(1678078801, time));
  expect(containerWeekly.childNodes).toMatchSnapshot();
});
