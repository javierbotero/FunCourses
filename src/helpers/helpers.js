import { Link } from 'react-router-dom';
import avatar from '../assets/images/avatar.jpg';
import fun2 from '../assets/images/fun2.jpg';
import { URL } from '../constants/constants';

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
  <div key={c.id} className="comment">
    <div className="username">
      {'In: '}
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
    <div className="comment-body">{c.body}</div>
  </div>
));
const commentsToDivs = (comments, location, url) => comments.map(c => (
  <div key={c.id} className="comment">
    <div className="username">
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
    <div className="comment-body">{c.body}</div>
  </div>
));
const usersListToDiv = (users, location, url, urlApi) => users.map(u => (
  <div className="user" key={u.id}>
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
        <div
          style={{ backgroundImage: `url(${u.url_avatar ? `${urlApi}${u.url_avatar.slice(1, u.url_avatar.length)}` : avatar}` }}
          className="avatar"
        />
        <div style={{ padding: '5px 0' }}>
          {u.username}
        </div>
      </Link>
    </div>
  </div>
));
const findCourses = (courses, subcourses) => subcourses.map(s => courses.find(c => c.id === s.id));
const findCoursesFromCoursesId = (courses, relation) => relation
  .map(r => courses.find(c => c.id === r.course_id));
const isPresentInUserId = (arr, id) => arr.find(item => item.user_id === parseInt(id, 10));
const isPresentInId = (arr, id) => arr.find(item => item.id === parseInt(id, 10));
const isFriendshipRequested = (arr, id) => arr.find(f => f.receiver_id === parseInt(id, 10));
const mainUrl = c => {
  if (c.main_image_url) {
    return c.main_image_url ? `${URL}${c.main_image_url.slice(1, c.main_image_url.length)}` : fun2;
  }
  return fun2;
};
const picturesToDivs = (images, urlApi, cssClasses) => images.map(img => (
  <div
    key={img.slice(img.length - 30, img.length)}
    className={cssClasses}
    style={{
      backgroundImage: `url(${urlApi}${img})`,
    }}
  />
));

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
  isFriendshipRequested,
  findCourses,
  findCoursesFromCoursesId,
  mainUrl,
  picturesToDivs,
};
