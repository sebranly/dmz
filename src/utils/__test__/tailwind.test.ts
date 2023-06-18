import { Color } from '../../types';
import { getSafeColor, getTimerClasses } from '../tailwind';

test('getSafeColor', () => {
  expect(getSafeColor('blue')).toBe(Color.Blue);
  expect(getSafeColor('gray')).toBe(Color.Gray);
  expect(getSafeColor('green')).toBe(Color.Green);
  expect(getSafeColor('orange')).toBe(Color.Orange);
  expect(getSafeColor('pink')).toBe(Color.Pink);
  expect(getSafeColor('red')).toBe(Color.Red);
  expect(getSafeColor('yellow')).toBe(Color.Yellow);

  expect(getSafeColor('abc')).toBe(Color.Red);
  expect(getSafeColor('')).toBe(Color.Red);
  expect(getSafeColor(undefined)).toBe(Color.Red);
});

test('getTimerClasses', () => {
  expect(getTimerClasses('orange')).toBe(
    `bg-neutral-800 border-solid border-2 rounded-lg border-orange-500 m-2.5 p-2.5 relative w-72 sm:w-80`
  );

  expect(getTimerClasses('orange', 'classname-example')).toBe(
    `classname-example bg-neutral-800 border-solid border-2 rounded-lg border-orange-500 m-2.5 p-2.5 relative w-72 sm:w-80`
  );

  expect(getTimerClasses('abc', 'classname-example')).toBe(
    `classname-example bg-neutral-800 border-solid border-2 rounded-lg border-red-500 m-2.5 p-2.5 relative w-72 sm:w-80`
  );
});
