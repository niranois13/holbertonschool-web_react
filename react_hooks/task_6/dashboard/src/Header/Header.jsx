import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import holbertonLogo from '../assets/holberton-logo.jpg';

function Header({ user = {}, logOut }) {
    return (
        <div className={css(styles.header)}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <img src={holbertonLogo} alt="Holberton logo" className={css(styles.logo)} />
                <h1 className={css(styles.title)}>School dashboard</h1>
            </div>

            {user && user.isLoggedIn && (
                <div id="logoutSection" data-testid="logoutSection" className={css(styles.logoutSection)}>
                    Welcome {user.email}
                    <span className={css(styles.logoutLink)} onClick={logOut}>
                        (logout)
                    </span>
                </div>
            )}
        </div>
    );
}

const hbtnRed = '#e11d3f';

const styles = StyleSheet.create({
    header: {
        display: 'flex',
        alignItems: 'center',
        borderBottom: `3px solid ${hbtnRed}`,
        padding: '20px',
        color: hbtnRed,
        fontSize: '1.5rem',
        height: '25vh',
        justifyContent: 'space-between',
    },
    logo: {
        maxWidth: '10vw',
        maxHeight: 'auto',
        marginRight: '20px',
    },
    title: {
        color: hbtnRed,
    },
    logoutSection: {
        fontSize: '1rem',
    },
    logoutLink: {
        cursor: 'pointer',
        marginLeft: '0.5rem',
        textDecoration: 'underline',
    },
});

export default Header;
