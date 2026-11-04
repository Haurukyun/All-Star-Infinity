import { GamePrompt, Intensity, PromptType } from '../types';

export const DEFAULT_PROMPTS: GamePrompt[] = [
  // ==========================================
  // SOFT TRUTHS (st-1 to st-25)
  // Icebreakers, light embarrassment, goofy habits
  // ==========================================
  { id: 'st-1', type: 'Truth', intensity: Intensity.SOFT, text: 'What is your absolute biggest pet peeve?', penalty: 'Do 10 jumping jacks while chanting your pet peeve' },
  { id: 'st-2', type: 'Truth', intensity: Intensity.SOFT, text: 'What is the last thing you searched in your phone’s incognito/private tab?', penalty: 'Show the group your most recent non-private search history' },
  { id: 'st-3', type: 'Truth', intensity: Intensity.SOFT, text: 'Have you ever re-gifted a present? If so, what was it?', penalty: 'Compliment the person who gave you your worst gift' },
  { id: 'st-4', type: 'Truth', intensity: Intensity.SOFT, text: 'What is the most ridiculous lie you told as a kid that someone believed?', penalty: 'Talk in a baby voice for the next round' },
  { id: 'st-5', type: 'Truth', intensity: Intensity.SOFT, text: 'What is a food combination you secretly love that disgusts everyone else?', penalty: 'Eat a spoonful of a condiment chosen by the group' },
  { id: 'st-6', type: 'Truth', intensity: Intensity.SOFT, text: 'Who in this room would you trust least to babysit your pet for a weekend?', penalty: 'Bark like a dog every time that person speaks for 2 minutes' },
  { id: 'st-7', type: 'Truth', intensity: Intensity.SOFT, text: 'What is the most awkward text you have accidentally sent to the wrong person?', penalty: 'Send a random punctuation mark to the 3rd person in your DM list' },
  { id: 'st-8', type: 'Truth', intensity: Intensity.SOFT, text: 'What is your guilty pleasure song or artist that you hide from your Spotify Wrapped?', penalty: 'Sing the chorus of that song right now without music' },
  { id: 'st-9', type: 'Truth', intensity: Intensity.SOFT, text: 'Have you ever practiced kissing or posing in front of a mirror?', penalty: 'Strike your favorite mirror pose for 10 seconds' },
  { id: 'st-10', type: 'Truth', intensity: Intensity.SOFT, text: 'What was your most cringeworthy fashion phase or haircut?', penalty: 'Show a picture of it or describe it in vivid poetic detail' },
  { id: 'st-11', type: 'Truth', intensity: Intensity.SOFT, text: 'If you had to trade lives with one person in this room for 24 hours, who would it be and why?', penalty: 'Do your best impression of that person right now' },
  { id: 'st-12', type: 'Truth', intensity: Intensity.SOFT, text: 'What is the longest you have ever gone without showering or changing clothes?', penalty: 'Sniff your own armpit and report back with a straight face' },
  { id: 'st-13', type: 'Truth', intensity: Intensity.SOFT, text: 'What is the dumbest way you have ever hurt yourself?', penalty: 'Reenact the incident in slow motion' },
  { id: 'st-14', type: 'Truth', intensity: Intensity.SOFT, text: 'Have you ever blamed a fart or spill on an innocent pet or friend?', penalty: 'Apologize to the room on behalf of that pet or friend' },
  { id: 'st-15', type: 'Truth', intensity: Intensity.SOFT, text: 'What cartoon or fictional character did you have an unironic childhood crush on?', penalty: 'Recite a 15-second love confession to that character' },
  { id: 'st-16', type: 'Truth', intensity: Intensity.SOFT, text: 'What is the pettiest reason you have ever stopped talking to someone?', penalty: 'Give a sincere compliment to everyone in the room' },
  { id: 'st-17', type: 'Truth', intensity: Intensity.SOFT, text: 'If you were arrested with no explanation, what would your friends assume you did?', penalty: 'State your fictional prison moniker and your fictional crime' },
  { id: 'st-18', type: 'Truth', intensity: Intensity.SOFT, text: 'Have you ever pretended to be on a phone call just to avoid talking to someone?', penalty: 'Mime an elaborate fake phone call with your mom for 20 seconds' },
  { id: 'st-19', type: 'Truth', intensity: Intensity.SOFT, text: 'What is the worst piece of advice you have ever given someone with full confidence?', penalty: 'Let the person on your right give you completely terrible advice you must agree with' },
  { id: 'st-20', type: 'Truth', intensity: Intensity.SOFT, text: 'What is the biggest misunderstanding someone has ever had about you?', penalty: 'Do an over-the-top dramatic sigh and drink a glass of water' },
  { id: 'st-21', type: 'Truth', intensity: Intensity.SOFT, text: 'Have you ever dropped food on the floor and eaten it past the 5-second rule?', penalty: 'Hold a piece of ice in your hand until it completely melts' },
  { id: 'st-22', type: 'Truth', intensity: Intensity.SOFT, text: 'What is your weirdest irrational fear?', penalty: 'Make the noise of the thing you fear most' },
  { id: 'st-23', type: 'Truth', intensity: Intensity.SOFT, text: 'What is something you pretend to understand just to fit into conversations?', penalty: 'Explain quantum physics or cryptocurrency in 20 seconds without laughing' },
  { id: 'st-24', type: 'Truth', intensity: Intensity.SOFT, text: 'Have you ever stalked an ex’s or rival’s new partner on social media?', penalty: 'Like the oldest post on the person to your left’s Instagram' },
  { id: 'st-25', type: 'Truth', intensity: Intensity.SOFT, text: 'If you had to delete every app on your phone except three, which three are staying?', penalty: 'Let the group look at your phone screen time for today' },

  // ==========================================
  // SOFT DARES (sd-1 to sd-25)
  // Funny physical comedy, accents, silly social antics
  // ==========================================
  { id: 'sd-1', type: 'Dare', intensity: Intensity.SOFT, text: 'Do your absolute best impression of an angry rooster.', penalty: 'Cluck like a confused chicken for the next 2 rounds' },
  { id: 'sd-2', type: 'Dare', intensity: Intensity.SOFT, text: 'Speak in a dramatic Shakespearean accent for the next 3 rounds.', penalty: 'Deliver a tragic monologue about stubbing your toe' },
  { id: 'sd-3', type: 'Dare', intensity: Intensity.SOFT, text: 'Let the group pose your body like a museum mannequin and hold it for 30 seconds.', penalty: 'Take a silly selfie with your best mannequin face' },
  { id: 'sd-4', type: 'Dare', intensity: Intensity.SOFT, text: 'Narrate everything the person across from you does for the next 2 minutes like a nature documentary.', penalty: 'Make dolphin noises for 15 seconds' },
  { id: 'sd-5', type: 'Dare', intensity: Intensity.SOFT, text: 'Try to juggle 3 random objects chosen by the group.', penalty: 'Balance a spoon or fork on your nose for 20 seconds' },
  { id: 'sd-6', type: 'Dare', intensity: Intensity.SOFT, text: 'Call a random contact in your phone and sing them the "Happy Birthday" song, then hang up.', penalty: 'Text "I know what you did" to your 5th most recent contact' },
  { id: 'sd-7', type: 'Dare', intensity: Intensity.SOFT, text: 'Put an ice cube in your sock and walk around normally for 1 minute.', penalty: 'Take a sip of water with your elbows touching' },
  { id: 'sd-8', type: 'Dare', intensity: Intensity.SOFT, text: 'Do your best runway model walk across the room and give a dramatic camera wink.', penalty: 'Do 15 squats while smiling enthusiastically' },
  { id: 'sd-9', type: 'Dare', intensity: Intensity.SOFT, text: 'Talk without closing your mouth at all for the next 2 rounds.', penalty: 'Speak only in whispers for the next 3 rounds' },
  { id: 'sd-10', type: 'Dare', intensity: Intensity.SOFT, text: 'Let the person to your left draw a funny mustache or symbol on your face with a washable marker or pen.', penalty: 'Wear your socks on your hands for the next 3 rounds' },
  { id: 'sd-11', type: 'Dare', intensity: Intensity.SOFT, text: 'Show the group the 7th photo in your camera roll without scrolling or context.', penalty: 'Let the person to your right take a goofy photo of you' },
  { id: 'sd-12', type: 'Dare', intensity: Intensity.SOFT, text: 'Do a 30-second interpretive dance expressing your deep feelings about pizza.', penalty: 'Kneel down and praise an inanimate object in the room like a deity' },
  { id: 'sd-13', type: 'Dare', intensity: Intensity.SOFT, text: 'Try to lick your elbow or touch your tongue to your nose for 15 seconds.', penalty: 'Wiggle your ears or flare your nostrils aggressively for 10 seconds' },
  { id: 'sd-14', type: 'Dare', intensity: Intensity.SOFT, text: 'Speak only in rhymes for the next 2 turns.', penalty: 'Do 10 pushups while counting in French' },
  { id: 'sd-15', type: 'Dare', intensity: Intensity.SOFT, text: 'Swap shoes with the person to your right until your next turn.', penalty: 'Walk backwards whenever you move for the rest of the game' },
  { id: 'sd-16', type: 'Dare', intensity: Intensity.SOFT, text: 'Give an enthusiastic infomercial pitch for whatever object is immediately to your left.', penalty: 'Chant "Buy now, supplies are limited!" 5 times fast' },
  { id: 'sd-17', type: 'Dare', intensity: Intensity.SOFT, text: 'Let someone in the group style your hair into the most absurd look possible.', penalty: 'Keep that hairstyle for the next 3 rounds' },
  { id: 'sd-18', type: 'Dare', intensity: Intensity.SOFT, text: 'Act like a robot whose battery is dying over the course of 30 seconds.', penalty: 'Speak in a monotonous robotic voice for the next turn' },
  { id: 'sd-19', type: 'Dare', intensity: Intensity.SOFT, text: 'Eat a slice of lemon, lime, or a pinch of salt without making any facial expression.', penalty: 'Smile creepily at the person opposite you for 20 seconds' },
  { id: 'sd-20', type: 'Dare', intensity: Intensity.SOFT, text: 'Wear your jacket or hoodie backwards and button/zip it up for the next 2 rounds.', penalty: 'Wear your shirt inside out for the rest of the round' },
  { id: 'sd-21', type: 'Dare', intensity: Intensity.SOFT, text: 'Do your best air guitar solo to an imaginary rock anthem for 20 seconds.', penalty: 'Headbang aggressively for 10 seconds' },
  { id: 'sd-22', type: 'Dare', intensity: Intensity.SOFT, text: 'Post a blank photo with the caption "It begins..." on your closest social media story.', penalty: 'Leave the caption as your status on Discord or WhatsApp for 10 minutes' },
  { id: 'sd-23', type: 'Dare', intensity: Intensity.SOFT, text: 'Try to make the person across from you laugh without touching them or speaking.', penalty: 'Let that person tickle your palm for 10 seconds without flinching' },
  { id: 'sd-24', type: 'Dare', intensity: Intensity.SOFT, text: 'Give a passionate, tearful Oscar acceptance speech for winning "Worst Life Choices".', penalty: 'Bow to everyone in the room as if they are royalty' },
  { id: 'sd-25', type: 'Dare', intensity: Intensity.SOFT, text: 'Let the person to your right send an emoji-only text from your phone to someone in your chat list.', penalty: 'Send a voice memo saying "Ribbit" to the 2nd person in your DMs' },

  // ==========================================
  // HOT TRUTHS (ht-1 to ht-25)
  // Flirty, romantic tension, spicy secrets, attraction
  // ==========================================
  { id: 'ht-1', type: 'Truth', intensity: Intensity.HOT, text: 'Who in this room would you most want to be trapped in an elevator with for 3 hours?', penalty: 'Give that person a lingering high-five and hold eye contact for 5 seconds' },
  { id: 'ht-2', type: 'Truth', intensity: Intensity.HOT, text: 'What is your biggest romantic or sensual turn-on that you rarely admit out loud?', penalty: 'Whisper it into the ear of the person on your right' },
  { id: 'ht-3', type: 'Truth', intensity: Intensity.HOT, text: 'Have you ever had a steamy romantic dream about someone currently sitting in this room?', penalty: 'Blush, take a sip of your drink, and look at the floor for 5 seconds' },
  { id: 'ht-4', type: 'Truth', intensity: Intensity.HOT, text: 'What is the most scandalous or bold text message you have ever sent?', penalty: 'Read the draft of an unsent spicy thought or take a penalty sip' },
  { id: 'ht-5', type: 'Truth', intensity: Intensity.HOT, text: 'If you had to kiss one person in this room right now, where on their face or neck would you pick?', penalty: 'Blow that person a slow, dramatic kiss' },
  { id: 'ht-6', type: 'Truth', intensity: Intensity.HOT, text: 'What physical feature do you notice first when you are genuinely attracted to someone?', penalty: 'Compliment the best feature of the person sitting across from you' },
  { id: 'ht-7', type: 'Truth', intensity: Intensity.HOT, text: 'What is your opinion on friends with benefits, and have you ever had one?', penalty: 'Confess whether it ended in tears or triumph' },
  { id: 'ht-8', type: 'Truth', intensity: Intensity.HOT, text: 'Have you ever flirted with someone just to get free drinks, discounts, or special favors?', penalty: 'Demonstrate your best flirty eyelash flutter on the person to your left' },
  { id: 'ht-9', type: 'Truth', intensity: Intensity.HOT, text: 'What is the most adventurous or unconventional date you have ever been on?', penalty: 'Describe your dream spontaneous midnight date in 2 sentences' },
  { id: 'ht-10', type: 'Truth', intensity: Intensity.HOT, text: 'Who was your best kiss ever, and what made it so memorable?', penalty: 'Bite your lip and take a deep breath' },
  { id: 'ht-11', type: 'Truth', intensity: Intensity.HOT, text: 'Have you ever hooked up or made out with someone whose name you didn’t even know?', penalty: 'Take a solid sip of whatever drink you have' },
  { id: 'ht-12', type: 'Truth', intensity: Intensity.HOT, text: 'What is the biggest romantic red flag that you have willfully ignored because they were attractive?', penalty: 'Admit how long that relationship lasted' },
  { id: 'ht-13', type: 'Truth', intensity: Intensity.HOT, text: 'Which person in this room has the most magnetic or attractive voice?', penalty: 'Let that person whisper a tongue twister into your ear' },
  { id: 'ht-14', type: 'Truth', intensity: Intensity.HOT, text: 'Have you ever sent a spicy photo and immediately had your heart stop from panic?', penalty: 'Describe the emotion in one dramatic squeak' },
  { id: 'ht-15', type: 'Truth', intensity: Intensity.HOT, text: 'What outfit or style of clothing on someone else makes you weak in the knees?', penalty: 'Rate the outfits of the room on a scale of 1 to 10 with charming commentary' },
  { id: 'ht-16', type: 'Truth', intensity: Intensity.HOT, text: 'Have you ever secretly crushed on your best friend’s sibling or ex?', penalty: 'Admit whether they ever found out' },
  { id: 'ht-17', type: 'Truth', intensity: Intensity.HOT, text: 'What is your favorite kind of physical touch: gentle caresses, tight hugs, or passionate grabs?', penalty: 'Demonstrate on the arm of the person to your left' },
  { id: 'ht-18', type: 'Truth', intensity: Intensity.HOT, text: 'If you were guaranteed they would say yes, who would you ask out tonight?', penalty: 'Text "Hey, thinking of you" to that person or take a double sip' },
  { id: 'ht-19', type: 'Truth', intensity: Intensity.HOT, text: 'What is the fastest you have ever fallen for someone after meeting them?', penalty: 'Hold someone’s hand for the next full round' },
  { id: 'ht-20', type: 'Truth', intensity: Intensity.HOT, text: 'Have you ever kissed someone to make someone else jealous in the same room?', penalty: 'Take a sip and look guiltily at the ceiling' },
  { id: 'ht-21', type: 'Truth', intensity: Intensity.HOT, text: 'What is your go-to move when you want someone to know you’re interested without saying it?', penalty: 'Demonstrate your "subtle attraction" look at the person across from you' },
  { id: 'ht-22', type: 'Truth', intensity: Intensity.HOT, text: 'Have you ever skinny-dipped or gone swimming without clothes?', penalty: 'Take a sip of water or confess where it happened' },
  { id: 'ht-23', type: 'Truth', intensity: Intensity.HOT, text: 'What is the biggest age gap you have ever had in a romantic or intimate situation?', penalty: 'State the numbers without apologizing' },
  { id: 'ht-24', type: 'Truth', intensity: Intensity.HOT, text: 'If you had to pick one person in this room to serenade, who is it?', penalty: 'Sing the first line of an R&B love song directly looking at them' },
  { id: 'ht-25', type: 'Truth', intensity: Intensity.HOT, text: 'What is something spicy on your bucket list that you have not experienced yet?', penalty: 'Take a drink and let out a suggestive "hmm"' },

  // ==========================================
  // HOT DARES (hd-1 to hd-25)
  // Sensual, close contact, flirty challenges
  // ==========================================
  { id: 'hd-1', type: 'Dare', intensity: Intensity.HOT, text: 'Give the person to your left a relaxing 30-second shoulder massage.', penalty: 'Give them a gentle hand massage instead' },
  { id: 'hd-2', type: 'Dare', intensity: Intensity.HOT, text: 'Whisper your favorite pickup line into the ear of the person on your right in your most seductive tone.', penalty: 'Repeat the pickup line in an aggressive drill-sergeant voice' },
  { id: 'hd-3', type: 'Dare', intensity: Intensity.HOT, text: 'Maintain uninterrupted, intense eye contact with the person across from you for 45 seconds without laughing.', penalty: 'Take a penalty sip and hold their hand for 30 seconds' },
  { id: 'hd-4', type: 'Dare', intensity: Intensity.HOT, text: 'Slow dance with the person of the group’s choice for 45 seconds to whatever music is playing (or hummed).', penalty: 'Take a photo cheek-to-cheek with that person' },
  { id: 'hd-5', type: 'Dare', intensity: Intensity.HOT, text: 'Gently kiss the back of the hand of the person you find most charming in the room.', penalty: 'Kiss your own bicep passionately for 10 seconds' },
  { id: 'hd-6', type: 'Dare', intensity: Intensity.HOT, text: 'Let the person on your right feed you a grape, chip, or sip of your drink while you look into their eyes.', penalty: 'Take a double sip with your hands tied behind your back' },
  { id: 'hd-7', type: 'Dare', intensity: Intensity.HOT, text: 'Sit on the lap of the person to your left for the duration of the next round.', penalty: 'Sit shoulder-to-shoulder with them with zero personal space' },
  { id: 'hd-8', type: 'Dare', intensity: Intensity.HOT, text: 'Trace the jawline of the person to your right with one finger very slowly.', penalty: 'Lightly boop their nose and take a sip' },
  { id: 'hd-9', type: 'Dare', intensity: Intensity.HOT, text: 'Send a flirty text to your current crush or the last person you matched with on a dating app.', penalty: 'Let the group choose the emoji you must send them' },
  { id: 'hd-10', type: 'Dare', intensity: Intensity.HOT, text: 'Unbutton or unzip the top button/zipper of your shirt or jacket for the rest of the game.', penalty: 'Take off your shoes and socks' },
  { id: 'hd-11', type: 'Dare', intensity: Intensity.HOT, text: 'Give a passionate 20-second monologue about how irresistible the person across from you looks tonight.', penalty: 'Give them three sincere compliments about their personality' },
  { id: 'hd-12', type: 'Dare', intensity: Intensity.HOT, text: 'Let someone in the room blindfold you and guess who touches your shoulder using only your senses.', penalty: 'Take a sip of your drink if you guess wrong' },
  { id: 'hd-13', type: 'Dare', intensity: Intensity.HOT, text: 'Swap shirts or hoodies with someone of the opposite gender (or of your choice) in the room.', penalty: 'Wear your current shirt rolled up like a crop top for 2 turns' },
  { id: 'hd-14', type: 'Dare', intensity: Intensity.HOT, text: 'Hold hands with the person to your right with your fingers fully intertwined for the next 3 rounds.', penalty: 'Hold their pinky finger for the next 3 rounds' },
  { id: 'hd-15', type: 'Dare', intensity: Intensity.HOT, text: 'Gently blow on the neck of the person to your left.', penalty: 'Whisper a secret about yourself to them' },
  { id: 'hd-16', type: 'Dare', intensity: Intensity.HOT, text: 'Show the group the last photo you took of yourself that you considered too hot or spicy to post.', penalty: 'Show your lock screen wallpaper to the room' },
  { id: 'hd-17', type: 'Dare', intensity: Intensity.HOT, text: 'Let the person across from you smell your neck and rate your perfume/cologne out of 10.', penalty: 'Spritz or apply a drop of scent to their wrist' },
  { id: 'hd-18', type: 'Dare', intensity: Intensity.HOT, text: 'Do your best slow, sensual strut across the room to music selected by the group.', penalty: 'Do 10 hip thrusts to the rhythm of the beat' },
  { id: 'hd-19', type: 'Dare', intensity: Intensity.HOT, text: 'Let the person to your left put their head on your shoulder or lap for the next round.', penalty: 'Lean your head on their shoulder for the next round' },
  { id: 'hd-20', type: 'Dare', intensity: Intensity.HOT, text: 'Bite a piece of fruit or snack from the same piece being held by someone else’s mouth (lady-and-the-tramp style).', penalty: 'Take a shot/sip together with arms linked' },
  { id: 'hd-21', type: 'Dare', intensity: Intensity.HOT, text: 'Give the person you are most drawn to in the room a tender kiss on the cheek or forehead.', penalty: 'Give them the tightest bear hug you can muster for 10 seconds' },
  { id: 'hd-22', type: 'Dare', intensity: Intensity.HOT, text: 'Whisper what you would do if the two of you were alone right now to the person on your right.', penalty: 'Drink two sips and keep everyone guessing' },
  { id: 'hd-23', type: 'Dare', intensity: Intensity.HOT, text: 'Let someone in the group apply lip balm or lipstick to your lips.', penalty: 'Apply lip balm to yourself using only your tongue' },
  { id: 'hd-24', type: 'Dare', intensity: Intensity.HOT, text: 'Compliment the body part of three different people in the room with absolute sincerity.', penalty: 'Compliment yourself in the mirror out loud for 15 seconds' },
  { id: 'hd-25', type: 'Dare', intensity: Intensity.HOT, text: 'Take a sultry selfie with the person to your left and save it to your favorites.', penalty: 'Make a goofy duck face in the photo instead' },

  // ==========================================
  // VULGAR TRUTHS (vt-1 to vt-25)
  // Raw, unfiltered, adult underground club confessions
  // ==========================================
  { id: 'vt-1', type: 'Truth', intensity: Intensity.VULGAR, text: 'What is the absolute wildest or most inappropriate place you have ever hooked up or done the deed?', penalty: 'Take a shot or drain your glass' },
  { id: 'vt-2', type: 'Truth', intensity: Intensity.VULGAR, text: 'What is a specific kink, fetish, or fantasy that you would be terrified if your family or coworkers found out about?', penalty: 'Down half your drink in silence' },
  { id: 'vt-3', type: 'Truth', intensity: Intensity.VULGAR, text: 'Have you ever had a one-night stand that you regretted before the morning even arrived?', penalty: 'Take a shot and state what made you regret it' },
  { id: 'vt-4', type: 'Truth', intensity: Intensity.VULGAR, text: 'What is the dirtiest thought you have had in the past 24 hours?', penalty: 'Confess who or what triggered the thought' },
  { id: 'vt-5', type: 'Truth', intensity: Intensity.VULGAR, text: 'Have you ever walked in on someone having sex, or has someone walked in on you? What happened?', penalty: 'Reenact your exact face when the door opened' },
  { id: 'vt-6', type: 'Truth', intensity: Intensity.VULGAR, text: 'What is the highest number of times you have gotten intimate or gotten off in a single 24-hour period?', penalty: 'Take a sip for every time past 3' },
  { id: 'vt-7', type: 'Truth', intensity: Intensity.VULGAR, text: 'What is your honest body count, or the range if you lost count?', penalty: 'Take a shot if you refuse to answer' },
  { id: 'vt-8', type: 'Truth', intensity: Intensity.VULGAR, text: 'Have you ever sent a full-frontal nude photo? How many people currently possess one?', penalty: 'State the last time you took one' },
  { id: 'vt-9', type: 'Truth', intensity: Intensity.VULGAR, text: 'What is the worst sexual performance or most disappointing encounter you have ever endured?', penalty: 'Describe the excuse you used to escape' },
  { id: 'vt-10', type: 'Truth', intensity: Intensity.VULGAR, text: 'Have you ever hooked up with two different people within the span of 48 hours?', penalty: 'Take two sips of your drink' },
  { id: 'vt-11', type: 'Truth', intensity: Intensity.VULGAR, text: 'What is the most shameful or taboo porn category or erotica search you have ever engaged with?', penalty: 'Take a shot and promise never to look at browser history again' },
  { id: 'vt-12', type: 'Truth', intensity: Intensity.VULGAR, text: 'Have you ever faked an orgasm? How frequently does it happen?', penalty: 'Demonstrate your fake orgasm noise for 3 seconds or take a shot' },
  { id: 'vt-13', type: 'Truth', intensity: Intensity.VULGAR, text: 'What is the dirtiest piece of dirty talk you have ever said or had whispered to you in bed?', penalty: 'Whisper it into the ear of the person on your right' },
  { id: 'vt-14', type: 'Truth', intensity: Intensity.VULGAR, text: 'Have you ever had an intimate encounter in a car, public restroom, or outdoors? Where was it?', penalty: 'Confess whether you were caught or nearly caught' },
  { id: 'vt-15', type: 'Truth', intensity: Intensity.VULGAR, text: 'Who in this room would you be most physically compatible with in bed, purely based on vibe?', penalty: 'Take a shot and hold eye contact with that person' },
  { id: 'vt-16', type: 'Truth', intensity: Intensity.VULGAR, text: 'Have you ever used food, ice, or household items during intimacy? What was it?', penalty: 'Admit if it was a sticky disaster or an absolute success' },
  { id: 'vt-17', type: 'Truth', intensity: Intensity.VULGAR, text: 'Have you ever had a sexual thought about a teacher, boss, or friend’s parent?', penalty: 'Take a sip and nod solemnly' },
  { id: 'vt-18', type: 'Truth', intensity: Intensity.VULGAR, text: 'What is the boldest sexual proposition you have ever received or given in a club or party?', penalty: 'Describe how you rejected or accepted it' },
  { id: 'vt-19', type: 'Truth', intensity: Intensity.VULGAR, text: 'Have you ever participated in a threesome or group intimacy? Would you if given the chance?', penalty: 'Take a shot if you have' },
  { id: 'vt-20', type: 'Truth', intensity: Intensity.VULGAR, text: 'What is something you love during sex that you feel slightly embarrassed to ask for?', penalty: 'Down your drink or confess' },
  { id: 'vt-21', type: 'Truth', intensity: Intensity.VULGAR, text: 'Have you ever touched yourself while on a phone or video call with someone who didn’t know?', penalty: 'Take two sips and stare into space' },
  { id: 'vt-22', type: 'Truth', intensity: Intensity.VULGAR, text: 'Have you ever had sex with an ex while one or both of you were in a new relationship?', penalty: 'Take a heavy shot of truth' },
  { id: 'vt-23', type: 'Truth', intensity: Intensity.VULGAR, text: 'What is your favorite position, and why does it work best for you?', penalty: 'Name the position without laughing' },
  { id: 'vt-24', type: 'Truth', intensity: Intensity.VULGAR, text: 'Have you ever recorded a spicy video or audio clip of an intimate encounter?', penalty: 'State whether it still exists or was deleted' },
  { id: 'vt-25', type: 'Truth', intensity: Intensity.VULGAR, text: 'What is the most scandalous secret you are carrying that could ruin a relationship right now?', penalty: 'Take a double shot and swear to take it to your grave' },

  // ==========================================
  // VULGAR DARES (vd-1 to vd-25)
  // Bold, physical, provocative, boundary-pushing dares
  // ==========================================
  { id: 'vd-1', type: 'Dare', intensity: Intensity.VULGAR, text: 'Remove one significant piece of clothing (socks and jewelry do not count).', penalty: 'Take two full shots of your drink' },
  { id: 'vd-2', type: 'Dare', intensity: Intensity.VULGAR, text: 'Let the person to your left leave a visible hickey or love-bite on your neck or collarbone.', penalty: 'Remove an article of clothing instead' },
  { id: 'vd-3', type: 'Dare', intensity: Intensity.VULGAR, text: 'Lick whipped cream, honey, or a drop of beverage off the neck of the person across from you.', penalty: 'Take a shot and let that person flick your ear' },
  { id: 'vd-4', type: 'Dare', intensity: Intensity.VULGAR, text: 'Give a 20-second sensual lap dance to the person of the group’s choice.', penalty: 'Remove two articles of clothing' },
  { id: 'vd-5', type: 'Dare', intensity: Intensity.VULGAR, text: 'Let someone in the room reach under your shirt and trace their fingernails across your stomach or back.', penalty: 'Take a shot with no chaser' },
  { id: 'vd-6', type: 'Dare', intensity: Intensity.VULGAR, text: 'Kiss the person of the group’s choice on the lips for a full 10 seconds.', penalty: 'Down your entire drink in one go' },
  { id: 'vd-7', type: 'Dare', intensity: Intensity.VULGAR, text: 'Send a voice note to someone in your contacts breathing heavily and saying "I need you tonight."', penalty: 'Show your last 3 camera roll photos to everyone in the room' },
  { id: 'vd-8', type: 'Dare', intensity: Intensity.VULGAR, text: 'Put an ice cube in your mouth and run it across the bare collarbone of the person on your right.', penalty: 'Let them drop the ice cube down your shirt' },
  { id: 'vd-9', type: 'Dare', intensity: Intensity.VULGAR, text: 'Demonstrate your favorite sexual move or stroke on an innocent pillow or couch cushion for 15 seconds.', penalty: 'Take a shot and apologize to the furniture' },
  { id: 'vd-10', type: 'Dare', intensity: Intensity.VULGAR, text: 'Let the person to your right slide their hands into your back pockets and hold you close for 30 seconds.', penalty: 'Let them spank your rear once with moderate enthusiasm' },
  { id: 'vd-11', type: 'Dare', intensity: Intensity.VULGAR, text: 'Unbutton your pants or lift your skirt/shorts to reveal your underwear band to the group.', penalty: 'Take off your shirt for the next 2 rounds' },
  { id: 'vd-12', type: 'Dare', intensity: Intensity.VULGAR, text: 'Make your authentic orgasm sound at full volume right now.', penalty: 'Do 10 hip thrusts against the wall while looking at the group' },
  { id: 'vd-13', type: 'Dare', intensity: Intensity.VULGAR, text: 'Whisper the most vulgar, explicit sentence you can think of directly into someone’s ear.', penalty: 'Say it out loud to the entire room' },
  { id: 'vd-14', type: 'Dare', intensity: Intensity.VULGAR, text: 'Let someone in the room blindfold you and feed you a mysterious snack using only their lips.', penalty: 'Take a double shot of whatever liquor is nearest' },
  { id: 'vd-15', type: 'Dare', intensity: Intensity.VULGAR, text: 'Play 7 minutes in heaven in a dark closet or bathroom with the person chosen by the group.', penalty: 'Both players take two shots and remove one article of clothing' },
  { id: 'vd-16', type: 'Dare', intensity: Intensity.VULGAR, text: 'Gently bite the earlobe of the person to your left.', penalty: 'Let them pull on your ear for 5 seconds' },
  { id: 'vd-17', type: 'Dare', intensity: Intensity.VULGAR, text: 'Take a body shot of liquor or a drink off the stomach or chest of someone in the room.', penalty: 'Let them pour the shot directly into your mouth from above' },
  { id: 'vd-18', type: 'Dare', intensity: Intensity.VULGAR, text: 'Sit on the lap of the person across from you and whisper dirty secrets until your next turn.', penalty: 'Take a shot and sit on the floor for 2 turns' },
  { id: 'vd-19', type: 'Dare', intensity: Intensity.VULGAR, text: 'Let the group inspect your hidden photos album or "recently deleted" folder for 30 seconds.', penalty: 'Down your glass completely' },
  { id: 'vd-20', type: 'Dare', intensity: Intensity.VULGAR, text: 'Remove your top and wear only your bra or undershirt for the rest of the game.', penalty: 'Take off both shoes, socks, and your pants instead' },
  { id: 'vd-21', type: 'Dare', intensity: Intensity.VULGAR, text: 'Let the person to your right give you a firm spank on your butt in front of the group.', penalty: 'Receive two spanks from the person to your left' },
  { id: 'vd-22', type: 'Dare', intensity: Intensity.VULGAR, text: 'French kiss the person to your right for 15 seconds.', penalty: 'Both of you finish your drinks together' },
  { id: 'vd-23', type: 'Dare', intensity: Intensity.VULGAR, text: 'Let the group take a suggestive photo of you and post it to your close friends story.', penalty: 'Remove two articles of clothing immediately' },
  { id: 'vd-24', type: 'Dare', intensity: Intensity.VULGAR, text: 'Trade pants or shorts with someone in the room right now.', penalty: 'Finish the game in your underwear' },
  { id: 'vd-25', type: 'Dare', intensity: Intensity.VULGAR, text: 'Let someone write a vulgar or naughty word on your inner thigh with a pen or marker.', penalty: 'Take two shots and leave the word on for 24 hours' },

  // ==========================================
  // NEVER HAVE I EVER - SOFT (ns-1 to ns-25)
  // Relatable, funny social mistakes, embarrassing habits
  // ==========================================
  { id: 'ns-1', type: 'NeverHaveIEver', intensity: Intensity.SOFT, text: 'Never have I ever faked being sick to skip school, work, or an event I promised to attend.', penalty: 'Confess the most ridiculous fake symptom you invented' },
  { id: 'ns-2', type: 'NeverHaveIEver', intensity: Intensity.SOFT, text: 'Never have I ever accidentally used someone else’s toothbrush and only realized afterward.', penalty: 'Take a solid gulp of water and make a disgusted face' },
  { id: 'ns-3', type: 'NeverHaveIEver', intensity: Intensity.SOFT, text: 'Never have I ever snooped through someone’s phone when they left the room.', penalty: 'Let the person next to you see the last text you received' },
  { id: 'ns-4', type: 'NeverHaveIEver', intensity: Intensity.SOFT, text: 'Never have I ever waved back enthusiastically at someone who was actually waving to someone behind me.', penalty: 'Wave enthusiastically out the window or at a blank wall for 10 seconds' },
  { id: 'ns-5', type: 'NeverHaveIEver', intensity: Intensity.SOFT, text: 'Never have I ever tripped in public and pretended I was breaking into a casual jog.', penalty: 'Reenact the stumble-jog right now' },
  { id: 'ns-6', type: 'NeverHaveIEver', intensity: Intensity.SOFT, text: 'Never have I ever sung loudly in the shower or car believing I sounded like a pop legend.', penalty: 'Hit the highest note you can produce right now' },
  { id: 'ns-7', type: 'NeverHaveIEver', intensity: Intensity.SOFT, text: 'Never have I ever googled my own name to see what comes up.', penalty: 'Say what your top google search result was' },
  { id: 'ns-8', type: 'NeverHaveIEver', intensity: Intensity.SOFT, text: 'Never have I ever pretended to know a song or band just to seem cool to someone I liked.', penalty: 'Hum a fake song for 10 seconds with intense passion' },
  { id: 'ns-9', type: 'NeverHaveIEver', intensity: Intensity.SOFT, text: 'Never have I ever walked into a glass door or screen window full speed.', penalty: 'Gently press your face against the nearest wall for 5 seconds' },
  { id: 'ns-10', type: 'NeverHaveIEver', intensity: Intensity.SOFT, text: 'Never have I ever laughed so hard that beverage sprayed out of my nose or mouth.', penalty: 'Drink a sip of water without swallowing for 15 seconds' },
  { id: 'ns-11', type: 'NeverHaveIEver', intensity: Intensity.SOFT, text: 'Never have I ever blamed a weird smell on a dog, child, or mysterious outdoor breeze.', penalty: 'Take a sip and apologize to all dogs' },
  { id: 'ns-12', type: 'NeverHaveIEver', intensity: Intensity.SOFT, text: 'Never have I ever spent more than 4 hours in a single sitting watching TikTok, Reels, or YouTube shorts.', penalty: 'Stand up and stretch your back for 15 seconds' },
  { id: 'ns-13', type: 'NeverHaveIEver', intensity: Intensity.SOFT, text: 'Never have I ever sent a message talking about someone to the exact person I was talking about.', penalty: 'Take two sips of your drink to dull the painful memory' },
  { id: 'ns-14', type: 'NeverHaveIEver', intensity: Intensity.SOFT, text: 'Never have I ever cried during an animated movie or Pixar film.', penalty: 'Name the movie and sniffle dramatically' },
  { id: 'ns-15', type: 'NeverHaveIEver', intensity: Intensity.SOFT, text: 'Never have I ever eaten food that fell directly into the kitchen sink.', penalty: 'Confess what food it was' },
  { id: 'ns-16', type: 'NeverHaveIEver', intensity: Intensity.SOFT, text: 'Never have I ever pulled a door that clearly said "PUSH" with someone watching.', penalty: 'Push the air in front of you 5 times' },
  { id: 'ns-17', type: 'NeverHaveIEver', intensity: Intensity.SOFT, text: 'Never have I ever bought something online at 2 AM that I completely forgot about until it arrived.', penalty: 'Tell the group what the item was' },
  { id: 'ns-18', type: 'NeverHaveIEver', intensity: Intensity.SOFT, text: 'Never have I ever had a conversation with myself out loud when I thought nobody was home.', penalty: 'Say your last internal thought out loud' },
  { id: 'ns-19', type: 'NeverHaveIEver', intensity: Intensity.SOFT, text: 'Never have I ever worn the same pair of jeans for more than a week straight without washing them.', penalty: 'Admit how long the streak was' },
  { id: 'ns-20', type: 'NeverHaveIEver', intensity: Intensity.SOFT, text: 'Never have I ever accidentally liked an old photo while deep-stalking someone on Instagram.', penalty: 'Take a sip of your drink in shame' },
  { id: 'ns-21', type: 'NeverHaveIEver', intensity: Intensity.SOFT, text: 'Never have I ever fallen asleep in a movie theater, lecture, or religious service.', penalty: 'Snore loudly once right now' },
  { id: 'ns-22', type: 'NeverHaveIEver', intensity: Intensity.SOFT, text: 'Never have I ever taken credit for a joke or comeback that someone else muttered first.', penalty: 'Give credit to that person in spirit' },
  { id: 'ns-23', type: 'NeverHaveIEver', intensity: Intensity.SOFT, text: 'Never have I ever lied about my age to get into a venue, website, or get a discount.', penalty: 'State your fictional age with a straight face' },
  { id: 'ns-24', type: 'NeverHaveIEver', intensity: Intensity.SOFT, text: 'Never have I ever peed in an ocean, lake, or public swimming pool.', penalty: 'Drink a glass of water without breaking eye contact' },
  { id: 'ns-25', type: 'NeverHaveIEver', intensity: Intensity.SOFT, text: 'Never have I ever ghosted a group chat for weeks because checking 300 messages gave me anxiety.', penalty: 'Send a wave emoji to that group chat right now' },

  // ==========================================
  // NEVER HAVE I EVER - HOT (nh-1 to nh-25)
  // Dating drama, attraction, spicy romantic escapades
  // ==========================================
  { id: 'nh-1', type: 'NeverHaveIEver', intensity: Intensity.HOT, text: 'Never have I ever had a massive crush on a close friend’s partner or ex.', penalty: 'Take two sips of your drink and don’t look at anyone' },
  { id: 'nh-2', type: 'NeverHaveIEver', intensity: Intensity.HOT, text: 'Never have I ever ghosted someone immediately after a fantastic first date.', penalty: 'Confess why you vanished' },
  { id: 'nh-3', type: 'NeverHaveIEver', intensity: Intensity.HOT, text: 'Never have I ever kissed someone just because the setting or music felt cinematic.', penalty: 'Describe the setting in one dramatic sentence' },
  { id: 'nh-4', type: 'NeverHaveIEver', intensity: Intensity.HOT, text: 'Never have I ever flirted with someone to make my date or ex jealous in the same room.', penalty: 'Take a penalty sip' },
  { id: 'nh-5', type: 'NeverHaveIEver', intensity: Intensity.HOT, text: 'Never have I ever had a steamy make-out session in a cinema, stairwell, or car back seat.', penalty: 'Take a sip and smile' },
  { id: 'nh-6', type: 'NeverHaveIEver', intensity: Intensity.HOT, text: 'Never have I ever dated someone solely because they were gorgeous, despite having zero personality.', penalty: 'State how many dates it lasted' },
  { id: 'nh-7', type: 'NeverHaveIEver', intensity: Intensity.HOT, text: 'Never have I ever lied about my relationship status or relationship history on a night out.', penalty: 'Confess what lie you told' },
  { id: 'nh-8', type: 'NeverHaveIEver', intensity: Intensity.HOT, text: 'Never have I ever sent a suggestive or spicy photo while still on a family gathering or work shift.', penalty: 'Take a big sip of your beverage' },
  { id: 'nh-9', type: 'NeverHaveIEver', intensity: Intensity.HOT, text: 'Never have I ever kissed more than two different people on the same night out.', penalty: 'Take a sip for each person' },
  { id: 'nh-10', type: 'NeverHaveIEver', intensity: Intensity.HOT, text: 'Never have I ever slept in the same bed with someone intending to just sleep and ended up doing much more.', penalty: 'Take a double sip' },
  { id: 'nh-11', type: 'NeverHaveIEver', intensity: Intensity.HOT, text: 'Never have I ever had a crush on someone currently sitting in this very circle.', penalty: 'Wink at the ceiling or take a shot' },
  { id: 'nh-12', type: 'NeverHaveIEver', intensity: Intensity.HOT, text: 'Never have I ever gone on a date with someone just for a free expensive dinner.', penalty: 'State what meal you ordered' },
  { id: 'nh-13', type: 'NeverHaveIEver', intensity: Intensity.HOT, text: 'Never have I ever had a "friends with benefits" arrangement catch severe romantic feelings.', penalty: 'Admit who caught feelings first' },
  { id: 'nh-14', type: 'NeverHaveIEver', intensity: Intensity.HOT, text: 'Never have I ever hooked up with an ex months after swearing to everyone I was completely over them.', penalty: 'Take a penalty drink and hang your head' },
  { id: 'nh-15', type: 'NeverHaveIEver', intensity: Intensity.HOT, text: 'Never have I ever left a party or bar with someone I met less than an hour earlier.', penalty: 'Take a shot or drain half your glass' },
  { id: 'nh-16', type: 'NeverHaveIEver', intensity: Intensity.HOT, text: 'Never have I ever practiced my flirty pickup lines on my pet or stuffed animal.', penalty: 'Deliver your line to the nearest empty chair' },
  { id: 'nh-17', type: 'NeverHaveIEver', intensity: Intensity.HOT, text: 'Never have I ever had a romantic partner wake up to find me admiring them while they slept.', penalty: 'Smile warmly at the person on your left' },
  { id: 'nh-18', type: 'NeverHaveIEver', intensity: Intensity.HOT, text: 'Never have I ever kissed someone whose name I didn’t know until the following morning.', penalty: 'Take two sips of your drink' },
  { id: 'nh-19', type: 'NeverHaveIEver', intensity: Intensity.HOT, text: 'Never have I ever sent a risky text and immediately turned my phone upside down in terror.', penalty: 'Hold your phone upside down for 20 seconds' },
  { id: 'nh-20', type: 'NeverHaveIEver', intensity: Intensity.HOT, text: 'Never have I ever had an intense romantic dream that made interacting with that person awkward the next day.', penalty: 'Take a sip and look around the room' },
  { id: 'nh-21', type: 'NeverHaveIEver', intensity: Intensity.HOT, text: 'Never have I ever had someone write a song, poem, or love letter about me.', penalty: 'Recite one line or take a drink' },
  { id: 'nh-22', type: 'NeverHaveIEver', intensity: Intensity.HOT, text: 'Never have I ever skinny-dipped under the moonlight with someone I fancied.', penalty: 'Take a sip and look dreamy' },
  { id: 'nh-23', type: 'NeverHaveIEver', intensity: Intensity.HOT, text: 'Never have I ever pretended to be drunker than I was just to kiss or get close to someone.', penalty: 'Take a penalty sip' },
  { id: 'nh-24', type: 'NeverHaveIEver', intensity: Intensity.HOT, text: 'Never have I ever matched with a coworker, boss, or client on a dating app.', penalty: 'Admit if you swiped right or left' },
  { id: 'nh-25', type: 'NeverHaveIEver', intensity: Intensity.HOT, text: 'Never have I ever received a late-night "u up?" text and actually rushed over.', penalty: 'State how long it took you to get there' },

  // ==========================================
  // NEVER HAVE I EVER - VULGAR (nv-1 to nv-25)
  // Scandalous, wild, NSFW, unhinged club stories
  // ==========================================
  { id: 'nv-1', type: 'NeverHaveIEver', intensity: Intensity.VULGAR, text: 'Never have I ever hooked up or done the deed in a public or semi-public place.', penalty: 'Take a full shot of your drink' },
  { id: 'nv-2', type: 'NeverHaveIEver', intensity: Intensity.VULGAR, text: 'Never have I ever accidentally sent a spicy or nude photo to the wrong contact.', penalty: 'Take a shot and describe the sheer horror' },
  { id: 'nv-3', type: 'NeverHaveIEver', intensity: Intensity.VULGAR, text: 'Never have I ever hooked up with someone whose face I had never seen before.', penalty: 'Take a shot and explain how that happened' },
  { id: 'nv-4', type: 'NeverHaveIEver', intensity: Intensity.VULGAR, text: 'Never have I ever joined the "Mile High Club" or gotten intimate in transit (plane, train, bus).', penalty: 'Take two shots or drink half your cup' },
  { id: 'nv-5', type: 'NeverHaveIEver', intensity: Intensity.VULGAR, text: 'Never have I ever had a sexual encounter broken up or interrupted by the police or security.', penalty: 'Take a shot and describe your escape route' },
  { id: 'nv-6', type: 'NeverHaveIEver', intensity: Intensity.VULGAR, text: 'Never have I ever been so loud during sex that neighbors knocked or filed a complaint.', penalty: 'Make a quick muffled gasp into your hand' },
  { id: 'nv-7', type: 'NeverHaveIEver', intensity: Intensity.VULGAR, text: 'Never have I ever hooked up with someone whose partner was in the same building or house.', penalty: 'Take a shot of regret' },
  { id: 'nv-8', type: 'NeverHaveIEver', intensity: Intensity.VULGAR, text: 'Never have I ever used handcuffs, rope, or blindfolds during an intimate session.', penalty: 'Take a sip and wink' },
  { id: 'nv-9', type: 'NeverHaveIEver', intensity: Intensity.VULGAR, text: 'Never have I ever accidentally broken a piece of furniture, lamp, or bed during passion.', penalty: 'Admit what furniture piece was destroyed' },
  { id: 'nv-10', type: 'NeverHaveIEver', intensity: Intensity.VULGAR, text: 'Never have I ever done a "walk of shame" wearing yesterday’s clothes in broad daylight.', penalty: 'Walk across the room with your head high' },
  { id: 'nv-11', type: 'NeverHaveIEver', intensity: Intensity.VULGAR, text: 'Never have I ever hooked up with someone whose name I didn’t know until they showed me their ID.', penalty: 'Take a solid shot' },
  { id: 'nv-12', type: 'NeverHaveIEver', intensity: Intensity.VULGAR, text: 'Never have I ever faked an orgasm just to get the whole thing over with so I could sleep or leave.', penalty: 'Demonstrate the fake breathing you used' },
  { id: 'nv-13', type: 'NeverHaveIEver', intensity: Intensity.VULGAR, text: 'Never have I ever had sex in a swimming pool or hot tub and realized chlorine is not a lubricant.', penalty: 'Take a sip and nod in painful understanding' },
  { id: 'nv-14', type: 'NeverHaveIEver', intensity: Intensity.VULGAR, text: 'Never have I ever participated in or been invited to a threesome or group intimate encounter.', penalty: 'Take a double shot' },
  { id: 'nv-15', type: 'NeverHaveIEver', intensity: Intensity.VULGAR, text: 'Never have I ever touched myself in an office, airplane, or public restroom stall.', penalty: 'Take a shot and don’t look at your hands' },
  { id: 'nv-16', type: 'NeverHaveIEver', intensity: Intensity.VULGAR, text: 'Never have I ever owned a collection of toys that could fill a dedicated suitcase.', penalty: 'State the total number of devices you own' },
  { id: 'nv-17', type: 'NeverHaveIEver', intensity: Intensity.VULGAR, text: 'Never have I ever called out the wrong name during an intimate encounter.', penalty: 'Take two shots and pray for forgiveness' },
  { id: 'nv-18', type: 'NeverHaveIEver', intensity: Intensity.VULGAR, text: 'Never have I ever had sex outdoors where hikers, cars, or strangers could have seen us.', penalty: 'Take a shot and specify the nature spot' },
  { id: 'nv-19', type: 'NeverHaveIEver', intensity: Intensity.VULGAR, text: 'Never have I ever lost an item of clothing or underwear at someone’s place and never got it back.', penalty: 'Describe the missing garment' },
  { id: 'nv-20', type: 'NeverHaveIEver', intensity: Intensity.VULGAR, text: 'Never have I ever taken a spicy video and checked the angle during the recording.', penalty: 'Take a sip and strike your best angle' },
  { id: 'nv-21', type: 'NeverHaveIEver', intensity: Intensity.VULGAR, text: 'Never have I ever had a one-night stand steal something from my place the next morning.', penalty: 'Confess what they stole' },
  { id: 'nv-22', type: 'NeverHaveIEver', intensity: Intensity.VULGAR, text: 'Never have I ever hooked up with two people who were friends or roommates with each other.', penalty: 'Take two shots' },
  { id: 'nv-23', type: 'NeverHaveIEver', intensity: Intensity.VULGAR, text: 'Never have I ever sneaked out of someone’s window or balcony to avoid being seen by their family/roommates.', penalty: 'Reenact the stealth climb' },
  { id: 'nv-24', type: 'NeverHaveIEver', intensity: Intensity.VULGAR, text: 'Never have I ever had a spicy dream so realistic I woke up genuinely confused about where I was.', penalty: 'Take a drink' },
  { id: 'nv-25', type: 'NeverHaveIEver', intensity: Intensity.VULGAR, text: 'Never have I ever had intimacy in a workplace after hours or during a shift.', penalty: 'Take a shot and don’t name the company' },

  // ==========================================
  // MOST LIKELY TO - SOFT (ml-s-1 to ml-s-15)
  // Relatable quirks, funny habits, social fun
  // ==========================================
  { id: 'ml-s-1', type: 'MostLikelyTo', intensity: Intensity.SOFT, text: 'Most likely to trip over their own feet on completely flat ground.', penalty: 'Walk across the room like a penguin' },
  { id: 'ml-s-2', type: 'MostLikelyTo', intensity: Intensity.SOFT, text: 'Most likely to cry during an animated or Pixar movie.', penalty: 'Pretend to sob dramatically for 10 seconds' },
  { id: 'ml-s-3', type: 'MostLikelyTo', intensity: Intensity.SOFT, text: 'Most likely to blow their entire paycheck on takeout food in 3 days.', penalty: 'List the last 3 food orders you made' },
  { id: 'ml-s-4', type: 'MostLikelyTo', intensity: Intensity.SOFT, text: 'Most likely to accidentally join a cult because the snacks were top-tier.', penalty: 'Invent a 5-second cult greeting chant' },
  { id: 'ml-s-5', type: 'MostLikelyTo', intensity: Intensity.SOFT, text: 'Most likely to wander around a parking lot for 30 minutes looking for their car.', penalty: 'Beep like a lost car key fob' },
  { id: 'ml-s-6', type: 'MostLikelyTo', intensity: Intensity.SOFT, text: 'Most likely to adopt 5 stray animals without asking their roommates or partner.', penalty: 'Make your best animal sound impression' },
  { id: 'ml-s-7', type: 'MostLikelyTo', intensity: Intensity.SOFT, text: 'Most likely to fall asleep at a loud house party or live concert.', penalty: 'Fake snore for 10 seconds' },
  { id: 'ml-s-8', type: 'MostLikelyTo', intensity: Intensity.SOFT, text: 'Most likely to speak in a foreign accent after watching one overseas show.', penalty: 'Speak in an exaggerated accent for the next round' },
  { id: 'ml-s-9', type: 'MostLikelyTo', intensity: Intensity.SOFT, text: 'Most likely to send a screenshot back to the person who originally sent it.', penalty: 'Show the room your latest saved photo' },
  { id: 'ml-s-10', type: 'MostLikelyTo', intensity: Intensity.SOFT, text: 'Most likely to laugh at the most inappropriate, serious moment imaginable.', penalty: 'Try not to laugh while everyone stares at you for 15s' },
  { id: 'ml-s-11', type: 'MostLikelyTo', intensity: Intensity.SOFT, text: 'Most likely to get locked out of their own house wearing pajamas.', penalty: 'Mime knocking on an imaginary door in desperation' },
  { id: 'ml-s-12', type: 'MostLikelyTo', intensity: Intensity.SOFT, text: 'Most likely to become a viral TikTok meme for doing something completely silly.', penalty: 'Perform a 10-second TikTok dance trend' },
  { id: 'ml-s-13', type: 'MostLikelyTo', intensity: Intensity.SOFT, text: 'Most likely to stay in bed for 16 consecutive hours on a weekend.', penalty: 'Yawn loudly and stretch like a cat' },
  { id: 'ml-s-14', type: 'MostLikelyTo', intensity: Intensity.SOFT, text: 'Most likely to microwave metal foil or set off the smoke alarm boiling pasta.', penalty: 'Take a penalty sip' },
  { id: 'ml-s-15', type: 'MostLikelyTo', intensity: Intensity.SOFT, text: 'Most likely to spend 45 minutes picking a movie and then fall asleep during the intro.', penalty: 'Recommend a movie with zero hesitation' },

  // ==========================================
  // MOST LIKELY TO - HOT (ml-h-1 to ml-h-15)
  // Spicy gossip, messy dating, chaotic romance
  // ==========================================
  { id: 'ml-h-1', type: 'MostLikelyTo', intensity: Intensity.HOT, text: 'Most likely to drunk text their toxic ex at 3 AM with zero regrets.', penalty: 'Take 2 penalty sips' },
  { id: 'ml-h-2', type: 'MostLikelyTo', intensity: Intensity.HOT, text: 'Most likely to fall madly in love on the very first date.', penalty: 'Declare your love to an inanimate object in the room' },
  { id: 'ml-h-3', type: 'MostLikelyTo', intensity: Intensity.HOT, text: 'Most likely to ghost someone because of their astrology sign or a petty ick.', penalty: 'Confess your weirdest dating ick' },
  { id: 'ml-h-4', type: 'MostLikelyTo', intensity: Intensity.HOT, text: 'Most likely to juggle a secret roster of three talking stages at once.', penalty: 'Admit how many people you are currently texting' },
  { id: 'ml-h-5', type: 'MostLikelyTo', intensity: Intensity.HOT, text: 'Most likely to wake up in another city or party with no idea how they got there.', penalty: 'Take 2 sips of your drink' },
  { id: 'ml-h-6', type: 'MostLikelyTo', intensity: Intensity.HOT, text: 'Most likely to kiss someone at a club and forget their name within 10 minutes.', penalty: 'Spell your name backwards out loud' },
  { id: 'ml-h-7', type: 'MostLikelyTo', intensity: Intensity.HOT, text: 'Most likely to flirt their way out of a speeding ticket or parking fine.', penalty: 'Wink at the person across from you' },
  { id: 'ml-h-8', type: 'MostLikelyTo', intensity: Intensity.HOT, text: 'Most likely to deep-stalk a crush’s Spotify listening activity and Venmo history.', penalty: 'Take a drink of shame' },
  { id: 'ml-h-9', type: 'MostLikelyTo', intensity: Intensity.HOT, text: 'Most likely to end up as the villain on a reality dating show.', penalty: 'Give a 15-second reality show villain speech' },
  { id: 'ml-h-10', type: 'MostLikelyTo', intensity: Intensity.HOT, text: 'Most likely to get kicked out of a club for being way too chaotic on the speakers.', penalty: 'Do a dramatic dance move right now' },
  { id: 'ml-h-11', type: 'MostLikelyTo', intensity: Intensity.HOT, text: 'Most likely to stay in an on-again off-again situationship for two full years.', penalty: 'Take 2 sips and sigh deeply' },
  { id: 'ml-h-12', type: 'MostLikelyTo', intensity: Intensity.HOT, text: 'Most likely to slide into a verified celebrity’s Instagram DMs with total confidence.', penalty: 'Read the draft message aloud' },
  { id: 'ml-h-13', type: 'MostLikelyTo', intensity: Intensity.HOT, text: 'Most likely to go home with someone solely because their apartment has a cute dog.', penalty: 'Pet the imaginary dog with excitement' },
  { id: 'ml-h-14', type: 'MostLikelyTo', intensity: Intensity.HOT, text: 'Most likely to accidentally spill someone else’s biggest romantic secret while tipsy.', penalty: 'Apologize to the room in advance' },
  { id: 'ml-h-15', type: 'MostLikelyTo', intensity: Intensity.HOT, text: 'Most likely to start a dramatic public argument with their date in a restaurant.', penalty: 'Take a penalty drink' },

  // ==========================================
  // MOST LIKELY TO - VULGAR (ml-v-1 to ml-v-15)
  // Unhinged, wild nightlife, NSFW escapades
  // ==========================================
  { id: 'ml-v-1', type: 'MostLikelyTo', intensity: Intensity.VULGAR, text: 'Most likely to hook up with someone in a single-stall bathroom at a packed party.', penalty: 'Take a full shot of your drink' },
  { id: 'ml-v-2', type: 'MostLikelyTo', intensity: Intensity.VULGAR, text: 'Most likely to have an accidental wardrobe malfunction in the middle of a dancefloor.', penalty: 'Take a shot and strike a pose' },
  { id: 'ml-v-3', type: 'MostLikelyTo', intensity: Intensity.VULGAR, text: 'Most likely to have a secret spicy burner account or spicy photo vault on their phone.', penalty: 'Show how many hidden photos you have' },
  { id: 'ml-v-4', type: 'MostLikelyTo', intensity: Intensity.VULGAR, text: 'Most likely to get caught in the act by a friend, roommate, or landlord.', penalty: 'Take a shot in silence' },
  { id: 'ml-v-5', type: 'MostLikelyTo', intensity: Intensity.VULGAR, text: 'Most likely to hook up with someone purely for revenge on an ex.', penalty: 'Take a double shot of regret' },
  { id: 'ml-v-6', type: 'MostLikelyTo', intensity: Intensity.VULGAR, text: 'Most likely to suggest an impromptu threesome after two tequila shots.', penalty: 'Take a penalty sip and look innocent' },
  { id: 'ml-v-7', type: 'MostLikelyTo', intensity: Intensity.VULGAR, text: 'Most likely to own an entire locked nightstand dedicated to adult toys and restraints.', penalty: 'State the color of your favorite device' },
  { id: 'ml-v-8', type: 'MostLikelyTo', intensity: Intensity.VULGAR, text: 'Most likely to accidentally send a spicy selfie to a family group chat.', penalty: 'Take a shot and pray it never happens' },
  { id: 'ml-v-9', type: 'MostLikelyTo', intensity: Intensity.VULGAR, text: 'Most likely to date someone twice their age for the luxury lifestyle.', penalty: 'State your ideal sugar partner criteria' },
  { id: 'ml-v-10', type: 'MostLikelyTo', intensity: Intensity.VULGAR, text: 'Most likely to secretly have the highest body count in this entire circle.', penalty: 'Take a confident sip' },
  { id: 'ml-v-11', type: 'MostLikelyTo', intensity: Intensity.VULGAR, text: 'Most likely to do a walk of shame with mismatched shoes and inside-out pants.', penalty: 'Walk across the room with a confident stride' },
  { id: 'ml-v-12', type: 'MostLikelyTo', intensity: Intensity.VULGAR, text: 'Most likely to lose their underwear during an adventurous night out.', penalty: 'Take a shot' },
  { id: 'ml-v-13', type: 'MostLikelyTo', intensity: Intensity.VULGAR, text: 'Most likely to make noises so loud during intimacy that the neighbors file a noise complaint.', penalty: 'Do a muffled giggle into your sleeve' },
  { id: 'ml-v-14', type: 'MostLikelyTo', intensity: Intensity.VULGAR, text: 'Most likely to get blacklisted from an Airbnb for excessive late-night partying.', penalty: 'Take two sips' },
  { id: 'ml-v-15', type: 'MostLikelyTo', intensity: Intensity.VULGAR, text: 'Most likely to hook up in a car parked in a grocery store parking lot.', penalty: 'Honk an imaginary car horn twice' },

  // ==========================================
  // WOULD YOU RATHER - SOFT (wyr-s-1 to wyr-s-15)
  // Dilemmas formatted as Option A || Option B
  // ==========================================
  { id: 'wyr-s-1', type: 'WouldYouRather', intensity: Intensity.SOFT, text: 'Always narrate your inner thoughts out loud || Have everyone hear whatever song is stuck in your head 24/7.', penalty: 'Sing your current earworm' },
  { id: 'wyr-s-2', type: 'WouldYouRather', intensity: Intensity.SOFT, text: 'Only be able to whisper || Only be able to shout whenever you speak.', penalty: 'Whisper your next answer' },
  { id: 'wyr-s-3', type: 'WouldYouRather', intensity: Intensity.SOFT, text: 'Wear permanent squeaky clown shoes everywhere || Have a referee whistle blow every time you take a step.', penalty: 'Squeak twice' },
  { id: 'wyr-s-4', type: 'WouldYouRather', intensity: Intensity.SOFT, text: 'Fight 100 duck-sized horses || Fight 1 horse-sized duck.', penalty: 'Quack or neigh loudly' },
  { id: 'wyr-s-5', type: 'WouldYouRather', intensity: Intensity.SOFT, text: 'Never eat pizza again for life || Never eat tacos or burritos again for life.', penalty: 'Name your favorite comfort food' },
  { id: 'wyr-s-6', type: 'WouldYouRather', intensity: Intensity.SOFT, text: 'Have hands where your feet should be || Have feet where your hands should be.', penalty: 'Touch your toes without bending knees' },
  { id: 'wyr-s-7', type: 'WouldYouRather', intensity: Intensity.SOFT, text: 'Live without internet for an entire month || Live without hot water for an entire month.', penalty: 'Take a sip of water' },
  { id: 'wyr-s-8', type: 'WouldYouRather', intensity: Intensity.SOFT, text: 'Communicate only through interpretive dance || Communicate only in operatic singing.', penalty: 'Do a 5-second dance move' },
  { id: 'wyr-s-9', type: 'WouldYouRather', intensity: Intensity.SOFT, text: 'Sweat pure maple syrup || Cry carbonated fizzy soda.', penalty: 'Pretend to lick maple syrup off your wrist' },
  { id: 'wyr-s-10', type: 'WouldYouRather', intensity: Intensity.SOFT, text: 'Be stuck in an elevator for 4 hours with your nemesis || With your ex’s overbearing parents.', penalty: 'Take a deep breath and take 1 sip' },
  { id: 'wyr-s-11', type: 'WouldYouRather', intensity: Intensity.SOFT, text: 'Have taste buds on your fingertips || Have your stomach growl like a megaphone every hour.', penalty: 'Pat your stomach gently' },
  { id: 'wyr-s-12', type: 'WouldYouRather', intensity: Intensity.SOFT, text: 'Always smell faintly of wet dog || Always smell faintly of pungent raw garlic.', penalty: 'Sniff the air and make a face' },
  { id: 'wyr-s-13', type: 'WouldYouRather', intensity: Intensity.SOFT, text: 'Wear a full suit of medieval armor to work for a week || Wear a giant furry mascot suit.', penalty: 'Salute like a knight' },
  { id: 'wyr-s-14', type: 'WouldYouRather', intensity: Intensity.SOFT, text: 'Have loud hiccups for 2 hours every single day || Sneeze violently every time someone says your name.', penalty: 'Do a fake hiccup' },
  { id: 'wyr-s-15', type: 'WouldYouRather', intensity: Intensity.SOFT, text: 'Be able to fly but only at 2 mph || Be able to teleport but only directly into public restrooms.', penalty: 'Flap your arms in slow motion' },

  // ==========================================
  // WOULD YOU RATHER - HOT (wyr-h-1 to wyr-h-15)
  // Spicy, social cringe, awkward romance
  // ==========================================
  { id: 'wyr-h-1', type: 'WouldYouRather', intensity: Intensity.HOT, text: 'Read your entire search history aloud to the room || Hand your unlocked phone to the person on your left for 60 seconds.', penalty: 'Take 2 penalty sips' },
  { id: 'wyr-h-2', type: 'WouldYouRather', intensity: Intensity.HOT, text: 'Get back together with your most toxic ex for 6 months || Go on a blind date organized by your grandparents.', penalty: 'Take a drink' },
  { id: 'wyr-h-3', type: 'WouldYouRather', intensity: Intensity.HOT, text: 'Have your secret crush hear your unfiltered thoughts for 5 minutes || Read your crush’s private diary.', penalty: 'Look down in embarrassment' },
  { id: 'wyr-h-4', type: 'WouldYouRather', intensity: Intensity.HOT, text: 'Accidentally call your boss "baby" on a team Zoom call || Accidentally call your date your mom’s name.', penalty: 'Bury your face in your hands' },
  { id: 'wyr-h-5', type: 'WouldYouRather', intensity: Intensity.HOT, text: 'Never be kissed with passion ever again || Never hear the words "I love you" ever again.', penalty: 'Take a sip of your drink' },
  { id: 'wyr-h-6', type: 'WouldYouRather', intensity: Intensity.HOT, text: 'Have your most bitter ex give a speech at your wedding || Have your partner’s ex be your next-door neighbor.', penalty: 'Take 2 sips' },
  { id: 'wyr-h-7', type: 'WouldYouRather', intensity: Intensity.HOT, text: 'Date someone who is insanely attractive but has zero sense of humor || Date someone hilarious but completely chaotic and messy.', penalty: 'Tell a quick joke' },
  { id: 'wyr-h-8', type: 'WouldYouRather', intensity: Intensity.HOT, text: 'Send a spicy text to your 1st contact by mistake || Accidentally like a 4-year-old vacation photo of your ex’s new partner.', penalty: 'Take a drink' },
  { id: 'wyr-h-9', type: 'WouldYouRather', intensity: Intensity.HOT, text: 'Have the group know your exact body count || Have the group know the exact dollar balance in your checking account.', penalty: 'Take 2 sips' },
  { id: 'wyr-h-10', type: 'WouldYouRather', intensity: Intensity.HOT, text: 'Be caught picking your nose on an elevator security camera || Fart audibly during a romantic first kiss.', penalty: 'Laugh it off and take a drink' },
  { id: 'wyr-h-11', type: 'WouldYouRather', intensity: Intensity.HOT, text: 'Only meet romantic partners through arranged family setups || Only meet partners through a televised reality dating show.', penalty: 'Take a sip' },
  { id: 'wyr-h-12', type: 'WouldYouRather', intensity: Intensity.HOT, text: 'Have an ex write a bestselling tell-all book about your relationship || Have your parents review your dating history on a podcast.', penalty: 'Take 2 sips' },
  { id: 'wyr-h-13', type: 'WouldYouRather', intensity: Intensity.HOT, text: 'Never be able to tell a lie again || Have your nose glow bright crimson whenever you tell a lie.', penalty: 'Touch your nose' },
  { id: 'wyr-h-14', type: 'WouldYouRather', intensity: Intensity.HOT, text: 'Find your absolute soulmate only after turning 50 || Have 5 fun, memorable relationships throughout your 20s and 30s.', penalty: 'Share your romantic philosophy' },
  { id: 'wyr-h-15', type: 'WouldYouRather', intensity: Intensity.HOT, text: 'Kiss the cheek of the person to your left right now || Take 3 full penalty sips without breathing.', penalty: 'Do the chosen forfeit' },

  // ==========================================
  // WOULD YOU RATHER - VULGAR (wyr-v-1 to wyr-v-15)
  // Extreme taboos, unhinged adult dilemmas
  // ==========================================
  { id: 'wyr-v-1', type: 'WouldYouRather', intensity: Intensity.VULGAR, text: 'Accidentally walk in on your parents doing the deed || Have your parents walk in on you in the middle of passion.', penalty: 'Take a full shot of your drink' },
  { id: 'wyr-v-2', type: 'WouldYouRather', intensity: Intensity.VULGAR, text: 'Never be allowed to use your hands during intimacy || Only be allowed one single position for the rest of your life.', penalty: 'Take a solid drink' },
  { id: 'wyr-v-3', type: 'WouldYouRather', intensity: Intensity.VULGAR, text: 'Have your most private spicy video leaked onto the internet || Have your entire text message history forwarded to your boss.', penalty: 'Take two shots' },
  { id: 'wyr-v-4', type: 'WouldYouRather', intensity: Intensity.VULGAR, text: 'Have sex in a haunted abandoned hospital || Have sex in a glass elevator in broad daylight.', penalty: 'Take a shot' },
  { id: 'wyr-v-5', type: 'WouldYouRather', intensity: Intensity.VULGAR, text: 'Date someone with terrible breath || Date someone with a humiliating kink they demand you participate in daily.', penalty: 'Take 2 sips' },
  { id: 'wyr-v-6', type: 'WouldYouRather', intensity: Intensity.VULGAR, text: 'Be handcuffed to your ex for 48 hours || Be handcuffed to a complete stranger at a wild music festival.', penalty: 'Take a shot' },
  { id: 'wyr-v-7', type: 'WouldYouRather', intensity: Intensity.VULGAR, text: 'Hook up with someone in a public park at night || Hook up in an empty office conference room during business hours.', penalty: 'Take a sip' },
  { id: 'wyr-v-8', type: 'WouldYouRather', intensity: Intensity.VULGAR, text: 'Hook up with someone who talks baby talk during intimacy || Someone who maintains unblinking, aggressive eye contact the entire time.', penalty: 'Do the unblinking stare for 10s' },
  { id: 'wyr-v-9', type: 'WouldYouRather', intensity: Intensity.VULGAR, text: 'Have your partner find your secret adult toy collection || Have your roommate accidentally find it and use it as a prank.', penalty: 'Take a drink' },
  { id: 'wyr-v-10', type: 'WouldYouRather', intensity: Intensity.VULGAR, text: 'All your future climaxes make an air horn sound effect || Make a distressed goat scream sound effect.', penalty: 'Make the sound effect right now' },
  { id: 'wyr-v-11', type: 'WouldYouRather', intensity: Intensity.VULGAR, text: 'Lose all your swimwear at a crowded public beach || Walk into work completely unclothed for 10 seconds before realizing.', penalty: 'Take a shot' },
  { id: 'wyr-v-12', type: 'WouldYouRather', intensity: Intensity.VULGAR, text: 'Hook up with your best friend’s ex with their blessing || Hook up with your worst enemy in total secret.', penalty: 'Take 2 sips' },
  { id: 'wyr-v-13', type: 'WouldYouRather', intensity: Intensity.VULGAR, text: 'Only ever have intimacy with bright stadium lights on || Only ever have intimacy in pitch darkness where you can’t see anything.', penalty: 'Blink three times' },
  { id: 'wyr-v-14', type: 'WouldYouRather', intensity: Intensity.VULGAR, text: 'Have a spicy dream about a friend in this room and confess it to them || Have them tell you they had one about you.', penalty: 'Take a drink' },
  { id: 'wyr-v-15', type: 'WouldYouRather', intensity: Intensity.VULGAR, text: 'Never be able to pleasure yourself ever again || Never be able to watch adult entertainment ever again.', penalty: 'Take a shot' },

  // ==========================================
  // THE HOT SEAT - SOFT (hs-s-1 to hs-s-15)
  // Rapid-fire 60s speedrun questions
  // ==========================================
  { id: 'hs-s-1', type: 'HotSeat', intensity: Intensity.SOFT, text: 'What is the most useless talent you possess? Answer in 3 seconds!', penalty: 'Do 5 jumping jacks' },
  { id: 'hs-s-2', type: 'HotSeat', intensity: Intensity.SOFT, text: 'What is your biggest irrational fear? Quick!', penalty: 'Make a startled noise' },
  { id: 'hs-s-3', type: 'HotSeat', intensity: Intensity.SOFT, text: 'What food will you refuse to eat even if you are starving?', penalty: 'Take 1 sip' },
  { id: 'hs-s-4', type: 'HotSeat', intensity: Intensity.SOFT, text: 'Who in this room survives a zombie apocalypse the longest?', penalty: 'Point at them immediately' },
  { id: 'hs-s-5', type: 'HotSeat', intensity: Intensity.SOFT, text: 'What is your number one guilty pleasure TV show?', penalty: 'Confess with pride' },
  { id: 'hs-s-6', type: 'HotSeat', intensity: Intensity.SOFT, text: 'What was the worst haircut you ever paid money for?', penalty: 'Touch your hair' },
  { id: 'hs-s-7', type: 'HotSeat', intensity: Intensity.SOFT, text: 'If you had to marry a cartoon character, who is it?', penalty: 'Say the name out loud' },
  { id: 'hs-s-8', type: 'HotSeat', intensity: Intensity.SOFT, text: 'What was your very first cringey screen name or gamertag?', penalty: 'Spell it out loud' },
  { id: 'hs-s-9', type: 'HotSeat', intensity: Intensity.SOFT, text: 'What is something you do that you think is normal, but others find weird?', penalty: 'Take 1 sip' },
  { id: 'hs-s-10', type: 'HotSeat', intensity: Intensity.SOFT, text: 'What is the dumbest purchase you made this entire year?', penalty: 'State the price' },
  { id: 'hs-s-11', type: 'HotSeat', intensity: Intensity.SOFT, text: 'Who was your very first childhood celebrity crush?', penalty: 'Blush or drink' },
  { id: 'hs-s-12', type: 'HotSeat', intensity: Intensity.SOFT, text: 'What song do you sing at maximum volume when alone in the car or shower?', penalty: 'Sing the first line' },
  { id: 'hs-s-13', type: 'HotSeat', intensity: Intensity.SOFT, text: 'What is the pettiest white lie you told this past week?', penalty: 'Apologize to the universe' },
  { id: 'hs-s-14', type: 'HotSeat', intensity: Intensity.SOFT, text: 'Which friend in this room is the biggest drama queen?', penalty: 'Bow to them' },
  { id: 'hs-s-15', type: 'HotSeat', intensity: Intensity.SOFT, text: 'If you had to change your legal first name right this second, what is it?', penalty: 'Say your new name' },

  // ==========================================
  // THE HOT SEAT - HOT (hs-h-1 to hs-h-15)
  // Rapid-fire dating, romance, brutally honest
  // ==========================================
  { id: 'hs-h-1', type: 'HotSeat', intensity: Intensity.HOT, text: 'Who in this room would you date if you were both single? Answer in 3 seconds!', penalty: 'Take 2 penalty sips' },
  { id: 'hs-h-2', type: 'HotSeat', intensity: Intensity.HOT, text: 'What is your biggest personal dating red flag? Quick!', penalty: 'Take a drink' },
  { id: 'hs-h-3', type: 'HotSeat', intensity: Intensity.HOT, text: 'What is the most toxic trait you secretly possess?', penalty: 'Take a sip of truth' },
  { id: 'hs-h-4', type: 'HotSeat', intensity: Intensity.HOT, text: 'Have you stalked an ex’s social media within the last 30 days? Yes or no!', penalty: 'Take 2 sips if yes' },
  { id: 'hs-h-5', type: 'HotSeat', intensity: Intensity.HOT, text: 'What was the cringiest pickup line someone used on you that actually worked?', penalty: 'Recite it aloud' },
  { id: 'hs-h-6', type: 'HotSeat', intensity: Intensity.HOT, text: 'Who was your worst kiss of all time and what went wrong?', penalty: 'Describe it in 3 words' },
  { id: 'hs-h-7', type: 'HotSeat', intensity: Intensity.HOT, text: 'What is an immediate "ick" that terminates a talking stage instantly for you?', penalty: 'State your top ick' },
  { id: 'hs-h-8', type: 'HotSeat', intensity: Intensity.HOT, text: 'Have you ever lied about your age or romantic past? Yes or no!', penalty: 'Take a penalty sip' },
  { id: 'hs-h-9', type: 'HotSeat', intensity: Intensity.HOT, text: 'If you had to unfollow one person in this room forever right now, who?', penalty: 'Take a drink and apologize' },
  { id: 'hs-h-10', type: 'HotSeat', intensity: Intensity.HOT, text: 'What is the riskiest place you have ever made out with someone?', penalty: 'Say the location' },
  { id: 'hs-h-11', type: 'HotSeat', intensity: Intensity.HOT, text: 'Have you ever had secret romantic feelings for a friend’s partner?', penalty: 'Take 2 penalty sips' },
  { id: 'hs-h-12', type: 'HotSeat', intensity: Intensity.HOT, text: 'Rank the top 2 most charismatic people in this room in 3 seconds!', penalty: 'Point at both' },
  { id: 'hs-h-13', type: 'HotSeat', intensity: Intensity.HOT, text: 'What was your most humiliating romantic rejection?', penalty: 'Take a sip' },
  { id: 'hs-h-14', type: 'HotSeat', intensity: Intensity.HOT, text: 'Have you ever ghosted someone and genuinely regretted it later?', penalty: 'Say yes or no' },
  { id: 'hs-h-15', type: 'HotSeat', intensity: Intensity.HOT, text: 'Do you currently have a crush on someone? Yes or no right now!', penalty: 'Take 2 sips if yes' },

  // ==========================================
  // THE HOT SEAT - VULGAR (hs-v-1 to hs-v-15)
  // Rapid-fire NSFW confessions, zero hesitation
  // ==========================================
  { id: 'hs-v-1', type: 'HotSeat', intensity: Intensity.VULGAR, text: 'What is your favorite intimate position? Say it in 3 seconds!', penalty: 'Take a shot' },
  { id: 'hs-v-2', type: 'HotSeat', intensity: Intensity.VULGAR, text: 'What is your wildest guilty pleasure fantasy? Quick!', penalty: 'Take a drink' },
  { id: 'hs-v-3', type: 'HotSeat', intensity: Intensity.VULGAR, text: 'Have you ever done the deed in public or outdoors? Where?', penalty: 'Name the place' },
  { id: 'hs-v-4', type: 'HotSeat', intensity: Intensity.VULGAR, text: 'What is an unusual turn-on you secretly have?', penalty: 'Take a shot' },
  { id: 'hs-v-5', type: 'HotSeat', intensity: Intensity.VULGAR, text: 'Have you ever sent a spicy photo to the wrong contact?', penalty: 'Take a double shot' },
  { id: 'hs-v-6', type: 'HotSeat', intensity: Intensity.VULGAR, text: 'What is the highest number of intimate sessions you had in 24 hours?', penalty: 'Say the number' },
  { id: 'hs-v-7', type: 'HotSeat', intensity: Intensity.VULGAR, text: 'Have you ever hooked up with someone purely because you were bored?', penalty: 'Take a sip' },
  { id: 'hs-v-8', type: 'HotSeat', intensity: Intensity.VULGAR, text: 'What is the wildest piece of furniture you have ever broken during passion?', penalty: 'Take a shot' },
  { id: 'hs-v-9', type: 'HotSeat', intensity: Intensity.VULGAR, text: 'Have you ever faked an orgasm with a partner? Say yes or no in 2 seconds!', penalty: 'Take a drink if yes' },
  { id: 'hs-v-10', type: 'HotSeat', intensity: Intensity.VULGAR, text: 'What is an item in your bedroom you would frantically hide if your parents visited?', penalty: 'Describe it' },
  { id: 'hs-v-11', type: 'HotSeat', intensity: Intensity.VULGAR, text: 'Have you ever had a one-night stand you immediately regretted in the morning?', penalty: 'Take a shot' },
  { id: 'hs-v-12', type: 'HotSeat', intensity: Intensity.VULGAR, text: 'What is the most unhinged thing you have ever said during passion?', penalty: 'Take 2 sips' },
  { id: 'hs-v-13', type: 'HotSeat', intensity: Intensity.VULGAR, text: 'Have you ever walked in on someone or been walked in on during intimacy?', penalty: 'Say who caught who' },
  { id: 'hs-v-14', type: 'HotSeat', intensity: Intensity.VULGAR, text: 'What is your exact body count? State the number in 3 seconds!', penalty: 'Take a full shot if you pass' },
  { id: 'hs-v-15', type: 'HotSeat', intensity: Intensity.VULGAR, text: 'Have you ever kissed more than two different people in a single 24-hour day?', penalty: 'Take a drink' },
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
