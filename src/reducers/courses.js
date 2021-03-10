/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { getCourses } from '../actions/retrievals';

const initialState = {
  courses: [],
  status: 'idle',
  error: '',
};

const courses = createSlice({
  name: 'courses',
  initialState,
  reducers: {
    removeError: state => { state.error = ''; },
  },
  extraReducers: {
    [getCourses.pending]: state => { state.status = 'pending'; },
    [getCourses.fulfilled]: (state, action) => {
      if (Array.isArray(action.payload) && action.payload[0].title) {
        state.status = 'Succeded';
        state.courses = action.payload;
        state.error = '';
      } else {
        state.status = 'Rejected from API';
        state.error = 'Something went wrong, please come back later';
      }
    },
    [getCourses.rejected]: (state, action) => {
      console.log('reducer courses rejected: ', action.payload);
      state.status = 'Rejected';
      state.error = action.payload;
      state.courses = [];
    },
  },
});

const { removeError } = courses.actions;

export default courses.reducer;
export {
  removeError,
};
