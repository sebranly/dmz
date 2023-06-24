import { MAX_TIMERS } from '../constants/game';
import { APITimer, Timer, TimerFrequency, TimerType } from '../types';

// TODO: have unit tests for these functions
/**
 * @name isValidOptionalStringEnum
 * @description Returns whether an optional field expected to be a string enum is valid
 */
const isValidOptionalStringEnum = (field: any, enumValues: string[]) => {
  if (typeof field === 'undefined') return true;
  return isValidRequiredStringEnum(field, enumValues); 
}

/**
 * @name isValidOptionalType
 * @description Returns whether an optional field expected to be of a specific type is valid
 */
const isValidOptionalType = (field: any, type: string) => {
  // The field can be either undefined (optional) or a boolean (if provided)
  return [type, 'undefined'].includes(typeof field);
};

/**
 * @name isValidOptionalBoolean
 * @description Returns whether an optional field expected to be boolean is valid
 */
const isValidOptionalBoolean = (field: any) => {
  // The field can be either undefined (optional) or a boolean (if provided)
  return isValidOptionalType(field, 'boolean');
};

/**
 * @name isValidOptionalString
 * @description Returns whether an optional field expected to be string is valid
 */
const isValidOptionalString = (field: any) => {
  // The field can be either undefined (optional) or a string (if provided)
  return isValidOptionalType(field, 'string');
};

/**
 * @name isValidRequiredStringEnum
 * @description Returns whether a required field expected to be a string enum is valid
 */
const isValidRequiredStringEnum = (field: any, enumValues: string[]) => {
  return enumValues.includes(field); 
}

/**
 * @name isValidRequiredString
 * @description Returns whether a required field expected to be string is valid
 * A non-empty value is expected
 */
const isValidRequiredString = (field: any) => {
  return typeof field === 'string' && field !== '';
};

/**
 * @name isValidRequiredObject
 * @description Returns whether a required field expected to be object is valid
 */
const isValidRequiredObject = (field: any) => {
  return !!field && typeof field === 'object' && !Array.isArray(field);
};

/**
 * @name isValidRequiredArray
 * @description Returns whether a required field expected to be array is valid
 * A minimum length of 1 is expected
 */
const isValidRequiredArray = (field: any) => {
  return !!field && Array.isArray(field) && field.length > 0;
};

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
    if (!isValidRequiredString(title)) return;
    if (!isValidRequiredStringEnum(type, Object.values(TimerType))) return;
    if (!isValidRequiredArray(data)) return;

    // data has to be fully correct for the overall timer to be accepted
    if (type === TimerType.Status && data.length < 2) return;
    if (type !== TimerType.Status && data.length !== 1) return;

    const incorrectData = data.find((dataValue: any) => {
      const { color, description, time, textOverride } = dataValue;

      if (typeof time !== 'number') return true;
      if (!isValidOptionalString(color)) return true;
      if (!isValidOptionalString(description)) return true;
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
    if (!isValidOptionalStringEnum(frequency, Object.values(TimerFrequency))) return;
    if (!isValidOptionalBoolean(showPostEvent)) return;
    if (!isValidOptionalString(subtitle)) return;
    if (!isValidOptionalString(subtitlePostEvent)) return;

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

export { sanitizeAPITimers, sanitizeTimersCookie };
