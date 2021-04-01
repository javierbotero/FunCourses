import React from 'react';
import {
  render,
  screen,
} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';
import * as util from '../test-util/test-util';
import Report from '../components/Report';
import { findCourses } from '../helpers/helpers';

describe('Tests for Report', () => {
  it('prints Hello Javier 4, these are metrics of your actions', () => {
    render(
      <BrowserRouter>
        <div className="desktopMenu" />
        <Report
          setShowMenu={util.func}
          findCourses={findCourses}
          location={util.mockLocation}
          courses={util.mockCourses}
          url={util.mockUrl}
          user={util.mockUser}
        />
      </BrowserRouter>,
    );
    expect(screen.getByText('Hello Javier 4, these are metrics of your actions')).toBeInTheDocument();
  });
  it('prints Total Students:', () => {
    render(
      <BrowserRouter>
        <div className="desktopMenu" />
        <Report
          setShowMenu={util.func}
          findCourses={findCourses}
          location={util.mockLocation}
          courses={util.mockCourses}
          url={util.mockUrl}
          user={util.mockUser}
        />
      </BrowserRouter>,
    );
    expect(screen.getByText('Total Students:')).toBeInTheDocument();
  });
  it('Prints correctly', () => {
    const tree = renderer.create(
      <BrowserRouter>
        <div className="desktopMenu" />
        <Report
          setShowMenu={util.func}
          findCourses={findCourses}
          location={util.mockLocation}
          courses={util.mockCourses}
          url={util.mockUrl}
          user={util.mockUser}
        />
      </BrowserRouter>,
    );
    expect(tree).toMatchSnapshot();
  });
});
