import { HOURS_PER_SLOT, MAX_TIMERS_PER_PLAYER } from '../constants/game';
import { TimeUnit, TimeValue } from '../types';

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

export {
  convertTimeValueToSeconds,
  convertSecondsToMoney,
  convertSecondsToTimeValue,
  convertTimerIndexToPlayerIndex,
  convertTimerIndexToPlayerTimerIndex,
  convertPlayerTimerIndexToHourTimer
};
