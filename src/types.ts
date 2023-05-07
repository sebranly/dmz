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

// TODO: rename to TimerFrequency etc.
export enum TimeFrequency {
  Daily = 'daily',
  Weekly = 'weekly'
}

export enum TimeType {
  // TODO: remove others
  Challenges = 'challenges',
  Map = 'map',
  Event = 'event',
  Reset = 'reset',
  Status = 'status'
}

export enum TimeStatus {
  Closing = 'closing',
  Launch = 'launch',
  Opening = 'opening',
  Reset = 'reset'
}

// TODO: rename to APITimerData
export type APITimeData = {
  color?: string;
  time: number;
  status?: string;
}

export type APITime = {
  frequency?: TimeFrequency;
  title: string;
  status?: TimeStatus;
  time: number;
  data: APITimeData[];
  type: TimeType;
};
