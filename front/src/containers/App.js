import React from 'react';
import { BrowserRouter, Switch, Route, NavLink } from 'react-router-dom';

import Todo from '../containers/Todo';
import withService from '../utils/withService';
import TodoService from '../services/todo.service';

const todoServiceTodo = new TodoService('todo');
const todoServiceTask = new TodoService('task');

function App(props) {
  return (
    <BrowserRouter>
      <>
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
        <Switch>
          <Route path="/tasks" component={withService(todoServiceTask, 'Task List')(Todo)} />
          <Route path="/" component={withService(todoServiceTodo, 'Todo List')(Todo)} />
        </Switch>
      </>
    </BrowserRouter>
  );
}

export default App;
