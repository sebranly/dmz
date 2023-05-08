import * as React from 'react';
import { render } from '@testing-library/react';
import { EventTimer } from '../EventTimer';
import { APITimer, TimerType } from '../../types';

test('EventTimer', () => {
  const timer: APITimer = {
    type: TimerType.Event,
    title: 'Season 03',
    data: [{ time: 1678125600 }]
  };

  const createComponent = (currentTimestamp: number) => <EventTimer currentTimestamp={currentTimestamp} timer={timer} />;

  const { container: containerPast } = render(createComponent(1678125601));
  expect(containerPast.childNodes).toMatchSnapshot();

  const { container: containerFuture } = render(createComponent(1677952801));
  expect(containerFuture.childNodes).toMatchSnapshot();
});
