import React from 'react';
import { Link } from "react-router-dom";

const Nav = () => {
    return (<nav className="navbar sticky-top navbar-expand navbar-light bg-light">
        <div className="collapse navbar-collapse" id="navbarText">
            <ul className="navbar-nav mr-auto">
                <li className="nav-item active">
                    <Link className="nav-link"  to="/">Home</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/dogs-map">Dogs map</Link>
                </li>
            </ul>
        </div>
    </nav>);
};

export default Nav;
