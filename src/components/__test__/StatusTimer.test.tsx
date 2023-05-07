import * as React from 'react';
import { render } from '@testing-library/react';
import { StatusTimer } from '../StatusTimer';
import { APITime, TimeFrequency, TimeType } from '../../types';

test('StatusTimer', () => {
  // TODO: rename to timer
  const time: APITime = {
    type: TimeType.Status,
    title: 'Building 21',
    frequency: TimeFrequency.Weekly,
    // TODO: add color
    data: [
      { time: 1678471200 },
      { time: 1678125600 }
    ]
  };
  const createComponent = (currentTimestamp: number) => <StatusTimer currentTimestamp={currentTimestamp} time={time} />;

  const { container: containerOpen } = render(createComponent(1678471201));
  expect(containerOpen.childNodes).toMatchSnapshot();

  const { container: containerClosed } = render(createComponent(1678125601));
  expect(containerClosed.childNodes).toMatchSnapshot();
});
