// Any constant that comes from the DMZ official game itself
export const BRONZE_DOG_TAG_VALUE = 2_500;
export const CURRENT_SEASON = 2;
// Obtained with `Math.floor((new Date("2023-03-06T05:00:00.000Z")).getTime() / 1000)`
// The following three dates are examples of a reset time.
// Paired with the frequency, the code will determine next future dates
export const DAILY_CHALLENGES_RESET = 1678078800;
export const WEEKLY_BUILDING_21_OPENING_TIME = 1678471200;
export const WEEKLY_BUILDING_21_CLOSING_TIME = 1678125600;
export const DEAD_DROP_HOURLY_RATE = 30_000;
export const HOURS_PER_SLOT = 1;
export const JERRYCAN_VALUE = 200;
export const MAX_PLAYERS = 6;
export const MAX_PLAYERS_WITHOUT_ASSIMILATION = 3;
export const MAX_TIMERS_PER_PLAYER = 3;
export const MAX_TIMERS = MAX_PLAYERS * MAX_TIMERS_PER_PLAYER;
export const MAX_HOURS_FOR_TIMER = MAX_TIMERS_PER_PLAYER * HOURS_PER_SLOT;
export const REGULAR_HOURLY_RATE = 40_000;
export const SENSITIVE_DOCUMENTS_VALUE = 1_000;
