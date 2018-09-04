import React from  'react';
import { NavLink } from 'react-router-dom';

const Nav = ({lists}) => (
    <nav className="list-group">
        <NavLink exact className="list-group-item" to="/" activeClassName="active">Todo</NavLink>
        <NavLink exact className="list-group-item" to="/task" activeClassName="active">Task</NavLink>
        <NavLink exact className="list-group-item" to="/about" activeClassName="active">Sobre</NavLink>
    </nav>
);

export default Nav;