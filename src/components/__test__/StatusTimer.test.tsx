import * as React from 'react';
import { render } from '@testing-library/react';
import { StatusTimer } from '../StatusTimer';
import { APITimer, TimerFrequency, TimeStatus, TimeType } from '../../types';

test('StatusTimer', () => {
  const times: APITimer[] = [
    {
      type: TimeType.Map,
      name: 'Building 21',
      frequency: TimerFrequency.Weekly,
      status: TimeStatus.Opening,
      time: 1678471200
    },
    {
      type: TimeType.Map,
      name: 'Building 21',
      frequency: TimerFrequency.Weekly,
      status: TimeStatus.Closing,
      time: 1678125600
    }
  ];

  const createComponent = (currentTimestamp: number) => (
    <StatusTimer currentTimestamp={currentTimestamp} times={times} />
  );

  const { container: containerOpen } = render(createComponent(1678471201));
  expect(containerOpen.childNodes).toMatchSnapshot();

  const { container: containerClosed } = render(createComponent(1678125601));
  expect(containerClosed.childNodes).toMatchSnapshot();
});
