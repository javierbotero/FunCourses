import fetchMock from 'fetch-mock';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { URL } from '../constants/constants';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const mockMatch = {
  params: { id: '5' },
  path: 'some-path',
  url: 'url',
};
const mockCourses = [
  {
    id: 5,
    title: 'Karate class',
    content: 'Nice Karate class',
    teacher_id: 7,
    status: 'Open',
    dates: '2021-03-25T00:00:00.000Z 2021-03-29T00:00:00.000Z ',
    price: 10,
    images_url: [],
    created_at: '2021-03-07T17:56:22.487Z',
    updated_at: '2021-03-15T04:21:24.489Z',
    teacher: {
      id: 7,
      username: 'Adele',
    },
    pendings: [],
    pending_students: [],
    favorites: [],
    subscriptions: [],
    confirmed_students: [],
  },
];
const mockHistory = {
  action: 'PUSH',
  block: jest.fn(),
  createHref: jest.fn(),
  go: jest.fn(),
  listen: jest.fn(),
  push: jest.fn(),
  location: {
    hash: '',
    pathname: '',
    search: '',
  },
  replace: jest.fn(),
};
const mockUser = {
  id: 7,
  status: 'Student',
  username: 'Javier 4',
  url_avatar: 'api.com/users/1',
  courses_as_student: [],
  pending_courses_as_student: [],
  comments: [],
  favorites: [],
  pending_to_accept_friendships: [],
  pending_requested_friendships: [],
  friendship_requests: [],
  requests: [],
  pendings: [],
  courses: [
    {
      id: 5,
      title: 'Karate class',
      content: 'Nice Karate class',
      teacher_id: 7,
      status: 'Open',
      dates: '2021-03-25T00:00:00.000Z 2021-03-29T00:00:00.000Z ',
      price: 10,
      created_at: '2021-03-07T17:56:22.487Z',
      updated_at: '2021-03-15T04:21:24.489Z',
      teacher: {
        id: 7,
        username: 'Adele',
      },
      pendings: [],
      pending_students: [],
      favorites: [],
      subscriptions: [],
      confirmed_students: [],
    },
  ],
};
const mockTeacherCourses = [];
const mockLocation = {
  from: { pathname: 'url' },
  hash: 'some-hash',
  pathname: 'url',
  search: 'default',
  state: {
    user: {
      id: 1,
      username: 'Paco',
    },
    from: {
      pathname: 'url',
    },
  },
};
const mockUrl = 'url';
const mockUsersListToDiv = jest.fn();
const mockCommentsToDivs = jest.fn();
const userPassword = '12345';
const func = jest.fn();
const mockUrlApi = 'url';
const mockToken = 'token';
const mockId = 1;

export {
  func,
  mockStore,
  fetchMock,
  mockMatch,
  mockCourses,
  mockTeacherCourses,
  mockLocation,
  mockUrl,
  mockUsersListToDiv,
  mockCommentsToDivs,
  mockUrlApi,
  mockToken,
  mockId,
  mockUser,
  URL,
  mockHistory,
  userPassword,
};
