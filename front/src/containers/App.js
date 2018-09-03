import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import withService from '../utils/withService';
import TodoService from '../services/todo.service';
import TodoLoadable from './TodoLoadable';
import AboutLoadable from '../component/AboutLoadable';

const todoServiceTodo = new TodoService('todo');
const todoServiceTask = new TodoService('task');

function App(props) {
    return (
        <>
            <BrowserRouter>
                <>
                <div>
                    <Link to="/">Todo</Link> | 
                    <Link to="/tasks">Tasks</Link> |
                    <Link to="/about">Sobre</Link>
                </div>
                <Switch>
                    <Route path="/tasks" component={withService(todoServiceTask, 'Task List')(TodoLoadable)} />
                    <Route path= "/about" component={AboutLoadable} />
                    <Route path="/" component={withService(todoServiceTodo, 'Todo List')(TodoLoadable)} />
                </Switch>
                </>
            </BrowserRouter>
        </>
    )
}

export default App;