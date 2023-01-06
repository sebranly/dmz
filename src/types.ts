export enum Color {
  Blue = 'blue',
  Green = 'green',
  Pink = 'pink',
  Yellow = 'yellow'
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
  durationSec: number;
  timerIndex: number;
  timestampStart: number;
};

export type QuestionAnswer = {
  question: string;
  answer: string;
  shown: boolean;
};

export enum Sort {
  firstPlayerToLastPlayer = 'First player to Last player',
  lastPlayerToFirstPlayer = 'Last player to First player',
  longestToShortest = 'Longest to Shortest',
  newestToOldest = 'Newest to Oldest',
  oldestToNewest = 'Oldest to Newest',
  shortestToLongest = 'Shortest to Longest'
}
