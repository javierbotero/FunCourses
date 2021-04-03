import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import courses from '../reducers/courses';
import user from '../reducers/user';

const persistConfigCourses = {
  key: 'courses',
  storage,
};

const persistConfigUser = {
  key: 'user',
  storage,
  blacklist: ['loading'],
};

const persistedReducerCourses = persistReducer(persistConfigCourses, courses);
const persistedReducerUser = persistReducer(persistConfigUser, user);

const store = configureStore({
  reducer: {
    courses: persistedReducerCourses,
    user: persistedReducerUser,
  },
});

const persistor = persistStore(store);

export default store;
export { persistor };
