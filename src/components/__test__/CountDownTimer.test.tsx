import * as React from 'react';
import { render } from '@testing-library/react';
import { CountDownTimer } from '../CountDownTimer';
import { Timer } from '../../types';

test('CountDownTimer', () => {
  const timer: Timer = { timerIndex: 0, durationSec: 62, timestampStart: 120 };
  const createComponent = () => <CountDownTimer currentTimestamp={123} deleteTimer={jest.fn()} timer={timer} />;

  const { container } = render(createComponent());
  expect(container.childNodes).toMatchSnapshot();
});
