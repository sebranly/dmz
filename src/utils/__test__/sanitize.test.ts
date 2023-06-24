import { sanitizeTimersCookie } from '../sanitize';

test('sanitizeTimersCookie', () => {
  expect(sanitizeTimersCookie(null, 9)).toStrictEqual([]);
  expect(sanitizeTimersCookie('', 9)).toStrictEqual([]);
  expect(sanitizeTimersCookie(0, 9)).toStrictEqual([]);
  expect(sanitizeTimersCookie([], 9)).toStrictEqual([]);
  expect(sanitizeTimersCookie(undefined, 9)).toStrictEqual([]);
  expect(sanitizeTimersCookie({}, 9)).toStrictEqual([]);

  expect(sanitizeTimersCookie([null], 9)).toStrictEqual([]);
  expect(sanitizeTimersCookie([''], 9)).toStrictEqual([]);
  expect(sanitizeTimersCookie([0], 9)).toStrictEqual([]);
  expect(sanitizeTimersCookie([[]], 9)).toStrictEqual([]);
  expect(sanitizeTimersCookie([undefined], 9)).toStrictEqual([]);
  expect(sanitizeTimersCookie([{}], 9)).toStrictEqual([]);

  expect(sanitizeTimersCookie([{ durationSec: 0, timerIndex: 1, timestampStart: 123 }], 9)).toStrictEqual([]);
  expect(sanitizeTimersCookie([{ durationSec: 1, timerIndex: -1, timestampStart: 123 }], 9)).toStrictEqual([]);
  expect(sanitizeTimersCookie([{ durationSec: 1, timerIndex: 1, timestampStart: -1 }], 9)).toStrictEqual([]);
  expect(sanitizeTimersCookie([{ durationSec: 1, timerIndex: 9, timestampStart: 1 }], 9)).toStrictEqual([]);
  expect(sanitizeTimersCookie([{ durationSec: 1, timestampStart: 123 }], 9)).toStrictEqual([]);
  expect(sanitizeTimersCookie([{ timerIndex: 1, timestampStart: 123 }], 9)).toStrictEqual([]);

  expect(sanitizeTimersCookie([{ durationSec: 1, timerIndex: 1, timestampStart: 123, wxyz: 12 }], 9)).toStrictEqual([
    { durationSec: 1, timerIndex: 1, timestampStart: 123 }
  ]);

  expect(
    sanitizeTimersCookie(
      [
        { timestampStart: 123, durationSec: 7203, timerIndex: 0 },
        {},
        { timestampStart: 456, durationSec: 14003, timerIndex: 1 },
        null,
        { timestampStart: 789, durationSec: 1803, timerIndex: 2 },
        0,
        { timestampStart: 12, durationSec: 3603, timerIndex: 3 },
        { timestampStart: 34, durationSec: 73, timerIndex: 4 },
        { timestampStart: 56, durationSec: 143, timerIndex: 5 },
        { timestampStart: 56, durationSec: 1431212121212, timerIndex: 5 },
        { timestampStart: 78, durationSec: 23, timerIndex: 6 },
        {},
        [],
        { timestampStart: 90, durationSec: 504, timerIndex: 7 },
        { timestampStart: 321, durationSec: 63, timerIndex: 8 }
      ],
      9
    )
  ).toStrictEqual([
    { timestampStart: 123, durationSec: 7203, timerIndex: 0 },
    { timestampStart: 456, durationSec: 14003, timerIndex: 1 },
    { timestampStart: 789, durationSec: 1803, timerIndex: 2 },
    { timestampStart: 12, durationSec: 3603, timerIndex: 3 },
    { timestampStart: 34, durationSec: 73, timerIndex: 4 },
    { timestampStart: 56, durationSec: 143, timerIndex: 5 },
    { timestampStart: 78, durationSec: 23, timerIndex: 6 },
    { timestampStart: 90, durationSec: 504, timerIndex: 7 },
    { timestampStart: 321, durationSec: 63, timerIndex: 8 }
  ]);
});
