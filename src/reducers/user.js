/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { getUser } from '../actions/retrievals';

const initialState = {
  user: {},
  status: 'idle',
  error: '',
};

const user = createSlice({
  name: 'items',
  initialState,
  reducers: {
    removeUserError: state => { state.error = ''; },
    setUserError: (state, action) => { state.error = action.payload; },
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
  },
});

const { removeUserError, setUserError } = user.actions;

export default user.reducer;
export {
  removeUserError,
  setUserError,
};
