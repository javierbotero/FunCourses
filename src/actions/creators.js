import { createAsyncThunk } from '@reduxjs/toolkit';

const createCourse = createAsyncThunk(
  'courses/createCourse',
  async objThunk => {
    const payload = await fetch(`${objThunk.url}courses/create`, objThunk.init)
      .then(data => data.json().then(res => res))
      .catch(err => `Network error. ${err.error}`);
    return payload;
  },
);

const createFriendship = createAsyncThunk();

export {
  createCourse,
  createFriendship,
};
