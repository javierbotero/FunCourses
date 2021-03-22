import React from 'react';
import {
  render,
  screen,
} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';
import * as util from '../test-util/test-util';
import User from '../components/User';

describe('Tests for User', () => {
  it('prints Paco text', () => {
    render(
      <BrowserRouter>
        <User
          courses={util.mockCourses}
          match={util.mockMatch}
          location={util.mockLocation}
          url={util.mockUrl}
          user={util.mockUser}
          coursesToDivs={util.mockCoursesToDivs}
          commentsToDivsWithCourse={util.mockCommentsToDivsWithCourse}
          handleCreateFriendship={util.mockHandleCreateFriendship}
          tokenPayload={util.mockTokenPayload}
          userPayload={util.mockUserPayload}
          id={util.mockId}
          token={util.mockToken}
          useAuth={util.mockUseAuth}
          objThunk={util.mockObjThunk}
          urlApi={util.mockUrlApi}
          isFriendshipRequested={util.mockIsFriendshipRequested}
          handleDelFriend={util.mockHandleDelFriend}
          findCourses={util.mockFindCourses}
        />
      </BrowserRouter>,
    );
    expect(screen.getByText('Paco')).toBeInTheDocument();
  });
  it('prints Your are not friends yet text', () => {
    render(
      <BrowserRouter>
        <User
          courses={util.mockCourses}
          match={util.mockMatch}
          location={util.mockLocation}
          url={util.mockUrl}
          user={util.mockUser}
          coursesToDivs={util.mockCoursesToDivs}
          commentsToDivsWithCourse={util.mockCommentsToDivsWithCourse}
          handleCreateFriendship={util.mockHandleCreateFriendship}
          tokenPayload={util.mockTokenPayload}
          userPayload={util.mockUserPayload}
          id={util.mockId}
          token={util.mockToken}
          useAuth={util.mockUseAuth}
          objThunk={util.mockObjThunk}
          urlApi={util.mockUrlApi}
          isFriendshipRequested={util.mockIsFriendshipRequested}
          handleDelFriend={util.mockHandleDelFriend}
          findCourses={util.mockFindCourses}
        />
      </BrowserRouter>,
    );
    expect(screen.getByText('Your are not friends yet')).toBeInTheDocument();
  });
  it('Prints correctly', () => {
    const tree = renderer.create(
      <BrowserRouter>
        <User
          courses={util.mockCourses}
          match={util.mockMatch}
          location={util.mockLocation}
          url={util.mockUrl}
          user={util.mockUser}
          coursesToDivs={util.mockCoursesToDivs}
          commentsToDivsWithCourse={util.mockCommentsToDivsWithCourse}
          handleCreateFriendship={util.mockHandleCreateFriendship}
          tokenPayload={util.mockTokenPayload}
          userPayload={util.mockUserPayload}
          id={util.mockId}
          token={util.mockToken}
          useAuth={util.mockUseAuth}
          objThunk={util.mockObjThunk}
          urlApi={util.mockUrlApi}
          isFriendshipRequested={util.mockIsFriendshipRequested}
          handleDelFriend={util.mockHandleDelFriend}
          findCourses={util.mockFindCourses}
        />
      </BrowserRouter>,
    );
    expect(tree).toMatchSnapshot();
  });
});
