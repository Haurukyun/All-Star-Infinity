import { CustomDeck, GameMode, Intensity } from '../types';

export const THEMED_PREBUILT_DECKS: CustomDeck[] = [
  {
    id: 'prebuilt-persona-calling-card',
    name: 'Phantom Thieves Calling Card',
    description: 'Palace infiltration, stealing hearts, and confessing distorted desires in the Metaverse.',
    intensity: Intensity.HOT,
    gameMode: GameMode.TRUTH_OR_DARE,
    isCustom: false,
    isFavorite: true,
    prompts: [
      {
        id: 'p5-1',
        type: 'Truth',
        text: 'What is your deepest guilty pleasure that would cause a Metaverse Palace to form in your name?',
        intensity: Intensity.HOT,
        penalty: 'Announce your official Phantom Thief codename and take 1 sip.'
      },
      {
        id: 'p5-2',
        type: 'Dare',
        text: 'Send a verbal "Calling Card" to the group declaring what habit or trait of theirs needs a change of heart.',
        intensity: Intensity.HOT,
        penalty: 'Do 10 jumping jacks while shouting "LOOKING COOL, JOKER!"'
      },
      {
        id: 'p5-3',
        type: 'Truth',
        text: 'If you had to steal the heart of someone in this room to change one of their annoying habits, who and what?',
        intensity: Intensity.HOT,
        penalty: 'Confess your worst habit before anyone can guess it.'
      },
      {
        id: 'p5-4',
        type: 'Dare',
        text: 'Strike your signature All-Out Attack victory pose and freeze in place for 15 seconds.',
        intensity: Intensity.HOT,
        penalty: 'Hum the victory fanfare theme aloud.'
      },
      {
        id: 'p5-5',
        type: 'Truth',
        text: 'What is a secret double life or persona you put on around your family or boss versus your friends?',
        intensity: Intensity.HOT,
        penalty: 'Take 2 sips and apologize to the room.'
      },
      {
        id: 'p5-6',
        type: 'Dare',
        text: 'Whisper "You will never see it coming..." menacingly into the ear of the person to your right.',
        intensity: Intensity.HOT,
        penalty: 'Sing the first line of Last Surprise.'
      },
      {
        id: 'p5-7',
        type: 'Truth',
        text: 'Who in this room would be your most loyal confidant if you were planning a high-stakes heist?',
        intensity: Intensity.HOT,
        penalty: 'Rank the room by trustworthiness.'
      },
      {
        id: 'p5-8',
        type: 'Dare',
        text: 'Rip off an imaginary mask with pure dramatic agony and scream your Persona\'s name.',
        intensity: Intensity.HOT,
        penalty: 'Bow dramatically to every player in the room.'
      }
    ]
  },
  {
    id: 'prebuilt-undertale-determination',
    name: 'Underground Determination',
    description: 'Mercy, resets, bad-time puns, and royal guard trials beneath Mt. Ebott.',
    intensity: Intensity.SOFT,
    gameMode: GameMode.TRUTH_OR_DARE,
    isCustom: false,
    isFavorite: true,
    prompts: [
      {
        id: 'ut-1',
        type: 'Truth',
        text: 'If you possessed the power to Reset the timeline, what moment from the last 12 months would you undo?',
        intensity: Intensity.SOFT,
        penalty: 'Tell a terrible skeleton pun that makes nobody laugh.'
      },
      {
        id: 'ut-2',
        type: 'Dare',
        text: 'Speak like Sans for the next round: end every sentence with a bone pun or wink.',
        intensity: Intensity.SOFT,
        penalty: 'Make the Megalovania intro sound effect aloud.'
      },
      {
        id: 'ut-3',
        type: 'Truth',
        text: 'Who in this room is the most "Pacifist" (too nice to hurt anyone) and who is secretly "Genocide"?',
        intensity: Intensity.SOFT,
        penalty: 'Give the designated Pacifist a warm hug.'
      },
      {
        id: 'ut-4',
        type: 'Dare',
        text: 'Act out Papyrus discovering a human while shouting "NYEH HEH HEH!" at the top of your lungs.',
        intensity: Intensity.SOFT,
        penalty: 'Promise to make everyone spaghetti this weekend.'
      },
      {
        id: 'ut-5',
        type: 'Truth',
        text: 'What is something you forgave someone for that you still secretly think about?',
        intensity: Intensity.SOFT,
        penalty: 'Show the room your camera roll favorites.'
      },
      {
        id: 'ut-6',
        type: 'Dare',
        text: 'Give an inspiring Toriel-style motherly pep talk to the player who looks the most stressed right now.',
        intensity: Intensity.SOFT,
        penalty: 'Pretend to bake an invisible butterscotch-cinnamon pie.'
      },
      {
        id: 'ut-7',
        type: 'Truth',
        text: 'When was the last time you felt "filled with determination" to do something completely stupid?',
        intensity: Intensity.SOFT,
        penalty: 'Drink a sip of water with two hands like a delicate monster child.'
      },
      {
        id: 'ut-8',
        type: 'Dare',
        text: 'Play Mettaton: narrate the current party like a glamorous underground TV rating broadcast.',
        intensity: Intensity.SOFT,
        penalty: 'Pose dramatically like your legs are made of steel.'
      }
    ]
  },
  {
    id: 'prebuilt-cyberpunk-edgerunner',
    name: 'Night City Edgerunner',
    description: 'High-tech chrome, braindance confessions, street cred tests, and corpo defiance.',
    intensity: Intensity.HOT,
    gameMode: GameMode.TRUTH_OR_DARE,
    isCustom: false,
    prompts: [
      {
        id: 'cp-1',
        type: 'Truth',
        text: 'If you could install one piece of Cyberware right now, what would it be and what illegal deed would you do first?',
        intensity: Intensity.HOT,
        penalty: 'Hand over 5 eddies (or pay for the next group snack).'
      },
      {
        id: 'cp-2',
        type: 'Dare',
        text: 'Glitch out: pretend your Sandevistan cyberware is bugging out for 30 seconds while moving in stuttered slow-mo.',
        intensity: Intensity.HOT,
        penalty: 'Take 2 sips of your drink.'
      },
      {
        id: 'cp-3',
        type: 'Truth',
        text: 'Which real-life company do you genuinely believe is acting like Arasaka right now?',
        intensity: Intensity.HOT,
        penalty: 'Say three nice things about your smartphone company.'
      },
      {
        id: 'cp-4',
        type: 'Dare',
        text: 'Call out the "Corpo Sellout" of the group and give a 20-second Johnny Silverhand anti-capitalist speech.',
        intensity: Intensity.HOT,
        penalty: 'Air guitar a rock anthem solo.'
      },
      {
        id: 'cp-5',
        type: 'Truth',
        text: 'What is the closest you have ever come to full-blown cyberpsychosis (losing your mind from stress or gaming)?',
        intensity: Intensity.HOT,
        penalty: 'Stare unblinking at the ceiling for 10 seconds.'
      },
      {
        id: 'cp-6',
        type: 'Dare',
        text: 'Deliver a confidential fixer briefing to the target player detailing an outrageous made-up gig.',
        intensity: Intensity.HOT,
        penalty: 'Speak in 2077 slang ("preem", "choom", "nova") for the next 2 turns.'
      }
    ]
  },
  {
    id: 'prebuilt-minecraft-survival',
    name: 'Nether & End Survival Trials',
    description: 'Creeper paranoia, diamond mining betrayals, and End dragon bravado.',
    intensity: Intensity.SOFT,
    gameMode: GameMode.TRUTH_OR_DARE,
    isCustom: false,
    prompts: [
      {
        id: 'mc-1',
        type: 'Truth',
        text: 'What is the most petty grudge you have held over a game or minor favor in real life?',
        intensity: Intensity.SOFT,
        penalty: 'Pretend to eat raw rotten flesh with disgust.'
      },
      {
        id: 'mc-2',
        type: 'Dare',
        text: 'Creeper ambush: stand behind the person to your left and hiss silently until they turn around.',
        intensity: Intensity.SOFT,
        penalty: 'Do the Steve death sound ("OOF") loudly.'
      },
      {
        id: 'mc-3',
        type: 'Truth',
        text: 'If the apocalypse happened tomorrow, who in this room is dying first on Night 1?',
        intensity: Intensity.SOFT,
        penalty: 'Offer that player a symbolic peace-treaty high-five.'
      },
      {
        id: 'mc-4',
        type: 'Dare',
        text: 'Mine an invisible block of obsidian using only your forehead against a soft pillow or sofa.',
        intensity: Intensity.SOFT,
        penalty: 'Count out loud to 20 like you are waiting for a furnace.'
      },
      {
        id: 'mc-5',
        type: 'Truth',
        text: 'Have you ever broken the cardinal rule and "dug straight down" in a real-life situation without planning?',
        intensity: Intensity.SOFT,
        penalty: 'Confess the outcome in full detail.'
      },
      {
        id: 'mc-6',
        type: 'Dare',
        text: 'Villager trade: approach two players making only "HMMM" and "HRRR" noises until they hand you an item.',
        intensity: Intensity.SOFT,
        penalty: 'Walk like a stiff iron golem across the room.'
      }
    ]
  },
  {
    id: 'prebuilt-danganronpa-class-trial',
    name: 'Class Trial: Hope vs Despair',
    description: 'High-stakes interrogation, truth bullets, and exposing the ultimate mastermind.',
    intensity: Intensity.HOT,
    gameMode: GameMode.TRUTH_OR_DARE,
    isCustom: false,
    prompts: [
      {
        id: 'dr-1',
        type: 'Truth',
        text: 'If Monokuma forced this room into a killing game, what would your "Ultimate Talent" honestly be?',
        intensity: Intensity.HOT,
        penalty: 'Give the group your best Monokuma laugh: "puhuhuhu!"'
      },
      {
        id: 'dr-2',
        type: 'Dare',
        text: 'Aim your index finger like a Truth Bullet, shout "NO, THAT\'S WRONG!", and refute the last thing someone said.',
        intensity: Intensity.HOT,
        penalty: 'Stand trial at the center of the room for 15 seconds.'
      },
      {
        id: 'dr-3',
        type: 'Truth',
        text: 'Who in this room has the best poker face and would easily fool everyone during a Class Trial?',
        intensity: Intensity.HOT,
        penalty: 'Take 1 sip and stare down that player.'
      },
      {
        id: 'dr-4',
        type: 'Dare',
        text: 'Deliver a 30-second dramatic closing argument accusing the host of committing an absurd crime.',
        intensity: Intensity.HOT,
        penalty: 'Bow and say "It\'s punishment time!"'
      },
      {
        id: 'dr-5',
        type: 'Truth',
        text: 'What lie have you told that snowballed completely out of control before you could stop it?',
        intensity: Intensity.HOT,
        penalty: 'Show the room your screen time stats.'
      },
      {
        id: 'dr-6',
        type: 'Dare',
        text: 'Re-enact a theatrical Monokuma execution where your punishment is doing the Macarena.',
        intensity: Intensity.HOT,
        penalty: 'Chug a glass of water without breathing.'
      }
    ]
  },
  {
    id: 'prebuilt-animal-crossing-debt',
    name: "Tom Nook's Debt Collector",
    description: 'Island mortgage anxiety, rare fish bragging, and wholesome neighbor drama.',
    intensity: Intensity.SOFT,
    gameMode: GameMode.TRUTH_OR_DARE,
    isCustom: false,
    prompts: [
      {
        id: 'ac-1',
        type: 'Truth',
        text: 'What is the most ridiculous impulse purchase you have made that left you broke like a Nook loan?',
        intensity: Intensity.SOFT,
        penalty: 'Pretend to pay Tom Nook 10,000 invisible Bells.'
      },
      {
        id: 'ac-2',
        type: 'Dare',
        text: 'Speak exclusively in Animal Crossing "Animalese" gibberish whenever addressed for the next round.',
        intensity: Intensity.SOFT,
        penalty: 'Do the joyful reaction dance with clapping hands.'
      },
      {
        id: 'ac-3',
        type: 'Truth',
        text: 'Which neighbor or acquaintance have you secretly hit with a net (avoided or muted) to get them off your island?',
        intensity: Intensity.SOFT,
        penalty: 'Confess why they annoyed you.'
      },
      {
        id: 'ac-4',
        type: 'Dare',
        text: 'Catch an imaginary Sea Bass and exclaim with genuine disappointment: "It\'s at least a C+!"',
        intensity: Intensity.SOFT,
        penalty: 'Re-gift an item on your person to the player on your right.'
      },
      {
        id: 'ac-5',
        type: 'Truth',
        text: 'What is a cozy comfort routine you do at home that you would feel embarrassed admitting to a stranger?',
        intensity: Intensity.SOFT,
        penalty: 'Hum the 5 PM Animal Crossing theme.'
      },
      {
        id: 'ac-6',
        type: 'Dare',
        text: 'Run like an Animal Crossing villager with arms straight back behind you around the room.',
        intensity: Intensity.SOFT,
        penalty: 'Give everyone in the room an imaginary fruit.'
      }
    ]
  },
  {
    id: 'prebuilt-sanrio-sweet-mischief',
    name: 'Sweet Mischief Cafe',
    description: 'Kuromi rebel dares vs Cinnamoroll angelic sweetness for adorable party chaos.',
    intensity: Intensity.SOFT,
    gameMode: GameMode.TRUTH_OR_DARE,
    isCustom: false,
    prompts: [
      {
        id: 'sr-1',
        type: 'Truth',
        text: 'Are you secretly more of a sweet cinnamon roll or a mischievous Kuromi punk when nobody is watching?',
        intensity: Intensity.SOFT,
        penalty: 'Make cute puppy eyes at the target player.'
      },
      {
        id: 'sr-2',
        type: 'Dare',
        text: 'Give the person across from you three genuinely sweet, specific compliments with absolute sincerity.',
        intensity: Intensity.SOFT,
        penalty: 'Do a cute anime twirl and say "Nya~!"'
      },
      {
        id: 'sr-3',
        type: 'Truth',
        text: 'What is the softest, most romantic thing you have ever secretly daydreamed about?',
        intensity: Intensity.SOFT,
        penalty: 'Hide your face in your hands for 10 seconds.'
      },
      {
        id: 'sr-4',
        type: 'Dare',
        text: 'Channel your inner Kuromi: make a mock villain speech declaring you will steal all the snacks.',
        intensity: Intensity.SOFT,
        penalty: 'Share your current snack or beverage with a friend.'
      },
      {
        id: 'sr-5',
        type: 'Truth',
        text: 'What is an embarrassing childhood obsession or comfort plushie that you held onto way too long?',
        intensity: Intensity.SOFT,
        penalty: 'Describe its name and backstory in detail.'
      },
      {
        id: 'sr-6',
        type: 'Dare',
        text: 'Strike three distinct Japanese photobooth (purikura) cute poses in quick succession.',
        intensity: Intensity.SOFT,
        penalty: 'Draw a tiny star on the back of your hand.'
      }
    ]
  },
  {
    id: 'prebuilt-skyrim-tavern-brawl',
    name: "Dragonborn's Tavern Brawl",
    description: 'Sweetrolls, arrow-to-the-knee excuses, shouts, and Skooma bartering.',
    intensity: Intensity.HOT,
    gameMode: GameMode.TRUTH_OR_DARE,
    isCustom: false,
    prompts: [
      {
        id: 'sk-1',
        type: 'Truth',
        text: 'What is your real-life equivalent of "I used to be an adventurer like you, then I took an arrow in the knee"?',
        intensity: Intensity.HOT,
        penalty: 'Take 2 sips of Nordic mead (or drink).'
      },
      {
        id: 'sk-2',
        type: 'Dare',
        text: 'Deliver a booming FUS RO DAH shout (volume adjusted for room) while blowing away an empty cup.',
        intensity: Intensity.HOT,
        penalty: 'Crouch in stealth mode for your entire next turn.'
      },
      {
        id: 'sk-3',
        type: 'Truth',
        text: 'Have you ever stolen someone\'s proverbial "sweetroll" (stolen credit, snacks, or praise) and stayed silent?',
        intensity: Intensity.HOT,
        penalty: 'Confess to the room who suffered for it.'
      },
      {
        id: 'sk-4',
        type: 'Dare',
        text: 'Walk up to a player, place a basket (or hat/cushion) on their head, and pretend they can no longer see you.',
        intensity: Intensity.HOT,
        penalty: 'Sing a line from The Dragonborn Comes.'
      },
      {
        id: 'sk-5',
        type: 'Truth',
        text: 'Which Jarl (person of authority in your life) do you secretly think is completely incompetent?',
        intensity: Intensity.HOT,
        penalty: 'Pledge fealty by bowing deeply.'
      },
      {
        id: 'sk-6',
        type: 'Dare',
        text: 'Accuse the player on your right of being a Thalmor spy and demand their papers with utmost suspicion.',
        intensity: Intensity.HOT,
        penalty: 'Drink 1 sip of your potion.'
      }
    ]
  },
  {
    id: 'prebuilt-arcane-undercity-secrets',
    name: 'Hextech Secrets & Undercity Fire',
    description: 'Piltover aristocracy vs Zaun underworld loyalty, Shimmer temptations, and sibling rivalries.',
    intensity: Intensity.HOT,
    gameMode: GameMode.TRUTH_OR_DARE,
    isCustom: false,
    prompts: [
      {
        id: 'arc-1',
        type: 'Truth',
        text: 'Are you more of an enforcer of order (Piltover) or an unpredictable rulebreaker (Zaun) when pushed to your limits?',
        intensity: Intensity.HOT,
        penalty: 'Take 1 sip and pledge loyalty to the Undercity.'
      },
      {
        id: 'arc-2',
        type: 'Dare',
        text: 'Do Jinx\'s signature manic giggle while explaining why one of your worst past decisions was actually pure genius.',
        intensity: Intensity.HOT,
        penalty: 'Shadowbox like Vi for 15 seconds.'
      },
      {
        id: 'arc-3',
        type: 'Truth',
        text: 'Who in your family or circle of friends is your "Jinx" (the person you will defend even when they cause absolute chaos)?',
        intensity: Intensity.HOT,
        penalty: 'Text them a heart right now.'
      },
      {
        id: 'arc-4',
        type: 'Dare',
        text: 'Deliver a posh, snooty Piltover Council speech lecturing the room on their terrible manners and fashion.',
        intensity: Intensity.HOT,
        penalty: 'Take a dramatic sip with your pinky stuck out.'
      },
      {
        id: 'arc-5',
        type: 'Truth',
        text: 'What is a friendship or partnership you severed that you still secretly wonder if you could have salvaged?',
        intensity: Intensity.HOT,
        penalty: 'Share the main lesson you learned from it.'
      },
      {
        id: 'arc-6',
        type: 'Dare',
        text: 'Challenge the target player to a stare-down with full Silco menace and do not blink first.',
        intensity: Intensity.HOT,
        penalty: 'The loser must finish their cup or do 10 pushups.'
      }
    ]
  }
];

