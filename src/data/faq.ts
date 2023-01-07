import {
  CURRENT_SEASON,
  DEAD_DROP_HOURLY_RATE,
  JERRYCAN_VALUE,
  MAX_HOURS_FOR_TIMER,
  REGULAR_HOURLY_RATE
} from '../constants/game';
import { formatMoney } from '../utils/display';
import { QuestionAnswer } from '../types';

const questionsAnswers: QuestionAnswer[] = [
  {
    question: 'What is DMZ?',
    answer: ['DMZ is a mode available in the Warzone 2.0 videogame.', `"DMZ is an open-world, narrative-focused extraction mode
  where Operator squads have free rein to complete faction-based missions, take on additional side objectives,
  engage with enemy Operators or AI combatants, and search for valuable items, all while fighting to survive
  toward exfiltration.".`],
    shown: false
  },
  {
    shown: true,
    question: 'What is this website?',
    answer:
      ['DMZ: Currency to Cooldown Converter is an unofficial website which focuses on getting your lost, insured weapons back as efficiently as possible. In the game, dying on the battlefield with an insured weapon means that the weapon gets locked behind a cooldown timer. By default, the player has to wait for a certain amount of hours before selecting this same weapon.', 'The player can make this process faster by using money to reduce said cooldown timer. This website provides money-to-time and time-to-money conversions for these lost, insured weapons.']
  },
  {
    shown: false,
    question: 'What are the hourly rates?',
    answer: [`Dollars-per-hour rates have been determined by playing DMZ several times. It is a proportional function (linear function that includes the origin).`, `Season ${CURRENT_SEASON} is known to have the following rates: exfiltrating with the chopper with $${formatMoney(
      REGULAR_HOURLY_RATE
    )} will reduce the cooldown timer by an hour. Alternatively, depositing $${formatMoney(
      DEAD_DROP_HOURLY_RATE
    )} into any dead drop will reduce the cooldown timer by an hour (even if you die in-game).`, `Both methods can also be combined (as a sum).`]
  },
  {
    shown: false,
    question: 'What are dead drops?',
    answer: [`These are dumpsters that are always at the same locations on the DMZ battlefield and that can be interacted with. Players can drop money/items into them in order to reduce the cooldown timer in exchange.`, `Dead drops offer two advantages compared to exfiltrating with said money/items with the chopper: the cooldown timer decreases ${
      Math.round((REGULAR_HOURLY_RATE / DEAD_DROP_HOURLY_RATE) * 100) / 100
    }x faster thanks to dead drops, and dead drops will award you the time reduction even if you die afterwards.`]
  },
  {
    shown: false,
    question: 'What about items?',
    answer: ['Items sometimes have a displayed value underneath (in your backpack) which corresponds to the equivalent amount of money they give you when exfiltrating or deposited into dead drops.', `Some other items don't have a displayed value but one exists anyway. I don't have a definite list yet but for instance depositing a jerrycan into dead drops will award you $${formatMoney(
      JERRYCAN_VALUE
    )}.`]
  },
  {
    shown: false,
    question: "I don't understand the use-case(s)",
    answer:
      [`Once a timer is set up on the website, it decreases on the website every second like the in-game cooldown timer. However, the latter is only visible on the game menu. So, after some time spent fighting into DMZ, this website allows you to accurately know how much time is left and, more importantly, how to split money within your squad in order not to waste any dollar.`, `Everyone may be able to get their insured weapons back. You can then use the remaining money you saved for better things such as buying contraband weapons, strikes or UAVs.`, `Another example is that you can exfiltrate from the battlefield as soon as you have the required money to get your lost weapon back (rather than risking it all).`]
  },
  {
    shown: false,
    question: 'Can I bake cakes with this website?',
    answer: [`Sure, it's a countdown timer at its core after all. Pro-tip: just make sure your cake does not take longer than ${MAX_HOURS_FOR_TIMER} hours.`]
  }
];

export { questionsAnswers };
