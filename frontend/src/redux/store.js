import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import workoutReducer from './slices/workoutSlice';
import habitReducer from './slices/habitSlice';
import dietReducer from './slices/dietSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    workouts: workoutReducer,
    habits: habitReducer,
    diet: dietReducer
  }
});

export default store;
