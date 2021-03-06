/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { getUser } from '../actions/retrievals';
import {
  createCourse,
  createLike,
  deleteLike,
  createSubscription,
  deleteSubscription,
  createFriendship,
  deleteFriendship,
  updateFriendship,
} from '../actions/interactions';

const initialState = {
  user: {
    id: parseInt(localStorage.getItem('currentUserIdFunCourses'), 10),
  },
  status: 'idle',
  error: '',
  notification: '',
  loading: false,
  password: localStorage.getItem('currentUserPasswordFunCourses'),
};

const user = createSlice({
  name: 'items',
  initialState,
  reducers: {
    removeUserError: state => { state.error = ''; },
    setUserError: (state, action) => { state.error = action.payload; },
    resetStateUser: state => {
      state.user = {
        id: parseInt(localStorage.getItem('currentUserIdFunCourses'), 10),
      };
      state.status = 'idle';
      state.error = '';
      state.notification = '';
      state.loading = false;
      state.password = localStorage.getItem('currentUserPasswordFunCourses');
    },
    removeNotificationUser: state => { state.notification = ''; },
    setTrueLoading: state => { state.loading = true; },
    setFalseLoading: state => { state.loading = false; },
    setUserPassword: (state, action) => { state.password = action.payload; },
    setUser: (state, action) => {
      state.user = action.payload.user;
      state.status = 'Fullfilled';
    },
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
        state.status = 'Rejected by Api';
      } else {
        state.status = 'Rejected from unknown error';
      }
    },
    [createCourse.rejected]: state => { state.status = 'Rejected'; },
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
    [deleteFriendship.pending]: state => { state.status = 'pending'; },
    [deleteFriendship.fulfilled]: (state, action) => {
      if (action.payload.response) {
        if (action.payload.friendship.pendingRequested) {
          const indexRequest = state
            .user
            .pending_requested_friendships
            .findIndex(f => f.id === parseInt(action.payload.friendship.id, 10));
          state.user.pending_requested_friendships.splice(indexRequest, 1);
        } else {
          const indexRequest = state
            .user
            .friendship_requests
            .findIndex(f => f.id === parseInt(action.payload.friendship.studentId, 10));
          state
            .user
            .pending_to_accept_friendships
            .splice(action.payload.friendship.indexRequest, 1);
          state
            .user
            .friendship_requests
            .splice(indexRequest, 1);
        }
        state.notification = 'The request has been deleted';
        state.error = '';
        state.status = 'Fullfilled';
      } else if (action.payload.error) {
        state.error = `Something went wrong. ${action.payload.error}`;
        state.status = 'Rejected by api';
      } else {
        state.status = 'Rejected from unknown error';
        state.error = `Something went wrong. ${action.payload}`;
      }
    },
    [deleteFriendship.rejected]: (state, action) => {
      state.status = 'Rejected';
      state.error = `Something went wrong. ${action.payload}`;
    },
    [updateFriendship.pending]: state => { state.status = 'pending'; },
    [updateFriendship.fulfilled]: (state, action) => {
      if (action.payload.new_friend) {
        const indexRequest = state
          .user
          .friendship_requests
          .findIndex(f => f.id === parseInt(action.payload.friendship.studentId, 10));
        state
          .user
          .pending_to_accept_friendships
          .splice(action.payload.friendship.indexRequest, 1);
        state
          .user
          .friendship_requests
          .splice(indexRequest, 1);
        state.user.requests.push(action.payload.new_friend);
        state.notification = `${action.payload.friendship.studentName} is a new friend :)`;
        state.error = '';
        state.status = 'Fullfilled';
      } else if (action.payload.error) {
        state.error = `Something went wrong. ${action.payload.error}`;
        state.status = 'Rejected by api';
      } else {
        state.status = 'Rejected from unknown error';
        state.error = `Something went wrong. ${action.payload}`;
      }
    },
    [updateFriendship.rejected]: (state, action) => {
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
  setTrueLoading,
  setFalseLoading,
  setUserPassword,
  setUser,
} = user.actions;

export default user.reducer;
export {
  removeUserError,
  setUserError,
  resetStateUser,
  removeNotificationUser,
  setTrueLoading,
  setFalseLoading,
  setUserPassword,
  setUser,
};
