import { Color } from '../../types';
import { convertToTwoDigits, formatMoney, getPlayerColor, pluralize } from '../display';

test('convertToTwoDigits', () => {
  expect(convertToTwoDigits(0)).toBe('00');
  expect(convertToTwoDigits(5)).toBe('05');
  expect(convertToTwoDigits(10)).toBe('10');
  expect(convertToTwoDigits(100)).toBe('100');
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
