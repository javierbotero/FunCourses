import React from 'react';
import {
  render,
  screen,
} from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';
import '@testing-library/jest-dom/extend-expect';
import { Dashboard } from '../components/Dashboard';
import * as util from '../test-util/test-util';
import {
  findCourses,
  findCoursesFromCoursesId,
} from '../helpers/helpers';

describe('Tests for Dashboard', () => {
  it('Makes sure text Dashboard is in render', () => {
    render(
      <BrowserRouter>
        <div className="desktopMenu" />
        <Dashboard
          userPassword={util.userPassword}
          userId={util.mockId}
          findCourses={findCourses}
          mainUrl={util.func}
          setShowMenu={util.func}
          courses={util.mockCourses}
          user={util.mockUser}
          location={util.mockLocation}
          url={util.mockUrl}
          coursesToDivs={util.func}
          usersListToDiv={util.mockUsersListToDiv}
          handleUpdateSubscription={util.func}
          handleDeleteSubscription={util.func}
          objThunk={util.func}
          tokenPayload={util.func}
          userPayload={util.func}
          urlApi={util.mockUrlApi}
          id={util.mockId}
          token={util.mockToken}
          teacherCourses={util.mockUser.courses}
          commentsToDivs={util.mockCommentsToDivs}
          isPresentInUserId={util.func}
          isPresentInId={util.func}
          setUserErr={util.func}
          handleDelFriend={util.func}
          handleUpdFriend={util.func}
          findCoursesFromCoursesId={findCoursesFromCoursesId}
        />
      </BrowserRouter>,
    );
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
  });
  it('Makes sure Karate class text in render', () => {
    render(
      <BrowserRouter>
        <div className="desktopMenu" />
        <Dashboard
          userPassword={util.userPassword}
          userId={util.mockId}
          findCourses={findCourses}
          mainUrl={util.func}
          setShowMenu={util.func}
          courses={util.mockCourses}
          user={util.mockUser}
          location={util.mockLocation}
          url={util.mockUrl}
          coursesToDivs={util.func}
          usersListToDiv={util.mockUsersListToDiv}
          handleUpdateSubscription={util.func}
          handleDeleteSubscription={util.func}
          objThunk={util.func}
          tokenPayload={util.func}
          userPayload={util.func}
          urlApi={util.mockUrlApi}
          id={util.mockId}
          token={util.mockToken}
          teacherCourses={util.mockUser.courses}
          commentsToDivs={util.mockCommentsToDivs}
          isPresentInUserId={util.func}
          isPresentInId={util.func}
          setUserErr={util.func}
          handleDelFriend={util.func}
          handleUpdFriend={util.func}
          findCoursesFromCoursesId={findCoursesFromCoursesId}
        />
      </BrowserRouter>,
    );
    expect(screen.getByText('Karate class')).toBeInTheDocument();
  });
  it('Makes sure As a Teacher text in render', () => {
    render(
      <BrowserRouter>
        <div className="desktopMenu" />
        <Dashboard
          userPassword={util.userPassword}
          userId={util.mockId}
          findCourses={findCourses}
          mainUrl={util.func}
          setShowMenu={util.func}
          courses={util.mockCourses}
          user={util.mockUser}
          location={util.mockLocation}
          url={util.mockUrl}
          coursesToDivs={util.func}
          usersListToDiv={util.mockUsersListToDiv}
          handleUpdateSubscription={util.func}
          handleDeleteSubscription={util.func}
          objThunk={util.func}
          tokenPayload={util.func}
          userPayload={util.func}
          urlApi={util.mockUrlApi}
          id={util.mockId}
          token={util.mockToken}
          teacherCourses={util.mockUser.courses}
          commentsToDivs={util.mockCommentsToDivs}
          isPresentInUserId={util.func}
          isPresentInId={util.func}
          setUserErr={util.func}
          handleDelFriend={util.func}
          handleUpdFriend={util.func}
          findCoursesFromCoursesId={findCoursesFromCoursesId}
        />
      </BrowserRouter>,
    );
    expect(screen.getByText('As a Teacher')).toBeInTheDocument();
  });
  it('Makes sure Enrollment Requests text in render', () => {
    render(
      <BrowserRouter>
        <div className="desktopMenu" />
        <Dashboard
          userPassword={util.userPassword}
          userId={util.mockId}
          findCourses={findCourses}
          mainUrl={util.func}
          setShowMenu={util.func}
          courses={util.mockCourses}
          user={util.mockUser}
          location={util.mockLocation}
          url={util.mockUrl}
          coursesToDivs={util.func}
          usersListToDiv={util.mockUsersListToDiv}
          handleUpdateSubscription={util.func}
          handleDeleteSubscription={util.func}
          objThunk={util.func}
          tokenPayload={util.func}
          userPayload={util.func}
          urlApi={util.mockUrlApi}
          id={util.mockId}
          token={util.mockToken}
          teacherCourses={util.mockUser.courses}
          commentsToDivs={util.mockCommentsToDivs}
          isPresentInUserId={util.func}
          isPresentInId={util.func}
          setUserErr={util.func}
          handleDelFriend={util.func}
          handleUpdFriend={util.func}
          findCoursesFromCoursesId={findCoursesFromCoursesId}
        />
      </BrowserRouter>,
    );
    expect(screen.getByText('0 Enrollment Requests')).toBeInTheDocument();
  });
  it('Makes sure Accepted Students text in render', () => {
    render(
      <BrowserRouter>
        <div className="desktopMenu" />
        <Dashboard
          userPassword={util.userPassword}
          userId={util.mockId}
          findCourses={findCourses}
          mainUrl={util.func}
          setShowMenu={util.func}
          courses={util.mockCourses}
          user={util.mockUser}
          location={util.mockLocation}
          url={util.mockUrl}
          coursesToDivs={util.func}
          usersListToDiv={util.mockUsersListToDiv}
          handleUpdateSubscription={util.func}
          handleDeleteSubscription={util.func}
          objThunk={util.func}
          tokenPayload={util.func}
          userPayload={util.func}
          urlApi={util.mockUrlApi}
          id={util.mockId}
          token={util.mockToken}
          teacherCourses={util.mockUser.courses}
          commentsToDivs={util.mockCommentsToDivs}
          isPresentInUserId={util.func}
          isPresentInId={util.func}
          setUserErr={util.func}
          handleDelFriend={util.func}
          handleUpdFriend={util.func}
          findCoursesFromCoursesId={findCoursesFromCoursesId}
        />
      </BrowserRouter>,
    );
    expect(screen.getByText('0 Accepted Students')).toBeInTheDocument();
  });
  it('Makes sure renders correctly', () => {
    const tree = renderer.create(
      <BrowserRouter>
        <div className="desktopMenu" />
        <Dashboard
          userPassword={util.userPassword}
          userId={util.mockId}
          findCourses={findCourses}
          mainUrl={util.func}
          setShowMenu={util.func}
          courses={util.mockCourses}
          user={util.mockUser}
          location={util.mockLocation}
          url={util.mockUrl}
          coursesToDivs={util.func}
          usersListToDiv={util.mockUsersListToDiv}
          handleUpdateSubscription={util.func}
          handleDeleteSubscription={util.func}
          objThunk={util.func}
          tokenPayload={util.func}
          userPayload={util.func}
          urlApi={util.mockUrlApi}
          id={util.mockId}
          token={util.mockToken}
          teacherCourses={util.mockUser.courses}
          commentsToDivs={util.mockCommentsToDivs}
          isPresentInUserId={util.func}
          isPresentInId={util.func}
          setUserErr={util.func}
          handleDelFriend={util.func}
          handleUpdFriend={util.func}
          findCoursesFromCoursesId={findCoursesFromCoursesId}
        />
      </BrowserRouter>,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
