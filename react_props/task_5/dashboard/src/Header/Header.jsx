import './Header.css';
import holbertonLogo from '../assets/holberton-logo.jpg';
import React from 'react';

export default function Header() {
    return (
    <React.Fragment>
        <div className='App-header'>
            <img src={holbertonLogo} className="logo" alt="holberton logo" />
            <h1>School dashboard</h1>
        </div>
    </React.Fragment>
    )
}