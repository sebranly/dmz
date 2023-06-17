import {
  BUNDLE_TIMER_MIN,
  CURRENT_SEASON,
  DEAD_DROP_HOURLY_RATE,
  DOG_TAG_VALUES,
  MAX_HOURS_FOR_TIMER,
  MAX_PLAYERS,
  MAX_PLAYERS_WITHOUT_ASSIMILATION,
  REGULAR_HOURLY_RATE,
  SENSITIVE_DOCUMENTS_VALUE,
  WEAPON_VALUE
} from '../constants/game';
import { displaySeason, formatMoney, getPlayersSize } from '../utils/display';
import { QuestionAnswer } from '../types';
import { COOKIE_TIMERS } from '../constants/general';

const questionsAnswers: QuestionAnswer[] = [
  {
    question: 'What is DMZ?',
    answer: [
      'DMZ is a mode available in the Warzone 2.0 videogame.',
      `<i>"DMZ is an open-world, narrative-focused extraction mode
  where Operator squads have free rein to complete faction-based missions, take on additional side objectives,
  engage with enemy Operators or AI combatants, and search for valuable items, all while fighting to survive
  toward exfiltration."</i>.`
    ]
  },
  {
    shown: true,
    question: 'What is this website?',
    answer: [
      'DMZ: <span class="text-lime-400">Currency to Cooldown Converter</span> is an unofficial website which focuses primarily on getting your lost, insured weapons back as efficiently as possible. In the game, dying on the battlefield with an insured weapon means that the weapon gets locked behind a cooldown timer. By default, the player has to wait for a certain amount of hours before selecting this same weapon.',
      'The player can make this process faster by using money to reduce said cooldown timer. This website provides <b>money-to-time</b> and <b>time-to-money</b> conversions for these lost, insured weapons.'
    ]
  },
  {
    yt: true,
    question: 'What are the hourly rates?',
    answer: [
      `Dollars-per-hour rates have been determined by playing DMZ for several games during all seasons. It is a proportional function (linear function that includes the origin).`,
      `The current season (<span class='text-amber-500'>Season ${displaySeason(
        CURRENT_SEASON
      )}</span>) is known to have the following rates: exfiltrating with any chopper in Al Mazrah, Ashika Island or Vondel (or any elevator in Building 21 or Koschei Complex) with <span class='text-lime-500'>${formatMoney(
        REGULAR_HOURLY_RATE
      )}</span> will reduce the cooldown timer by <b>an hour</b>. Alternatively, depositing <span class='text-lime-500'>${formatMoney(
        DEAD_DROP_HOURLY_RATE
      )}</span> into any dead drop will reduce the cooldown timer by <b>an hour</b> (even if you die in-game).`,
      `Both methods can also be combined (as a sum).`,
      'Note: exfiltrating thanks to a Rescue Hostage Contract, a Heavy Chopper or a Private Exfil will apply the same rates.',
      'The following video (and its YouTube description) showcases how the formulae have been determined.'
    ]
  },
  {
    question: 'What are dead drops?',
    answer: [
      `These are white dumpsters that are present in all maps of DMZ and that can be interacted with. Players can drop money, weapons and/or items into them in order to reduce the cooldown timer in exchange.`,
      `Dead drops offer two advantages compared to exfiltrating with said money/items with any chopper in Al Mazrah, Ashika Island or Vondel (or any elevator in Building 21 or Koschei Complex): <b>the cooldown timer decreases <span class='text-lime-500'>${
        Math.round((REGULAR_HOURLY_RATE / DEAD_DROP_HOURLY_RATE) * 100) / 100
      }x faster</span> thanks to dead drops</b>, and dead drops will award you the time reduction even if you die afterwards.`
    ]
  },
  {
    map: true,
    question: 'Where are dead drops?',
    answer: [
      'There are several dead drops on the maps. As their locations may change over time, we invite you to take a look at two amazing websites that focus exclusively on locations.'
    ]
  },
  {
    question: 'What about items?',
    answer: [
      'Items sometimes have a displayed value underneath (in your backpack) which corresponds to the equivalent amount of money they give you when exfiltrating or deposited into dead drops.',
      `Some other items don't have a displayed value but one exists anyway. We don't have a definite list but for instance depositing a weapon into dead drops will award you <span class='text-lime-500'>${formatMoney(
        WEAPON_VALUE,
        true
      )}</span> (which is then converted for time reduction). The number of attachments does not matter.`
    ]
  },
  {
    question: "I don't understand the use-case(s)",
    answer: [
      `Once a timer is set up on the website, it decreases on the website every second like the in-game cooldown timer. However, the latter is only visible on the game menu. So, after some time spent fighting into DMZ, <b>this website allows you to accurately know how much time is left and, more importantly, how to split money within your squad in order not to waste any dollar</b>.`,
      `Everyone may be able to get their insured weapons back. You can then use the remaining money you saved for buying better things.`,
      `Another example is that you can exfiltrate from the battlefield as soon as you have the required money to get your lost weapon back (rather than risking it all) and your money will be added to your wallet.`
    ]
  },
  {
    yt: true,
    question: 'I think your formulae are incorrect',
    answer: [
      `The formulae have been verified several times for all seasons including the latest, <span class='text-amber-500'>Season ${displaySeason(
        CURRENT_SEASON
      )}</span>.`,
      `The game is known to have multiple bugs affecting how the backpack total is being displayed (e.g. some items don't count in the total up until the end result screen). A bug happening on the result screen, is dog tags counting for time reduction, but not being reflected in the total money being exfiltrated with. Each <span class='text-amber-700'>bronze</span>, <span class='text-slate-500'>silver</span>, <span class='text-amber-300'>gold</span> and <span class='text-indigo-400'>damascus</span> dog tag awards you <span class='text-amber-700'>${formatMoney(
        DOG_TAG_VALUES['bronze'],
        true
      )}</span>, <span class='text-slate-500'>${formatMoney(
        DOG_TAG_VALUES['silver'],
        true
      )}</span>, <span class='text-amber-300'>${formatMoney(
        DOG_TAG_VALUES['gold'],
        true
      )}</span> and <span class='text-indigo-400'>${formatMoney(
        DOG_TAG_VALUES['damascus'],
        true
      )}</span> respectively.`,
      `On the other hand, there is an opposite bug regarding sensitive documents, most likely because they can now be retained in the stash. They show up in the total of the backpack but actually do not count towards time reduction. You need to subtract <span class='text-lime-500'>${formatMoney(
        SENSITIVE_DOCUMENTS_VALUE,
        true
      )}</span> per sensitive documents.`,
      'The following video showcases how the formulae have been determined. Known bugs have been detailed in the video description, when possible.'
    ]
  },
  {
    isNew: true,
    question: `What changed between Season 01 and Season ${displaySeason(CURRENT_SEASON)}?`,
    answer: [
      'In Season 01, the cooldown periods for Insured Slots 1, 2 and 3 were respectively 2, 4 and 6 hours.',
      'In Season 02, the cooldown periods for Insured Slots 1, 2 and 3 have all been reduced by half.',
      '<b>They are now respectively 1, 2 and 3 hours.</b>',
      'The locations of dead drops in Al Mazrah and Building 21 have changed in Season 02.',
      'A new map called Ashika Island is available since Season 02.',
      `The Access Card for Building 21 is now single-use since Season 02 (since Season 02 Reloaded, it doesn't have to be equipped in the backpack anymore though).`,
      `In Season 03, lots of changes happened including the introduction of Bartering, Contraband Workbenches, New Backpacks, New Plate Carriers as well as Active Duty Operator Slots. However, for the purpose of this website, most updates don't have an influence, as Contraband Weapons are shared between Active Duty Operators.`,
      `However, some bundles (that need to be purchased) give the advantage of using a weapon with its own <b>${BUNDLE_TIMER_MIN}-min cooldown timer</b> (no matter the insured slot), so we updated the website to reflect that (in Quick Options section).`,
      `In Season 03 Reloaded, a new Exclusion Zone called Koschei Complex has been introduced. It is available exclusively from Al Mazrah.`,
      `The glitch about heartbeat sensors awarding lots of time reduction has been patched (unfortunately).`,
      `A new map called Vondel is available since <span class='text-amber-500'>Season 04</span>.`,
      `In <span class='text-amber-500'>Season 04</span>, lots of new features have been introduced including the wallet between different games, and upgrades for reducing the Insured Weapon cooldown times.`,
      '<b>Note: the dollars-per-hour rates have never changed since Season 01 (for both exfiltration and dead drops).</b>'
    ]
  },
  {
    question: 'Is there a time difference between the maps?',
    answer: [
      '<b>No.</b> Al Mazrah, Ashika Island, Vondel, Building 21 and Koschei Complex all share the same dollars-per-hour rates (for both exfiltration and dead drops).'
    ]
  },
  {
    question: `Why is the maximum number of players high on this website?`,
    answer: [
      `Although the maximum that DMZ mode accepts is ${getPlayersSize(
        MAX_PLAYERS_WITHOUT_ASSIMILATION
      )} when launching a game, the squad size can grow <b>up to ${MAX_PLAYERS} players</b> thanks to assimilation in-game (opponents can join your squad).`,
      'It applies to Al Mazrah, Vondel and Ashika Island.',
      'Thanks to in-game textual chat and voice chat, you can always help your new friends by setting up a timer for them if they roughly remember how much time they had left for their insured slots before starting the game.',
      `Please note that neither Building 21 nor Koschei Complex offers this assimilation concept. However, from Al Mazrah you can enter Koschei Complex with a full squad of ${MAX_PLAYERS} players.`
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
      `On this website we only use one browser cookie called <i><code>${COOKIE_TIMERS}</code></i>. We do this in order to save the timers that you created, so that upon refreshing the page you don't lose them.`
    ]
  }
];

export { questionsAnswers };
