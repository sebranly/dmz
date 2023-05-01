import {
  CURRENT_SEASON,
  DEAD_DROP_HOURLY_RATE,
  DOG_TAG_VALUES,
  JERRYCAN_VALUE,
  MAX_HOURS_FOR_TIMER,
  MAX_PLAYERS,
  MAX_PLAYERS_WITHOUT_ASSIMILATION,
  REGULAR_HOURLY_RATE,
  SENSITIVE_DOCUMENTS_VALUE
} from '../constants/game';
import { displaySeason, formatMoney, getPlayersSize } from '../utils/display';
import { QuestionAnswer } from '../types';
import { COOKIE_TIMERS } from '../constants/general';

const questionsAnswers: QuestionAnswer[] = [
  {
    question: 'What is DMZ?',
    answer: [
      'DMZ is a mode available in the Warzone 2.0 videogame.',
      `"DMZ is an open-world, narrative-focused extraction mode
  where Operator squads have free rein to complete faction-based missions, take on additional side objectives,
  engage with enemy Operators or AI combatants, and search for valuable items, all while fighting to survive
  toward exfiltration.".`
    ]
  },
  {
    shown: true,
    question: 'What is this website?',
    answer: [
      'DMZ: Currency to Cooldown Converter is an unofficial website which focuses primarily on getting your lost, insured weapons back as efficiently as possible. In the game, dying on the battlefield with an insured weapon means that the weapon gets locked behind a cooldown timer. By default, the player has to wait for a certain amount of hours before selecting this same weapon.',
      'The player can make this process faster by using money to reduce said cooldown timer. This website provides money-to-time and time-to-money conversions for these lost, insured weapons.'
    ]
  },
  {
    yt: true,
    question: 'What are the hourly rates?',
    answer: [
      `Dollars-per-hour rates have been determined by playing DMZ for several games during all seasons. It is a proportional function (linear function that includes the origin).`,
      `The current season (Season ${displaySeason(
        CURRENT_SEASON
      )}) is known to have the following rates: exfiltrating with the chopper (or elevator in Building 21) with ${formatMoney(
        REGULAR_HOURLY_RATE
      )} will reduce the cooldown timer by an hour. Alternatively, depositing ${formatMoney(
        DEAD_DROP_HOURLY_RATE
      )} into any dead drop will reduce the cooldown timer by an hour (even if you die in-game).`,
      `Both methods can also be combined (as a sum).`,
      'Note: exfiltrating thanks to a Rescue Hostage Contract, a Heavy Chopper or a Private Exfil will apply the same rates.',
      'The following video (and its YouTube description) showcases how the formulae have been determined.'
    ]
  },
  {
    question: 'What are dead drops?',
    answer: [
      `These are dumpsters that are present in all three maps of DMZ and that can be interacted with. Players can drop money, weapons and/or items into them in order to reduce the cooldown timer in exchange.`,
      `Dead drops offer two advantages compared to exfiltrating with said money/items with the chopper (or elevator in Building 21): the cooldown timer decreases ${
        Math.round((REGULAR_HOURLY_RATE / DEAD_DROP_HOURLY_RATE) * 100) / 100
      }x faster thanks to dead drops, and dead drops will award you the time reduction even if you die afterwards.`
    ]
  },
  {
    map: true,
    question: 'Where are dead drops?',
    answer: [
      'There are several dead drops per map. For a specific season, they are always at the same spots (except for Building 21 which has locations changing per game). However with each new season, their locations may change. For this reason, I invite you to take a look at two amazing websites that focus exclusively on locations.'
    ]
  },
  {
    question: 'What about items?',
    answer: [
      'Items sometimes have a displayed value underneath (in your backpack) which corresponds to the equivalent amount of money they give you when exfiltrating or deposited into dead drops.',
      `Some other items don't have a displayed value but one exists anyway. I don't have a definite list but for instance depositing a jerrycan into dead drops will award you ${formatMoney(
        JERRYCAN_VALUE
      )} (which is then converted for time reduction).`
    ]
  },
  {
    question: "I don't understand the use-case(s)",
    answer: [
      `Once a timer is set up on the website, it decreases on the website every second like the in-game cooldown timer. However, the latter is only visible on the game menu. So, after some time spent fighting into DMZ, this website allows you to accurately know how much time is left and, more importantly, how to split money within your squad in order not to waste any dollar.`,
      `Everyone may be able to get their insured weapons back. You can then use the remaining money you saved for better things such as buying and upgrading contraband weapons at the Workbench, buying strikes or UAVs. Or even buying a Building 21 Access Card.`,
      `Another example is that you can exfiltrate from the battlefield as soon as you have the required money to get your lost weapon back (rather than risking it all), including by buying this sweet Private Exfil if you're that rich.`
    ]
  },
  {
    yt: true,
    question: 'I think your formulae are incorrect',
    answer: [
      `The formulae have been verified several times for all seasons including the latest, Season ${displaySeason(
        CURRENT_SEASON
      )}.`,
      `The game is known to have multiple bugs affecting how the backpack total is being displayed (e.g. some items don't count in the total up until the end result screen). A bug happening on the result screen, is dog tags counting for time reduction, but not being reflected in the total money being exfiltrated with. Each bronze, silver, gold and damascus dog tag awards you ${formatMoney(
        DOG_TAG_VALUES['bronze'],
        true
      )}, ${formatMoney(DOG_TAG_VALUES['silver'], true)}, ${formatMoney(
        DOG_TAG_VALUES['gold'],
        true
      )} and ${formatMoney(DOG_TAG_VALUES['damascus'], true)} respectively.`,
      `On the other hand, there is an opposite bug regarding sensitive documents, most likely because they can now be retained in the stash. They show up in the total of the backpack but actually do not count towards time reduction. You need to subtract ${formatMoney(
        SENSITIVE_DOCUMENTS_VALUE
      )} per sensitive documents.`,
      'The following video showcases how the formulae have been determined. Known bugs have been detailed in the video description, when possible.'
    ]
  },
  {
    isNew: true,
    question: `What changed between Season 01 and Season ${displaySeason(CURRENT_SEASON)}?`,
    answer: [
      'In Season 01, the cooldown periods for Insured Slots 1, 2 and 3 were respectively 2, 4 and 6 hours.',
      'In Season 02, the cooldown periods for Insured Slots 1, 2 and 3 have all been reduced by half.',
      'They are now respectively 1, 2 and 3 hours.',
      'The locations of dead drops in Al Mazrah and Building 21 have changed in Season 02.',
      'A new map called Ashika Island is available since Season 02.',
      `The Access Card for Building 21 is now single-use since Season 02 (since Season 02 Reloaded, it doesn't have to be equipped in the backpack anymore though).`,
      `In Season 03, lots of changes happened including the introduction of Bartering, Contraband Workbenches, New Backpacks, New Plate Carriers as well as Active Duty Operator Slots. However for the purpose of this website, such updates don't have an influence, as Contraband Weapons are shared between Active Duty Operators.`,
      'Note: the dollars-per-hour rates have never changed since Season 01 (for both exfiltration and dead drops).'
    ]
  },
  {
    question: 'Is there a time difference between the maps?',
    answer: [
      'No. Al Mazrah, Ashika Island and Building 21 all share the same dollars-per-hour rates (for both exfiltration and dead drops).'
    ]
  },
  {
    question: `Why is the maximum number of players high on this website?`,
    answer: [
      `Although the maximum that DMZ mode accepts is ${getPlayersSize(
        MAX_PLAYERS_WITHOUT_ASSIMILATION
      )} when launching a game, the squad size can grow up to ${MAX_PLAYERS} players thanks to assimilation in-game (opponents can join your squad).`,
      'Thanks to in-game textual chat and voice chat, you can always help your new friends by setting up a timer for them if they roughly remember how much time they had left for their insured slots before starting the game.',
      'Please note that Building 21 does not offer this assimilation concept.'
    ]
  },
  {
    question: 'Can I bake cakes with this website?',
    answer: [
      `Sure, it's a countdown timer at its core after all. Pro-tip: just make sure your cake does not take longer than ${MAX_HOURS_FOR_TIMER} hours.`
    ]
  },
  {
    question: 'What about cookies?',
    answer: [
      `On this website we only use one browser cookie called '${COOKIE_TIMERS}'. We do this in order to save the timers that you created, so that upon refreshing the page you don't lose them.`
    ]
  }
];

export { questionsAnswers };
