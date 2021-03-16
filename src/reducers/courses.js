/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { getCourses } from '../actions/retrievals';
import { createCourse } from '../actions/creators';

const initialState = {
  courses: [],
  status: 'idle',
  error: '',
  notification: '',
};

const courses = createSlice({
  name: 'courses',
  initialState,
  reducers: {
    setCourseError: (state, action) => { state.error = action.payload; },
    removeCourseError: state => { state.error = ''; },
    resetStateCourses: state => {
      state.courses = [];
      state.status = 'idle';
      state.error = '';
    },
    removeNotificationCourses: state => { state.notification = ''; },
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
    [createCourse.pending]: state => { state.status = 'pending'; },
    [createCourse.fulfilled]: (state, action) => {
      if (action.payload.course) {
        state.courses.push(action.payload.course);
        state.status = 'fulfilled';
        state.error = '';
      } else if (action.payload.error) {
        state.error = action.payload.error;
        state.status = `Something went wrong ${action.payload.error}`;
      } else {
        state.status = 'Rejected from unknown error';
        state.error = `Something went wrong ${action.payload}`;
      }
    },
    [createCourse.rejected]: (state, action) => {
      state.status = 'Rejected';
      state.error = `Something went wrong ${action.payload}`;
    },
  },
});

const {
  removeCourseError,
  resetStateCourses,
  setCourseError,
  removeNotificationCourses,
} = courses.actions;

export default courses.reducer;
export {
  setCourseError,
  removeCourseError,
  resetStateCourses,
  removeNotificationCourses,
};
