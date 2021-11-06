import {render, fireEvent} from '@testing-library/react';
import LoginForm from './LoginForm';

const setup = () => {
    const utils = render(<LoginForm />);
    const emailInput = utils.getByTestId('email');
    const passwordInput = utils.getByTestId('password');
    const emailError = utils.getByTestId('email-error');
    const passwordError = utils.getByTestId('password-error');
    const submit = utils.getByTestId('submit');

    return {
        emailInput, 
        passwordInput,
        emailError,
        passwordError,
        submit,
        ...utils,
    }
}

test('Valid input should submit without error messages', () => {
    const {emailInput, emailError, passwordInput, passwordError, submit} = setup();
    fireEvent.change(emailInput, {target: {value: 'joe@gmail.com'}});
    expect(emailInput.value).toBe('joe@gmail.com');
    expect(emailError.textContent).toBe('');

    fireEvent.change(passwordInput, {target: {value: 'joe1234'}});
    expect(passwordInput.value).toBe('joe1234');
    expect(passwordError.textContent).toBe('');

    fireEvent.click(submit);
    expect(emailInput.value).toBe('');
    expect(passwordInput.value).toBe('');
});

test('Invalid input should display error messages and fail to submit', () => {
    const {emailInput, emailError, passwordInput, passwordError, submit} = setup();
    fireEvent.change(emailInput, {target: {value: 'joegmailcom'}});
    expect(emailInput.value).toBe('joegmailcom');
    expect(emailError.textContent).toBe('Invalid email');

    fireEvent.change(passwordInput, {target: {value: ''}});
    expect(passwordInput.value).toBe('');

    fireEvent.click(submit);
    expect(emailInput.value).toBe('joegmailcom');
    expect(emailError.textContent).toBe('Invalid email');
    expect(passwordInput.value).toBe('');
    expect(passwordError.textContent).toBe('Empty password');
});


