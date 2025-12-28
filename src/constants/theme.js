export const COLORS = {
  primary: '#007AFF', // Standard Blue
  secondary: '#5856D6', // Purple-ish
  success: '#34C759',
  warning: '#FF9500',
  danger: '#FF3B30',
  background: '#F2F2F7', // Light Gray iOS style
  surface: '#FFFFFF',
  text: '#1C1C1E',
  textSecondary: '#8E8E93',
  border: '#C6C6C8',
  white: '#FFFFFF',
  black: '#000000',
  
  // Premium Gradients (represented as array for LinearGradient)
  gradientPrimary: ['#007AFF', '#00C6FF'],
  gradientPurple: ['#5856D6', '#C644FC'],
};

export const SIZES = {
  base: 8,
  small: 12,
  font: 14,
  medium: 16,
  large: 18,
  extraLarge: 24,
  xxl: 32,
  
  padding: 16,
  radius: 12,
};

export const SHADOWS = {
  small: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
  },
  medium: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
};
