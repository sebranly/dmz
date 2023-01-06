import { Color, TimeUnit } from '../../types';
import { displayTimeValue, displayWithTwoDigits, formatMoney, getPlayerColor, pluralize } from '../display';

test('displayTimeValue', () => {
  let timeValue = { [TimeUnit.Hour]: 0, [TimeUnit.Minute]: 0, [TimeUnit.Second]: 0 };
  expect(displayTimeValue(timeValue)).toBe('00h 00m 00s');

  timeValue[TimeUnit.Hour] = 1;
  timeValue[TimeUnit.Minute] = 2;
  timeValue[TimeUnit.Second] = 24;
  expect(displayTimeValue(timeValue)).toBe('01h 02m 24s');
});

test('displayWithTwoDigits', () => {
  expect(displayWithTwoDigits(0)).toBe('00');
  expect(displayWithTwoDigits(5)).toBe('05');
  expect(displayWithTwoDigits(10)).toBe('10');
  expect(displayWithTwoDigits(100)).toBe('100');
});

test('formatMoney', () => {
  expect(formatMoney(0)).toBe('0');
  expect(formatMoney(10)).toBe('10');
  expect(formatMoney(100)).toBe('100');
  expect(formatMoney(1_000)).toBe('1,000');
  expect(formatMoney(10_000)).toBe('10,000');
  expect(formatMoney(100_000)).toBe('100,000');
  expect(formatMoney(1_000_000)).toBe('1,000,000');
});

test('getPlayerColor', () => {
  expect(getPlayerColor(0)).toBe(Color.Green);
  expect(getPlayerColor(1)).toBe(Color.Yellow);
  expect(getPlayerColor(2)).toBe(Color.Blue);
  expect(getPlayerColor(3)).toBe(Color.Pink);
  expect(getPlayerColor(4)).toBe(Color.Green);
  expect(getPlayerColor(999)).toBe(Color.Green);
});

test('pluralize', () => {
  expect(pluralize('word', -1)).toBe('word');
  expect(pluralize('word', 0)).toBe('words');
  expect(pluralize('word', 1)).toBe('word');
  expect(pluralize('word', 2)).toBe('words');
  expect(pluralize('word', 100)).toBe('words');
});
