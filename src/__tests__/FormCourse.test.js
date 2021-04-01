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
        <div className="desktopMenu" />
        <FormCourse
          setFalseLoad={util.func}
          location={util.mockLocation}
          setShowMenu={util.func}
          url={util.mockUrl}
          setUserErr={util.func}
          setTrueLoad={util.func}
          userId={1}
          password="password"
          id={util.mockId}
          token={util.mockToken}
          username="Javier"
          urlApi={util.mockUrlApi}
          objThunk={util.func}
          userPayload={util.func}
          tokenPayload={util.func}
          dispatchCourse={util.func}
        />
      </BrowserRouter>,
    );
    expect(screen.getByText('create a fun course!')).toBeInTheDocument();
  });
  it('Triggers dispatchCourse when user clicks in Submit', () => {
    const myFunc = jest.fn();
    render(
      <BrowserRouter>
        <div className="desktopMenu" />
        <FormCourse
          setFalseLoad={util.func}
          location={util.mockLocation}
          setShowMenu={util.func}
          url={util.mockUrl}
          setUserErr={util.func}
          setTrueLoad={util.func}
          userId={1}
          password="password"
          id={util.mockId}
          token={util.mockToken}
          username="Javier"
          urlApi={util.mockUrlApi}
          objThunk={util.func}
          userPayload={util.func}
          tokenPayload={util.func}
          dispatchCourse={myFunc}
        />
      </BrowserRouter>,
    );
    fireEvent.click(screen.getByRole('button', { name: /Submit/i }));
    expect(myFunc.mock.calls.length).toBe(1);
  });
  it('Triggers dispatchCourse when user clicks in Submit', () => {
    const myFunc = jest.fn();
    render(
      <BrowserRouter>
        <div className="desktopMenu" />
        <FormCourse
          setFalseLoad={util.func}
          location={util.mockLocation}
          setShowMenu={util.func}
          url={util.mockUrl}
          setUserErr={util.func}
          setTrueLoad={util.func}
          userId={1}
          password="password"
          id={util.mockId}
          token={util.mockToken}
          username="Javier"
          urlApi={util.mockUrlApi}
          objThunk={util.func}
          userPayload={util.func}
          tokenPayload={util.func}
          dispatchCourse={myFunc}
        />
      </BrowserRouter>,
    );
    fireEvent.click(screen.getByRole('button', { name: /Submit/i }));
    expect(myFunc.mock.calls.length).toBe(1);
  });
  it('Makes sure render correctly', () => {
    const tree = renderer.create(
      <BrowserRouter>
        <div className="desktopMenu" />
        <FormCourse
          setFalseLoad={util.func}
          location={util.mockLocation}
          setShowMenu={util.func}
          url={util.mockUrl}
          setUserErr={util.func}
          setTrueLoad={util.func}
          userId={1}
          password="password"
          id={util.mockId}
          token={util.mockToken}
          username="Javier"
          urlApi={util.mockUrlApi}
          objThunk={util.func}
          userPayload={util.func}
          tokenPayload={util.func}
          dispatchCourse={util.func}
        />
      </BrowserRouter>,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
