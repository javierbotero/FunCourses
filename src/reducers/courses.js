/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { getCourses } from '../actions/retrievals';
import {
  createCourse,
  createLike,
  deleteLike,
  createSubscription,
  deleteSubscription,
  updateSubscription,
} from '../actions/interactions';

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
    [createLike.pending]: state => { state.status = 'pending'; },
    [createLike.fulfilled]: (state, action) => {
      if (action.payload.favorite) {
        const id = state.courses.findIndex(c => c.id === action.payload.favorite.course_id);
        state.courses[id].favorites.push(action.payload.favorite);
        state.status = 'fulfilled';
        state.error = '';
        state.notification = '';
      }
    },
    [createLike.rejected]: state => {
      state.status = 'Rejected';
    },
    [deleteLike.pending]: state => { state.status = 'pending'; },
    [deleteLike.fulfilled]: (state, action) => {
      if (action.payload.favorite_id) {
        const courseIndex = state.courses.findIndex(c => c.id === action.payload.course_id);
        const favIndex = state.courses[courseIndex]
          .favorites.findIndex(f => f.id === action.payload.favorite_id);
        state.courses[courseIndex].favorites.splice(favIndex, 1);
        state.status = 'fulfilled';
        state.error = '';
        state.notification = '';
      } else if (action.payload.error) {
        state.error = '';
        state.status = 'Rejected by api';
      } else {
        state.status = 'Rejected from unknown error';
      }
    },
    [deleteLike.rejected]: state => {
      state.status = 'Rejected';
    },
    [createSubscription.pending]: state => { state.status = 'pending'; },
    [createSubscription.fulfilled]: (state, action) => {
      if (action.payload.pending_subscription) {
        const courseIndex = state.courses
          .findIndex(c => c.id === action.payload.pending_subscription.course_id);
        state.courses[courseIndex].pendings.push(action.payload.pending_subscription);
        state.courses[courseIndex].pending_students.push(action.payload.student);
        state.status = 'fulfilled';
        state.error = '';
        state.notification = '';
      }
    },
    [createSubscription.rejected]: state => {
      state.status = 'Rejected';
    },
    [deleteSubscription.pending]: state => { state.status = 'pending'; },
    [deleteSubscription.fulfilled]: (state, action) => {
      if (action.payload.response) {
        const indexCourse = state
          .courses.findIndex(c => c.id === action.payload.course.id);
        const indexSubscription = state
          .courses[indexCourse]
          .subscriptions.findIndex(s => s.user_id === parseInt(action.payload.course.userId, 10));
        if (indexSubscription !== -1) {
          const indexStudent = state
            .courses[indexCourse]
            .confirmed_students.findIndex(s => s.id === parseInt(action.payload.course.userId, 10));
          state.courses[indexCourse].subscriptions.splice(indexSubscription, 1);
          state.courses[indexCourse].confirmed_students.splice(indexStudent, 1);
        } else {
          const indexPendings = state
            .courses[indexCourse]
            .pendings.findIndex(s => s.user_id === parseInt(action.payload.course.userId, 10));
          const indexPendingStudents = state
            .courses[indexCourse]
            .pending_students.findIndex(s => s.id === parseInt(action.payload.course.userId, 10));
          state.courses[indexCourse].pendings.splice(indexPendings, 1);
          state.courses[indexCourse].pending_students.splice(indexPendingStudents, 1);
        }
        state.status = 'fulfilled';
        state.error = '';
      } else if (action.payload.error) {
        state.status = 'Rejected by api';
      } else {
        state.status = 'Rejected from unknown error';
      }
    },
    [deleteSubscription.rejected]: state => { state.status = 'Rejected'; },
    [updateSubscription.pending]: state => { state.status = 'pending'; },
    [updateSubscription.fulfilled]: (state, action) => {
      if (action.payload.updated_subscription) {
        const indexCourse = state
          .courses.findIndex(c => c.id === action.payload.updated_subscription.course_id);
        const indexPendings = state
          .courses[indexCourse]
          .pendings
          .findIndex(s => s.user_id === parseInt(action.payload.updated_subscription.user_id, 10));
        const indexPendingStudents = state
          .courses[indexCourse]
          .pending_students
          .findIndex(s => s.id === parseInt(action.payload.updated_subscription.user_id, 10));
        if (indexPendings !== -1 && indexPendingStudents !== -1) {
          state.courses[indexCourse].pendings.splice(indexPendings, 1);
          state.courses[indexCourse].pending_students.splice(indexPendingStudents, 1);
          state.courses[indexCourse].confirmed_students.push(action.payload.student);
          state.courses[indexCourse].subscriptions.push(action.payload.updated_subscription);
          state.status = 'fulfilled';
          state.error = '';
        } else {
          state.status = 'Rejected by local error';
        }
      } else if (action.payload.error) {
        state.status = 'Rejected by Api';
      } else {
        state.status = 'Rejected from unknown error';
      }
    },
    [updateSubscription.rejected]: state => { state.status = 'Rejected'; },
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
