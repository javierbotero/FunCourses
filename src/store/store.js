import { configureStore } from '@reduxjs/toolkit';
import courses from '../reducers/courses';
import user from '../reducers/user';

const store = configureStore({
  courses,
  user,
});

export default store;
