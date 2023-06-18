export enum Color {
  Blue = 'blue',
  Gray = 'gray',
  Green = 'green',
  Orange = 'orange',
  Pink = 'pink',
  Red = 'red',
  Yellow = 'yellow'
}

export enum TimeUnit {
  Day = 'day',
  Hour = 'hour',
  Minute = 'minute',
  Second = 'second'
}

export type TimeValue = {
  [TimeUnit.Day]: number;
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
  answer: string[];
  map?: boolean;
  shown?: boolean;
  isNew?: boolean;
  yt?: boolean;
};

export enum Sort {
  FirstPlayerToLastPlayer = 'First player to Last player',
  LastPlayerToFirstPlayer = 'Last player to First player',
  LongestToShortest = 'Longest to Shortest',
  NewestToOldest = 'Newest to Oldest',
  OldestToNewest = 'Oldest to Newest',
  ShortestToLongest = 'Shortest to Longest'
}

export enum TimerFrequency {
  Daily = 'daily',
  None = 'none',
  Weekly = 'weekly'
}

export enum TimerType {
  Challenges = 'challenges',
  Map = 'map',
  Season = 'season'
}

export enum TimeStatus {
  Closing = 'closing',
  Launch = 'launch',
  Opening = 'opening',
  Reset = 'reset'
}

export type APITimer = {
  frequency: TimerFrequency;
  name: string;
  status: TimeStatus;
  time: number;
  type: TimerType;
};
