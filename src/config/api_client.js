import axios from "axios";
import { redirect, replace } from "react-router-dom";

const apiClient = axios.create({
    baseURL: "http://localhost:8080/",
    headers: {
        "Content-Type": "application/json"
    }
})

apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token")
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    }, 
    (e) => {
        return Promise.reject(e)
    } 
)

apiClient.interceptors.response.use(
    (res) => res,
    (err) => {
        if (err.response?.status === 401) {
            localStorage.removeItem("token")
            window.location.href("/login")
        }
        
        return Promise.reject(err)
    } 
)

export default apiClient;