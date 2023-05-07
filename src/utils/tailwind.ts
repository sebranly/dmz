import classnames from 'classnames';

/**
 * @name getTimerClasses
 * @description Returns the generic classes used for timers
 */
// TODO: have protection for color?? cause coming from API
const getTimerClasses = (color: string, className?: string) => {
  const classnamesTimer = classnames(
    className,
    'bg-neutral-800',
    'border-solid',
    'border-2',
    'rounded-lg',
    `border-${color}-500`,
    'm-2.5',
    'p-2.5',
    'relative',
    'w-72 sm:w-80'
  );

  return classnamesTimer;
};

export { getTimerClasses };
