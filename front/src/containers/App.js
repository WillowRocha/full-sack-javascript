import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import withService from '../utils/withService';
import Service from '../services/default.service';
import TodoLoadable from './TodoLoadable';
import AboutLoadable from '../component/AboutLoadable';
import Nav from '../component/Nav';

const todoService = new Service('todo');

function App(props) {
  return (
    <BrowserRouter>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
            <h1>Listas:</h1>
            <Nav/>
          </div>
          <div className="col-md-9">
            <Switch>
              <Route path="/about" exact component={AboutLoadable} />
              <Route path="/task" exact component={withService(todoService, 'Todo list:')(TodoLoadable)} />
              <Route path="/" exact component={withService(todoService, 'Todo list:')(TodoLoadable)} />
            </Switch>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
