// configureStore: Simplified way to create the Redux store.
import { configureStore } from '@reduxjs/toolkit';
import classReducer from './slices/classSlice';
import studentReducer from './slices/studentSlice';


// Combines classReducer and studentReducer into one global store.
const store = configureStore({
  reducer: {
    classes: classReducer,
    students: studentReducer,
  },
});

// TypeScript type for the whole state (root state).
export type RootState = ReturnType<typeof store.getState>;

// TypeScript type for dispatch function (for use in components).
export type AppDispatch = typeof store.dispatch;

export default store;
