import {
  getCurrentTimestamp,
  getEndTime,
  numberRange,
} from '../index';

test('getCurrentTimestamp', () => {
  expect(getCurrentTimestamp()).toBeGreaterThan(0);
});

test('getEndTime', () => {
  expect(getEndTime({ timerIndex: 0, timestampStart: 3_660, durationSec: 3_600 })).toBe('03:01 AM');
  expect(getEndTime({ timerIndex: 0, timestampStart: 13 * 3_600 + 60, durationSec: 7_200 + 24 * 60 })).toBe('04:25 PM');
});

test('numberRange', () => {
  expect(numberRange(0, 3)).toStrictEqual([0, 1, 2, 3]);
  expect(numberRange(1, 8)).toStrictEqual([1, 2, 3, 4, 5, 6, 7, 8]);
});
