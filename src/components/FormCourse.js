import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';
import { createCourse } from '../actions/interactions';

const FormCourse = props => {
  const {
    userId,
    password,
    username,
    location,
    urlApi,
    objThunk,
    userPayload,
    tokenPayload,
    id,
    token,
    dispatchCourse,
  } = props;
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [dateStart, setDateStart] = useState(new Date().toLocaleDateString());
  const [dateEnd, setDateEnd] = useState(new Date().toLocaleDateString());
  const [price, setPrice] = useState('');
  const [provider, setProvider] = useState('zoom');
  const [link, setLink] = useState('');
  const [status, setStatus] = useState('Closed');

  const handleSubmit = e => {
    e.preventDefault();
    const init = {
      ...userPayload(userId, password),
      ...tokenPayload(id, token),
      course: {
        link,
        provider,
        title,
        content,
        status,
        dates: `${dateStart} ${dateEnd} `,
        price,
      },
    };
    const payload = objThunk(urlApi, 'POST', init);
    dispatchCourse(payload);
  };
  const handleChange = (e, cb) => cb(e.target.value);
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to={location.state ? location.state.from.pathname : `${urlApi}`}>
              &#60;
            </Link>
          </li>
        </ul>
      </nav>
      <div className="form-course">
        <header>
          <div>
            <h3>
              {username}
            </h3>
            <h4>create a fun course!</h4>
          </div>
        </header>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="title">
              <div>Title</div>
              <input type="text" onChange={e => handleChange(e, setTitle)} value={title} id="title" placeholder="User" />
            </label>
          </div>
          <div>
            <label htmlFor="content">
              <div>Content</div>
              <input type="text" onChange={e => handleChange(e, setContent)} value={content} id="content" placeholder="User" />
            </label>
          </div>
          <div>
            <label htmlFor="dateStart">
              <div>Start</div>
              <input type="date" onChange={e => handleChange(e, setDateStart)} value={dateStart} id="dateStart" max={dateEnd} />
            </label>
            <label htmlFor="dateEnd">
              <div>End</div>
              <input type="date" onChange={e => handleChange(e, setDateEnd)} value={dateEnd} id="dateEnd" min={dateStart} />
            </label>
          </div>
          <div>
            <label htmlFor="price">
              <div>Price</div>
              <input type="text" onChange={e => handleChange(e, setPrice)} value={price} id="price" placeholder="User" />
            </label>
          </div>
          <div>
            <label htmlFor="price">
              <div>Videocall provider</div>
              <select value={provider} onChange={e => handleChange(e, setProvider)}>
                <option value="zoom">Zoom</option>
                <option value="meet">Meet</option>
                <option value="livestorm">Livestorm</option>
                <option value="zoho-meeting">Zoho Meeting</option>
                <option value="pexip">Pexip</option>
                <option value="poly">Poly</option>
                <option value="Blue-jeans">Blue Jeans</option>
              </select>
            </label>
          </div>
          <div>
            <label htmlFor="link">
              <div>Videocall provider link</div>
              <input type="text" onChange={e => handleChange(e, setLink)} value={link} id="link" placeholder="Copy the link" />
            </label>
          </div>
          <div>
            <label htmlFor="link">
              <div>Status</div>
              <select value={status} onChange={e => handleChange(e, setStatus)}>
                <option value="Open">Open</option>
                <option value="Closed">Closed</option>
              </select>
            </label>
          </div>
          <div>
            <input type="submit" value="Submit" />
          </div>
        </form>
      </div>
    </div>
  );
};

FormCourse.propTypes = {
  userId: PropTypes.number.isRequired,
  password: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  location: ReactRouterPropTypes.location.isRequired,
  dispatchCourse: PropTypes.func.isRequired,
  urlApi: PropTypes.string.isRequired,
  objThunk: PropTypes.func.isRequired,
  userPayload: PropTypes.func.isRequired,
  tokenPayload: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
  token: PropTypes.string.isRequired,
};

const mapDispatchToProps = dispatch => ({
  dispatchCourse: payload => dispatch(createCourse(payload)),
});

export default connect(null, mapDispatchToProps)(FormCourse);
