import { getCurrentTimestamp } from '../utils';

export const DEBUG_TIMERS = [
  { timestampStart: getCurrentTimestamp() - 20, durationSec: 7203, timerIndex: 0 },
  { timestampStart: getCurrentTimestamp() - 8, durationSec: 14003, timerIndex: 1 },
  { timestampStart: getCurrentTimestamp() + 3, durationSec: 1803, timerIndex: 2 },
  { timestampStart: getCurrentTimestamp() + 3, durationSec: 3603, timerIndex: 3 },
  { timestampStart: getCurrentTimestamp(), durationSec: 73, timerIndex: 4 },
  { timestampStart: getCurrentTimestamp(), durationSec: 143, timerIndex: 5 },
  { timestampStart: getCurrentTimestamp(), durationSec: 23, timerIndex: 6 },
  { timestampStart: getCurrentTimestamp(), durationSec: 504, timerIndex: 7 },
  { timestampStart: getCurrentTimestamp(), durationSec: 63, timerIndex: 8 }
];
