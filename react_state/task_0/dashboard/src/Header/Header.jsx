import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import holbertonLogo from '../assets/holberton-logo.jpg';

export default function Header() {
    return (
        <div className={css(styles.header)}>
            <img src={holbertonLogo} alt="Holberton logo" className={css(styles.logo)} />
            <h1 className={css(styles.title)}>School dashboard</h1>
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
