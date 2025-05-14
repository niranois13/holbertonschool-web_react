import React from 'react';
import { StyleSheet, css } from 'aphrodite';

export default function Login() {
    return (
        <div className={css(styles.body)}>
            <p>Login to access the full dashboard</p>
            <div className={css(styles.loginForm)}>
                <div className={css(styles.inputGroup)}>
                    <label htmlFor="email">Email:</label>
                    <input id="email" type="email" className={css(styles.input)} />
                </div>
                <div className={css(styles.inputGroup)}>
                    <label htmlFor="password">Password:</label>
                    <input id="password" type="password" className={css(styles.input)} />
                </div>
                <button className={css(styles.button)}>OK</button>
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
        '@media (max-width: 900px)': {
            width: '100%',
            padding: '0 1rem',
        },
    },
    inputGroup: {
        marginBottom: '1rem',
        display: 'flex',
        flexDirection: 'column',
    },
    input: {
        padding: '0.5rem',
        fontSize: '1rem',
    },
    button: {
        padding: '0.5rem 1rem',
        fontSize: '1rem',
        alignSelf: 'flex-start',
    },
});
