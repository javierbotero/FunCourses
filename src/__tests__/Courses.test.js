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
import { Courses } from '../components/Courses';

describe('Tests for courses', () => {
  it('Makes sure Dasboard text is present in the document', () => {
    render(
      <BrowserRouter>
        <div className="desktopMenu" />
        <Courses
          urlApi="urlApi"
          setShowMenu={util.func}
          username="Javier"
          avatar="avatar"
          courses={util.mockCourses}
          location={util.mockLocation}
          url={util.mockUrl}
          coursesToDivs={util.func}
          resetUser={util.func}
          resetCourses={util.func}
        />
      </BrowserRouter>,
    );
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
  });
  it('Makes sure coursesToDivs method is called when render Courses', () => {
    render(
      <BrowserRouter>
        <div className="desktopMenu" />
        <Courses
          urlApi="urlApi"
          setShowMenu={util.func}
          username="Javier"
          avatar="avatar"
          courses={util.mockCourses}
          location={util.mockLocation}
          url={util.mockUrl}
          coursesToDivs={util.func}
          resetUser={util.func}
          resetCourses={util.func}
        />
      </BrowserRouter>,
    );
    expect(util.func.mock.calls.length).toBe(1);
  });
  it('Renders Courses component', () => {
    render(
      <BrowserRouter>
        <div className="desktopMenu" />
        <Courses
          urlApi="urlApi"
          setShowMenu={util.func}
          username="Javier"
          avatar="avatar"
          courses={util.mockCourses}
          location={util.mockLocation}
          url={util.mockUrl}
          coursesToDivs={util.func}
          resetUser={util.func}
          resetCourses={util.func}
        />
      </BrowserRouter>,
    );
    expect(util.func.mock.calls.length).toBe(1);
  });
  it('Renders Courses component', () => {
    const myFunc = jest.fn();
    render(
      <BrowserRouter>
        <div className="desktopMenu" />
        <Courses
          urlApi="urlApi"
          setShowMenu={util.func}
          username="Javier"
          avatar="avatar"
          courses={util.mockCourses}
          location={util.mockLocation}
          url={util.mockUrl}
          coursesToDivs={util.func}
          resetUser={myFunc}
          resetCourses={util.func}
        />
      </BrowserRouter>,
    );
    fireEvent.click(screen.getByRole('button', { name: /Log out/i }));
    expect(myFunc.mock.calls.length).toBe(1);
  });
  it('Renders Courses component', () => {
    const tree = renderer
      .create(
        <BrowserRouter>
          <div className="desktopMenu" />
          <Courses
            urlApi="urlApi"
            setShowMenu={util.func}
            username="Javier"
            avatar="avatar"
            courses={util.mockCourses}
            location={util.mockLocation}
            url={util.mockUrl}
            coursesToDivs={util.func}
            resetUser={util.func}
            resetCourses={util.func}
          />
        </BrowserRouter>,
      ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
