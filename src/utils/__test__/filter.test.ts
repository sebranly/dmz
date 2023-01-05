import { Timer } from '../../types';
import { excludeTimerByIndex, pickTimerByIndex } from '../filter';

const timer1: Timer = { timerIndex: 0, timestampStart: 1, durationSec: 12 };
const timer2: Timer = { timerIndex: 1, timestampStart: 4, durationSec: 34 };
const timers = [timer1, timer2];

test('excludeTimerByIndex', () => {
  expect(excludeTimerByIndex([], 0)).toStrictEqual([]);
  expect(excludeTimerByIndex(timers, 2)).toStrictEqual(timers);
  expect(excludeTimerByIndex(timers, 1)).toStrictEqual([timer1]);
});

test('pickTimerByIndex', () => {
  expect(pickTimerByIndex([], 0)).toStrictEqual([]);
  expect(pickTimerByIndex(timers, 3)).toStrictEqual([]);
  expect(pickTimerByIndex(timers, 0)).toStrictEqual([timer1]);
});
