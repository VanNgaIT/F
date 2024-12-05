import { createSlice } from '@reduxjs/toolkit';

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState: {
    userData: [],
    locations: [],
    theme: 'light',
  },
  reducers: {
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
    setLocations: (state, action) => {
      state.locations = action.payload;
    },
    setTheme: (state, action) => {
      state.theme = action.payload;
    },
  },
});

export const { setUserData, setLocations, setTheme } = dashboardSlice.actions;

export default dashboardSlice.reducer;
