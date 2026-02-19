import axios from "axios"

const API_URL = `http://localhost:8000/api/v1/healthCheck/`;

export const healthCheck = async () => {
  console.log("HealthCheck() called")

  axios.get(API_URL)
    .then((res) => res.data)
    .then((data) => console.log(data.data))
    .catch((err) => console.error(err))
};