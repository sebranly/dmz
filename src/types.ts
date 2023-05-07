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
// TODO: have Monthly etc.?
export enum TimeFrequency {
  Daily = 'daily',
  Weekly = 'weekly'
}

export enum TimeType {
  Event = 'event',
  Reset = 'reset',
  Status = 'status'
}

// TODO: rename to APITimer...
export type APITimerDataTextOverride = {
  title?: string;
  subtitle?: string;
};

// TODO: rename to APITimerData
export type APITimeData = {
  color?: string;
  description?: string; // TODO: make it MANDATORY. If not, look at EventTimer first
  time: number;
  textOverride?: APITimerDataTextOverride;
};

// TODO: rename to APITimer
export type APITime = {
  frequency?: TimeFrequency;
  title: string;
  showPostEvent?: boolean;
  subtitle?: string; // TODO: optional or mandatory
  subtitlePostEvent?: string;
  data: APITimeData[];
  type: TimeType;
};
