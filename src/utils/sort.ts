import { calculateRemainingSeconds } from '.';
import { convertTimerIndexToPlayerIndex, convertTimerIndexToPlayerTimerIndex } from './convert';
import { Sort, Timer } from '../types';

/**
 * @name sortTimers
 * @description Returns the same list of timers sorted according to specified sort
 */
const sortTimers = (timers: Timer[], currentTimestamp: number, sort: Sort) => {
  switch (sort) {
    case Sort.longestToShortest:
      return sortTimersByDuration(timers, currentTimestamp, true);
    case Sort.shortestToLongest:
      return sortTimersByDuration(timers, currentTimestamp);
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

/**
 * @name sortTimersByCreationDate
 * @description Returns the same list of timers sorted according to creation date
 */
const sortTimersByCreationDate = (timers: Timer[], shouldReverse = false) => {
  if ([0, 1].includes(timers.length)) return timers;

  const copyTimers = timers.slice(0, timers.length);
  const sortedTimers = copyTimers.sort((t1: Timer, t2: Timer) => {
    return t1.timestampStart - t2.timestampStart;
  });

  if (!shouldReverse) return sortedTimers;

  return sortedTimers.reverse();
};

/**
 * @name sortTimersByDuration
 * @description Returns the same list of timers sorted according to remaining duration
 */
const sortTimersByDuration = (timers: Timer[], currentTimestamp: number, shouldReverse = false) => {
  if ([0, 1].includes(timers.length)) return timers;

  const copyTimers = timers.slice(0, timers.length);
  const sortedTimers = copyTimers.sort((t1: Timer, t2: Timer) => {
    const remainingSeconds1 = calculateRemainingSeconds(t1, currentTimestamp);
    const remainingSeconds2 = calculateRemainingSeconds(t2, currentTimestamp);
    const remainingSecondsDiff = remainingSeconds1 - remainingSeconds2;
    return remainingSecondsDiff !== 0 ? remainingSecondsDiff : t1.timerIndex - t2.timerIndex;
  });

  if (!shouldReverse) return sortedTimers;

  return sortedTimers.reverse();
};

/**
 * @name sortTimersByPlayer
 * @description Returns the same list of timers sorted according to player index
 */
const sortTimersByPlayer = (timers: Timer[], shouldReverse = false) => {
  if ([0, 1].includes(timers.length)) return timers;

  // No matter value of `shouldReverse`, for each player, their own timers should be sorted ASC
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

export { sortTimers, sortTimersByCreationDate, sortTimersByDuration, sortTimersByPlayer };
