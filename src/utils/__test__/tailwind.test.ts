import { Color } from '../../types';
import { getTimerClasses } from '../tailwind';

test('getTimerClasses', () => {
  expect(getTimerClasses(Color.Orange, 'classname-example')).toBe(
    `classname-example bg-neutral-800 border-solid border-2 rounded-lg border-orange-500 m-2.5 p-2.5 relative w-72 sm:w-80`
  );
});
