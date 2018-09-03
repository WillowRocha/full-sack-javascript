import environments from '../envoronments/environments';

class TodoService {

  constructor(path = 'todo') {
    this.path = path;
  }

  fetchAll() {
    return fetch(`${environments.API_BASE_URI}/${this.path}`).then(response => response.json());
  }

  insert(body) {
    return fetch(`${environments.API_BASE_URI}/${this.path}`, {
      method: 'POST',
      body: JSON.stringify(body)
    }).then(response => response.json());
  }

  update(fullbody) {
    const { _id, ...body } = fullbody;
    console.log(body);
    return fetch(`${environments.API_BASE_URI}/${this.path}/${_id}`, {
      method: 'PUT',
      body: JSON.stringify(body)
    }).then(response => response.json());
  }
}


export default TodoService