import axios from "axios";
const baseURL = process.env.BACKEND_URL;
const instance = axios.create({ baseURL })
const setToken = (token) => {
    instance.defaults.headers.common['Authorization'] = `Bearer ${token}`
    }
export { instance, setToken }