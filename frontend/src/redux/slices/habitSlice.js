import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  habits: [],
  loading: false,
  error: null
};

const habitSlice = createSlice({
  name: 'habits',
  initialState,
  reducers: {
    setHabits: (state, action) => {
      state.habits = action.payload;
      state.loading = false;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    addHabit: (state, action) => {
      state.habits.push(action.payload);
    },
    updateHabit: (state, action) => {
      const index = state.habits.findIndex((h) => h._id === action.payload._id);
      if (index !== -1) {
        state.habits[index] = action.payload;
      }
    }
  }
});

export const { setHabits, setLoading, setError, addHabit, updateHabit } = habitSlice.actions;
export default habitSlice.reducer;
