import { Sort, Timer } from '../../types';
import { sortTimers, sortTimersByCreationDate, sortTimersByDuration, sortTimersByPlayer } from '../sort';

const timer0: Timer = { timerIndex: 0, timestampStart: 1, durationSec: 20 };
const timer1: Timer = { timerIndex: 1, timestampStart: 2, durationSec: 50 };
const timer3: Timer = { timerIndex: 3, timestampStart: 4, durationSec: 20 };
const timer6: Timer = { timerIndex: 6, timestampStart: 3, durationSec: 10 };

const timers: Timer[] = [timer0, timer1, timer3, timer6];

test('sortTimers', () => {
  expect(sortTimers([], 5, Sort.firstPlayerToLastPlayer)).toStrictEqual([]);
  expect(sortTimers([], 5, Sort.lastPlayerToFirstPlayer)).toStrictEqual([]);
  expect(sortTimers([], 5, Sort.oldestToNewest)).toStrictEqual([]);
  expect(sortTimers([], 5, Sort.newestToOldest)).toStrictEqual([]);
  expect(sortTimers([], 5, Sort.shortestToLongest)).toStrictEqual([]);
  expect(sortTimers([], 5, Sort.longestToShortest)).toStrictEqual([]);

  expect(sortTimers([timer0], 5, Sort.firstPlayerToLastPlayer)).toStrictEqual([timer0]);
  expect(sortTimers([timer0], 5, Sort.lastPlayerToFirstPlayer)).toStrictEqual([timer0]);
  expect(sortTimers([timer0], 5, Sort.oldestToNewest)).toStrictEqual([timer0]);
  expect(sortTimers([timer0], 5, Sort.newestToOldest)).toStrictEqual([timer0]);
  expect(sortTimers([timer0], 5, Sort.shortestToLongest)).toStrictEqual([timer0]);
  expect(sortTimers([timer0], 5, Sort.longestToShortest)).toStrictEqual([timer0]);

  expect(sortTimers(timers, 5, Sort.firstPlayerToLastPlayer)).toStrictEqual([timer0, timer1, timer3, timer6]);
  expect(sortTimers(timers, 5, Sort.lastPlayerToFirstPlayer)).toStrictEqual([timer6, timer3, timer0, timer1]);
  expect(sortTimers(timers, 5, Sort.oldestToNewest)).toStrictEqual([timer0, timer1, timer6, timer3]);
  expect(sortTimers(timers, 5, Sort.newestToOldest)).toStrictEqual([timer3, timer6, timer1, timer0]);
  expect(sortTimers(timers, 5, Sort.shortestToLongest)).toStrictEqual([timer6, timer0, timer3, timer1]);
  expect(sortTimers(timers, 5, Sort.longestToShortest)).toStrictEqual([timer1, timer3, timer0, timer6]);
});

test('sortTimersByCreationDate', () => {
  expect(sortTimersByCreationDate([])).toStrictEqual([]);
  expect(sortTimersByCreationDate([], true)).toStrictEqual([]);
  expect(sortTimersByCreationDate([timer0])).toStrictEqual([timer0]);
  expect(sortTimersByCreationDate([timer0], true)).toStrictEqual([timer0]);
  expect(sortTimersByCreationDate(timers)).toStrictEqual([timer0, timer1, timer6, timer3]);
  expect(sortTimersByCreationDate(timers, true)).toStrictEqual([timer3, timer6, timer1, timer0]);
});

test('sortTimersByDuration', () => {
  expect(sortTimersByDuration([], 5)).toStrictEqual([]);
  expect(sortTimersByDuration([], 5, true)).toStrictEqual([]);
  expect(sortTimersByDuration([timer0], 5, true)).toStrictEqual([timer0]);
  expect(sortTimersByDuration([timer0], 5, true)).toStrictEqual([timer0]);
  expect(sortTimersByDuration(timers, 5)).toStrictEqual([timer6, timer0, timer3, timer1]);
  expect(sortTimersByDuration(timers, 5, true)).toStrictEqual([timer1, timer3, timer0, timer6]);
  expect(sortTimersByDuration(timers, 100)).toStrictEqual([timer0, timer1, timer3, timer6]);
  expect(sortTimersByDuration(timers, 100, true)).toStrictEqual([timer6, timer3, timer1, timer0]);
});

test('sortTimersByPlayer', () => {
  expect(sortTimersByPlayer([])).toStrictEqual([]);
  expect(sortTimersByPlayer([], true)).toStrictEqual([]);
  expect(sortTimersByPlayer([timer0])).toStrictEqual([timer0]);
  expect(sortTimersByPlayer([timer0], true)).toStrictEqual([timer0]);
  expect(sortTimersByPlayer(timers)).toStrictEqual([timer0, timer1, timer3, timer6]);
  expect(sortTimersByPlayer(timers, true)).toStrictEqual([timer6, timer3, timer0, timer1]);
});
