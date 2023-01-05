import { calculateRemainingSeconds, convertTimerIndexToPlayerIndex, convertTimerIndexToPlayerTimerIndex } from '.';
import { Sort, Timer } from '../types';

// TODO: add tests
const sortTimers = (timers: Timer[], currentTimestamp: number, sort: Sort) => {
  switch (sort) {
    case Sort.longestToShortest:
      return sortTimersByTime(timers, currentTimestamp, true);
    case Sort.shortestToLongest:
      return sortTimersByTime(timers, currentTimestamp);
    case Sort.oldestToNewest:
    default:
      return sortTimersByCreationDate(timers);
    case Sort.newestToOldest:
      return sortTimersByCreationDate(timers, true);
    case Sort.firstPlayerToLastPlayer:
      return sortTimersByPlayer(timers);
    case Sort.lastPlayerToFirstPlayer:
      return sortTimersByPlayer(timers, true);
  }
};

// TODO: add tests
const sortTimersByCreationDate = (timers: Timer[], shouldReverse = false) => {
  if ([0, 1].includes(timers.length)) return timers;
  const copyTimers = timers.slice(0, timers.length);
  const sortedTimers = copyTimers.sort((t1: Timer, t2: Timer) => {
    return t1.timestampStart - t2.timestampStart;
  });

  if (!shouldReverse) return sortedTimers;

  return sortedTimers.reverse();
};

// TODO: add tests
const sortTimersByPlayer = (timers: Timer[], shouldReverse = false) => {
  if ([0, 1].includes(timers.length)) return timers;

  const multiplier = shouldReverse ? -1 : 1;

  const copyTimers = timers.slice(0, timers.length);
  const sortedTimers = copyTimers.sort((t1: Timer, t2: Timer) => {
    const playerIndex1 = convertTimerIndexToPlayerIndex(t1.timerIndex);
    const playerIndex2 = convertTimerIndexToPlayerIndex(t2.timerIndex);
    const playerTimerIndex1 = convertTimerIndexToPlayerTimerIndex(t1.timerIndex);
    const playerTimerIndex2 = convertTimerIndexToPlayerTimerIndex(t2.timerIndex);

    const playerIndexDiff = playerIndex1 - playerIndex2;
    const playerTimerIndexDiff = multiplier * (playerTimerIndex1 - playerTimerIndex2);

    return playerIndexDiff !== 0 ? playerIndexDiff : playerTimerIndexDiff;
  });

  if (!shouldReverse) return sortedTimers;

  return sortedTimers.reverse();
};

// TODO: add tests
// TODO: add case where all timers are 0
const sortTimersByTime = (timers: Timer[], currentTimestamp: number, shouldReverse = false) => {
  if ([0, 1].includes(timers.length)) return timers;
  const copyTimers = timers.slice(0, timers.length);
  const sortedTimers = copyTimers.sort((t1: Timer, t2: Timer) => {
    const remainingSeconds1 = calculateRemainingSeconds(t1, currentTimestamp);
    const remainingSeconds2 = calculateRemainingSeconds(t2, currentTimestamp);
    return remainingSeconds1 - remainingSeconds2;
  });

  if (!shouldReverse) return sortedTimers;

  return sortedTimers.reverse();
};

export { sortTimers, sortTimersByCreationDate, sortTimersByPlayer, sortTimersByTime };
