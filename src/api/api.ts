import axios from "axios";

export const api = axios.default.create({
    withCredentials: true,
    baseURL: 'https://jsonplaceholder.typicode.com/',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json; charset=utf-8',
    }
})