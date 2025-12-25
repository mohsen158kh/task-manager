import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { Task, FilterType, Section } from './taskTypes';

interface TasksState {
  tasks: Task[];
  sections: Section[];
  filter: FilterType;
}

const initialState: TasksState = {
  tasks: [],
  sections: [],
  filter: 'all',
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Omit<Task, 'id' | 'completed'>>) => {
      const newTask: Task = {
        id: crypto.randomUUID(),
        title: action.payload.title,
        description: action.payload.description,
        estimatedDate: action.payload.estimatedDate,
        duration: action.payload.duration,
        sectionId: action.payload.sectionId,
        completed: false,
      };
      state.tasks.push(newTask);
    },
    loadTasks: (state, action: PayloadAction<Task[]>) => {
      state.tasks = action.payload;
    },
    toggleTask: (state, action: PayloadAction<string>) => {
      const task = state.tasks.find((t) => t.id === action.payload);
      if (task) {
        task.completed = !task.completed;
      }
    },
    setFilter: (state, action: PayloadAction<FilterType>) => {
      state.filter = action.payload;
    },
    reorderTasks: (state, action: PayloadAction<Task[]>) => {
      state.tasks = action.payload;
    },
    updateTask: (state, action: PayloadAction<Task>) => {
      const index = state.tasks.findIndex((t) => t.id === action.payload.id);
      if (index !== -1) {
        state.tasks[index] = action.payload;
      }
    },
    addSection: (state, action: PayloadAction<Omit<Section, 'id'>>) => {
      const newSection: Section = {
        id: crypto.randomUUID(),
        title: action.payload.title,
        description: action.payload.description,
        color: action.payload.color,
      };
      state.sections.push(newSection);
    },
    updateSection: (state, action: PayloadAction<Section>) => {
      const index = state.sections.findIndex((s) => s.id === action.payload.id);
      if (index !== -1) {
        state.sections[index] = action.payload;
      }
    },
    deleteSection: (state, action: PayloadAction<string>) => {
      const index = state.sections.findIndex((s) => s.id === action.payload);
      if (index !== -1) {
        state.tasks.forEach((task) => {
          if (task.sectionId === action.payload) {
            task.sectionId = undefined;
          }
        });
        state.sections.splice(index, 1);
      }
    },
    reorderSections: (state, action: PayloadAction<Section[]>) => {
      state.sections = action.payload;
    },
    loadSections: (state, action: PayloadAction<Section[]>) => {
      state.sections = action.payload;
    },
  },
});

export const {
  addTask,
  toggleTask,
  setFilter,
  reorderTasks,
  loadTasks,
  updateTask,
  addSection,
  updateSection,
  deleteSection,
  reorderSections,
  loadSections,
} = tasksSlice.actions;
export default tasksSlice.reducer;

