import axios from "axios"

console.log(import.meta.env.VITE_API_URL)

const api = axios.create({
  baseURL: "https://expense-tracker-3tkr.onrender.com" || "",
  withCredentials: true   
})

export default api
