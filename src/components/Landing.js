import React from 'react';
import { Link } from 'react-router-dom';
import { OPINIONS } from '../constants/constants';

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
      <header>
        SOME HEADER
      </header>
      <main>
        <section>
          STATS SECTION
          <Link to="/signin">Start Now</Link>
        </section>
        <section>
          BEST COURSES
          <Link to="/signin">Start Now</Link>
        </section>
        <section>
          OPINIONS
          <div className="opinions">
            {displayOpinions(OPINIONS)}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Landing;
