import React from 'react';
import {
  render,
  fireEvent,
  screen,
} from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';
import Course from '../components/Course';
import * as utils from '../test-util/test-util';
import '@testing-library/jest-dom/extend-expect';

describe('Tests for Course', () => {
  it('Checks that conctent of course is present', () => {
    render(
      <BrowserRouter>
        <div className="desktopMenu" />
        <Course
          mainUrl={utils.func}
          setShowMenu={utils.func}
          courses={utils.mockCourses}
          picturesToDivs={utils.func}
          teacherCourses={utils.mockTeacherCourses}
          location={utils.mockLocation}
          url={utils.mockUrl}
          usersListToDiv={utils.mockUsersListToDiv}
          commentsToDivs={utils.mockCommentsToDivs}
          useAuth={utils.mockUseAuth}
          isPresentInUserId={utils.func}
          isPresentInId={utils.func}
          handleLike={utils.func}
          handleSubscription={utils.func}
          objThunk={utils.func}
          urlApi={utils.mockUrlApi}
          token={utils.mockToken}
          tokenPayload={utils.func}
          userPayload={utils.func}
          id={utils.mockId}
          setUserErr={utils.func}
          match={utils.mockMatch}
        />
      </BrowserRouter>,
    );
    expect(screen.getAllByText('Karate class')[0]).toHaveTextContent('Karate class');
  });
  it('Makes sure that func is being called when button Subscribe is clicked', () => {
    const myFunc = jest.fn();
    render(
      <BrowserRouter>
        <div className="desktopMenu" />
        <Course
          mainUrl={utils.func}
          setShowMenu={utils.func}
          courses={utils.mockCourses}
          picturesToDivs={utils.func}
          teacherCourses={utils.mockTeacherCourses}
          location={utils.mockLocation}
          url={utils.mockUrl}
          usersListToDiv={utils.mockUsersListToDiv}
          commentsToDivs={utils.mockCommentsToDivs}
          useAuth={utils.mockUseAuth}
          isPresentInUserId={utils.func}
          isPresentInId={utils.func}
          handleLike={utils.func}
          handleSubscription={myFunc}
          objThunk={utils.func}
          urlApi={utils.mockUrlApi}
          token={utils.mockToken}
          tokenPayload={utils.func}
          userPayload={utils.func}
          id={utils.mockId}
          setUserErr={utils.func}
          match={utils.mockMatch}
        />
      </BrowserRouter>,
    );
    fireEvent.click(screen.getByText('Subscribe'));
    expect(myFunc.mock.calls.length).toBe(1);
  });
  it('Makes sure that mockUsersListToDiv is being called', () => {
    render(
      <BrowserRouter>
        <div className="desktopMenu" />
        <Course
          mainUrl={utils.func}
          setShowMenu={utils.func}
          courses={utils.mockCourses}
          picturesToDivs={utils.func}
          teacherCourses={utils.mockTeacherCourses}
          location={utils.mockLocation}
          url={utils.mockUrl}
          usersListToDiv={utils.mockUsersListToDiv}
          commentsToDivs={utils.mockCommentsToDivs}
          useAuth={utils.mockUseAuth}
          isPresentInUserId={utils.func}
          isPresentInId={utils.func}
          handleLike={utils.func}
          handleSubscription={utils.func}
          objThunk={utils.func}
          urlApi={utils.mockUrlApi}
          token={utils.mockToken}
          tokenPayload={utils.func}
          userPayload={utils.func}
          id={utils.mockId}
          setUserErr={utils.func}
          match={utils.mockMatch}
        />
      </BrowserRouter>,
    );
    expect(utils.mockUsersListToDiv.mock.calls.length).toBe(2);
  });
  it('Checks that information of teacher is present', () => {
    render(
      <BrowserRouter>
        <div className="desktopMenu" />
        <Course
          mainUrl={utils.func}
          setShowMenu={utils.func}
          courses={utils.mockCourses}
          picturesToDivs={utils.func}
          teacherCourses={utils.mockTeacherCourses}
          location={utils.mockLocation}
          url={utils.mockUrl}
          usersListToDiv={utils.mockUsersListToDiv}
          commentsToDivs={utils.mockCommentsToDivs}
          useAuth={utils.mockUseAuth}
          isPresentInUserId={utils.func}
          isPresentInId={utils.func}
          handleLike={utils.func}
          handleSubscription={utils.func}
          objThunk={utils.func}
          urlApi={utils.mockUrlApi}
          token={utils.mockToken}
          tokenPayload={utils.func}
          userPayload={utils.func}
          id={utils.mockId}
          setUserErr={utils.func}
          match={utils.mockMatch}
        />
      </BrowserRouter>,
    );
    expect(screen.getByText('Adele')).toBeTruthy();
  });
  it('renders correctly', () => {
    const tree = renderer
      .create(
        <BrowserRouter>
          <Course
            picturesToDivs={utils.func}
            mainUrl={utils.func}
            setShowMenu={utils.func}
            courses={utils.mockCourses}
            teacherCourses={utils.mockTeacherCourses}
            location={utils.mockLocation}
            url={utils.mockUrl}
            usersListToDiv={utils.mockUsersListToDiv}
            commentsToDivs={utils.mockCommentsToDivs}
            useAuth={utils.mockUseAuth}
            isPresentInUserId={utils.func}
            isPresentInId={utils.func}
            handleLike={utils.func}
            handleSubscription={utils.func}
            objThunk={utils.func}
            urlApi={utils.mockUrlApi}
            token={utils.mockToken}
            tokenPayload={utils.func}
            userPayload={utils.func}
            id={utils.mockId}
            setUserErr={utils.func}
            match={utils.mockMatch}
          />
        </BrowserRouter>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
