import user1 from '../assets/images/user1.jpg';
import user2 from '../assets/images/user2.jpeg';

const URL = process.env.REACT_APP_FUN_DOMAIN;
const TOKEN = process.env.REACT_APP_FUN_COURSES;
const ID = process.env.REACT_APP_FUN_ID;
const OPINIONS = [
  {
    body: 'The best place to to teach about fashion in a fun way',
    avatar: user1,
    name: 'Belle',
    field: 'Model',
  },
  {
    body: 'Here I have taught architecture to a lot of people around the world',
    avatar: user2,
    name: 'Jhon',
    field: 'Architecture',
  },
];

export {
  URL,
  TOKEN,
  ID,
  OPINIONS,
};
