import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  dailySummary: null,
  meals: [],
  templates: [],
  loading: false,
  error: null
};

const dietSlice = createSlice({
  name: 'diet',
  initialState,
  reducers: {
    setDailySummary: (state, action) => {
      state.dailySummary = action.payload;
    },
    setMeals: (state, action) => {
      state.meals = action.payload;
    },
    setTemplates: (state, action) => {
      state.templates = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    addMeal: (state, action) => {
      state.meals.push(action.payload);
    }
  }
});

export const {
  setDailySummary,
  setMeals,
  setTemplates,
  setLoading,
  setError,
  addMeal
} = dietSlice.actions;
export default dietSlice.reducer;
