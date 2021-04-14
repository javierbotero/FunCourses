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
        <div className="desktopMenu" />
        <User
          userPassword={util.userPassword}
          userId={util.mockId}
          setShowMenu={util.func}
          courses={util.mockCourses}
          match={util.mockMatch}
          location={util.mockLocation}
          url={util.mockUrl}
          user={util.mockUser}
          coursesToDivs={util.func}
          commentsToDivsWithCourse={util.func}
          handleCreateFriendship={util.func}
          tokenPayload={util.func}
          userPayload={util.func}
          id={util.mockId}
          token={util.mockToken}
          objThunk={util.func}
          urlApi={util.mockUrlApi}
          isFriendshipRequested={util.func}
          handleDelFriend={util.func}
          findCourses={util.func}
        />
      </BrowserRouter>,
    );
    expect(screen.getAllByText('Paco')[0]).toBeInTheDocument();
  });
  it('prints Your are not friends yet text', () => {
    render(
      <BrowserRouter>
        <div className="desktopMenu" />
        <User
          userPassword={util.userPassword}
          userId={util.mockId}
          setShowMenu={util.func}
          courses={util.mockCourses}
          match={util.mockMatch}
          location={util.mockLocation}
          url={util.mockUrl}
          user={util.mockUser}
          coursesToDivs={util.func}
          commentsToDivsWithCourse={util.func}
          handleCreateFriendship={util.func}
          tokenPayload={util.func}
          userPayload={util.func}
          id={util.mockId}
          token={util.mockToken}
          objThunk={util.func}
          urlApi={util.mockUrlApi}
          isFriendshipRequested={util.func}
          handleDelFriend={util.func}
          findCourses={util.func}
        />
      </BrowserRouter>,
    );
    expect(screen.getByText('Your are not friends yet')).toBeInTheDocument();
  });
  it('Prints correctly', () => {
    const tree = renderer.create(
      <BrowserRouter>
        <div className="desktopMenu" />
        <User
          userPassword={util.userPassword}
          userId={util.mockId}
          setShowMenu={util.func}
          setUserErr={util.func}
          courses={util.mockCourses}
          match={util.mockMatch}
          location={util.mockLocation}
          url={util.mockUrl}
          user={util.mockUser}
          coursesToDivs={util.func}
          commentsToDivsWithCourse={util.func}
          handleCreateFriendship={util.func}
          tokenPayload={util.func}
          userPayload={util.func}
          id={util.mockId}
          token={util.mockToken}
          objThunk={util.func}
          urlApi={util.mockUrlApi}
          isFriendshipRequested={util.func}
          handleDelFriend={util.func}
          findCourses={util.func}
        />
      </BrowserRouter>,
    );
    expect(tree).toMatchSnapshot();
  });
});
