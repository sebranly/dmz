import { HOURS_PER_SLOT, MAX_TIMERS_PER_PLAYER } from '../constants/game';
import { TimeUnit, Timer, TimeValue } from '../types';

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

// TODO: add tests
const convertTimeValueToSeconds = (timeValue: TimeValue) => {
  const { [TimeUnit.Hour]: hours, [TimeUnit.Minute]: minutes, [TimeUnit.Second]: seconds } = timeValue;
  const secondsBis = hours * 3_600 + minutes * 60 + seconds;

  return secondsBis;
};

const convertSecondsToTimeValue = (seconds: number): TimeValue => {
  if (seconds <= 0) {
    return {
      [TimeUnit.Hour]: 0,
      [TimeUnit.Minute]: 0,
      [TimeUnit.Second]: 0
    };
  }

  const hours = Math.floor(seconds / (60 * 60));
  const minutes = Math.floor((seconds % (60 * 60)) / 60);
  const secondsBis = Math.floor(seconds % 60);

  return {
    [TimeUnit.Hour]: hours,
    [TimeUnit.Minute]: minutes,
    [TimeUnit.Second]: secondsBis
  };
};

const convertSecondsToMoney = (seconds: number, hourlyRate: number) => {
  const money = Math.ceil((seconds * hourlyRate) / 3_600);
  const moneyHundreds = Math.floor(money / 100);
  const roundUp = moneyHundreds * 100 !== money;
  const moneyHundredsBis = roundUp ? moneyHundreds + 1 : moneyHundreds;

  return moneyHundredsBis * 100;
};

const numberRange = (min: number, max: number) => {
  const numbers = [];
  for (let i = min; i <= max; i += 1) numbers.push(i);
  return numbers;
};

const convertTimerIndexToPlayerIndex = (timerIndex: number) => {
  const playerIndex = Math.floor(timerIndex / MAX_TIMERS_PER_PLAYER);
  return playerIndex;
};

const convertTimerIndexToPlayerTimerIndex = (timerIndex: number) => {
  const playerTimerIndex = timerIndex % MAX_TIMERS_PER_PLAYER;
  return playerTimerIndex;
};

const convertPlayerTimerIndexToHourTimer = (index: number) => {
  return (index + 1) * HOURS_PER_SLOT;
};

const getEndTime = (timer: Timer) => {
  const { durationSec, timestampStart } = timer;
  const endTime = (timestampStart + durationSec) * 1000;
  return new Date(endTime).toLocaleString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
};

export {
  calculateRemainingSeconds,
  getCurrentTimestamp,
  getEndTime,
  convertSecondsToTimeValue,
  convertPlayerTimerIndexToHourTimer,
  convertSecondsToMoney,
  convertTimerIndexToPlayerIndex,
  convertTimerIndexToPlayerTimerIndex,
  convertTimeValueToSeconds,
  numberRange
};
