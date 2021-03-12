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
      if (action.payload.courses) {
        state.status = 'Succeded';
        state.courses = action.payload.courses;
        state.error = '';
      } else if (action.payload.error) {
        state.status = 'Rejected from error handling API';
        state.error = `Something went wrong ${action.payload.error}`;
        state.courses = [];
      } else {
        state.status = 'Rejected from unknown error';
        state.error = `Something went wrong ${action.payload}`;
        state.courses = [];
      }
    },
    [getCourses.rejected]: (state, action) => {
      state.status = 'Rejected';
      state.error = `Something went wrong ${action.payload}`;
      state.courses = [];
    },
  },
});

const { removeError } = courses.actions;

export default courses.reducer;
export {
  removeError,
};
