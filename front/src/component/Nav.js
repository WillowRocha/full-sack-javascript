import React from  'react';
import { NavLink } from 'react-router-dom';

const Nav = () => (
    <nav className="nav justify-content-end">
        <NavLink className="nav-link" exact to="/" activeClassName="active">
        Todo
        </NavLink>
        <NavLink className="nav-link" exact to="/tasks" activeClassName="active">
        Tasks
        </NavLink>
        <NavLink className="nav-link" exact to="/about" activeClassName="active">
        Sobre
        </NavLink>
    </nav>
);

export default Nav;