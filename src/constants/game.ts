import { TimeUnit, TimeValue } from '../types';

// Any constant that comes from the DMZ official game itself
export const CURRENT_SEASON = 4.5;
export const VIDEO_SEASON = 2;
export const DEAD_DROP_HOURLY_RATE = 30_000;
export const HOURS_PER_SLOT = 1;
export const UPGRADES_COUNT_PER_SLOT = 2;
export const UPGRADE_PERCENT = 25;
export const WEAPON_VALUE = 4_000;
export const MAX_PLAYERS = 6;
export const MAX_PLAYERS_WITHOUT_ASSIMILATION = 3;
export const MAX_TIMERS_PER_PLAYER = 3;
export const MAX_TIMERS = MAX_PLAYERS * MAX_TIMERS_PER_PLAYER;
export const MAX_HOURS_FOR_TIMER = MAX_TIMERS_PER_PLAYER * HOURS_PER_SLOT;
export const REGULAR_HOURLY_RATE = 40_000;
export const SENSITIVE_DOCUMENTS_VALUE = 500;
export const DOG_TAG_VALUES = {
  bronze: 1_000,
  silver: 3_000,
  gold: 25_000,
  damascus: 50_000
};

export const BUNDLE_TIMER_MIN = 15;
export const BUNDLE_TIMER_VALUE: TimeValue = {
  [TimeUnit.Day]: 0,
  [TimeUnit.Hour]: 0,
  [TimeUnit.Minute]: BUNDLE_TIMER_MIN,
  [TimeUnit.Second]: 0
};
