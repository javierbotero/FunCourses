import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { createCourse } from '../actions/interactions';
import {
  setUserError,
  setTrueLoading,
  setFalseLoading,
} from '../reducers/user';
import image from '../assets/images/fun1.jpeg';
import form from '../css/Form.module.css';
import styles from '../css/FormCourse.module.css';

const FormCourse = props => {
  const {
    userId,
    userPassword,
    username,
    location,
    urlApi,
    objThunk,
    userPayload,
    tokenPayload,
    id,
    token,
    dispatchCourse,
    setUserErr,
    setTrueLoad,
    setFalseLoad,
    url,
    setShowMenu,
  } = props;
  useEffect(() => {
    const deskTopMenu = document.querySelector('.desktopMenu');
    if (deskTopMenu.classList.contains('hide')) {
      deskTopMenu.classList.remove('hide');
    }
  });
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [dateStart, setDateStart] = useState(new Date().toLocaleDateString());
  const [dateEnd, setDateEnd] = useState(new Date().toLocaleDateString());
  const [price, setPrice] = useState('');
  const [provider, setProvider] = useState('zoom');
  const [link, setLink] = useState('');
  const [status, setStatus] = useState('Closed');
  const [mainPicture, setMainPicture] = useState('');
  const [pictures, setPictures] = useState([]);

  const handleSubmit = e => {
    e.preventDefault();
    const init = {
      ...userPayload(userId, userPassword),
      ...tokenPayload(id, token),
      main: mainPicture,
      images: pictures,
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
    setTitle('');
    setContent('');
    setDateStart(new Date().toLocaleDateString());
    setDateEnd(new Date().toLocaleDateString());
    setPrice('');
    setProvider('zoom');
    setLink('');
    setStatus('Closed');
    setMainPicture('');
    setPictures([]);
  };
  const saveFileToBase64 = (file, cb, cb2 = false) => {
    const newFile = new FileReader();
    newFile.onloadstart = () => { setTrueLoad(); };
    newFile.onloadend = () => { setFalseLoad(); };
    newFile.readAsDataURL(file);
    newFile.onload = () => {
      if (cb2) {
        cb2({
          io: newFile.result.split(',')[1],
          filename: file.name,
        }, cb);
      } else {
        cb({
          io: newFile.result.split(',')[1],
          filename: file.name,
        });
      }
    };
  };
  const handleChange = (e, cb, attach = false) => {
    if (attach) {
      if (e.target.files.length > 3) {
        setUserErr('Maximum number of pictures is 3');
      } else if (e.target.files.length > 1) {
        const pushToStrs = (obj, locCb) => locCb(state => [...state, obj]);
        Array.prototype
          .forEach
          .call(e.target.files, f => saveFileToBase64(f, cb, pushToStrs));
      } else if (e.target.files[0]) {
        saveFileToBase64(e.target.files[0], cb);
      }
    } else {
      cb(e.target.value);
    }
  };
  return (
    <div
      className={`${styles.container} positionImage`}
      style={{
        backgroundImage: `url(${image})`,
      }}
    >
      <nav className={`${styles.navBar} navMenu show`}>
        <div>
          <Link to={{
            pathname: location.state ? location.state.from.pathname : `${url}`,
            state: { from: location },
          }}
          >
            <FontAwesomeIcon icon="chevron-left" />
          </Link>
        </div>
        <div>
          Create
        </div>
        <button
          className="removeButtonStyles"
          type="button"
          onClick={() => {
            console.log('fired button menu dots');
            setShowMenu(true);
          }}
        >
          <FontAwesomeIcon icon="ellipsis-v" />
        </button>
      </nav>
      <div className={`${form.layer} ${styles.bgImage}`} id="layer" />
      <div className={styles.form}>
        <header className={`${styles.header}`}>
          <div>
            <h3>
              {username}
            </h3>
            <h4>create a fun course!</h4>
          </div>
        </header>
        <form className={`form ${styles.correctForm}`} onSubmit={handleSubmit}>
          <div>
            <label htmlFor="title">
              <div>Title</div>
              <input type="text" onChange={e => handleChange(e, setTitle)} value={title} id="title" placeholder="Title" />
            </label>
          </div>
          <div>
            <label htmlFor="content">
              <div>Content</div>
              <textarea
                type="text"
                onChange={e => handleChange(e, setContent)}
                value={content}
                id="content"
                placeholder="Be concise"
                className="long-text"
              />
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
              <input type="text" onChange={e => handleChange(e, setPrice)} value={price} id="price" placeholder="Price" />
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
              <div>link</div>
              <input type="text" onChange={e => handleChange(e, setLink)} value={link} id="link" placeholder="Paste the link" />
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
            <label htmlFor="main-picture">
              <div>Main picture</div>
              <input type="file" id="main-picture" name="main-picture" onChange={e => handleChange(e, setMainPicture, true)} accept="image/*" />
            </label>
          </div>
          <div>
            <label htmlFor="main-picture">
              <div>Add 3 more engaging pictures</div>
              <input type="file" id="main-picture" name="main-picture" onChange={e => handleChange(e, setPictures, true)} multiple accept="image/*" />
            </label>
          </div>
          <div className={styles.submit}>
            <input type="submit" value="Submit" className="button" />
          </div>
        </form>
      </div>
    </div>
  );
};

FormCourse.propTypes = {
  userId: PropTypes.number.isRequired,
  userPassword: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  location: ReactRouterPropTypes.location.isRequired,
  dispatchCourse: PropTypes.func.isRequired,
  urlApi: PropTypes.string.isRequired,
  objThunk: PropTypes.func.isRequired,
  userPayload: PropTypes.func.isRequired,
  tokenPayload: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
  token: PropTypes.string.isRequired,
  setUserErr: PropTypes.func.isRequired,
  setTrueLoad: PropTypes.func.isRequired,
  setFalseLoad: PropTypes.func.isRequired,
  url: PropTypes.string.isRequired,
  setShowMenu: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  dispatchCourse: payload => dispatch(createCourse(payload)),
  setUserErr: payload => dispatch(setUserError(payload)),
  setTrueLoad: () => dispatch(setTrueLoading()),
  setFalseLoad: () => dispatch(setFalseLoading()),
});

export default connect(null, mapDispatchToProps)(FormCourse);
export { FormCourse };
