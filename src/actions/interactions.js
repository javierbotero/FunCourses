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
    return {
      ...payload,
      course: objThunk.course,
      studentId: objThunk.studentId ? objThunk.studentId : false,
      id: objThunk.id,
    };
  },
);

const updateSubscription = createAsyncThunk(
  'updateSubscription',
  async objThunk => {
    const payload = await fetch(`${objThunk.url}/subscriptions/${objThunk.id}`, objThunk.init)
      .then(data => data.json().then(res => res))
      .catch(err => `Network error. ${err.error}`);
    return { ...payload, student: objThunk.student };
  },
);

const createFriendship = createAsyncThunk(
  'createFriendship',
  async objThunk => {
    const payload = await fetch(`${objThunk.url}/friendships`, objThunk.init)
      .then(data => data.json().then(res => res))
      .catch(err => `Network error. ${err.error}`);
    return {
      ...payload,
      user: objThunk.user,
    };
  },
);

const deleteFriendship = createAsyncThunk(
  'deleteFriendship',
  async objThunk => {
    const payload = await fetch(`${objThunk.url}/friendships/${objThunk.friendship.id}`, objThunk.init)
      .then(data => data.json().then(res => res))
      .catch(err => `Network error. ${err.error}`);
    return {
      ...payload,
      friendship: objThunk.friendship,
    };
  },
);

export {
  createCourse,
  createLike,
  deleteLike,
  createSubscription,
  deleteSubscription,
  updateSubscription,
  createFriendship,
  deleteFriendship,
};