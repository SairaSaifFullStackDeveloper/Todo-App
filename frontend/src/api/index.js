import axios from 'axios';
const url = "http://localhost:5500";
export const get = () =>axios.get(url);
export const post = newTodo =>axios.post(url, newTodo);
export const put =(id, updateTodo) => axios.put(`${url}/${id}`, updateTodo);