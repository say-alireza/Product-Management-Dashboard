import axios from 'axios';

const API_BASE_URL = 'https://jsonplaceholder.typicode.com';

export const fetchPosts = () => axios.get(`${API_BASE_URL}/posts`);
export const fetchSinglePost = (id: string | number) => axios.get(`${API_BASE_URL}/posts/${id}`);
export const fetchUsers = () => axios.get(`${API_BASE_URL}/users`);
