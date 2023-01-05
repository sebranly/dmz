import { calculateRemainingSeconds, getCurrentTimestamp, getEndTime, numberRange } from '../index';

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
  expect(getEndTime({ timerIndex: 0, timestampStart: 3_660, durationSec: 3_600 })).toBe('03:01 AM');
  expect(getEndTime({ timerIndex: 0, timestampStart: 13 * 3_600 + 60, durationSec: 7_200 + 24 * 60 })).toBe('04:25 PM');
});

test('numberRange', () => {
  expect(numberRange(0, 3)).toStrictEqual([0, 1, 2, 3]);
  expect(numberRange(1, 8)).toStrictEqual([1, 2, 3, 4, 5, 6, 7, 8]);
});
