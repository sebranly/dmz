import { MAX_TIMERS } from '../constants/game';
import { APITimer, Timer, TimerFrequency, TimerType } from '../types';

/**
 * @name sanitizeAPITimers
 * @description Returns API timers by removing any wrong value
 */
const sanitizeAPITimers = (APIResponse: any) => {
  if (!APIResponse) return [];
  if (!Array.isArray(APIResponse)) return [];

  const timers: APITimer[] = [];

  APIResponse.forEach((row: any) => {
    if (!row) return;
    if (typeof row !== 'object') return;

    // Mandatory fields
    const { data, title, type } = row;
    if (typeof title !== 'string' || title === '') return;
    if (typeof type !== 'string' || !Object.values(TimerType).includes(type as any)) return;
    if (!data || !Array.isArray(data) || !data.length) return;

    // data has to be fully correct for the overall timer to be accepted
    if (type === TimerType.Status && data.length < 2) return;
    if (type !== TimerType.Status && data.length !== 1) return;

    const incorrectData = data.find((dataValue: any) => {
      const { color, description, time, textOverride } = dataValue;

      if (typeof time !== 'number') return true;
      if (typeof color !== 'undefined' && typeof color !== 'string') return true;
      if (typeof description !== 'undefined' && typeof description !== 'string') return true;
      if (typeof textOverride !== 'undefined') {
        if (typeof textOverride !== 'object' || Array.isArray(textOverride)) return true;
        const { subtitle, title } = textOverride;

        if (typeof subtitle !== 'undefined' && typeof subtitle !== 'string') return true;
        if (typeof title !== 'undefined' && typeof title !== 'string') return true;
      }

      return false;
    });

    if (incorrectData) return;

    // Optional fields
    const { frequency, showPostEvent, subtitle, subtitlePostEvent } = row;
    if (typeof frequency !== 'undefined' && !Object.values(TimerFrequency).includes(frequency)) return;
    if (typeof showPostEvent !== 'undefined' && typeof showPostEvent !== 'boolean') return;
    if (typeof subtitle !== 'undefined' && typeof subtitle !== 'string') return;
    if (typeof subtitlePostEvent !== 'undefined' && typeof subtitlePostEvent !== 'string') return;

    timers.push(row);
  });

  return timers;
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

export { sanitizeAPITimers, sanitizeTimersCookie };
