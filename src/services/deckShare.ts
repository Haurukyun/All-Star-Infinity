import QRCode from 'qrcode';
import { CustomDeck, GameMode, Intensity, PromptType, GamePrompt } from '../types';

const generateId = () => Math.random().toString(36).substring(2, 11);

interface SerializedPrompt {
  0: 'T' | 'D' | 'N'; // Type
  1: string;          // Text
  2?: string;         // Penalty
}

interface SerializedDeck {
  v: 1;               // Version
  n: string;          // Name
  d?: string;         // Description
  i: Intensity;       // Intensity
  m: GameMode;        // Game Mode
  p: SerializedPrompt[];
}

/**
 * Encodes a CustomDeck into an All★Star Infinity short code string
 */
export const exportDeckToString = (deck: CustomDeck): string => {
  const serialized: SerializedDeck = {
    v: 1,
    n: deck.name.trim(),
    d: deck.description?.trim() || undefined,
    i: deck.intensity || Intensity.SOFT,
    m: deck.gameMode || GameMode.TRUTH_OR_DARE,
    p: deck.prompts.map(p => {
      const typeCode: 'T' | 'D' | 'N' =
        p.type === 'Truth' ? 'T' : p.type === 'Dare' ? 'D' : 'N';
      const promptArr: SerializedPrompt = [typeCode, p.text];
      if (p.penalty) promptArr[2] = p.penalty;
      return promptArr;
    })
  };

  const jsonStr = JSON.stringify(serialized);
  // Use UTF-8 safe base64 encoding
  const b64 = btoa(encodeURIComponent(jsonStr));
  return `ASI:1:${b64}`;
};

/**
 * Decodes an All★Star Infinity short code string or raw JSON back into a CustomDeck
 */
export const importDeckFromString = (rawInput: string): CustomDeck | null => {
  const clean = rawInput.trim();
  if (!clean) return null;

  try {
    let jsonStr = '';

    if (clean.startsWith('ASI:1:')) {
      const b64 = clean.slice(6);
      jsonStr = decodeURIComponent(atob(b64));
    } else if (clean.startsWith('{')) {
      // Raw JSON fallback
      jsonStr = clean;
    } else {
      // Attempt generic base64
      try {
        jsonStr = decodeURIComponent(atob(clean));
      } catch {
        return null;
      }
    }

    const parsed = JSON.parse(jsonStr);

    // If it's a v1 serialized deck
    if (parsed.v === 1 && parsed.n && Array.isArray(parsed.p)) {
      const mode = Object.values(GameMode).includes(parsed.m)
        ? parsed.m
        : GameMode.TRUTH_OR_DARE;
      const intensity = Object.values(Intensity).includes(parsed.i)
        ? parsed.i
        : Intensity.SOFT;

      const prompts: GamePrompt[] = parsed.p.map((item: any) => {
        let type: PromptType = 'Truth';
        if (item[0] === 'D') type = 'Dare';
        else if (item[0] === 'N') type = 'NeverHaveIEver';
        else if (mode === GameMode.NEVER_HAVE_I_EVER) type = 'NeverHaveIEver';

        return {
          id: generateId(),
          type,
          text: String(item[1] || ''),
          intensity,
          penalty: item[2] ? String(item[2]) : ''
        };
      });

      return {
        id: generateId(),
        name: String(parsed.n),
        description: parsed.d ? String(parsed.d) : 'Imported deck',
        prompts,
        isCustom: true,
        intensity,
        gameMode: mode,
        isFavorite: false
      };
    }

    // Direct CustomDeck object format fallback
    if (parsed.name && Array.isArray(parsed.prompts)) {
      return {
        id: generateId(),
        name: String(parsed.name),
        description: parsed.description ? String(parsed.description) : 'Imported deck',
        prompts: parsed.prompts.map((p: any) => ({
          id: generateId(),
          type: (p.type as PromptType) || 'Truth',
          text: String(p.text || ''),
          intensity: (p.intensity as Intensity) || Intensity.SOFT,
          penalty: String(p.penalty || '')
        })),
        isCustom: true,
        intensity: (parsed.intensity as Intensity) || Intensity.SOFT,
        gameMode: (parsed.gameMode as GameMode) || GameMode.TRUTH_OR_DARE,
        isFavorite: false
      };
    }
  } catch (err) {
    console.error('Failed to parse deck import string:', err);
  }

  return null;
};

/**
 * Generates a base64 QR Code image data URL for offline rendering
 */
export const generateDeckQRCode = async (deckString: string): Promise<string> => {
  try {
    return await QRCode.toDataURL(deckString, {
      errorCorrectionLevel: 'L',
      margin: 2,
      scale: 5,
      color: {
        dark: '#000000',
        light: '#ffffff'
      }
    });
  } catch (err) {
    console.error('Error generating QR code:', err);
    throw err;
  }
};
