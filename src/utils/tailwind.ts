import classnames from 'classnames';
import { Color } from '../types';

/**
 * @name getSafeColor
 * @description Returns a color supported by our Tailwind setup
 */
const getSafeColor = (color?: string) => {
  const safeColors = Object.values(Color);
  const isSafe = safeColors.includes(color as Color);

  return isSafe ? (color as Color) : Color.Red;
};

/**
 * @name getTimerClasses
 * @description Returns the generic classes used for timers
 */
const getTimerClasses = (color: string, className?: string) => {
  const colorSafe = getSafeColor(color);
  const classnamesTimer = classnames(
    className,
    'bg-neutral-800',
    'border-solid',
    'border-2',
    'rounded-lg',
    `border-${colorSafe}-500`,
    'm-2.5',
    'p-2.5',
    'relative',
    'w-72 sm:w-80'
  );

  return classnamesTimer;
};

export { getSafeColor, getTimerClasses };
