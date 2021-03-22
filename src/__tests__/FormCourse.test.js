import React from 'react';
import {
  fireEvent,
  render,
  screen,
} from '@testing-library/react';
import renderer from 'react-test-renderer';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter } from 'react-router-dom';
import { FormCourse } from '../components/FormCourse';
import * as util from '../test-util/test-util';

describe('Tests FormCourse', () => {
  it('The text "create a fun course!" be present', () => {
    render(
      <BrowserRouter>
        <FormCourse
          location={util.mockLocation}
          userId={1}
          password="password"
          id={util.mockId}
          token={util.mockToken}
          username="Javier"
          urlApi={util.mockUrlApi}
          objThunk={util.mockObjThunk}
          userPayload={util.mockUserPayload}
          tokenPayload={util.mockTokenPayload}
          dispatchCourse={util.mockDispatchCourse}
        />
      </BrowserRouter>,
    );
    expect(screen.getByText('create a fun course!')).toBeInTheDocument();
  });
  it('Triggers dispatchCourse when user clicks in Submit', () => {
    render(
      <BrowserRouter>
        <FormCourse
          location={util.mockLocation}
          userId={1}
          password="password"
          id={util.mockId}
          token={util.mockToken}
          username="Javier"
          urlApi={util.mockUrlApi}
          objThunk={util.mockObjThunk}
          userPayload={util.mockUserPayload}
          tokenPayload={util.mockTokenPayload}
          dispatchCourse={util.mockDispatchCourse}
        />
      </BrowserRouter>,
    );
    fireEvent.click(screen.getByRole('button', { name: /Submit/i }));
    expect(util.mockDispatchCourse.mock.calls.length).toBe(1);
  });
  it('Triggers dispatchCourse when user clicks in Submit', () => {
    render(
      <BrowserRouter>
        <FormCourse
          location={util.mockLocation}
          userId={1}
          password="password"
          id={util.mockId}
          token={util.mockToken}
          username="Javier"
          urlApi={util.mockUrlApi}
          objThunk={util.mockObjThunk}
          userPayload={util.mockUserPayload}
          tokenPayload={util.mockTokenPayload}
          dispatchCourse={util.mockDispatchCourse}
        />
      </BrowserRouter>,
    );
    fireEvent.click(screen.getByRole('button', { name: /Submit/i }));
    expect(util.mockDispatchCourse.mock.calls.length).toBe(1);
  });
  it('Makes sure render correctly', () => {
    const tree = renderer.create(
      <BrowserRouter>
        <FormCourse
          location={util.mockLocation}
          userId={1}
          password="password"
          id={util.mockId}
          token={util.mockToken}
          username="Javier"
          urlApi={util.mockUrlApi}
          objThunk={util.mockObjThunk}
          userPayload={util.mockUserPayload}
          tokenPayload={util.mockTokenPayload}
          dispatchCourse={util.mockDispatchCourse}
        />
      </BrowserRouter>,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
