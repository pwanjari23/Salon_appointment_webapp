import axios from "axios";

const API = axios.create({
  baseURL: "http://3.89.139.86:5000/api/auth",
});

export const registerUser = (data) => API.post("/register", data);
export const loginUser = (data) => API.post("/login", data);
