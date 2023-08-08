import { APITimer, APITimerData, TimerFrequency, TimerType, TimeUnit } from '../../types';
import {
  areValidAssertions,
  applyPercentOff,
  calculateRemainingSeconds,
  getAnchorLink,
  getCurrentTimestamp,
  getDailyTime,
  getDateTime,
  getEndTime,
  getNextStatusTimerData,
  getNextTime,
  getUTCDayOffset,
  getWeeklyTime,
  isNullTimeValue,
  numberRange
} from '../index';

test('areValidAssertions', () => {
  expect(areValidAssertions([])).toBe(true);
  expect(areValidAssertions([true])).toBe(true);
  expect(areValidAssertions([true, true])).toBe(true);
  expect(areValidAssertions([false])).toBe(false);
  expect(areValidAssertions([false, false])).toBe(false);
  expect(areValidAssertions([true, false])).toBe(false);
  expect(areValidAssertions([false, true])).toBe(false);
});

test('applyPercentOff', () => {
  expect(applyPercentOff(-1, 0)).toBe(0);
  expect(applyPercentOff(-1, 50)).toBe(0);
  expect(applyPercentOff(0, 0)).toBe(0);
  expect(applyPercentOff(1, 0)).toBe(1);
  expect(applyPercentOff(3_600, 0)).toBe(3_600);
  expect(applyPercentOff(3_600, 10)).toBe(3_240);
  expect(applyPercentOff(3_600, 50)).toBe(1_800);
  expect(applyPercentOff(3_600, 100)).toBe(0);
  expect(applyPercentOff(3_600, 150)).toBe(0);
});

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

test('getNextStatusTimerData', () => {
  const timeOpening: APITimerData = { time: 1678471200 };
  const timeClosing: APITimerData = { time: 1678125600 };

  const timerOpeningOnly: APITimer = {
    type: TimerType.Status,
    title: 'Building 21',
    frequency: TimerFrequency.Weekly,
    data: [timeOpening]
  };

  const timerClosingOnly: APITimer = {
    type: TimerType.Status,
    title: 'Building 21',
    frequency: TimerFrequency.Weekly,
    data: [timeClosing]
  };

  const timer: APITimer = {
    type: TimerType.Status,
    title: 'Building 21',
    frequency: TimerFrequency.Weekly,
    data: [timeOpening, timeClosing]
  };
  expect(getNextStatusTimerData(0, timerOpeningOnly)).toStrictEqual(timeOpening);
  expect(getNextStatusTimerData(0, timerClosingOnly)).toStrictEqual(timeClosing);
  expect(getNextStatusTimerData(0, timer)).toStrictEqual(timeOpening);

  expect(getNextStatusTimerData(1678471199, timer)).toStrictEqual(timeOpening);
  expect(getNextStatusTimerData(1678471200, timer)).toStrictEqual(timeClosing);
  expect(getNextStatusTimerData(1678471201, timer)).toStrictEqual(timeClosing);

  expect(getNextStatusTimerData(1678125599, timer)).toStrictEqual(timeClosing);
  expect(getNextStatusTimerData(1678125600, timer)).toStrictEqual(timeOpening);
  expect(getNextStatusTimerData(1678125601, timer)).toStrictEqual(timeOpening);
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
