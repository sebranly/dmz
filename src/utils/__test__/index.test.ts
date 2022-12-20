import {
  convertSecondsToUnits,
  convertToTwoDigits,
  pluralize,
} from '../index';

test('pluralize', () => {
  expect(pluralize('word', -1)).toBe('word');
  expect(pluralize('word', 0)).toBe('words');
  expect(pluralize('word', 1)).toBe('word');
  expect(pluralize('word', 2)).toBe('words');
  expect(pluralize('word', 100)).toBe('words');
});

test('convertToTwoDigits', () => {
  expect(convertToTwoDigits(0)).toBe('00');
  expect(convertToTwoDigits(5)).toBe('05');
  expect(convertToTwoDigits(10)).toBe('10');
  expect(convertToTwoDigits(100)).toBe('100');
});

test('convertSecondsToUnits', () => {
  expect(convertSecondsToUnits(-1)).toStrictEqual({
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  expect(convertSecondsToUnits(0)).toStrictEqual({
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  expect(convertSecondsToUnits(1)).toStrictEqual({
    hours: 0,
    minutes: 0,
    seconds: 1
  });

  expect(convertSecondsToUnits(60)).toStrictEqual({
    hours: 0,
    minutes: 1,
    seconds: 0
  });

  expect(convertSecondsToUnits(61)).toStrictEqual({
    hours: 0,
    minutes: 1,
    seconds: 1
  });

  expect(convertSecondsToUnits(3599)).toStrictEqual({
    hours: 0,
    minutes: 59,
    seconds: 59
  });

  expect(convertSecondsToUnits(3600)).toStrictEqual({
    hours: 1,
    minutes: 0,
    seconds: 0
  });

  expect(convertSecondsToUnits(86400)).toStrictEqual({
    hours: 24,
    minutes: 0,
    seconds: 0
  });
});
