import React from 'react';
import {
  render,
  screen,
} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import renderer from 'react-test-renderer';
import { BrowserRouter } from 'react-router-dom';
import Landing from '../components/Landing';

describe('Tests for Landing', () => {
  it('prints Find a course of any theme', () => {
    render(
      <BrowserRouter>
        <Landing />
      </BrowserRouter>,
    );
    expect(screen.getByText('Find a course of any theme')).toBeInTheDocument();
  });
  it('prints Interesting courses from reliable teachers', () => {
    render(
      <BrowserRouter>
        <Landing />
      </BrowserRouter>,
    );
    expect(screen.getByText('Interesting courses from reliable teachers')).toBeInTheDocument();
  });
  it('Prints correctly', () => {
    const tree = renderer.create(
      <BrowserRouter>
        <Landing />
      </BrowserRouter>,
    );
    expect(tree).toMatchSnapshot();
  });
});
