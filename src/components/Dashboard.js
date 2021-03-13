import React from 'react';
import { connect } from 'react-redux';

const Dashboard = props => {
  const {
    courses,
    location,
    url,
  } = props;
  const displayStudentSubscriptions = (courses, subscriptions) () => {
    
  }
  return (
    <div>
      <header>
        <h2>Dashboard</h2>
      </header>
      <main>
        <h3>Your Courses</h3>
        <div className="student">
          <h4>As a Student</h4>
          {displayStudentCourses(subscriptions)}
        </div>
        <div className="teacher">
          <h4>As a Teacher</h4>
          {displayTeacherCourses(teacherCourses)}
        </div>
      </main>
    </div>
  )
};

export default connect()(Dashboard);
