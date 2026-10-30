export type Tone =
  | 'green'
  | 'red'
  | 'yellow'
  | 'neutral'
  | 'gold'
  | 'blue'
  | 'purple';

export const TONES: Record<Tone, { container: string; text: string }> = {
  green: {
    container: 'border-success-line bg-success-bg',
    text: 'text-success',
  },
  red: {
    container: 'border-brand-line bg-brand-bg',
    text: 'text-brand',
  },
  yellow: {
    container: 'border-gold-line bg-gold-bg',
    text: 'text-gold',
  },
  gold: {
    container: 'border-gold-line bg-gold-bg',
    text: 'text-gold',
  },
  neutral: {
    container: 'border-line bg-card-alt',
    text: 'text-ink',
  },
  blue: {
    container: 'border-info-line bg-info-bg',
    text: 'text-info',
  },
  purple: {
    container: 'border-violet-line bg-violet-bg',
    text: 'text-violet',
  },
};
