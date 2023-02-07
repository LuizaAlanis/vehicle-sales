import React from 'react';
import {Link} from "react-router-dom";
import routes from "../navigation/routes";

function Navbar() {
    return (
        <nav className="white">
            <ul className="navbar-items">
                <li className="logo link">
                    <Link to={routes.ROOT} target="_blank">Vehicle Sales</Link>
                </li>
            </ul>
            <ul className="navbar-items">
                <li className="link">
                    <Link to={routes.LOGIN} target="_blank">Login</Link>
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;