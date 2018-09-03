import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import Todo from '../containers/Todo';
import withService from '../utils/withService';
import TodoService from '../services/todo.service';

const todoServiceTodo = new TodoService('todo');
const todoServiceTask = new TodoService('task');

function App(props) {
    return (
        <>
            <BrowserRouter>
                <>
                <div>
                    <Link to="/">Todo</Link> | 
                    <Link to="/tasks">Tasks</Link>
                </div>
                <Switch>
                    <Route path="/tasks" component={withService(todoServiceTask, 'Task List')(Todo)} />
                    <Route path="/" component={withService(todoServiceTodo, 'Todo List')(Todo)} />
                </Switch>
                </>
            </BrowserRouter>
        </>
    )
}

export default App;