import user1 from '../assets/images/user1.jpg';
import user2 from '../assets/images/user2.jpeg';

const URL = 'http://localhost:3000/';
const TOKEN = process.env.REACT_APP_FUN_COURSES;
const ID = process.env.REACT_APP_FUN_ID;
const OPINIONS = [
  {
    body: 'The best place to to teach about fashion in a fun way',
    avatar: user1,
  },
  {
    body: 'The best place to to teach about fashion in a fun way',
    avatar: user2,
  },
];

export {
  URL,
  TOKEN,
  ID,
  OPINIONS,
};
