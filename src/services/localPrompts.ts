import { GamePrompt, Intensity, PromptType } from '../types';

export const DEFAULT_PROMPTS: GamePrompt[] = [
  // SOFT TRUTHS
  { id: '1', type: 'Truth', intensity: Intensity.SOFT, text: 'What is your biggest pet peeve?', penalty: 'Do 5 jumping jacks' },
  { id: '2', type: 'Truth', intensity: Intensity.SOFT, text: 'What is the last thing you searched for on your phone?', penalty: 'Show your search history' },
  { id: '3', type: 'Truth', intensity: Intensity.SOFT, text: 'Have you ever peed in a pool?', penalty: 'Drink a glass of water' },

  // SOFT DARES
  { id: '4', type: 'Dare', intensity: Intensity.SOFT, text: 'Do your best impression of a chicken.', penalty: 'Cluck like a chicken for 1 minute' },
  { id: '5', type: 'Dare', intensity: Intensity.SOFT, text: 'Speak in an accent for the next 3 rounds.', penalty: 'Sing a song' },
  { id: '6', type: 'Dare', intensity: Intensity.SOFT, text: 'Let the group pose you for a photo.', penalty: 'Post the photo' },

  // HOT TRUTHS
  { id: '7', type: 'Truth', intensity: Intensity.HOT, text: 'Who in this room would you most like to kiss?', penalty: 'Kiss them on the cheek' },
  { id: '8', type: 'Truth', intensity: Intensity.HOT, text: 'What is your biggest turn on?', penalty: 'Whisper it to the person on your right' },

  // HOT DARES
  { id: '9', type: 'Dare', intensity: Intensity.HOT, text: 'Give the person to your left a massage.', penalty: 'Give a foot massage instead' },
  { id: '10', type: 'Dare', intensity: Intensity.HOT, text: 'Send a risky text to your crush.', penalty: 'Show the reply' },

  // VULGAR TRUTHS
  { id: '11', type: 'Truth', intensity: Intensity.VULGAR, text: 'What is the weirdest place you have done it?', penalty: 'Take a shot' },

  // VULGAR DARES
  { id: '12', type: 'Dare', intensity: Intensity.VULGAR, text: 'Remove one article of clothing.', penalty: 'Remove two articles of clothing' },

  // NHIE SOFT
  { id: '13', type: 'NeverHaveIEver', intensity: Intensity.SOFT, text: 'Never have I ever faked being sick to skip work/school.', penalty: 'Confess your worst excuse' },
  { id: '14', type: 'NeverHaveIEver', intensity: Intensity.SOFT, text: 'Never have I ever used someone else\'s toothbrush.', penalty: 'Take a sip' },
  { id: '15', type: 'NeverHaveIEver', intensity: Intensity.SOFT, text: 'Never have I ever snooped through someone\'s phone.', penalty: 'Let the group see your last text' },

  // NHIE HOT
  { id: '16', type: 'NeverHaveIEver', intensity: Intensity.HOT, text: 'Never have I ever had a crush on a friend\'s partner.', penalty: 'Take two sips' },
  { id: '17', type: 'NeverHaveIEver', intensity: Intensity.HOT, text: 'Never have I ever ghosted someone after a first date.', penalty: 'Text your ex or take a shot' },

  // NHIE VULGAR
  { id: '18', type: 'NeverHaveIEver', intensity: Intensity.VULGAR, text: 'Never have I ever hooked up in a public place.', penalty: 'Take a shot' },
  { id: '19', type: 'NeverHaveIEver', intensity: Intensity.VULGAR, text: 'Never have I ever sent a spicy photo to the wrong person.', penalty: 'Take a shot' },
];

export const getRandomPrompt = (type: PromptType, intensity: Intensity): GamePrompt => {
  const filtered = DEFAULT_PROMPTS.filter(p => p.type === type && p.intensity === intensity);
  if (filtered.length === 0) {
    return {
      id: Math.random().toString(),
      type,
      intensity,
      text: 'No prompts found for this category.',
      penalty: 'Drink water.'
    };
  }
  return filtered[Math.floor(Math.random() * filtered.length)];
};
