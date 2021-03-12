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
      if (action.payload.username) {
        state.status = 'Fulfilled';
        state.user = action.payload;
        state.error = '';
      } else {
        state.status = 'Rejected';
        state.error = 'Some error happened please try later';
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
