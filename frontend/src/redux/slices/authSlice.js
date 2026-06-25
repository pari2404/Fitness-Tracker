import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: localStorage.getItem('token'),
  user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null,
  loading: false,
  error: null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setUser: (state, action) => {
      const { token, user } = action.payload;
      state.token = token;
      state.user = user;
      state.loading = false;
      state.error = null;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
      state.error = null;
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
  }
});

export const { setLoading, setUser, setError, logout } = authSlice.actions;
export default authSlice.reducer;
