import * as React from 'react';
import { render } from '@testing-library/react';
import { EventTimer } from '../EventTimer';
import { APITimer, TimeFrequency, TimeStatus, TimeType } from '../../types';

test('EventTimer', () => {
  const time: APITimer = {
    type: TimeType.Season,
    name: 'Season 03',
    frequency: TimeFrequency.None,
    status: TimeStatus.Launch,
    time: 1678125600
  };

  const createComponent = (currentTimestamp: number) => <EventTimer currentTimestamp={currentTimestamp} time={time} />;

  const { container: containerPast } = render(createComponent(1678125601));
  expect(containerPast.childNodes).toMatchSnapshot();

  const { container: containerFuture } = render(createComponent(1677952801));
  expect(containerFuture.childNodes).toMatchSnapshot();
});
