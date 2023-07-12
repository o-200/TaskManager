import { configureStore } from '@reduxjs/toolkit';
import tasksReducer from 'slices/TasksSlice';

const store = configureStore({
  reducer: {
    tasks: tasksReducer,
  },
});

export default store;
