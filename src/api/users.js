import axios from 'axios';

export function getUsers() {
  return axios.get('https://jsonplaceholder.typicode.com/users');
}
