import environments from "../envoronments/environments";

export const fetchAll = () => {
    return fetch(`${environments.API_BASE_URI}/todo`)
        .then(response => response.json());
}

export const insert = (body) => {
    return fetch(`${environments.API_BASE_URI}/todo`, {
        method: 'POST',
        body: JSON.stringify(body)
    })
    .then(response => response.json());
}

export const update = (fullbody) => {
    const {_id, ...body} = fullbody;
    console.log(body);
    return fetch(`${environments.API_BASE_URI}/todo/${_id}`, {
        method: 'PUT',
        body: JSON.stringify(body)
    })
    .then(response => response.json());
}