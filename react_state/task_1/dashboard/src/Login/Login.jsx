import React, { Component } from 'react';
import { StyleSheet, css } from 'aphrodite';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: false,
            email: '',
            password: '',
            enableSubmit: false,
        };
    }

    handleLoginSubmit = (e) => {
        e.preventDefault();
        this.setState({ isLoggedIn: true });
    };

    handleChangeEmail = (e) => {
        const email = e.target.value;
        this.setState({ email }, this.validateForm);
    };

    handleChangePassword = (e) => {
        const password = e.target.value;
        this.setState({ password }, this.validateForm);
    };

    validateForm = () => {
        const { email, password } = this.state;
        const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        const isValidPassword = password.length >= 8;

        this.setState({ enableSubmit: isValidEmail && isValidPassword });
    };

    render() {
        const { email, password, enableSubmit } = this.state;

        return (
            <div className={css(styles.body)}>
                <p>Login to access the full dashboard</p>
                <form
                    onSubmit={this.handleLoginSubmit}
                    className={css(styles.loginForm)}
                    data-testid="login-form"
                >
                    <label htmlFor="email">
                        Email
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={this.handleChangeEmail}
                            className={css(styles.input)}
                        />
                    </label>

                    <label htmlFor="password">
                        Password
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={this.handleChangePassword}
                            className={css(styles.input)}
                        />
                    </label>

                    <input
                        type="submit"
                        value="OK"
                        className={css(styles.button)}
                        disabled={!enableSubmit}
                    />
                </form>
            </div>
        );
    }
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
