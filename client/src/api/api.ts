import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8000/",
});

export const login = (data: any) => API.post(`/api/users/login`, data);
