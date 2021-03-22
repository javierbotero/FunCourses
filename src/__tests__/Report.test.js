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

describe('Tests for Report', () => {
  it('prints Hello Javier 4, these are metrics of your actions', () => {
    render(
      <BrowserRouter>
        <Report
          location={util.mockLocation}
          url={util.mockUrl}
          user={util.mockUser}
        />
      </BrowserRouter>,
    );
    expect(screen.getByText('Hello Javier 4, these are metrics of your actions')).toBeInTheDocument();
  });
  it('prints Courses created:', () => {
    render(
      <BrowserRouter>
        <Report
          location={util.mockLocation}
          url={util.mockUrl}
          user={util.mockUser}
        />
      </BrowserRouter>,
    );
    expect(screen.getByText('Courses created:')).toBeInTheDocument();
  });
  it('Prints correctly', () => {
    const tree = renderer.create(
      <BrowserRouter>
        <Report
          location={util.mockLocation}
          url={util.mockUrl}
          user={util.mockUser}
        />
      </BrowserRouter>,
    );
    expect(tree).toMatchSnapshot();
  });
});
