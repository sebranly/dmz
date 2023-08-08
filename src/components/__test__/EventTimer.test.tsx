import * as React from 'react';
import { render } from '@testing-library/react';
import { EventTimer } from '../EventTimer';
import { APITimer, TimerFrequency, TimeStatus, TimerType } from '../../types';

test('EventTimer', () => {
  const timer: APITimer = {
    type: TimerType.Season,
    name: 'Season 03',
    frequency: TimerFrequency.None,
    status: TimeStatus.Launch,
    time: 1678125600
  };

  const createComponent = (currentTimestamp: number) => (
    <EventTimer currentTimestamp={currentTimestamp} timer={timer} />
  );

  const { container: containerPostEvent } = render(createComponent(1678125601));
  expect(containerPostEvent.childNodes).toMatchSnapshot();

  const { container: containerEventIncoming } = render(createComponent(1677952801));
  expect(containerEventIncoming.childNodes).toMatchSnapshot();
});
