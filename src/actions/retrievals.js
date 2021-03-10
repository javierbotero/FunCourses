import { createAsyncThunk } from '@reduxjs/toolkit';

const getCourses = createAsyncThunk(
  'courses/getCourses',
  async objThunk => {
    console.log(objThunk);
    const payload = await fetch(`${objThunk.url}courses`, objThunk.init)
      .then(data => data.json().then(res => res))
      .catch(err => err);
    console.log(payload);
    return payload;
  },
);

const getUser = createAsyncThunk(
);

export {
  getCourses,
  getUser,
};
