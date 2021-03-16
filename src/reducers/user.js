/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { getUser } from '../actions/retrievals';
import { createCourse } from '../actions/creators';

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
