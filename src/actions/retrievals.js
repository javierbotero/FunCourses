/* eslint-disable arrow-body-style */
import { createAsyncThunk } from '@reduxjs/toolkit';

const getCourses = createAsyncThunk(
  'courses/getCourses',
  async (objThunk, { dispatch }) => {
    dispatch({ type: 'items/setTrueLoading' });
    const payload = await fetch(`${objThunk.url}courses`, objThunk.init)
      .then(data => {
        dispatch({ type: 'items/setFalseLoading' });
        return data.json().then(res => res);
      })
      .catch(err => `Network error. ${err.error}`);
    return payload;
  },
);

const getUser = createAsyncThunk(
  'user/getUser',
  async (objThunk, { dispatch }) => {
    dispatch({ type: 'items/setTrueLoading' });
    const payload = await fetch(`${objThunk.url}user`, objThunk.init)
      .then(data => {
        dispatch({ type: 'items/setFalseLoading' });
        return data.json().then(res => res);
      })
      .catch(err => `Network error. ${err.error}`);
    return payload;
  },
);

export {
  getCourses,
  getUser,
};
