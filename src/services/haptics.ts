import { Haptics, ImpactStyle, NotificationType } from '@capacitor/haptics';

let isHapticsGlobalEnabled = true;

export const setHapticsGlobalEnabled = (enabled: boolean) => {
  isHapticsGlobalEnabled = enabled;
};

export const getHapticsGlobalEnabled = () => isHapticsGlobalEnabled;

// Safe wrapper that tries Capacitor Haptics first, then navigator.vibrate, and never crashes
export const hapticService = {
  // Light tap: button presses, tab switches, subtle UI interaction
  light: async () => {
    if (!isHapticsGlobalEnabled) return;
    try {
      await Haptics.impact({ style: ImpactStyle.Light });
    } catch {
      try {
        if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
          navigator.vibrate(15);
        }
      } catch {
        // Safe no-op
      }
    }
  },

  // Medium impact: drawing a prompt card, flipping card, changing turns
  medium: async () => {
    if (!isHapticsGlobalEnabled) return;
    try {
      await Haptics.impact({ style: ImpactStyle.Medium });
    } catch {
      try {
        if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
          navigator.vibrate(35);
        }
      } catch {
        // Safe no-op
      }
    }
  },

  // Heavy impact: high intensity cards, chickened out button
  heavy: async () => {
    if (!isHapticsGlobalEnabled) return;
    try {
      await Haptics.impact({ style: ImpactStyle.Heavy });
    } catch {
      try {
        if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
          navigator.vibrate(70);
        }
      } catch {
        // Safe no-op
      }
    }
  },

  // Success notification: completed challenge, imported deck, saved deck
  success: async () => {
    if (!isHapticsGlobalEnabled) return;
    try {
      await Haptics.notification({ type: NotificationType.Success });
    } catch {
      try {
        if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
          navigator.vibrate([20, 50, 40]);
        }
      } catch {
        // Safe no-op
      }
    }
  },

  // Warning notification: timer ticking low (final 3 seconds)
  warning: async () => {
    if (!isHapticsGlobalEnabled) return;
    try {
      await Haptics.notification({ type: NotificationType.Warning });
    } catch {
      try {
        if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
          navigator.vibrate([40, 40, 40]);
        }
      } catch {
        // Safe no-op
      }
    }
  },

  // Error / Expired notification: time's up buzzer, deletion
  error: async () => {
    if (!isHapticsGlobalEnabled) return;
    try {
      await Haptics.notification({ type: NotificationType.Error });
    } catch {
      try {
        if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
          navigator.vibrate([100, 50, 150]);
        }
      } catch {
        // Safe no-op
      }
    }
  }
};
