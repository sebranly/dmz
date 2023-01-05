export enum Color {
  Green = 'green',
  Yellow = 'yellow',
  Blue = 'blue',
  Pink = 'pink'
}

export enum TimeUnit {
  Hour = 'hour',
  Minute = 'minute',
  Second = 'second'
}

export type TimeValue = {
  [TimeUnit.Hour]: number;
  [TimeUnit.Minute]: number;
  [TimeUnit.Second]: number;
};

export type Timer = {
  timerIndex: number;
  durationSec: number;
  timestampStart: number;
};

export enum Sort {
  oldestToNewest = 'Oldest to Newest',
  newestToOldest = 'Newest to Oldest',
  longestToShortest = 'Longest to Shortest',
  shortestToLongest = 'Shortest to Longest',
  firstPlayerToLastPlayer = 'First player to Last player',
  lastPlayerToFirstPlayer = 'Last player to First player'
}
