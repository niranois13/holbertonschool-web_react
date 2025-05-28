import React, { useContext } from 'react';
import { StyleSheet, css } from 'aphrodite';
import holbertonLogo from '../assets/holberton-logo.jpg';
import newContext from '../Context/context'

function Header() {
    const { user, logOut } = useContext(newContext);

        return (
            <div className={css(styles.header)}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <img src={holbertonLogo} alt="Holberton logo" className={css(styles.logo)} />
                    <h1 className={css(styles.title)}>School dashboard</h1>
                </div>

                {user.isLoggedIn && (
                    <div id="logoutSection" className={css(styles.logoutSection)}>
                        Welcome {user.email}
                        <span
                            className={css(styles.logoutLink)}
                            onClick={logOut}
                        >
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
    },
    logo: {
        maxWidth: '10vw',
        maxHeight: 'auto',
        marginRight: '20px',
    },
    title: {
        color: hbtnRed,
    },
});

export default Header;