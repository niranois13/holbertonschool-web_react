import React, { useState } from 'react';
import { StyleSheet, css } from 'aphrodite';

function Login({ email: initialEmail = '', password: initialPassword = '', logIn }) {
    const [formData, setFormData] = useState({ email: initialEmail, password: initialPassword });
    const [enableSubmit, setEnableSubmit] = useState(false);

    const validateForm = (email, password) => {
        const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        const isValidPassword = password.length >= 8;
        setEnableSubmit(isValidEmail && isValidPassword);
    };

    const handleLoginSubmit = (e) => {
        e.preventDefault();
        logIn(formData.email, formData.password);
    };

    const handleChangeEmail = (e) => {
        const email = e.target.value;
        const updatedData = { ...formData, email };
        setFormData(updatedData);
        validateForm(email, updatedData.password);
    };

    const handleChangePassword = (e) => {
        const password = e.target.value;
        const updatedData = { ...formData, password };
        setFormData(updatedData);
        validateForm(updatedData.email, password);
    };

    return (
        <div className={css(styles.body)}>
            <p>Login to access the full dashboard</p>
            <form
                onSubmit={handleLoginSubmit}
                className={css(styles.loginForm)}
                data-testid="login-form"
            >
                <label htmlFor="email">
                    Email
                    <input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChangeEmail}
                        className={css(styles.input)}
                    />
                </label>

                <label htmlFor="password">
                    Password
                    <input
                        id="password"
                        type="password"
                        value={formData.password}
                        onChange={handleChangePassword}
                        className={css(styles.input)}
                    />
                </label>

                <button
                    type="submit"
                    className={css(styles.button)}
                    disabled={!enableSubmit}
                >
                    OK
                </button>
            </form>
        </div>
    );
}

const styles = StyleSheet.create({
    body: {
        padding: '2rem',
    },
    loginForm: {
        display: 'flex',
        flexDirection: 'column',
        width: '300px',
        margin: 'auto',
    },
    input: {
        marginBottom: '0.5rem',
        display: 'block',
        '@media (max-width: 900px)': {
            all: 'unset',
        },
    },
    button: {
        cursor: 'pointer',
        padding: '0.5rem',
        '@media (max-width: 900px)': {
            maxWidth: '50px',
            maxHeight: '25px',
            background: 'none',
            border: '3px solid #f0bf77',
        },
    },
});

export default Login;
