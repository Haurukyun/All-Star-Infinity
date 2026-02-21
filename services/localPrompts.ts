
import { Intensity, PromptType, GamePrompt } from "../types";

const generateId = () => Math.random().toString(36).substring(2, 11);

export const DEFAULT_PROMPTS: GamePrompt[] = [
  // TRUTHS - SOFT
  { id: generateId(), type: 'Truth', intensity: Intensity.SOFT, text: "Who in this room do you think is the best kisser?", penalty: "Take a shot." },
  { id: generateId(), type: 'Truth', intensity: Intensity.SOFT, text: "Have you ever faked an orgasm? Be honest.", penalty: "Drink half your glass." },
  { id: generateId(), type: 'Truth', intensity: Intensity.SOFT, text: "What's your biggest turn-on that sounds totally normal but hits hard for you?", penalty: "Take a sip for every person in the room." },
  { id: generateId(), type: 'Truth', intensity: Intensity.SOFT, text: "Who was your first celebrity crush that you're actually embarrassed about now?", penalty: "Post 'I'm thirsty' on your story." },

  // TRUTHS - HOT
  { id: generateId(), type: 'Truth', intensity: Intensity.HOT, text: "What's the most public place you've ever hooked up in?", penalty: "Take a double shot." },
  { id: generateId(), type: 'Truth', intensity: Intensity.HOT, text: "Show the group your most recent 'thirsty' DM sent or received.", penalty: "Drink until someone tells you to stop." },
  { id: generateId(), type: 'Truth', intensity: Intensity.HOT, text: "What's a fetish you're curious about but too scared to try?", penalty: "Let someone draw a mustache on you in sharpie." },
  { id: generateId(), type: 'Truth', intensity: Intensity.HOT, text: "Have you ever sent a nude to the wrong person? Tell the story.", penalty: "Take a shot." },

  // TRUTHS - VULGAR
  { id: generateId(), type: 'Truth', intensity: Intensity.VULGAR, text: "What's the absolute filthiest thing you've ever said in bed?", penalty: "Finish your drink." },
  { id: generateId(), type: 'Truth', intensity: Intensity.VULGAR, text: "Describe your most shameful 'post-nut clarity' moment in detail.", penalty: "Take two shots." },
  { id: generateId(), type: 'Truth', intensity: Intensity.VULGAR, text: "What's your actual body count? No lying, the game knows.", penalty: "Show your bank balance to the person on your right." },

  // DARES - SOFT
  { id: generateId(), type: 'Dare', intensity: Intensity.SOFT, text: "Whisper something dirty into the ear of the person to your left.", penalty: "Take a shot." },
  { id: generateId(), type: 'Dare', intensity: Intensity.SOFT, text: "Rate everyone's 'vibe' in this room from 1 to 10 based on how good they'd be in bed.", penalty: "Drink three sips." },
  { id: generateId(), type: 'Dare', intensity: Intensity.SOFT, text: "Let the group scroll through your 10 most recent photos.", penalty: "Take a shot." },

  // DARES - HOT
  { id: generateId(), type: 'Dare', intensity: Intensity.HOT, text: "Send a suggestive emoji to your 3rd most recent contact and don't explain it.", penalty: "Take two shots." },
  { id: generateId(), type: 'Dare', intensity: Intensity.HOT, text: "Let the person to your right sit on your lap for the next 3 rounds.", penalty: "Finish your drink." },
  { id: generateId(), type: 'Dare', intensity: Intensity.HOT, text: "Give a 30-second 'tutorial' on how you like to be touched.", penalty: "Take a double shot." },

  // DARES - VULGAR
  { id: generateId(), type: 'Dare', intensity: Intensity.VULGAR, text: "Call an ex and tell them you miss their body, then hang up immediately.", penalty: "Take three shots." },
  { id: generateId(), type: 'Dare', intensity: Intensity.VULGAR, text: "Trade one item of clothing with the person across from you.", penalty: "Take a shot." },
  { id: generateId(), type: 'Dare', intensity: Intensity.VULGAR, text: "Post a selfie with the caption 'I'm a dirty little secret' and leave it up for 10 minutes.", penalty: "Finish everyone's drinks." },
];

export const getRandomPrompt = (type: PromptType, intensity: Intensity): GamePrompt => {
  const filtered = DEFAULT_PROMPTS.filter(p => p.type === type && p.intensity === intensity);
  return filtered[Math.floor(Math.random() * filtered.length)];
};
