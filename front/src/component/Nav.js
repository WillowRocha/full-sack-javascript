import React from  'react';
import { NavLink } from 'react-router-dom';

const renderLinkList = (list) => (
    <NavLink exact key={list._id} className="list-group-item" to={`/${list.default ? '' : list.name}`} activeClassName="active">
        {list.title}
    </NavLink>
)

const Nav = ({lists}) => (
    <nav className="list-group">
        { lists.map( renderLinkList ) }
        <NavLink exact className="list-group-item" to="/about" activeClassName="active">
        Sobre
        </NavLink>
    </nav>
);

export default Nav;