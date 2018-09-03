import React, { Component } from 'react';
import TodoSearch from '../component/TodoSearch';
import TodoList from '../component/TodoList'
import { fetchAll, insert, update } from '../services/todo.service';


class Todo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todolist: []
    };
  }

  componentDidMount() {
    this.fetchTodoList();
  }

  fetchTodoList() {
    return fetchAll().then(todolist => this.setState({ todolist }));
  }

  insertTodo(text) {
    const newTodo = {
      text,
      done: false
    };
    insert(newTodo).then(() => this.fetchTodoList());
    this.setState({
      todolist: [...this.state.todolist, newTodo]
    });
  }

  changeDone(_id, done) {
    const newTodoList = this.state.todolist.map(todo => {
      if (todo._id === _id) {
        const newTodo = {
            ...todo,
            done
          }
        update(newTodo).then( () => this.fetchTodoList() );
        return newTodo;
      } else {
        return todo;
      }
    });
    this.setState({todolist: newTodoList});
  }

  deleteTodo(_id) {
    const newTodoList = this.state.todolist.map(todo => {
      if (todo._id === _id) {
        const newTodo = {
            ...todo,
            removed: true
          }
        update(newTodo).then( () => this.fetchTodoList() );
        return newTodo;
      } else {
        return todo;
      }
    });
    this.setState({todolist: newTodoList});
  }

  render() {
    return (
      <>
        <div className="container">
          <h1>Todo</h1>
        </div>
        <TodoSearch onInsert={this.insertTodo.bind(this)} />
        <TodoList todolist={this.state.todolist} onChange={this.changeDone.bind(this)} onDelete={this.deleteTodo.bind(this)} />
      </>
    );
  }
}

export default Todo;
