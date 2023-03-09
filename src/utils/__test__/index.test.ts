import { APITime, TimeFrequency, TimeStatus, TimeType, TimeUnit } from '../../types';
import {
  calculateRemainingSeconds,
  getCurrentTimestamp,
  getEndTime,
  getNextStatus,
  getNextTime,
  getUTCDayOffset,
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

test('getUTCDayOffset', () => {
  expect(getUTCDayOffset(0)).toBe(0);
  expect(getUTCDayOffset(1 * 86_400)).toBe(1);
  expect(getUTCDayOffset(2 * 86_400)).toBe(2);
  expect(getUTCDayOffset(3 * 86_400)).toBe(3);
  expect(getUTCDayOffset(4 * 86_400)).toBe(4);
  expect(getUTCDayOffset(5 * 86_400)).toBe(5);
  expect(getUTCDayOffset(6 * 86_400)).toBe(6);
  expect(getUTCDayOffset(7 * 86_400)).toBe(0);

  expect(getUTCDayOffset(1.5 * 86_400)).toBe(1);
  expect(getUTCDayOffset(1678471200)).toBe(1);
  expect(getUTCDayOffset(1678125600)).toBe(4);
});

test('getNextTime', () => {
  expect(getNextTime(0, 0, TimeFrequency.None)).toBe(86_400);

  expect(getNextTime(0, 0, TimeFrequency.Daily)).toBe(86_400);
  expect(getNextTime(86_399, 0, TimeFrequency.Daily)).toBe(86_400);
  expect(getNextTime(86_400, 0, TimeFrequency.Daily)).toBe(172_800);
  expect(getNextTime(86_401, 0, TimeFrequency.Daily)).toBe(172_800);
  expect(getNextTime(172_799, 0, TimeFrequency.Daily)).toBe(172800);

  expect(getNextTime(0, 1678078800, TimeFrequency.Daily)).toBe(18_000);
  expect(getNextTime(1678032694, 1678078800, TimeFrequency.Daily)).toBe(1678078800);
  expect(getNextTime(1678078799, 1678078800, TimeFrequency.Daily)).toBe(1678078800);
  expect(getNextTime(1678078800, 1678078800, TimeFrequency.Daily)).toBe(1678165200);
  expect(getNextTime(2678032694, 1678078800, TimeFrequency.Daily)).toBe(2678072400);
  expect(getNextTime(2678072400, 1678078800, TimeFrequency.Daily)).toBe(2678158800);

  expect(getNextTime(0, 0, TimeFrequency.Weekly)).toBe(604_800);
  expect(getNextTime(86_399, 0, TimeFrequency.Weekly)).toBe(604_800);
  expect(getNextTime(604_799, 0, TimeFrequency.Weekly)).toBe(604_800);
  expect(getNextTime(604_800, 0, TimeFrequency.Weekly)).toBe(1_209_600);
  expect(getNextTime(604_801, 0, TimeFrequency.Weekly)).toBe(1_209_600);
  expect(getNextTime(1_209_599, 0, TimeFrequency.Weekly)).toBe(1_209_600);

  expect(getNextTime(0, 1678471200, TimeFrequency.Weekly)).toBe(151_200);
  expect(getNextTime(1678471199, 1678471200, TimeFrequency.Weekly)).toBe(1678471200);
  expect(getNextTime(1678471200, 1678471200, TimeFrequency.Weekly)).toBe(1679076000);
  expect(getNextTime(2678032694, 1678471200, TimeFrequency.Weekly)).toBe(2678205600);

  expect(getNextTime(0, 1678125600, TimeFrequency.Weekly)).toBe(410400);
  expect(getNextTime(1678125599, 1678125600, TimeFrequency.Weekly)).toBe(1678125600);
  expect(getNextTime(1678125600, 1678125600, TimeFrequency.Weekly)).toBe(1678730400);
  expect(getNextTime(2678032694, 1678125600, TimeFrequency.Weekly)).toBe(2678464800);
});

test('getNextStatus', () => {
  const times: APITime[] = [
    {
      type: TimeType.Map,
      name: 'Building 21',
      frequency: TimeFrequency.Weekly,
      status: TimeStatus.Opening,
      time: 1678471200
    },
    {
      type: TimeType.Map,
      name: 'Building 21',
      frequency: TimeFrequency.Weekly,
      status: TimeStatus.Closing,
      time: 1678125600
    }
  ];

  expect(getNextStatus(0, [])).toBe(-1);
  expect(getNextStatus(0, [times[0]])).toBe(TimeStatus.Opening);
  expect(getNextStatus(0, [times[1]])).toBe(TimeStatus.Closing);
  expect(getNextStatus(0, times)).toBe(TimeStatus.Opening);

  expect(getNextStatus(1678471199, times)).toBe(TimeStatus.Opening);
  expect(getNextStatus(1678471200, times)).toBe(TimeStatus.Closing);
  expect(getNextStatus(1678471201, times)).toBe(TimeStatus.Closing);

  expect(getNextStatus(1678125599, times)).toBe(TimeStatus.Closing);
  expect(getNextStatus(1678125600, times)).toBe(TimeStatus.Opening);
  expect(getNextStatus(1678125601, times)).toBe(TimeStatus.Opening);
});

test('isNullTimeValue', () => {
  expect(isNullTimeValue({ [TimeUnit.Day]: 0, [TimeUnit.Hour]: 1, [TimeUnit.Minute]: 2, [TimeUnit.Second]: 3 })).toBe(
    false
  );

  expect(isNullTimeValue({ [TimeUnit.Day]: 0, [TimeUnit.Hour]: 1, [TimeUnit.Minute]: 0, [TimeUnit.Second]: 0 })).toBe(
    false
  );

  expect(isNullTimeValue({ [TimeUnit.Day]: 1, [TimeUnit.Hour]: 1, [TimeUnit.Minute]: 0, [TimeUnit.Second]: 0 })).toBe(
    false
  );

  expect(isNullTimeValue({ [TimeUnit.Day]: 0, [TimeUnit.Hour]: 0, [TimeUnit.Minute]: 0, [TimeUnit.Second]: 0 })).toBe(
    true
  );

  expect(
    isNullTimeValue({ [TimeUnit.Day]: 0, [TimeUnit.Hour]: -1, [TimeUnit.Minute]: 10, [TimeUnit.Second]: 24 })
  ).toBe(true);
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
