import { MAX_TIMERS } from '../constants/game';
import { APITime, TimeFrequency, Timer, TimeUnit, TimeValue } from '../types';

/**
 * @name calculateRemainingSeconds
 * @description Calculates how many more seconds are left before a timer runs out
 */
const calculateRemainingSeconds = (timer: Timer, currentTimestamp: number) => {
  const { durationSec, timestampStart } = timer;

  if (durationSec === 0) return 0;
  if (timestampStart > currentTimestamp) return durationSec;

  const elapsedSec = currentTimestamp - timestampStart;
  const remainingSec = durationSec - elapsedSec;

  if (remainingSec <= 0) return 0;

  return remainingSec;
};

/**
 * @name getCurrentTimestamp
 * @description Returns the current timestamp in seconds
 */
const getCurrentTimestamp = () => Math.floor(Date.now() / 1000);

/**
 * @name getEndTime
 * @description Returns the expected end time of a timer (if no money is being used)
 */
const getEndTime = (timer: Timer) => {
  const { durationSec, timestampStart } = timer;
  const endTime = (timestampStart + durationSec) * 1000;
  return new Date(endTime).toLocaleString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
};

/**
 * @name getWeeklyTime
 * @description Returns the expected weekly time (with the weekday)
 */
const getWeeklyTime = (nextTimestamp: number) => {
  return new Date(nextTimestamp * 1000).toLocaleString('en-US', {
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });
};

/**
 * @name isNullTimeValue
 * @description Returns whether a time value is 0 seconds in total
 */
const isNullTimeValue = (timeValue: TimeValue) => {
  const {
    [TimeUnit.Day]: days,
    [TimeUnit.Hour]: hours,
    [TimeUnit.Minute]: minutes,
    [TimeUnit.Second]: seconds
  } = timeValue;

  if (days < 0 || hours < 0 || minutes < 0 || seconds < 0) return true;

  return days === 0 && hours === 0 && minutes === 0 && seconds === 0;
};

/**
 * @name numberRange
 * @description Returns an array containing all numbers from min to max included
 */
const numberRange = (min: number, max: number) => {
  const numbers = [];
  for (let i = min; i <= max; i += 1) numbers.push(i);
  return numbers;
};

/**
 * @name sanitizeTimersCookie
 * @description Returns timers contained in their cookie by removing any wrong value
 */
const sanitizeTimersCookie = (cookieValue: any, maxTimers = MAX_TIMERS) => {
  if (!cookieValue) return [];
  if (!Array.isArray(cookieValue)) return [];

  const timers: Timer[] = [];

  cookieValue.forEach((row: any) => {
    if (!row) return;
    if (typeof row !== 'object') return;

    const { durationSec, timerIndex, timestampStart } = row;
    if (!durationSec) return;
    if (!timerIndex && timerIndex !== 0) return;
    if (!timestampStart) return;

    if (typeof durationSec !== 'number') return;
    if (typeof timerIndex !== 'number') return;
    if (typeof timestampStart !== 'number') return;

    if (durationSec <= 0) return;
    if (timerIndex < 0 || timerIndex >= maxTimers) return;
    if (timestampStart <= 0) return;

    const timer: Timer = {
      durationSec,
      timerIndex,
      timestampStart
    };

    const timerWithSameIndex = timers.find((t: Timer) => t.timerIndex === timerIndex);

    if (!timerWithSameIndex) timers.push(timer);
  });

  return timers;
};

/**
 * @name getUTCDayOffset
 * @description Returns the offset, in days, relative to the previous Thursday
 * Thu, 01 Jan 1970 00:00:00 GMT is the origin
 * @param timestamp is in seconds
 */
const getUTCDayOffset = (timestamp: number) => {
  const date = new Date(timestamp * 1000);

  // 0 Sunday, 1 Monday, 2 Tuesday, 3 Wednesday, 4 Thursday, 5 Friday, 6 Saturday
  const day = date.getUTCDay();

  if ([0, 1, 2, 3].includes(day)) return day + 3;
  if ([5, 6].includes(day)) return day - 4;

  return 0;
};

/**
 * @name getNextTime
 * @description Returns the next timestamp, in seconds, that corresponds to a cycle tick based on a frequency
 */
const getNextTime = (currentTimestamp: number, resetTimestamp: number, frequency: TimeFrequency) => {
  const isWeekly = frequency === TimeFrequency.Weekly;
  const dayOffset = getUTCDayOffset(resetTimestamp);
  const dailyOffset = resetTimestamp % 86_400;
  const offset = isWeekly ? dailyOffset + dayOffset * 86_400 : dailyOffset;

  const multiplier = isWeekly ? 7 : 1;
  const period = multiplier * 86_400;

  const ratio = Math.floor((currentTimestamp - offset) / period) + 1;
  const nextTime = ratio * period + offset;

  return nextTime;
};

/**
 * @name getNextTimeStatus
 * @description For an element that can have several statuses, it returns the closest next status
 */
const getNextStatus = (currentTimestamp: number, times: APITime[]) => {
  if (times.length === 0) return -1;
  if (times.length === 1) return times[0].status;

  let closestStatus;
  let minValue = Number.MAX_SAFE_INTEGER;

  times.forEach((timeBis: APITime) => {
    const { frequency, status, time } = timeBis;
    const nextTime = getNextTime(currentTimestamp, time, frequency);
    if (nextTime < minValue) {
      minValue = nextTime;
      closestStatus = status;
    }
  });

  return closestStatus;
};

export {
  calculateRemainingSeconds,
  getCurrentTimestamp,
  getEndTime,
  getNextTime,
  getNextStatus,
  getUTCDayOffset,
  getWeeklyTime,
  isNullTimeValue,
  numberRange,
  sanitizeTimersCookie
};
