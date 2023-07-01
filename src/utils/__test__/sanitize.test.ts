import { Color, TimerFrequency, TimerType } from '../../types';
import { sanitizeAPITimers, sanitizeTimersCookie } from '../sanitize';

test('sanitizeAPITimers', () => {
  expect(sanitizeAPITimers(null)).toStrictEqual([]);
  expect(sanitizeAPITimers('')).toStrictEqual([]);
  expect(sanitizeAPITimers('test')).toStrictEqual([]);
  expect(sanitizeAPITimers(0)).toStrictEqual([]);
  expect(sanitizeAPITimers(1)).toStrictEqual([]);
  expect(sanitizeAPITimers(false)).toStrictEqual([]);
  expect(sanitizeAPITimers(true)).toStrictEqual([]);
  expect(sanitizeAPITimers([])).toStrictEqual([]);
  expect(sanitizeAPITimers(undefined)).toStrictEqual([]);
  expect(sanitizeAPITimers({})).toStrictEqual([]);

  expect(sanitizeAPITimers([null])).toStrictEqual([]);
  expect(sanitizeAPITimers([''])).toStrictEqual([]);
  expect(sanitizeAPITimers(['test'])).toStrictEqual([]);
  expect(sanitizeAPITimers([0])).toStrictEqual([]);
  expect(sanitizeAPITimers([1])).toStrictEqual([]);
  expect(sanitizeAPITimers([false])).toStrictEqual([]);
  expect(sanitizeAPITimers([true])).toStrictEqual([]);
  expect(sanitizeAPITimers([[]])).toStrictEqual([]);
  expect(sanitizeAPITimers([undefined])).toStrictEqual([]);
  expect(sanitizeAPITimers([{}])).toStrictEqual([]);

  expect(
    sanitizeAPITimers([
      {
        title: 'Daily Challenges',
        subtitle: 'They reset in',
        frequency: 'daily',
        data: [
          {
            color: 'yellow',
            description: 'Daily Reset:',
            time: 1678078800
          }
        ]
      }
    ])
  ).toStrictEqual([]);

  expect(
    sanitizeAPITimers([
      {
        type: 'reset-typo',
        title: 'Daily Challenges',
        subtitle: 'They reset in',
        frequency: 'daily',
        data: [
          {
            color: 'yellow',
            description: 'Daily Reset:',
            time: 1678078800
          }
        ]
      }
    ])
  ).toStrictEqual([]);

  expect(
    sanitizeAPITimers([
      {
        type: 'reset',
        subtitle: 'They reset in',
        frequency: 'daily',
        data: [
          {
            color: 'yellow',
            description: 'Daily Reset:',
            time: 1678078800
          }
        ]
      }
    ])
  ).toStrictEqual([]);

  expect(
    sanitizeAPITimers([
      {
        type: 'reset',
        title: '',
        subtitle: 'They reset in',
        frequency: 'daily',
        data: [
          {
            color: 'yellow',
            description: 'Daily Reset:',
            time: 1678078800
          }
        ]
      }
    ])
  ).toStrictEqual([]);

  expect(
    sanitizeAPITimers([
      {
        type: 'reset',
        title: 4,
        subtitle: 'They reset in',
        frequency: 'daily',
        data: [
          {
            color: 'yellow',
            description: 'Daily Reset:',
            time: 1678078800
          }
        ]
      }
    ])
  ).toStrictEqual([]);

  expect(
    sanitizeAPITimers([
      {
        type: 'reset',
        title: 'Daily Challenges',
        subtitle: 'They reset in',
        frequency: 'daily'
      }
    ])
  ).toStrictEqual([]);

  expect(
    sanitizeAPITimers([
      {
        type: 'reset',
        title: 'Daily Challenges',
        subtitle: 'They reset in',
        frequency: 'daily',
        data: {}
      }
    ])
  ).toStrictEqual([]);

  expect(
    sanitizeAPITimers([
      {
        type: 'reset',
        title: 'Daily Challenges',
        subtitle: 'They reset in',
        frequency: 'daily',
        data: []
      }
    ])
  ).toStrictEqual([]);

  expect(
    sanitizeAPITimers([
      {
        type: 'reset',
        title: 'Daily Challenges',
        subtitle: 'They reset in',
        frequency: 'daily',
        data: [
          {
            color: 'yellow',
            description: 'Daily Reset:',
            time: 1678078800
          },
          {
            color: 'yellow',
            description: 'Daily Reset bis:',
            time: 1678078801
          }
        ]
      }
    ])
  ).toStrictEqual([]);

  expect(
    sanitizeAPITimers([
      {
        type: 'status',
        title: 'Building 21',
        frequency: TimerFrequency.Weekly,
        data: [
          {
            color: 'green',
            time: 1678467600,
            description: 'Weekly Opening:',
            textOverride: {
              title: 'Building 21 is closed',
              subtitle: 'It opens in'
            }
          }
        ]
      }
    ])
  ).toStrictEqual([]);

  expect(
    sanitizeAPITimers([
      {
        type: 'reset',
        title: 'Daily Challenges',
        subtitle: 'They reset in',
        frequency: 'daily',
        data: [
          {
            color: 'yellow',
            description: 'Daily Reset:',
            time: 'bonjour'
          }
        ]
      }
    ])
  ).toStrictEqual([]);

  expect(
    sanitizeAPITimers([
      {
        type: 'reset',
        title: 'Daily Challenges',
        subtitle: 'They reset in',
        frequency: 'daily',
        data: [
          {
            color: 1,
            description: 'Daily Reset:',
            time: 1678078800
          }
        ]
      }
    ])
  ).toStrictEqual([]);

  expect(
    sanitizeAPITimers([
      {
        type: 'reset',
        title: 'Daily Challenges',
        subtitle: 'They reset in',
        frequency: 'daily',
        data: [
          {
            color: 'yellow',
            description: 1,
            time: 1678078800
          }
        ]
      }
    ])
  ).toStrictEqual([]);

  expect(
    sanitizeAPITimers([
      {
        type: 'status',
        title: 'Building 21',
        frequency: TimerFrequency.Weekly,
        data: [
          {
            color: 'green',
            time: 1678467600,
            description: 'Weekly Opening:',
            textOverride: {
              title: 'Building 21 is closed',
              subtitle: 'It opens in'
            }
          },
          {
            color: 'orange',
            time: 1678122000,
            description: 'Weekly Closing:',
            textOverride: []
          }
        ]
      }
    ])
  ).toStrictEqual([]);

  expect(
    sanitizeAPITimers([
      {
        type: 'status',
        title: 'Building 21',
        frequency: TimerFrequency.Weekly,
        data: [
          {
            color: 'green',
            time: 1678467600,
            description: 'Weekly Opening:',
            textOverride: {
              title: 'Building 21 is closed',
              subtitle: 'It opens in'
            }
          },
          {
            color: 'orange',
            time: 1678122000,
            description: 'Weekly Closing:',
            textOverride: {
              title: 'Building 21 is open',
              subtitle: 1
            }
          }
        ]
      }
    ])
  ).toStrictEqual([]);

  expect(
    sanitizeAPITimers([
      {
        type: 'status',
        title: 'Building 21',
        frequency: TimerFrequency.Weekly,
        data: [
          {
            color: 'green',
            time: 1678467600,
            description: 'Weekly Opening:',
            textOverride: {
              title: 'Building 21 is closed',
              subtitle: 'It opens in'
            }
          },
          {
            color: 'orange',
            time: 1678122000,
            description: 'Weekly Closing:',
            textOverride: {
              title: 1,
              subtitle: 'Some subtitle'
            }
          }
        ]
      }
    ])
  ).toStrictEqual([]);

  expect(
    sanitizeAPITimers([
      {
        type: 'reset',
        title: 'Daily Challenges',
        subtitle: 'They reset in',
        frequency: 'daily-typo',
        data: [
          {
            color: 'yellow',
            description: 'Daily Reset:',
            time: 1678078800
          }
        ]
      }
    ])
  ).toStrictEqual([]);

  expect(
    sanitizeAPITimers([
      {
        type: 'reset',
        title: 'Daily Challenges',
        subtitle: 1,
        frequency: 'daily',
        data: [
          {
            color: 'yellow',
            description: 'Daily Reset:',
            time: 1678078800
          }
        ]
      }
    ])
  ).toStrictEqual([]);

  expect(
    sanitizeAPITimers([
      {
        type: 'event',
        title: 'Season 03 Reloaded',
        showPostEvent: 'something',
        subtitle: 'It launches in',
        subtitlePostEvent: 'It launched already',
        data: [
          {
            color: 'red',
            description: 'Release Date:',
            time: 1683702000
          }
        ]
      }
    ])
  ).toStrictEqual([]);

  expect(
    sanitizeAPITimers([
      {
        type: 'event',
        title: 'Season 03 Reloaded',
        showPostEvent: true,
        subtitle: 'It launches in',
        subtitlePostEvent: 1,
        data: [
          {
            color: 'red',
            description: 'Release Date:',
            time: 1683702000
          }
        ]
      }
    ])
  ).toStrictEqual([]);

  expect(
    sanitizeAPITimers([
      {
        type: 'reset',
        title: 'Daily Challenges',
        subtitle: 'They reset in',
        frequency: 'daily',
        data: [
          {
            color: 'yellow',
            description: 'Daily Reset:',
            time: 1678078800
          }
        ]
      },
      {
        type: 'status',
        title: 'Building 21',
        frequency: TimerFrequency.Weekly,
        data: [
          {
            color: 'green',
            time: 1678467600,
            description: 'Weekly Opening:',
            textOverride: {
              title: 'Building 21 is closed',
              subtitle: 'It opens in'
            }
          },
          {
            color: 'orange',
            time: 1678122000,
            description: 'Weekly Closing:',
            textOverride: {
              title: 'Building 21 is open',
              subtitle: 'It closes in'
            }
          }
        ]
      },
      {
        type: 'event',
        title: 'Season 03 Reloaded',
        showPostEvent: true,
        subtitle: 'It launches in',
        subtitlePostEvent: 'It launched already',
        data: [
          {
            color: 'red',
            description: 'Release Date:',
            time: 1683702000
          }
        ]
      }
    ])
  ).toStrictEqual([
    {
      type: TimerType.Reset,
      title: 'Daily Challenges',
      subtitle: 'They reset in',
      frequency: TimerFrequency.Daily,
      data: [
        {
          color: Color.Yellow,
          description: 'Daily Reset:',
          time: 1678078800
        }
      ]
    },
    {
      type: TimerType.Status,
      title: 'Building 21',
      frequency: TimerFrequency.Weekly,
      data: [
        {
          color: Color.Green,
          time: 1678467600,
          description: 'Weekly Opening:',
          textOverride: {
            title: 'Building 21 is closed',
            subtitle: 'It opens in'
          }
        },
        {
          color: Color.Orange,
          time: 1678122000,
          description: 'Weekly Closing:',
          textOverride: {
            title: 'Building 21 is open',
            subtitle: 'It closes in'
          }
        }
      ]
    },
    {
      type: TimerType.Event,
      title: 'Season 03 Reloaded',
      showPostEvent: true,
      subtitle: 'It launches in',
      subtitlePostEvent: 'It launched already',
      data: [
        {
          color: Color.Red,
          description: 'Release Date:',
          time: 1683702000
        }
      ]
    }
  ]);
});

test('sanitizeTimersCookie', () => {
  expect(sanitizeTimersCookie(null, 9)).toStrictEqual([]);
  expect(sanitizeTimersCookie('', 9)).toStrictEqual([]);
  expect(sanitizeTimersCookie('test', 9)).toStrictEqual([]);
  expect(sanitizeTimersCookie(0, 9)).toStrictEqual([]);
  expect(sanitizeTimersCookie(1, 9)).toStrictEqual([]);
  expect(sanitizeTimersCookie(false, 9)).toStrictEqual([]);
  expect(sanitizeTimersCookie(true, 9)).toStrictEqual([]);
  expect(sanitizeTimersCookie([], 9)).toStrictEqual([]);
  expect(sanitizeTimersCookie(undefined, 9)).toStrictEqual([]);
  expect(sanitizeTimersCookie({}, 9)).toStrictEqual([]);

  expect(sanitizeTimersCookie([null], 9)).toStrictEqual([]);
  expect(sanitizeTimersCookie([''], 9)).toStrictEqual([]);
  expect(sanitizeTimersCookie(['test'], 9)).toStrictEqual([]);
  expect(sanitizeTimersCookie([0], 9)).toStrictEqual([]);
  expect(sanitizeTimersCookie([1], 9)).toStrictEqual([]);
  expect(sanitizeTimersCookie([false], 9)).toStrictEqual([]);
  expect(sanitizeTimersCookie([true], 9)).toStrictEqual([]);
  expect(sanitizeTimersCookie([[]], 9)).toStrictEqual([]);
  expect(sanitizeTimersCookie([undefined], 9)).toStrictEqual([]);
  expect(sanitizeTimersCookie([{}], 9)).toStrictEqual([]);

  expect(sanitizeTimersCookie([{ durationSec: 0, timerIndex: 1, timestampStart: 123 }], 9)).toStrictEqual([]);
  expect(sanitizeTimersCookie([{ durationSec: 1, timerIndex: -1, timestampStart: 123 }], 9)).toStrictEqual([]);
  expect(sanitizeTimersCookie([{ durationSec: 1, timerIndex: 1, timestampStart: 0 }], 9)).toStrictEqual([]);
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
