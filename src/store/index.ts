import { configureStore } from '@reduxjs/toolkit';
import tasksReducer from '../features/tasks/taskSlice';
import { localStorageMiddleware, loadStateFromLocalStorage } from './localStorageMiddleware';

const preloadedData = loadStateFromLocalStorage();

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(localStorageMiddleware),
  preloadedState: preloadedData
    ? {
        tasks: {
          tasks: preloadedData.tasks,
          sections: preloadedData.sections || [],
          filter: (preloadedData.filter as 'all' | 'completed' | 'notCompleted') || 'all',
        },
      }
    : undefined,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

