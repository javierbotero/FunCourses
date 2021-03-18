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

const createSubscription = createAsyncThunk(
  'createSubscription',
  async objThunk => {
    const payload = await fetch(`${objThunk.url}/subscriptions`, objThunk.init)
      .then(data => data.json().then(res => res))
      .catch(err => `Network error. ${err.error}`);
    console.log(payload);
    return {
      ...payload,
      course: objThunk.course,
      student: objThunk.student,
    };
  },
);

const deleteSubscription = createAsyncThunk(
  'deleteSubscription',
  async objThunk => {
    const payload = await fetch(`${objThunk.url}/subscriptions/${objThunk.id}`, objThunk.init)
      .then(data => data.json().then(res => res))
      .catch(err => `Network error. ${err.error}`);
    console.log(payload);
    return { ...payload, course: objThunk.course };
  },
);

export {
  createCourse,
  createFriendship,
  createLike,
  deleteLike,
  createSubscription,
  deleteSubscription,
};
