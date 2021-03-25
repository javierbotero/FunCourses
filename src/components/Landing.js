import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { OPINIONS } from '../constants/constants';
import image1 from '../assets/images/fun1.jpeg';
import styles from '../css/Landing.module.css';

const Landing = () => {
  const displayOpinions = opinions => opinions.map(o => (
    <div key={o.avatar} className="opinion">
      <div style={{
        backgroundImage: o.avatar,
      }}
      />
      <div>{o.body}</div>
    </div>
  ));

  return (
    <div className="info-landing">
      <header className={`${styles.containers} ${styles.containerHeader}`} style={{ backgroundImage: `url(${image1})` }}>
        <nav className={`${styles.navHeader}`}>
          <div className="logo">Logo</div>
          <ul className={`${styles.loginMenu}`}>
            <li><Link to="/signup">Sign up</Link></li>
            <li><Link to="/login">Log in</Link></li>
          </ul>
        </nav>
        <h4 className={styles.headerPar}>Find a course of any theme</h4>
        <p>
          The best courses for you about any
          theme you can think of, taught by
          professionals.
        </p>
        <Link to="/signin">Start Free</Link>
      </header>
      <main>
        <section className={`${styles.containers} ${styles.verticalCenter} bg-white`}>
          <h4>Interesting courses from reliable teachers</h4>
          <div>
            <div>
              <h4>
                All stats at your fingerprints
              </h4>
              <p>
                All the information about the number
                of students, your courses, comments
                and interactions will be available to
                you to measure your performance.
              </p>
            </div>
            <div className="stats" />
          </div>
        </section>
        <section className={`${styles.containers} ${styles.verticalCenter} bg-purple`}>
          <div className="stats" />
          <div>
            <div>
              <h4>
                Talk with professionals
              </h4>
              <p>
                The best professionals around the world will
                be reachable through live courses. take the
                opportunity to enhance your skills in any matter.
              </p>
            </div>
          </div>
        </section>
        <section className={`${styles.containers} ${styles.verticalCenter} bg-white`}>
          <div>PEOPLE ARE ALREADY TAKING FUN COURSES</div>
          <h4>Look what these are saying</h4>
          <div className="opinions">
            {displayOpinions(OPINIONS)}
          </div>
        </section>
      </main>
      <footer className={`${styles.footerLook} bg-white`}>
        <div className={`${styles.socialImage}`} style={{ backgroundImage: `url(${image1})` }}>
          <h4>Learn everything at home</h4>
          <Link to="/signin">Start free</Link>
        </div>
        <div className={`${styles.verticalCenter} ${styles.socialMedia}`}>
          <div>
            <div className="logo" />
            <div>Fun Courses</div>
          </div>
          <div>
            <FontAwesomeIcon icon={['fab', 'linkedin']} />
            <FontAwesomeIcon icon={['fab', 'facebook']} />
            <FontAwesomeIcon icon={['fab', 'twitter-square']} />
            <FontAwesomeIcon icon={['fab', 'instagram-square']} />
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
