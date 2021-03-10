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
    removeError: state => { state.error = ''; },
  },
  extraReducers: {
    [getUser.pending]: state => { state.status = 'pending'; },
    [getUser.fulfilled]: (state, action) => {
      if (action.payload.username) {
        state.status = 'Fulfilled';
        state.user = action.payload;
        state.error = '';
      } else {
        state.status = 'Rejected';
        state.error = action.payload;
      }
    },
    [getUser.rejected]: (state, action) => {
      state.status = 'Rejected';
      state.error = action.payload;
    },
  },
});

const { removeError } = user.actions;

export default user.reducer;
export {
  removeError,
};
