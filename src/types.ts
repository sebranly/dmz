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

// TODO: have Monthly etc.?
export enum TimerFrequency {
  Daily = 'daily',
  Weekly = 'weekly'
}

export enum TimerType {
  Event = 'event',
  Reset = 'reset',
  Status = 'status'
}

export type APITimerDataTextOverride = {
  title?: string;
  subtitle?: string;
};

export type APITimerData = {
  color?: string;
  description?: string;
  time: number;
  textOverride?: APITimerDataTextOverride;
};

// TODO: have showPreEvent and subtitlePreEvent
export type APITimer = {
  frequency?: TimerFrequency;
  title: string;
  showPostEvent?: boolean;
  subtitle?: string;
  subtitlePostEvent?: string;
  data: APITimerData[];
  type: TimerType;
};
