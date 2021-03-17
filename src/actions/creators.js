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

const createLike = createAsyncThunk(
  'createLike',
  async objThunk => {
    const payload = await fetch(`${objThunk.url}favorites`, objThunk.init)
      .then(data => data.json().then(res => res))
      .catch(err => `Network error. ${err.error}`);
    return payload;
  },
);

const deleteLike = createAsyncThunk(
  'deleteLike',
  async objThunk => {
    const payload = await fetch(`${objThunk.url}/favorites/${objThunk.id}`, objThunk.init)
      .then(data => data.json().then(res => res))
      .catch(err => `Network error. ${err.error}`);
    return payload;
  },
);

export {
  createCourse,
  createFriendship,
  createLike,
  deleteLike,
};
