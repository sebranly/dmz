import { Timer } from '../types';

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
 * @name numberRange
 * @description Returns an array containing all numbers from min to max included
 */
const numberRange = (min: number, max: number) => {
  const numbers = [];
  for (let i = min; i <= max; i += 1) numbers.push(i);
  return numbers;
};

export { calculateRemainingSeconds, getCurrentTimestamp, getEndTime, numberRange };
