import React from 'react';
import { StyleSheet, css } from 'aphrodite';

export default function Login() {
    return (
        <div className={css(styles.body)}>
            <p>Login to access the full dashboard</p>
            <div className={css(styles.loginForm)}>
                <form>
                    <label htmlFor="email" >
                        Email
                        <input id="email" type="email" className={css(styles.input)} autoComplete="username" />
                    </label>
                    <label htmlFor="password">
                        Password
                        <input id="password" type="password" className={css(styles.input)} autoComplete="current-password" />
                    </label>
                    <button className={css(styles.button)}>OK</button>
                </form>
            </div>
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
        '@media (max-width: 900px)': {
            maxWidth: '50px',
            maxHeight: '25px',
            background: 'none',
            border: '3px, solid, #f0bf77',
        },
    },
});
