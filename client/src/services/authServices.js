import api from "./axios.js";

// register
const register = async (data) => {
  const res = await api.post("api/v1/auth/register", data);
  return res.data;
};

// login
const login = async (data) => {
  const res = await api.post("api/v1/auth/login", data);
  return res.data;
};

// get user
const getUser = async () => {
  const res = await api.get("api/v1/auth/current-user");
  return res.data;
};

// logout
const logout = async () => {
  const res = await api.post("api/v1/auth/logout");
  return res.data;
};
export { register, login, getUser, logout };
