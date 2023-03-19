import { createSlice } from '@reduxjs/toolkit';

const filterSlice = createSlice({
  name: 'filter',
  initialState: '',
  reducers: {
    applyFilter(state, action) {
      return action.payload;
    },
  },
});

export const { applyFilter } = filterSlice.actions;
export const filterReducer = filterSlice.reducer;
