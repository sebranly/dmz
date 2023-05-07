import * as React from 'react';
import { render } from '@testing-library/react';
import { StatusTimer } from '../StatusTimer';
import { APITime, TimeFrequency, TimeStatus, TimeType } from '../../types';

test('StatusTimer', () => {
  const times: APITime[] = [
    {
      type: TimeType.Status,
      title: 'Building 21',
      frequency: TimeFrequency.Weekly,
      data: [{time: 1678471200, status: TimeStatus.Opening,}]
    },
    {
      type: TimeType.Status,
      title: 'Building 21',
      frequency: TimeFrequency.Weekly,
      data: [{time: 1678125600, status: TimeStatus.Closing,}]
    }
  ];

  const createComponent = (currentTimestamp: number) => (
    <StatusTimer currentTimestamp={currentTimestamp} time={times} />
  );

  const { container: containerOpen } = render(createComponent(1678471201));
  expect(containerOpen.childNodes).toMatchSnapshot();

  const { container: containerClosed } = render(createComponent(1678125601));
  expect(containerClosed.childNodes).toMatchSnapshot();
});
