import * as React from 'react';
import { render } from '@testing-library/react';
import { TimerCard } from '../TimerCard';
import { Timer } from '../../types';

test('TimerCard', () => {
  const timer: Timer = { timerIndex: 0, durationSec: 62, timestampStart: 120 };
  const createComponent = () => (
    <TimerCard
      currentTimestamp={123}
      deadDropHourlyRate={30_000}
      deleteTimer={jest.fn()}
      regularHourlyRate={40_000}
      timer={timer}
    />
  );

  const { container } = render(createComponent());
  expect(container.childNodes).toMatchSnapshot();
});
