/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { getUser } from '../actions/retrievals';
import {
  createCourse,
  createLike,
  deleteLike,
  createSubscription,
  deleteSubscription,
  updateSubscription,
  createFriendship,
} from '../actions/interactions';

const initialState = {
  user: {},
  status: 'idle',
  error: '',
  notification: '',
};

const user = createSlice({
  name: 'items',
  initialState,
  reducers: {
    removeUserError: state => { state.error = ''; },
    setUserError: (state, action) => { state.error = action.payload; },
    resetStateUser: state => {
      state.user = {};
      state.status = 'idle';
      state.error = '';
    },
    removeNotificationUser: state => { state.notification = ''; },
  },
  extraReducers: {
    [getUser.pending]: state => { state.status = 'pending'; },
    [getUser.fulfilled]: (state, action) => {
      if (action.payload.user) {
        state.status = 'Fulfilled';
        state.user = action.payload.user;
        state.error = '';
      } else if (action.payload.error) {
        state.status = 'Rejected';
        state.error = `Some error happened please try later. ${action.payload.error}`;
        state.user = {};
      } else {
        state.status = 'Rejected';
        state.error = `Some unknown error happened please try later. ${action.payload}`;
        state.user = {};
      }
    },
    [getUser.rejected]: (state, action) => {
      state.status = 'Rejected';
      state.error = action.payload;
    },
    [createCourse.pending]: state => { state.status = 'pending'; },
    [createCourse.fulfilled]: (state, action) => {
      if (action.payload.course) {
        state.user.courses.push(action.payload.course);
        state.status = 'fulfilled';
        state.error = '';
        state.notification = 'The course was created successfully';
      } else if (action.payload.error) {
        state.error = action.payload.error;
        state.status = `Something went wrong. ${action.payload.error}`;
      } else {
        state.status = 'Rejected from unknown error';
        state.error = `Something went wrong. ${action.payload}`;
      }
    },
    [createCourse.rejected]: (state, action) => {
      state.status = 'Rejected';
      state.error = `Something went wrong. ${action.payload}`;
    },
    [createLike.pending]: state => { state.status = 'pending'; },
    [createLike.fulfilled]: (state, action) => {
      if (action.payload.favorite) {
        state.user.favorites.push(action.payload.favorite);
        state.status = 'fulfilled';
        state.error = '';
        state.notification = 'You liked the course :)';
      } else if (action.payload.error) {
        state.error = `Something went wrong. ${action.payload.error}`;
        state.status = 'Rejected by api';
      } else {
        state.status = 'Rejected from unknown error';
        state.error = `Something went wrong. ${action.payload}`;
      }
    },
    [createLike.rejected]: (state, action) => {
      state.status = 'Rejected';
      state.error = `Something went wrong. ${action.payload}`;
    },
    [deleteLike.pending]: state => { state.status = 'pending'; },
    [deleteLike.fulfilled]: (state, action) => {
      if (action.payload.favorite_id) {
        const favIndex = state.user.favorites.findIndex(f => f.id === action.payload.favorite_id);
        state.user.favorites.splice(favIndex, 1);
        state.status = 'fulfilled';
        state.error = '';
        state.notification = 'You changed your opinion';
      } else if (action.payload.error) {
        state.error = `Something went wrong. ${action.payload.error}`;
        state.status = 'Rejected by api';
      } else {
        state.status = 'Rejected from unknown error';
        state.error = `Something went wrong. ${action.payload}`;
      }
    },
    [deleteLike.rejected]: (state, action) => {
      state.status = 'Rejected';
      state.error = `Something went wrong. ${action.payload}`;
    },
    [createSubscription.pending]: state => { state.status = 'pending'; },
    [createSubscription.fulfilled]: (state, action) => {
      if (action.payload.pending_subscription) {
        state.user.pending_courses_as_student.push(action.payload.course);
        state.status = 'fulfilled';
        state.error = '';
        state.notification = 'Wait for teacher confirmation';
      } else if (action.payload.error) {
        state.error = `Something went wrong. ${action.payload.error}`;
        state.status = 'Rejected by api';
      } else {
        state.status = 'Rejected from unknown error';
        state.error = `Something went wrong. ${action.payload}`;
      }
    },
    [createSubscription.rejected]: (state, action) => {
      state.status = 'Rejected';
      state.error = `Something went wrong. ${action.payload}`;
    },
    [deleteSubscription.pending]: state => { state.status = 'pending'; },
    [deleteSubscription.fulfilled]: (state, action) => {
      if (action.payload.response) {
        if (action.payload.studentId) {
          const indexCourse = state
            .user.courses.findIndex(c => c.id === action.payload.course.id);
          const indexPendingSubs = state
            .user
            .courses[indexCourse]
            .pendings
            .findIndex(s => s.id === action.payload.id);
          const indexStudent = state
            .user
            .courses[indexCourse]
            .pending_students
            .findIndex(s => s.id === action.payload.studentId);
          state.user.courses[indexCourse].pendings.splice(indexPendingSubs, 1);
          state.user.courses[indexCourse].pending_students.splice(indexStudent, 1);
        } else {
          const indexCourseAsStudent = state
            .user.courses_as_student.findIndex(c => c.id === action.payload.course.id);
          const indexPendingCourseAsStudent = state
            .user.pending_courses_as_student.findIndex(c => c.id === action.payload.course.id);
          if (indexCourseAsStudent !== -1) {
            state.user.courses_as_student.splice(indexCourseAsStudent, 1);
          } else if (indexPendingCourseAsStudent !== -1) {
            state.user.pending_courses_as_student.splice(indexPendingCourseAsStudent, 1);
          }
        }
        state.status = 'fulfilled';
        state.error = '';
        state.notification = 'Request deleted';
      } else if (action.payload.error) {
        state.error = `Something went wrong. ${action.payload.error}`;
        state.status = 'Rejected by api';
      } else {
        state.status = 'Rejected from unknown error';
        state.error = `Something went wrong. ${action.payload}`;
      }
    },
    [deleteSubscription.rejected]: (state, action) => {
      state.status = 'Rejected';
      state.error = `Something went wrong. ${action.payload}`;
    },
    [updateSubscription.pending]: state => { state.status = 'pending'; },
    [updateSubscription.fulfilled]: (state, action) => {
      if (action.payload.updated_subscription) {
        const indexCourse = state
          .user.courses.findIndex(c => c.id === action.payload.updated_subscription.course_id);
        const indexPendingSubs = state
          .user
          .courses[indexCourse]
          .pendings
          .findIndex(s => s.id === action.payload.updated_subscription.id);
        const indexStudent = state
          .user
          .courses[indexCourse]
          .pending_students
          .findIndex(s => s.id === action.payload.updated_subscription.user_id);
        if (indexCourse !== -1 && indexPendingSubs !== -1 && indexStudent !== -1) {
          state.user.courses[indexCourse].pendings.splice(indexPendingSubs, 1);
          state.user.courses[indexCourse].pending_students.splice(indexStudent, 1);
          state.user.courses[indexCourse].subscriptions.push(action.payload.updated_subscription);
          state.user.courses[indexCourse].confirmed_students.push(action.payload.student);
          state.status = 'fulfilled';
          state.error = '';
          state.notification = `${action.payload.student.username} is now part of your course's students`;
        } else if (action.payload.error) {
          state.error = 'No course or student match :/';
        }
      } else if (action.payload.error) {
        state.error = `Something went wrong. ${action.payload.error}`;
        state.status = 'Rejected by api';
      } else {
        state.status = 'Rejected from unknown error';
        state.error = `Something went wrong. ${action.payload}`;
      }
    },
    [updateSubscription.rejected]: (state, action) => {
      state.status = 'Rejected';
      state.error = `Something went wrong. ${action.payload}`;
    },
    [createFriendship.pending]: state => { state.status = 'pending'; },
    [createFriendship.fulfilled]: (state, action) => {
      if (action.payload.friendship) {
        state.user.pending_requested_friendships.push(action.payload.friendship);
        state.notification = 'Wait for friendship confirmation';
      } else if (action.payload.error) {
        state.error = `Something went wrong. ${action.payload.error}`;
        state.status = 'Rejected by api';
      } else {
        state.status = 'Rejected from unknown error';
        state.error = `Something went wrong. ${action.payload}`;
      }
    },
    [createFriendship.rejected]: (state, action) => {
      state.status = 'Rejected';
      state.error = `Something went wrong. ${action.payload}`;
    },
  },
});

const {
  removeUserError,
  setUserError,
  resetStateUser,
  removeNotificationUser,
} = user.actions;

export default user.reducer;
export {
  removeUserError,
  setUserError,
  resetStateUser,
  removeNotificationUser,
};
