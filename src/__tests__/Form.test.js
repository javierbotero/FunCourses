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
  it('Makes sure Username appears on the screen', () => {
    render(
      <Form
        setTrueLoad={util.func}
        setFalseLoad={util.func}
        history={util.mockHistory}
        initCreator={util.func}
        tokenPayload={util.func}
        handleApiRequest={util.func}
        id={util.mockId}
        token={util.mockToken}
        url={util.mockUrl}
        match={util.mockMatch}
        useAuth={util.mockUseAuth}
        setUserErr={util.func}
        removeUserErr={util.func}
      />,
    );
    expect(screen.getByText('Username')).toBeInTheDocument();
  });
  it('Makes sure Password appears in the screen', () => {
    render(
      <Form
        setTrueLoad={util.func}
        setFalseLoad={util.func}
        history={util.mockHistory}
        initCreator={util.func}
        tokenPayload={util.func}
        handleApiRequest={util.func}
        id={util.mockId}
        token={util.mockToken}
        url={util.mockUrl}
        match={util.mockMatch}
        useAuth={util.mockUseAuth}
        setUserErr={util.func}
        removeUserErr={util.func}
      />,
    );
    expect(screen.getByText('Password')).toBeInTheDocument();
  });
  it('Makes sure func is not called if no Username and Password is fulfilled', () => {
    const myFunc = jest.fn();
    render(
      <Form
        setTrueLoad={util.func}
        setFalseLoad={util.func}
        history={util.mockHistory}
        initCreator={util.func}
        tokenPayload={util.func}
        handleApiRequest={myFunc}
        id={util.mockId}
        token={util.mockToken}
        url={util.mockUrl}
        match={util.mockMatch}
        useAuth={util.mockUseAuth}
        setUserErr={util.func}
        removeUserErr={util.func}
      />,
    );
    fireEvent.click(screen.getByRole('button', { name: /Submit/i }));
    expect(myFunc.mock.calls.length).toBe(0);
  });
  it('Makes sure func is called three times', () => {
    render(
      <Form
        setTrueLoad={util.func}
        setFalseLoad={util.func}
        history={util.mockHistory}
        initCreator={util.func}
        tokenPayload={util.func}
        handleApiRequest={util.func}
        id={util.mockId}
        token={util.mockToken}
        url={util.mockUrl}
        match={util.mockMatch}
        useAuth={util.mockUseAuth}
        setUserErr={util.func}
        removeUserErr={util.func}
      />,
    );
    fireEvent.change(screen.getByLabelText(/username/i), { target: { value: '12345' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: '12345' } });
    fireEvent.click(screen.getByRole('button', { name: /Submit/i }));
    expect(util.func.mock.calls.length).toBe(3);
  });
  it('Makes sure prints correctly', () => {
    const tree = renderer.create(
      <Form
        setTrueLoad={util.func}
        setFalseLoad={util.func}
        history={util.mockHistory}
        initCreator={util.func}
        tokenPayload={util.func}
        handleApiRequest={util.func}
        id={util.mockId}
        token={util.mockToken}
        url={util.mockUrl}
        match={util.mockMatch}
        useAuth={util.mockUseAuth}
        setUserErr={util.func}
        removeUserErr={util.func}
      />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
