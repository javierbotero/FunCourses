import { Link } from 'react-router-dom';

const initCreator = obj => ({
  method: obj.verb,
  mode: 'cors',
  cache: 'no-cache',
  credentials: 'same-origin',
  headers: {
    'Content-Type': 'application/json',
  },
  redirect: 'follow',
  referrerPolicy: 'no-referrer',
  body: JSON.stringify(obj.data),
});

const objThunk = (url, verb, data) => {
  const init = initCreator({
    verb,
    data,
  });
  return {
    url,
    init,
  };
};

const tokenPayload = (id, token) => ({
  token_id: id,
  token,
});

const userPayload = (id, password) => ({
  current_user_id: id,
  current_user_password: password,
});

const handleApiRequest = async (initCreator, verb, url, data) => {
  const init = initCreator({ verb, data });
  const response = await fetch(url, init)
    .then(res => res)
    .catch(err => err);
  return response;
};

const commentsToDivsWithCourse = (comments, location, url) => comments.map(c => (
  <div key={c.id}>
    <div>
      {'In course: '}
      <Link to={{
        pathname: `${url}/course/${c.course_id}`,
        state: {
          from: location,
        },
      }}
      >
        {c.course.title}
      </Link>
    </div>
    <div>{c.body}</div>
  </div>
));
const commentsToDivs = (comments, location, url) => comments.map(c => (
  <div key={c.id}>
    <div>
      <Link to={{
        pathname: `${url}/user/${c.user.id}`,
        state: {
          from: location,
          user: c.user,
        },
      }}
      >
        {c.user.username}
      </Link>
    </div>
    <div>{c.body}</div>
  </div>
));
const usersListToDiv = (users, location, url) => users.map(u => (
  <div className="user" key={u.id}>
    <div style={{ backgroundImage: 'url(u.avatar)' }}>
      avatar
    </div>
    <div>
      <Link
        to={{
          pathname: `${url}/user/${u.id}`,
          state: {
            from: location,
            user: u,
          },
        }}
      >
        {u.username}
      </Link>
    </div>
  </div>
));
const isPresentInUserId = (arr, id) => arr.find(item => item.user_id === parseInt(id, 10));
const isPresentInId = (arr, id) => arr.find(item => item.id === parseInt(id, 10));

export {
  initCreator,
  objThunk,
  tokenPayload,
  userPayload,
  handleApiRequest,
  commentsToDivsWithCourse,
  commentsToDivs,
  usersListToDiv,
  isPresentInUserId,
  isPresentInId,
};
