import axios from 'axios';
const api = 'http://localhost:8081';

const instance = axios.create({baseURL: api});

export default instance;
