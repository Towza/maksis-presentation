
export type ViewMode = 'story' | 'flow' | 'config' | 'identity';
export type CoreColor = 'indigo' | 'emerald' | 'amber';
export type SurfaceMode = 'onyx' | 'paper';

export const COLORS: Record<CoreColor, string> = {
  indigo: '#6366f1',
  emerald: '#10b981',
  amber: '#f59e0b',
};

export interface SlideData {
  id: number;
  title: string;
  description: string;
  specs: string[];
}
