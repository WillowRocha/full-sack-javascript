import React from  'react';
import { NavLink } from 'react-router-dom';

const renderLinkList = (list) => (
    <NavLink className="list-group-item" to={`/${list.name}`} activeClassName="active">
        {list.title}
    </NavLink>
)

const Nav = ({lists}) => (
    <nav className="list-group">
        { lists.map( renderLinkList ) }
        <NavLink className="list-group-item" to="/about" activeClassName="active">
        Sobre
        </NavLink>
    </nav>
);

export default Nav;