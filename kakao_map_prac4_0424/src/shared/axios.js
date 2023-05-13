import axios from 'axios';

export const apis = axios.create({
    baseURL: process.env.NEXT_PUBLIC_SERVER_KEY,
});