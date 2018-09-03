import React from 'react';

const todoitem = ({ _id, text, todo, teste, done }, changeDone, onDelete) => {
  const itemStyle = {
    textDecoration: done ? 'line-through' : false
  };
  return (
    <div className="list-group-item list-group-item-action" key={_id || text}>
      <label style={itemStyle}>
        <input disabled={!_id} checked={done || false} type="checkbox" onChange={({ target: { checked } }) => changeDone(_id, checked)} />
        &nbsp; {text || todo || teste}
      </label>
      <a href="javascript:void(0)" className="float-right remove" onClick={() => confirm('deseja remover ?') && onDelete(_id)}>
        remover
      </a>
    </div>
  );
};

function TodoList({ todolist, onChange, onDelete }) {
  return (
    <div className="container">
      <div className="list-group todo-list">
      {
        todolist
        .filter( item => !item.removed )
        .map(item => todoitem(item, onChange, onDelete))
      }
      </div>
    </div>
  );
}

export default TodoList;