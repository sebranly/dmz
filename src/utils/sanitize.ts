import { areValidAssertions } from '.';
import { MAX_TIMERS } from '../constants/game';
import { APITimer, Timer, TimerFrequency, TimerType } from '../types';
import { isValidOptionalStringEnum, isValidOptionalBoolean, isValidOptionalString, isValidRequiredNumber, isValidRequiredStringEnum, isValidRequiredString, isValidRequiredObject, isValidRequiredArray } from './type';

/**
 * @name sanitizeAPITimers
 * @description Returns API timers by removing any wrong value
 */
const sanitizeAPITimers = (APIResponse: any) => {
  if (!isValidRequiredArray(APIResponse)) return [];

  const timers: APITimer[] = [];

  APIResponse.forEach((row: any) => {
    if (!isValidRequiredObject(row)) return;

    // Mandatory fields
    const { data, title, type } = row;

    const isValid1 = areValidAssertions([
      isValidRequiredArray(data),
      isValidRequiredString(title),
      isValidRequiredStringEnum(type, Object.values(TimerType))
    ]);

    if (!isValid1) return;

    // data has to be fully correct for the overall timer to be accepted
    if (type === TimerType.Status && data.length < 2) return;
    if (type !== TimerType.Status && data.length !== 1) return;

    const incorrectData = data.find((dataValue: any) => {
      const { color, description, time, textOverride } = dataValue;

      const isValid2 = areValidAssertions([
        isValidRequiredNumber(time, 0),
        isValidOptionalString(color),
        isValidOptionalString(description)
      ]);

      if (!isValid2) return true;

      if (typeof textOverride !== 'undefined') {
        if (!isValidRequiredObject(textOverride)) return true;

        const { subtitle, title } = textOverride;
        if (!isValidOptionalString(title)) return true;
        if (!isValidOptionalString(subtitle)) return true;
      }

      return false;
    });

    if (incorrectData) return;

    // Optional fields
    const { frequency, showPostEvent, subtitle, subtitlePostEvent } = row;

    const isValid3 = areValidAssertions([
      isValidOptionalBoolean(showPostEvent),
      isValidOptionalString(subtitle),
      isValidOptionalString(subtitlePostEvent),
      isValidOptionalStringEnum(frequency, Object.values(TimerFrequency))
    ]);

    if (!isValid3) return;

    timers.push(row);
  });

  return timers;
};

/**
 * @name sanitizeTimersCookie
 * @description Returns timers contained in their cookie by removing any wrong value
 */
const sanitizeTimersCookie = (cookieValue: any, maxTimers = MAX_TIMERS) => {
  if (!isValidRequiredArray(cookieValue)) return [];

  const timers: Timer[] = [];

  cookieValue.forEach((row: any) => {
    if (!isValidRequiredObject(row)) return;

    const { durationSec, timerIndex, timestampStart } = row;
    const isValid = areValidAssertions([
      isValidRequiredNumber(durationSec, 1),
      isValidRequiredNumber(timerIndex, 0, maxTimers - 1),
      isValidRequiredNumber(timestampStart, 1)
    ]);

    if (!isValid) return;

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

export { sanitizeAPITimers, sanitizeTimersCookie };