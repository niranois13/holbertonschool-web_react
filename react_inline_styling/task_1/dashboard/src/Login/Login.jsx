import React from 'react';
import { StyleSheet, css } from 'aphrodite';

export default function Login() {
    return (
        <div className={css(styles.body)}>
            <p>Login to access the full dashboard</p>
            <div className={css(styles.loginForm)}>
                <label htmlFor="email">
                    Email:
                    <input id="email" type="email" className={css(styles.input)} />
                </label>
                <label htmlFor="password">
                    Password:
                    <input id="password" type="password" className={css(styles.input)} />
                </label>
                <button>OK</button>
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
    },
});
