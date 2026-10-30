export type Tone =
  | 'green'
  | 'red'
  | 'yellow'
  | 'neutral'
  | 'gold'
  | 'blue'
  | 'purple';

export const TONES: Record<
  Tone,
  { bg: string; border: string; text: string }
> = {
  green: { bg: '#0E2A1E', border: '#1F5A3C', text: '#3DD68C' },
  red: { bg: '#2A1214', border: '#5A1E22', text: '#E5484D' },
  yellow: { bg: '#2A2110', border: '#5A4A1E', text: '#F5B942' },
  gold: { bg: '#2A2110', border: '#5A4A1E', text: '#F5B942' },
  neutral: { bg: '#2A2A2E', border: '#34343A', text: '#C9C9CF' },
  blue: { bg: '#10202F', border: '#1F3D5C', text: '#59A8FF' },
  purple: { bg: '#1E1429', border: '#3D2A56', text: '#B57BFF' },
};
