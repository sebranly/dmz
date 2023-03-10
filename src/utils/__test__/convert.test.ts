import { TimeUnit } from '../../types';
import {
  convertMoneyToSeconds,
  convertPlayerTimerIndexToHourTimer,
  convertSecondsToTimeValue,
  convertSecondsToMoney,
  convertTimerIndexToPlayerIndex,
  convertTimerIndexToPlayerTimerIndex,
  convertTimeValueToSeconds,
  getSeasonId
} from '../convert';

test('convertMoneyToSeconds', () => {
  expect(convertMoneyToSeconds(-1000, 40_000)).toBe(0);
  expect(convertMoneyToSeconds(-1, 40_000)).toBe(0);
  expect(convertMoneyToSeconds(0, 40_000)).toBe(0);
  expect(convertMoneyToSeconds(0, 30_000)).toBe(0);
  expect(convertMoneyToSeconds(20_000, 40_000)).toBe(1_800);
  expect(convertMoneyToSeconds(40_000, 40_000)).toBe(3_600);
  expect(convertMoneyToSeconds(15_000, 30_000)).toBe(1_800);
  expect(convertMoneyToSeconds(30_000, 30_000)).toBe(3_600);
});

test('convertPlayerTimerIndexToHourTimer', () => {
  expect(convertPlayerTimerIndexToHourTimer(-1, 2)).toBe(0);
  expect(convertPlayerTimerIndexToHourTimer(0, 2)).toBe(2);
  expect(convertPlayerTimerIndexToHourTimer(1, 2)).toBe(4);
  expect(convertPlayerTimerIndexToHourTimer(2, 2)).toBe(6);
});

test('convertSecondsToMoney', () => {
  expect(convertSecondsToMoney(0, 30_000)).toBe(0);
  expect(convertSecondsToMoney(30 * 60, 30_000)).toBe(15_000);
  expect(convertSecondsToMoney(60 * 60, 30_000)).toBe(30_000);
  expect(convertSecondsToMoney(120 * 60, 30_000)).toBe(60_000);

  expect(convertSecondsToMoney(0, 40_000)).toBe(0);
  expect(convertSecondsToMoney(20 * 60, 40_000)).toBe(13_400);
  expect(convertSecondsToMoney(30 * 60, 40_000)).toBe(20_000);
  expect(convertSecondsToMoney(60 * 60, 40_000)).toBe(40_000);
  expect(convertSecondsToMoney(120 * 60, 40_000)).toBe(80_000);
});

test('convertSecondsToTimeValue', () => {
  expect(convertSecondsToTimeValue(-1)).toStrictEqual({
    [TimeUnit.Day]: 0,
    [TimeUnit.Hour]: 0,
    [TimeUnit.Minute]: 0,
    [TimeUnit.Second]: 0
  });

  expect(convertSecondsToTimeValue(0)).toStrictEqual({
    [TimeUnit.Day]: 0,
    [TimeUnit.Hour]: 0,
    [TimeUnit.Minute]: 0,
    [TimeUnit.Second]: 0
  });

  expect(convertSecondsToTimeValue(1)).toStrictEqual({
    [TimeUnit.Day]: 0,
    [TimeUnit.Hour]: 0,
    [TimeUnit.Minute]: 0,
    [TimeUnit.Second]: 1
  });

  expect(convertSecondsToTimeValue(60)).toStrictEqual({
    [TimeUnit.Day]: 0,
    [TimeUnit.Hour]: 0,
    [TimeUnit.Minute]: 1,
    [TimeUnit.Second]: 0
  });

  expect(convertSecondsToTimeValue(61)).toStrictEqual({
    [TimeUnit.Day]: 0,
    [TimeUnit.Hour]: 0,
    [TimeUnit.Minute]: 1,
    [TimeUnit.Second]: 1
  });

  expect(convertSecondsToTimeValue(3_599)).toStrictEqual({
    [TimeUnit.Day]: 0,
    [TimeUnit.Hour]: 0,
    [TimeUnit.Minute]: 59,
    [TimeUnit.Second]: 59
  });

  expect(convertSecondsToTimeValue(3_600)).toStrictEqual({
    [TimeUnit.Day]: 0,
    [TimeUnit.Hour]: 1,
    [TimeUnit.Minute]: 0,
    [TimeUnit.Second]: 0
  });

  expect(convertSecondsToTimeValue(23 * 3_600)).toStrictEqual({
    [TimeUnit.Day]: 0,
    [TimeUnit.Hour]: 23,
    [TimeUnit.Minute]: 0,
    [TimeUnit.Second]: 0
  });

  expect(convertSecondsToTimeValue(24 * 3_600)).toStrictEqual({
    [TimeUnit.Day]: 1,
    [TimeUnit.Hour]: 0,
    [TimeUnit.Minute]: 0,
    [TimeUnit.Second]: 0
  });

  expect(convertSecondsToTimeValue(49 * 3_600 + 74)).toStrictEqual({
    [TimeUnit.Day]: 2,
    [TimeUnit.Hour]: 1,
    [TimeUnit.Minute]: 1,
    [TimeUnit.Second]: 14
  });
});

test('convertTimerIndexToPlayerIndex', () => {
  expect(convertTimerIndexToPlayerIndex(0, 3)).toBe(0);
  expect(convertTimerIndexToPlayerIndex(1, 3)).toBe(0);
  expect(convertTimerIndexToPlayerIndex(2, 3)).toBe(0);
  expect(convertTimerIndexToPlayerIndex(3, 3)).toBe(1);
  expect(convertTimerIndexToPlayerIndex(4, 3)).toBe(1);
  expect(convertTimerIndexToPlayerIndex(5, 3)).toBe(1);
  expect(convertTimerIndexToPlayerIndex(6, 3)).toBe(2);
  expect(convertTimerIndexToPlayerIndex(7, 3)).toBe(2);
  expect(convertTimerIndexToPlayerIndex(8, 3)).toBe(2);
});

test('convertTimerIndexToPlayerTimerIndex', () => {
  expect(convertTimerIndexToPlayerTimerIndex(0, 3)).toBe(0);
  expect(convertTimerIndexToPlayerTimerIndex(1, 3)).toBe(1);
  expect(convertTimerIndexToPlayerTimerIndex(2, 3)).toBe(2);
  expect(convertTimerIndexToPlayerTimerIndex(3, 3)).toBe(0);
  expect(convertTimerIndexToPlayerTimerIndex(4, 3)).toBe(1);
  expect(convertTimerIndexToPlayerTimerIndex(5, 3)).toBe(2);
  expect(convertTimerIndexToPlayerTimerIndex(6, 3)).toBe(0);
  expect(convertTimerIndexToPlayerTimerIndex(7, 3)).toBe(1);
  expect(convertTimerIndexToPlayerTimerIndex(8, 3)).toBe(2);
});

test('convertTimeValueToSeconds', () => {
  expect(
    convertTimeValueToSeconds({
      [TimeUnit.Day]: 0,
      [TimeUnit.Hour]: 0,
      [TimeUnit.Minute]: 0,
      [TimeUnit.Second]: 0
    })
  ).toBe(0);

  expect(
    convertTimeValueToSeconds({
      [TimeUnit.Day]: 0,
      [TimeUnit.Hour]: 0,
      [TimeUnit.Minute]: 0,
      [TimeUnit.Second]: 1
    })
  ).toBe(1);

  expect(
    convertTimeValueToSeconds({
      [TimeUnit.Day]: 0,
      [TimeUnit.Hour]: 0,
      [TimeUnit.Minute]: 1,
      [TimeUnit.Second]: 0
    })
  ).toBe(60);

  expect(
    convertTimeValueToSeconds({
      [TimeUnit.Day]: 0,
      [TimeUnit.Hour]: 0,
      [TimeUnit.Minute]: 1,
      [TimeUnit.Second]: 1
    })
  ).toBe(61);

  expect(
    convertTimeValueToSeconds({
      [TimeUnit.Day]: 0,
      [TimeUnit.Hour]: 0,
      [TimeUnit.Minute]: 59,
      [TimeUnit.Second]: 59
    })
  ).toBe(3_599);

  expect(
    convertTimeValueToSeconds({
      [TimeUnit.Day]: 0,
      [TimeUnit.Hour]: 1,
      [TimeUnit.Minute]: 0,
      [TimeUnit.Second]: 0
    })
  ).toBe(3_600);

  expect(
    convertTimeValueToSeconds({
      [TimeUnit.Day]: 0,
      [TimeUnit.Hour]: 23,
      [TimeUnit.Minute]: 0,
      [TimeUnit.Second]: 0
    })
  ).toBe(82_800);

  expect(
    convertTimeValueToSeconds({
      [TimeUnit.Day]: 1,
      [TimeUnit.Hour]: 0,
      [TimeUnit.Minute]: 0,
      [TimeUnit.Second]: 0
    })
  ).toBe(86_400);

  expect(
    convertTimeValueToSeconds({
      [TimeUnit.Day]: 2,
      [TimeUnit.Hour]: 1,
      [TimeUnit.Minute]: 1,
      [TimeUnit.Second]: 14
    })
  ).toBe(176_474);
});

test('getSeasonId', () => {
  expect(getSeasonId('')).toBe(-1);
  expect(getSeasonId('Season')).toBe(-1);
  expect(getSeasonId('Season 0')).toBe(0);
  expect(getSeasonId('Season 00')).toBe(0);
  expect(getSeasonId('Season reloaded')).toBe(0.5);
  expect(getSeasonId('Season 1')).toBe(1);
  expect(getSeasonId('Season 01')).toBe(1);
  expect(getSeasonId('Season 02')).toBe(2);
  expect(getSeasonId('Season 2')).toBe(2);
  expect(getSeasonId('Season 2.5')).toBe(2.5);
  expect(getSeasonId('Season 02.5')).toBe(2.5);
  expect(getSeasonId('Season 2 Reloaded')).toBe(2.5);
  expect(getSeasonId('Season 000000000000000000003')).toBe(3);
  expect(getSeasonId('Season 20')).toBe(20);
  expect(getSeasonId('Season 020')).toBe(20);
  expect(getSeasonId('Season 0000000000000000000030005')).toBe(30005);
});
