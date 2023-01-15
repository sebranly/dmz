import { TimeUnit } from '../../types';
import {
  calculateRemainingSeconds,
  getCurrentTimestamp,
  getEndTime,
  isNullTimeValue,
  numberRange,
  sanitizeTimersCookie
} from '../index';

test('calculateRemainingSeconds', () => {
  let timer = { timerIndex: 0, timestampStart: 2, durationSec: 0 };
  expect(calculateRemainingSeconds(timer, 3)).toBe(0);

  timer.durationSec = 3;
  expect(calculateRemainingSeconds(timer, 1)).toBe(3);
  expect(calculateRemainingSeconds(timer, 2)).toBe(3);
  expect(calculateRemainingSeconds(timer, 3)).toBe(2);
  expect(calculateRemainingSeconds(timer, 4)).toBe(1);
  expect(calculateRemainingSeconds(timer, 5)).toBe(0);
  expect(calculateRemainingSeconds(timer, 6)).toBe(0);
});

test('getCurrentTimestamp', () => {
  expect(getCurrentTimestamp()).toBeGreaterThan(0);
});

test('getEndTime', () => {
  expect(getEndTime({ timerIndex: 0, timestampStart: 3_660, durationSec: 3_600 })).toBe('03:01 AM');
  expect(getEndTime({ timerIndex: 0, timestampStart: 13 * 3_600 + 60, durationSec: 7_200 + 24 * 60 })).toBe('04:25 PM');
});

test('isNullTimeValue', () => {
  expect(isNullTimeValue({ [TimeUnit.Hour]: 1, [TimeUnit.Minute]: 2, [TimeUnit.Second]: 3 })).toBe(false);
  expect(isNullTimeValue({ [TimeUnit.Hour]: 1, [TimeUnit.Minute]: 0, [TimeUnit.Second]: 0 })).toBe(false);
  expect(isNullTimeValue({ [TimeUnit.Hour]: 0, [TimeUnit.Minute]: 0, [TimeUnit.Second]: 0 })).toBe(true);
  expect(isNullTimeValue({ [TimeUnit.Hour]: -1, [TimeUnit.Minute]: 10, [TimeUnit.Second]: 24 })).toBe(true);
});

test('numberRange', () => {
  expect(numberRange(0, 3)).toStrictEqual([0, 1, 2, 3]);
  expect(numberRange(1, 8)).toStrictEqual([1, 2, 3, 4, 5, 6, 7, 8]);
});

test('sanitizeTimersCookie', () => {
  expect(sanitizeTimersCookie(null, 9)).toStrictEqual([]);
  expect(sanitizeTimersCookie('', 9)).toStrictEqual([]);
  expect(sanitizeTimersCookie(0, 9)).toStrictEqual([]);
  expect(sanitizeTimersCookie([], 9)).toStrictEqual([]);
  expect(sanitizeTimersCookie(undefined, 9)).toStrictEqual([]);
  expect(sanitizeTimersCookie({}, 9)).toStrictEqual([]);

  expect(sanitizeTimersCookie([null], 9)).toStrictEqual([]);
  expect(sanitizeTimersCookie([''], 9)).toStrictEqual([]);
  expect(sanitizeTimersCookie([0], 9)).toStrictEqual([]);
  expect(sanitizeTimersCookie([[]], 9)).toStrictEqual([]);
  expect(sanitizeTimersCookie([undefined], 9)).toStrictEqual([]);
  expect(sanitizeTimersCookie([{}], 9)).toStrictEqual([]);

  expect(sanitizeTimersCookie([{ durationSec: 0, timerIndex: 1, timestampStart: 123 }], 9)).toStrictEqual([]);
  expect(sanitizeTimersCookie([{ durationSec: 1, timerIndex: -1, timestampStart: 123 }], 9)).toStrictEqual([]);
  expect(sanitizeTimersCookie([{ durationSec: 1, timerIndex: 1, timestampStart: -1 }], 9)).toStrictEqual([]);
  expect(sanitizeTimersCookie([{ durationSec: 1, timerIndex: 9, timestampStart: 1 }], 9)).toStrictEqual([]);
  expect(sanitizeTimersCookie([{ durationSec: 1, timestampStart: 123 }], 9)).toStrictEqual([]);
  expect(sanitizeTimersCookie([{ timerIndex: 1, timestampStart: 123 }], 9)).toStrictEqual([]);

  expect(sanitizeTimersCookie([{ durationSec: 1, timerIndex: 1, timestampStart: 123, wxyz: 12 }], 9)).toStrictEqual([
    { durationSec: 1, timerIndex: 1, timestampStart: 123 }
  ]);

  expect(
    sanitizeTimersCookie(
      [
        { timestampStart: 123, durationSec: 7203, timerIndex: 0 },
        {},
        { timestampStart: 456, durationSec: 14003, timerIndex: 1 },
        null,
        { timestampStart: 789, durationSec: 1803, timerIndex: 2 },
        0,
        { timestampStart: 12, durationSec: 3603, timerIndex: 3 },
        { timestampStart: 34, durationSec: 73, timerIndex: 4 },
        { timestampStart: 56, durationSec: 143, timerIndex: 5 },
        { timestampStart: 56, durationSec: 1431212121212, timerIndex: 5 },
        { timestampStart: 78, durationSec: 23, timerIndex: 6 },
        {},
        [],
        { timestampStart: 90, durationSec: 504, timerIndex: 7 },
        { timestampStart: 321, durationSec: 63, timerIndex: 8 }
      ],
      9
    )
  ).toStrictEqual([
    { timestampStart: 123, durationSec: 7203, timerIndex: 0 },
    { timestampStart: 456, durationSec: 14003, timerIndex: 1 },
    { timestampStart: 789, durationSec: 1803, timerIndex: 2 },
    { timestampStart: 12, durationSec: 3603, timerIndex: 3 },
    { timestampStart: 34, durationSec: 73, timerIndex: 4 },
    { timestampStart: 56, durationSec: 143, timerIndex: 5 },
    { timestampStart: 78, durationSec: 23, timerIndex: 6 },
    { timestampStart: 90, durationSec: 504, timerIndex: 7 },
    { timestampStart: 321, durationSec: 63, timerIndex: 8 }
  ]);
});
