import * as React from 'react';
import { render } from '@testing-library/react';
import { EventTimer } from '../EventTimer';
import { APITime, TimeStatus, TimeType } from '../../types';

test('EventTimer', () => {
  const time: APITime = {
    type: TimeType.Event,
    title: 'Season 03',
    status: TimeStatus.Launch,
    time: 1678125600,
    data: [
      { time: 1678125600 }
    ]
  };

  const createComponent = (currentTimestamp: number) => <EventTimer currentTimestamp={currentTimestamp} time={time} />;

  const { container: containerPast } = render(createComponent(1678125601));
  expect(containerPast.childNodes).toMatchSnapshot();

  const { container: containerFuture } = render(createComponent(1677952801));
  expect(containerFuture.childNodes).toMatchSnapshot();
});
