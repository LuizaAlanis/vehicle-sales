import React from 'react';

function Navbar() {
    return (
        <nav className="white">
            <ul className="navbar-items">
                <li className="logo">Brand</li>
            </ul>
            <ul className="navbar-items">
                <li>Releases</li>
                <li>Categories</li>
                <li>Help</li>
                <li>Login</li>
            </ul>
        </nav>
    );
}

export default Navbar;