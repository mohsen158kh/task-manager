export interface Section {
  id: string;
  title: string;
  description?: string;
  color?: string; // hex color
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  estimatedDate?: string;
  duration?: number;
  sectionId?: string; // if undefined, goes to default section
}

export type FilterType = 'all' | 'completed' | 'notCompleted';

