import { Color, TimeStatus, TimeUnit } from '../../types';
import {
  displaySeason,
  displayTimeValue,
  displayWithTwoDigits,
  formatMoney,
  getPlayerColor,
  getPlayersSize,
  getTimeUnitAbbreviation,
  pluralize
} from '../display';

test('displayTimeValue', () => {
  let timeValue = { [TimeUnit.Day]: 0, [TimeUnit.Hour]: 0, [TimeUnit.Minute]: 0, [TimeUnit.Second]: 0 };
  expect(displayTimeValue(timeValue)).toBe('00h 00m 00s');
  expect(displayTimeValue(timeValue, true)).toBe('0s');

  timeValue[TimeUnit.Hour] = 1;
  timeValue[TimeUnit.Minute] = 2;
  timeValue[TimeUnit.Second] = 24;
  expect(displayTimeValue(timeValue)).toBe('01h 02m 24s');
  expect(displayTimeValue(timeValue, true)).toBe('1h2m24s');

  timeValue[TimeUnit.Day] = 3;
  expect(displayTimeValue(timeValue)).toBe('03d 01h 02m 24s');
  expect(displayTimeValue(timeValue, true)).toBe('3d1h2m24s');

  timeValue[TimeUnit.Second] = 0;
  expect(displayTimeValue(timeValue)).toBe('03d 01h 02m 00s');
  expect(displayTimeValue(timeValue, true)).toBe('3d1h2m');
});

test('displaySeason', () => {
  expect(displaySeason(0)).toBe('00');
  expect(displaySeason(2.5)).toBe('02 Reloaded');
  expect(displaySeason(5)).toBe('05');
  expect(displaySeason(10)).toBe('10');
  expect(displaySeason(100)).toBe('100');
});

test('displayWithTwoDigits', () => {
  expect(displayWithTwoDigits(0)).toBe('00');
  expect(displayWithTwoDigits(5)).toBe('05');
  expect(displayWithTwoDigits(10)).toBe('10');
  expect(displayWithTwoDigits(100)).toBe('100');
});

test('formatMoney', () => {
  expect(formatMoney(0)).toBe('$0');
  expect(formatMoney(10)).toBe('$10');
  expect(formatMoney(100)).toBe('$100');
  expect(formatMoney(1_000)).toBe('$1,000');
  expect(formatMoney(2_500)).toBe('$2,500');
  expect(formatMoney(10_000)).toBe('$10,000');
  expect(formatMoney(100_000)).toBe('$100,000');
  expect(formatMoney(1_000_000)).toBe('$1,000,000');

  expect(formatMoney(0, true)).toBe('$0');
  expect(formatMoney(10, true)).toBe('$10');
  expect(formatMoney(100, true)).toBe('$100');
  expect(formatMoney(1_000, true)).toBe('$1k');
  expect(formatMoney(2_500, true)).toBe('$2.5k');
  expect(formatMoney(10_000, true)).toBe('$10k');
  expect(formatMoney(100_000, true)).toBe('$100k');
  expect(formatMoney(1_000_000, true)).toBe('$1,000k');
});

test('getPlayerColor', () => {
  expect(getPlayerColor(0)).toBe(Color.Green);
  expect(getPlayerColor(1)).toBe(Color.Yellow);
  expect(getPlayerColor(2)).toBe(Color.Blue);
  expect(getPlayerColor(3)).toBe(Color.Pink);
  expect(getPlayerColor(4)).toBe(Color.Orange);
  expect(getPlayerColor(5)).toBe(Color.Gray);
  expect(getPlayerColor(6)).toBe(Color.Green);
  expect(getPlayerColor(999)).toBe(Color.Green);
});

test('getPlayersSize', () => {
  expect(getPlayersSize(0)).toBe('');
  expect(getPlayersSize(1)).toBe('solo players');
  expect(getPlayersSize(2)).toBe('duos');
  expect(getPlayersSize(3)).toBe('trios');
  expect(getPlayersSize(4)).toBe('quatuors');
  expect(getPlayersSize(5)).toBe('');
});

test('getTimeUnitAbbreviation', () => {
  expect(getTimeUnitAbbreviation(TimeUnit.Day)).toBe('days');
  expect(getTimeUnitAbbreviation(TimeUnit.Hour)).toBe('hrs');
  expect(getTimeUnitAbbreviation(TimeUnit.Minute)).toBe('min');
  expect(getTimeUnitAbbreviation(TimeUnit.Second)).toBe('sec');
});

test('pluralize', () => {
  expect(pluralize('word', -1)).toBe('word');
  expect(pluralize('word', 0)).toBe('words');
  expect(pluralize('word', 1)).toBe('word');
  expect(pluralize('word', 2)).toBe('words');
  expect(pluralize('word', 100)).toBe('words');
});
