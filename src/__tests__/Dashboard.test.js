import React from 'react';
import {
  fireEvent,
  render,
  screen,
} from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';
import '@testing-library/jest-dom/extend-expect';
import { Dashboard } from '../components/Dashboard';
import * as util from '../test-util/test-util';

describe('Tests for Dashboard', () => {
  it('Makes sure text Dashboard is in render', () => {
    render(
      <BrowserRouter>
        <Dashboard
          user={util.mockUser}
          location={util.mockLocation}
          url={util.mockUrl}
          coursesToDivs={util.mockCoursesToDivs}
          usersListToDiv={util.mockUsersListToDiv}
          handleUpdateSubscription={util.mockHandleUpdateSubscription}
          handleDeleteSubscription={util.mockHandleDeleteSubscription}
          objThunk={util.mockObjThunk}
          tokenPayload={util.mockTokenPayload}
          userPayload={util.mockUserPayload}
          urlApi={util.mockUrlApi}
          id={util.mockId}
          token={util.mockToken}
          useAuth={util.mockUseAuth}
          teacherCourses={util.mockUser.courses}
          commentsToDivs={util.mockCommentsToDivs}
          isPresentInUserId={util.mockIsPresentInUserId}
          isPresentInId={util.mockIsPresentInId}
          setUserErr={util.mockSetUserErr}
          handleDelFriend={util.mockHandleDelFriend}
          handleUpdFriend={util.mockHandleUpdFriend}
        />
      </BrowserRouter>,
    );
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
  });
  it('Makes sure Karate class text in render', () => {
    render(
      <BrowserRouter>
        <Dashboard
          user={util.mockUser}
          location={util.mockLocation}
          url={util.mockUrl}
          coursesToDivs={util.mockCoursesToDivs}
          usersListToDiv={util.mockUsersListToDiv}
          handleUpdateSubscription={util.mockHandleUpdateSubscription}
          handleDeleteSubscription={util.mockHandleDeleteSubscription}
          objThunk={util.mockObjThunk}
          tokenPayload={util.mockTokenPayload}
          userPayload={util.mockUserPayload}
          urlApi={util.mockUrlApi}
          id={util.mockId}
          token={util.mockToken}
          useAuth={util.mockUseAuth}
          teacherCourses={util.mockUser.courses}
          commentsToDivs={util.mockCommentsToDivs}
          isPresentInUserId={util.mockIsPresentInUserId}
          isPresentInId={util.mockIsPresentInId}
          setUserErr={util.mockSetUserErr}
          handleDelFriend={util.mockHandleDelFriend}
          handleUpdFriend={util.mockHandleUpdFriend}
        />
      </BrowserRouter>,
    );
    expect(screen.getByText('Karate class')).toBeInTheDocument();
  });
  it('Makes sure As a Teacher text in render', () => {
    render(
      <BrowserRouter>
        <Dashboard
          user={util.mockUser}
          location={util.mockLocation}
          url={util.mockUrl}
          coursesToDivs={util.mockCoursesToDivs}
          usersListToDiv={util.mockUsersListToDiv}
          handleUpdateSubscription={util.mockHandleUpdateSubscription}
          handleDeleteSubscription={util.mockHandleDeleteSubscription}
          objThunk={util.mockObjThunk}
          tokenPayload={util.mockTokenPayload}
          userPayload={util.mockUserPayload}
          urlApi={util.mockUrlApi}
          id={util.mockId}
          token={util.mockToken}
          useAuth={util.mockUseAuth}
          teacherCourses={util.mockUser.courses}
          commentsToDivs={util.mockCommentsToDivs}
          isPresentInUserId={util.mockIsPresentInUserId}
          isPresentInId={util.mockIsPresentInId}
          setUserErr={util.mockSetUserErr}
          handleDelFriend={util.mockHandleDelFriend}
          handleUpdFriend={util.mockHandleUpdFriend}
        />
      </BrowserRouter>,
    );
    expect(screen.getByText('As a Teacher')).toBeInTheDocument();
  });
  it('Makes sure Enrollment Requests text in render', () => {
    render(
      <BrowserRouter>
        <Dashboard
          user={util.mockUser}
          location={util.mockLocation}
          url={util.mockUrl}
          coursesToDivs={util.mockCoursesToDivs}
          usersListToDiv={util.mockUsersListToDiv}
          handleUpdateSubscription={util.mockHandleUpdateSubscription}
          handleDeleteSubscription={util.mockHandleDeleteSubscription}
          objThunk={util.mockObjThunk}
          tokenPayload={util.mockTokenPayload}
          userPayload={util.mockUserPayload}
          urlApi={util.mockUrlApi}
          id={util.mockId}
          token={util.mockToken}
          useAuth={util.mockUseAuth}
          teacherCourses={util.mockUser.courses}
          commentsToDivs={util.mockCommentsToDivs}
          isPresentInUserId={util.mockIsPresentInUserId}
          isPresentInId={util.mockIsPresentInId}
          setUserErr={util.mockSetUserErr}
          handleDelFriend={util.mockHandleDelFriend}
          handleUpdFriend={util.mockHandleUpdFriend}
        />
      </BrowserRouter>,
    );
    expect(screen.getByText('Enrollment Requests')).toBeInTheDocument();
  });
  it('Makes sure Accepted Students text in render', () => {
    render(
      <BrowserRouter>
        <Dashboard
          user={util.mockUser}
          location={util.mockLocation}
          url={util.mockUrl}
          coursesToDivs={util.mockCoursesToDivs}
          usersListToDiv={util.mockUsersListToDiv}
          handleUpdateSubscription={util.mockHandleUpdateSubscription}
          handleDeleteSubscription={util.mockHandleDeleteSubscription}
          objThunk={util.mockObjThunk}
          tokenPayload={util.mockTokenPayload}
          userPayload={util.mockUserPayload}
          urlApi={util.mockUrlApi}
          id={util.mockId}
          token={util.mockToken}
          useAuth={util.mockUseAuth}
          teacherCourses={util.mockUser.courses}
          commentsToDivs={util.mockCommentsToDivs}
          isPresentInUserId={util.mockIsPresentInUserId}
          isPresentInId={util.mockIsPresentInId}
          setUserErr={util.mockSetUserErr}
          handleDelFriend={util.mockHandleDelFriend}
          handleUpdFriend={util.mockHandleUpdFriend}
        />
      </BrowserRouter>,
    );
    expect(screen.getByText('Accepted Students')).toBeInTheDocument();
  });
  it('Makes sure renders correctly', () => {
    const tree = renderer.create(
      <BrowserRouter>
        <Dashboard
          user={util.mockUser}
          location={util.mockLocation}
          url={util.mockUrl}
          coursesToDivs={util.mockCoursesToDivs}
          usersListToDiv={util.mockUsersListToDiv}
          handleUpdateSubscription={util.mockHandleUpdateSubscription}
          handleDeleteSubscription={util.mockHandleDeleteSubscription}
          objThunk={util.mockObjThunk}
          tokenPayload={util.mockTokenPayload}
          userPayload={util.mockUserPayload}
          urlApi={util.mockUrlApi}
          id={util.mockId}
          token={util.mockToken}
          useAuth={util.mockUseAuth}
          teacherCourses={util.mockUser.courses}
          commentsToDivs={util.mockCommentsToDivs}
          isPresentInUserId={util.mockIsPresentInUserId}
          isPresentInId={util.mockIsPresentInId}
          setUserErr={util.mockSetUserErr}
          handleDelFriend={util.mockHandleDelFriend}
          handleUpdFriend={util.mockHandleUpdFriend}
        />
      </BrowserRouter>,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
