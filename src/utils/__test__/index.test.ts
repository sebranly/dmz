import { APITime, APITimeData, TimerFrequency, TimerType, TimeUnit } from '../../types';
import {
  calculateRemainingSeconds,
  getAnchorLink,
  getCurrentTimestamp,
  getDailyTime,
  getDateTime,
  getEndTime,
  getNextStatus,
  getNextTime,
  getUTCDayOffset,
  getWeeklyTime,
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

test('getAnchorLink', () => {
  expect(getAnchorLink('')).toBe('');
  expect(getAnchorLink('test')).toBe('test');
  expect(getAnchorLink('TEST')).toBe('test');
  expect(getAnchorLink('TEST     anD   Something')).toBe('test-and-something');
  expect(getAnchorLink('test-and-something')).toBe('test-and-something');
  expect(getAnchorLink('testé;-and-something-01_^£234$6')).toBe('test-and-something-012346');
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
  expect(getNextTime(0, 0)).toBe(86_400);

  expect(getNextTime(0, 0, TimerFrequency.Daily)).toBe(86_400);
  expect(getNextTime(86_399, 0, TimerFrequency.Daily)).toBe(86_400);
  expect(getNextTime(86_400, 0, TimerFrequency.Daily)).toBe(172_800);
  expect(getNextTime(86_401, 0, TimerFrequency.Daily)).toBe(172_800);
  expect(getNextTime(172_799, 0, TimerFrequency.Daily)).toBe(172800);

  expect(getNextTime(0, 1678078800, TimerFrequency.Daily)).toBe(18_000);
  expect(getNextTime(1678032694, 1678078800, TimerFrequency.Daily)).toBe(1678078800);
  expect(getNextTime(1678078799, 1678078800, TimerFrequency.Daily)).toBe(1678078800);
  expect(getNextTime(1678078800, 1678078800, TimerFrequency.Daily)).toBe(1678165200);
  expect(getNextTime(2678032694, 1678078800, TimerFrequency.Daily)).toBe(2678072400);
  expect(getNextTime(2678072400, 1678078800, TimerFrequency.Daily)).toBe(2678158800);

  expect(getNextTime(0, 0, TimerFrequency.Weekly)).toBe(604_800);
  expect(getNextTime(86_399, 0, TimerFrequency.Weekly)).toBe(604_800);
  expect(getNextTime(604_799, 0, TimerFrequency.Weekly)).toBe(604_800);
  expect(getNextTime(604_800, 0, TimerFrequency.Weekly)).toBe(1_209_600);
  expect(getNextTime(604_801, 0, TimerFrequency.Weekly)).toBe(1_209_600);
  expect(getNextTime(1_209_599, 0, TimerFrequency.Weekly)).toBe(1_209_600);

  expect(getNextTime(0, 1678471200, TimerFrequency.Weekly)).toBe(151_200);
  expect(getNextTime(1678471199, 1678471200, TimerFrequency.Weekly)).toBe(1678471200);
  expect(getNextTime(1678471200, 1678471200, TimerFrequency.Weekly)).toBe(1679076000);
  expect(getNextTime(2678032694, 1678471200, TimerFrequency.Weekly)).toBe(2678205600);

  expect(getNextTime(0, 1678125600, TimerFrequency.Weekly)).toBe(410400);
  expect(getNextTime(1678125599, 1678125600, TimerFrequency.Weekly)).toBe(1678125600);
  expect(getNextTime(1678125600, 1678125600, TimerFrequency.Weekly)).toBe(1678730400);
  expect(getNextTime(2678032694, 1678125600, TimerFrequency.Weekly)).toBe(2678464800);
});

test('getNextStatus', () => {
  const timeOpening: APITimeData = { time: 1678471200 };
  const timeClosing: APITimeData = { time: 1678125600 };

  const timeOpeningOnly: APITime = {
    type: TimerType.Status,
    title: 'Building 21',
    frequency: TimerFrequency.Weekly,
    data: [timeOpening]
  };

  const timeClosingOnly: APITime = {
    type: TimerType.Status,
    title: 'Building 21',
    frequency: TimerFrequency.Weekly,
    data: [timeClosing]
  };

  const time: APITime = {
    type: TimerType.Status,
    title: 'Building 21',
    frequency: TimerFrequency.Weekly,
    data: [timeOpening, timeClosing]
  };
  expect(getNextStatus(0, timeOpeningOnly)).toStrictEqual(timeOpening);
  expect(getNextStatus(0, timeClosingOnly)).toStrictEqual(timeClosing);
  expect(getNextStatus(0, time)).toStrictEqual(timeOpening);

  expect(getNextStatus(1678471199, time)).toStrictEqual(timeOpening);
  expect(getNextStatus(1678471200, time)).toStrictEqual(timeClosing);
  expect(getNextStatus(1678471201, time)).toStrictEqual(timeClosing);

  expect(getNextStatus(1678125599, time)).toStrictEqual(timeClosing);
  expect(getNextStatus(1678125600, time)).toStrictEqual(timeOpening);
  expect(getNextStatus(1678125601, time)).toStrictEqual(timeOpening);
});

test('getDailyTime', () => {
  expect(getDailyTime(1678471200)).toBe('07:00 PM');
});

test('getDateTime', () => {
  expect(getDateTime(1681286400)).toBe('Wed 4/12 10:00 AM');
});

test('getWeeklyTime', () => {
  expect(getWeeklyTime(1678471200)).toBe('Fri 07:00 PM');
  expect(getWeeklyTime(1678125600)).toBe('Mon 07:00 PM');
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
