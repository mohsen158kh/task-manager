import { Middleware } from '@reduxjs/toolkit';

const STORAGE_KEY = 'task-manager-state';

export const localStorageMiddleware: Middleware = (store) => (next) => (action) => {
  const result = next(action);
  const state = store.getState() as any;
  
  try {
    const stateToSave = {
      tasks: state.tasks.tasks,
      sections: state.tasks.sections,
      filter: state.tasks.filter,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stateToSave));
  } catch (error) {
    console.error('Failed to save to localStorage:', error);
  }
  
  return result;
};

export const loadStateFromLocalStorage = (): { tasks: any[]; sections?: any[]; filter?: string } | undefined => {
  try {
    const serializedState = localStorage.getItem(STORAGE_KEY);
    if (serializedState === null) {
      return undefined;
    }
    const parsed = JSON.parse(serializedState);
    if (Array.isArray(parsed)) {
      return { tasks: parsed };
    }
    return {
      tasks: Array.isArray(parsed.tasks) ? parsed.tasks : [],
      sections: Array.isArray(parsed.sections) ? parsed.sections : undefined,
      filter: parsed.filter || 'all',
    };
  } catch (error) {
    console.error('Failed to load from localStorage:', error);
    return undefined;
  }
};

