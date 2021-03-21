import React from 'react';
import {
  render,
  fireEvent,
  screen,
} from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Course from '../components/Course';
import * as utils from '../test-util/test-util';
import '@testing-library/jest-dom/extend-expect';

describe('Tests for Course', () => {
  it('Checks that', () => {
    render(
      <BrowserRouter>
        <Course
          courses={utils.mockCourses}
          teacherCourses={utils.mockTeacherCourses}
          location={utils.mockLocation}
          url={utils.mockUrl}
          usersListToDiv={utils.mockUsersListToDiv}
          commentsToDivs={utils.mockCommentsToDivs}
          useAuth={utils.mockUseAuth}
          isPresentInUserId={utils.mockIsPresentInUserId}
          isPresentInId={utils.mockIsPresentInId}
          handleLike={utils.mockHandleLike}
          handleSubscription={utils.mockHandleSubscription}
          objThunk={utils.mockObjThunk}
          urlApi={utils.mockUrlApi}
          token={utils.mockToken}
          tokenPayload={utils.mockTokenPayload}
          userPayload={utils.mockUserPayload}
          id={utils.mockId}
          setUserErr={utils.mockSetUserErr}
          match={utils.mockMatch}
        />
      </BrowserRouter>,
    );
    expect(screen.getByText('Karate class')).toHaveTextContent('Karate class');
  });
});
