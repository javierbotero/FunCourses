import React from 'react';
import {
  fireEvent,
  render,
  screen,  
} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import renderer from 'react-test-renderer';
import Landing from '../components/Landing';

describe('Tests for Landing', () => {
  it('', () => {
    render(<Landing />);
    expect(screen.getByText(''));
  });
});
