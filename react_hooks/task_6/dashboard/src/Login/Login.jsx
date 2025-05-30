import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import useLogin from '../hooks/useLogin';

function Login({ logIn }) {
    const {
        email,
        password,
        enableSubmit,
        handleChange,
        handleSubmit,
    } = useLogin(logIn);

    return (
        <div className={css(styles.body)}>
            <p>Login to access the full dashboard</p>
            <form
                onSubmit={handleSubmit}
                className={css(styles.loginForm)}
                data-testid="login-form"
            >
                <label htmlFor="email">
                    Email
                    <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={handleChange}
                        className={css(styles.input)}
                    />
                </label>

                <label htmlFor="password">
                    Password
                    <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={handleChange}
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
