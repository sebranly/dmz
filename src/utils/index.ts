import { Timer } from '../types';

const getCurrentTimestamp = () => Math.floor(Date.now() / 1000);

// TODO: add tests
const calculateRemainingSeconds = (timer: Timer, currentTimestamp: number) => {
  const { durationSec, timestampStart } = timer;

  if (durationSec === 0) return 0;
  if (timestampStart > currentTimestamp) return durationSec;

  const elapsedSec = currentTimestamp - timestampStart;
  const remainingSec = durationSec - elapsedSec;

  if (remainingSec <= 0) return 0;

  return remainingSec;
};

const numberRange = (min: number, max: number) => {
  const numbers = [];
  for (let i = min; i <= max; i += 1) numbers.push(i);
  return numbers;
};

const getEndTime = (timer: Timer) => {
  const { durationSec, timestampStart } = timer;
  const endTime = (timestampStart + durationSec) * 1000;
  return new Date(endTime).toLocaleString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
};

export { calculateRemainingSeconds, getCurrentTimestamp, getEndTime, numberRange };
