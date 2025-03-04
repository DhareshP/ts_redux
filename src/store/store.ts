import { configureStore } from '@reduxjs/toolkit';
import classReducer from './slices/classSlice';
import studentReducer from './slices/studentSlice';

const store = configureStore({
  reducer: {
    classes: classReducer,
    students: studentReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
