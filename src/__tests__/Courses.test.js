import React from 'react';
import {
  render,
  fireEvent,
  screen,
} from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';
import '@testing-library/jest-dom/extend-expect';
import * as util from '../test-util/test-util';
import Courses from '../components/Courses';

describe('Tests for courses', () => {
  it('Makes sure Dasboard text is present in the document', () => {
    render(
      <BrowserRouter>
        <Courses
          courses={util.mockCourses}
          location={util.mockLocation}
          url={util.mockUrl}
          coursesToDivs={util.mockCoursesToDivs}
          useAuth={util.mockUseAuth}
          resetUser={util.mockResetUser}
          resetCourses={util.mockResetCourses}
        />
      </BrowserRouter>,
    );
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
  });
  it('Makes sure coursesToDivs method is called when render Courses', () => {
    render(
      <BrowserRouter>
        <Courses
          courses={util.mockCourses}
          location={util.mockLocation}
          url={util.mockUrl}
          coursesToDivs={util.mockCoursesToDivs}
          useAuth={util.mockUseAuth}
          resetUser={util.mockResetUser}
          resetCourses={util.mockResetCourses}
        />
      </BrowserRouter>,
    );
    expect(util.mockCoursesToDivs.mock.calls.length).toBe(1);
  });
  it('Renders Courses component', () => {
    render(
      <BrowserRouter>
        <Courses
          courses={util.mockCourses}
          location={util.mockLocation}
          url={util.mockUrl}
          coursesToDivs={util.mockCoursesToDivs}
          useAuth={util.mockUseAuth}
          resetUser={util.mockResetUser}
          resetCourses={util.mockResetCourses}
        />
      </BrowserRouter>,
    );
    expect(util.mockCoursesToDivs.mock.calls.length).toBe(1);
  });
  it('Renders Courses component', () => {
    render(
      <BrowserRouter>
        <Courses
          courses={util.mockCourses}
          location={util.mockLocation}
          url={util.mockUrl}
          coursesToDivs={util.mockCoursesToDivs}
          useAuth={util.mockUseAuth}
          resetUser={util.mockResetUser}
          resetCourses={util.mockResetCourses}
        />
      </BrowserRouter>,
    );
    fireEvent.click(screen.getByRole('button', { name: /Log out/i }));
    expect(util.mockResetUser.mock.calls.length).toBe(1);
  });
  it('Renders Courses component', () => {
    const tree = renderer
      .create(
        <BrowserRouter>
          <Courses
            courses={util.mockCourses}
            location={util.mockLocation}
            url={util.mockUrl}
            coursesToDivs={util.mockCoursesToDivs}
            useAuth={util.mockUseAuth}
            resetUser={util.mockResetUser}
            resetCourses={util.mockResetCourses}
          />
        </BrowserRouter>,
      ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
