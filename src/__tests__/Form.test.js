import React from 'react';
import {
  render,
  fireEvent,
  screen,
} from '@testing-library/react';
import renderer from 'react-test-renderer';
import { Form } from '../components/Form';
import * as util from '../test-util/test-util';
import '@testing-library/jest-dom/extend-expect';

describe('Tests for Form', () => {
  it('Makes sure Username appears in the screen', () => {
    render(
      <Form
        initCreator={util.mockInitCreator}
        tokenPayload={util.mockTokenPayload}
        handleApiRequest={util.mockHandleApiRequest}
        id={util.mockId}
        token={util.mockToken}
        url={util.mockUrl}
        match={util.mockMatch}
        useAuth={util.mockUseAuth}
        setUserErr={util.mockSetUserErr}
        removeUserErr={util.mockRemoveUserErr}
      />,
    );
    expect(screen.getByText('Username')).toBeInTheDocument();
  });
  it('Makes sure Password appears in the screen', () => {
    render(
      <Form
        initCreator={util.mockInitCreator}
        tokenPayload={util.mockTokenPayload}
        handleApiRequest={util.mockHandleApiRequest}
        id={util.mockId}
        token={util.mockToken}
        url={util.mockUrl}
        match={util.mockMatch}
        useAuth={util.mockUseAuth}
        setUserErr={util.mockSetUserErr}
        removeUserErr={util.mockRemoveUserErr}
      />,
    );
    expect(screen.getByText('Password')).toBeInTheDocument();
  });
  it('Makes sure mockTokenPayload is not called if no Username and Password is fulfilled', () => {
    render(
      <Form
        initCreator={util.mockInitCreator}
        tokenPayload={util.mockTokenPayload}
        handleApiRequest={util.mockHandleApiRequest}
        id={util.mockId}
        token={util.mockToken}
        url={util.mockUrl}
        match={util.mockMatch}
        useAuth={util.mockUseAuth}
        setUserErr={util.mockSetUserErr}
        removeUserErr={util.mockRemoveUserErr}
      />,
    );
    fireEvent.click(screen.getByRole('button', { name: /Submit/i }));
    expect(util.mockTokenPayload.mock.calls.length).toBe(0);
  });
  it('Makes sure mockTokenPayload is called Username and Password is fulfilled', () => {
    render(
      <Form
        initCreator={util.mockInitCreator}
        tokenPayload={util.mockTokenPayload}
        handleApiRequest={util.mockHandleApiRequest}
        id={util.mockId}
        token={util.mockToken}
        url={util.mockUrl}
        match={util.mockMatch}
        useAuth={util.mockUseAuth}
        setUserErr={util.mockSetUserErr}
        removeUserErr={util.mockRemoveUserErr}
      />,
    );
    fireEvent.change(screen.getByLabelText(/username/i), { target: { value: '12345' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: '12345' } });
    fireEvent.click(screen.getByRole('button', { name: /Submit/i }));
    expect(util.mockTokenPayload.mock.calls.length).toBe(1);
  });
  it('Makes sure prints correctly', () => {
    const tree = renderer.create(
      <Form
        initCreator={util.mockInitCreator}
        tokenPayload={util.mockTokenPayload}
        handleApiRequest={util.mockHandleApiRequest}
        id={util.mockId}
        token={util.mockToken}
        url={util.mockUrl}
        match={util.mockMatch}
        useAuth={util.mockUseAuth}
        setUserErr={util.mockSetUserErr}
        removeUserErr={util.mockRemoveUserErr}
      />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
