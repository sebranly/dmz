import * as React from 'react';
import { render } from '@testing-library/react';
import { OneOffTimer } from '../OneOffTimer';
import { APITime, TimeFrequency, TimeStatus, TimeType } from '../../types';

test('OneOffTimer', () => {
  const time: APITime = {
    type: TimeType.Season,
    name: 'Season 03',
    frequency: TimeFrequency.None,
    status: TimeStatus.Launch,
    time: 1678125600
  };

  const createComponent = (currentTimestamp: number) => <OneOffTimer currentTimestamp={currentTimestamp} time={time} />;

  const { container: containerPast } = render(createComponent(1678125601));
  expect(containerPast.childNodes).toMatchSnapshot();

  const { container: containerFuture } = render(createComponent(1677952801));
  expect(containerFuture.childNodes).toMatchSnapshot();
});
