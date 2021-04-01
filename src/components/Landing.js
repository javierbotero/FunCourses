import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { OPINIONS } from '../constants/constants';
import image1 from '../assets/images/fun1.jpeg';
import styles from '../css/Landing.module.css';
import architecture from '../assets/images/architecture.jpg';
import stats from '../assets/images/stats.jpg';

const Landing = () => {
  const displayOpinions = opinions => opinions.map(o => (
    <div key={o.avatar} className={`${styles.opinions}`}>
      <div
        style={{
          backgroundImage: `url(${o.avatar})`,
        }}
        className={`${styles.opinionPic} ${styles.positionImage}`}
      />
      <h4>{o.name}</h4>
      <h5>{o.field}</h5>
      <div>{o.body}</div>
    </div>
  ));

  return (
    <div className="info-landing">
      <header className={`${styles.positionImage} ${styles.colorHeader}`} style={{ backgroundImage: `url(${image1})` }}>
        <div className={styles.degrade} />
        <div className={`${styles.infoHeader} ${styles.containers}`}>
          <nav className={`${styles.navHeader}`}>
            <div className={styles.logo}>FUN Courses</div>
            <ul className={`${styles.loginMenu}`}>
              <li><Link to="/login">Log in</Link></li>
              <li className={styles.signupWrapper}><Link to="/signup"><div>Sign up</div></Link></li>
            </ul>
          </nav>
          <h4 className={styles.headerPhrase}>Find a course of any theme</h4>
          <p className={styles.headerPar}>
            The best courses for you about any
            topic you can think of, taught by
            professionals.
          </p>
          <div className={styles.wrapperStartFree}>
            <Link to="/signin">Start Free</Link>
          </div>
        </div>
      </header>
      <main>
        <section className="bg-white">
          <div>
            <h3 className={styles.titleMain}>Interesting courses from reliable teachers</h3>
            <div className={`${styles.textInfo} ${styles.containers} ${styles.flexContainers}`}>
              <div className={`${styles.textInfo}`}>
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
              <div
                className={`${styles.picInfo} ${styles.positionImage}`}
                style={{
                  backgroundImage: `url(${stats})`,
                }}
              />
            </div>
          </div>
        </section>
        <section className={`${styles.containers} bg-purple ${styles.flexContainers}`}>
          <div
            className={`${styles.picInfo} ${styles.positionImage}`}
            style={{
              backgroundImage: `url(${architecture})`,
            }}
          />
          <div className={styles.textInfo}>
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
          <div className={styles.testimoniesIntro}>PEOPLE ARE ALREADY TAKING FUN COURSES</div>
          <div className={styles.testimoniesSaying}>Look what these are saying</div>
          <div className={`${styles.flexContainers} ${styles.opinionsPeople}`}>
            {displayOpinions(OPINIONS)}
          </div>
        </section>
      </main>
      <footer className={`${styles.footerLook} bg-white`}>
        <div className={`${styles.socialImage} ${styles.positionImage} ${styles.infoPicFooter}`} style={{ backgroundImage: `url(${image1})` }}>
          <div className={styles.degrade} />
          <h4>Learn everything at home</h4>
          <Link to="/signin"><div className={styles.footerStartFree}>Start free</div></Link>
        </div>
        <div className={`${styles.verticalCenter} ${styles.socialMedia}`}>
          <div>
            <div className={styles.logo}>FUN Courses</div>
          </div>
          <div className={styles.footerLogos}>
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
