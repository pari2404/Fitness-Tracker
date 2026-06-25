import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  workouts: [],
  currentWorkout: null,
  loading: false,
  error: null
};

const workoutSlice = createSlice({
  name: 'workouts',
  initialState,
  reducers: {
    setWorkouts: (state, action) => {
      state.workouts = action.payload;
      state.loading = false;
    },
    setCurrentWorkout: (state, action) => {
      state.currentWorkout = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    addWorkout: (state, action) => {
      state.workouts.push(action.payload);
    }
  }
});

export const { setWorkouts, setCurrentWorkout, setLoading, setError, addWorkout } = workoutSlice.actions;
export default workoutSlice.reducer;
