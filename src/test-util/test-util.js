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
const mockUser = {
  id: 7,
  status: 'Student',
  username: 'Javier 4',
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
};
const mockUrl = 'url';
const mockUsersListToDiv = jest.fn();
const mockCommentsToDivs = jest.fn();
const mockUseAuth = (() => (
  {
    userPassword: 'Javier',
    userId: 1,
    setUserId: jest.fn(),
    setUserPassword: jest.fn(),
    authenticate: jest.fn(),
  }
));
const mockIsPresentInUserId = jest.fn();
const mockIsPresentInId = jest.fn();
const mockHandleLike = jest.fn();
const mockHandleSubscription = jest.fn();
const mockObjThunk = jest.fn();
const mockUrlApi = 'url';
const mockToken = 'token';
const mockTokenPayload = jest.fn();
const mockUserPayload = jest.fn();
const mockId = 1;
const mockSetUserErr = jest.fn();
const mockCoursesToDivs = jest.fn();
const mockHandleUpdateSubscription = jest.fn();
const mockHandleDeleteSubscription = jest.fn();
const mockHandleDelFriend = jest.fn();
const mockHandleUpdFriend = jest.fn();
const mockResetUser = jest.fn();
const mockResetCourses = jest.fn();
const mockInitCreator = jest.fn();
const mockHandleApiRequest = jest.fn();
const mockRemoveUserErr = jest.fn();

export {
  mockStore,
  fetchMock,
  mockMatch,
  mockCourses,
  mockTeacherCourses,
  mockLocation,
  mockUrl,
  mockUsersListToDiv,
  mockCommentsToDivs,
  mockUseAuth,
  mockIsPresentInUserId,
  mockIsPresentInId,
  mockHandleLike,
  mockHandleSubscription,
  mockObjThunk,
  mockUrlApi,
  mockToken,
  mockTokenPayload,
  mockUserPayload,
  mockId,
  mockSetUserErr,
  mockUser,
  mockCoursesToDivs,
  mockHandleUpdateSubscription,
  mockHandleDeleteSubscription,
  mockHandleDelFriend,
  mockHandleUpdFriend,
  mockResetUser,
  mockResetCourses,
  mockInitCreator,
  mockHandleApiRequest,
  mockRemoveUserErr,
  URL,
};
