import React from 'react';
import {Link} from "react-router-dom";
import routes from "../navigation/routes";

function Navbar() {
    return (
        <nav className="white">
            <ul className="navbar-items">
                <li className="logo">
                    <Link to={routes.ROOT}>Vehicle Sales</Link>
                </li>
            </ul>
            <ul className="navbar-items">
                <li>
                    <Link to={routes.ADMIN}></Link>
                    Dashboard
                </li>
                <li>
                    <Link to={routes.LOGIN}></Link>
                    Logout
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;