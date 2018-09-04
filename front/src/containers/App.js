import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Todo from '../containers/Todo';
import withService from '../utils/withService';
import TodoService from '../services/todo.service';
import Nav from '../component/Nav';

const todoServiceTodo = new TodoService('todo');
const todoServiceTask = new TodoService('task');

function App(props) {
  return (
    <BrowserRouter>
      <>
        <Nav/>
        <Switch>
          <Route path="/tasks" component={withService(todoServiceTask, 'Task List')(Todo)} />
          <Route path="/" component={withService(todoServiceTodo, 'Todo List')(Todo)} />
        </Switch>
      </>
    </BrowserRouter>
  );
}

export default App;
