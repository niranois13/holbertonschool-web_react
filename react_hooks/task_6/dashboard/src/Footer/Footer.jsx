import React from 'react';
import { StyleSheet, css } from 'aphrodite';

function Footer({ user }) {
    return (
        <div className={css(styles.footer)}>
            <p>Copyright 2024 - Holberton School</p>
            {user?.isLoggedIn && (
                <p>
                    <a href="#">Contact us</a>
                </p>
            )}
        </div>
    );
}

const styles = StyleSheet.create({
    footer: {
        borderTop: '3px solid #e1354b',
        padding: '1rem',
        fontStyle: 'italic',
        textAlign: 'center',
    },
});

export default Footer;
