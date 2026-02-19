import api from "./axios.js";

const createExpense = async (data) => {
  const res = await api.post("/expense/add", data);
  return res.data;
};

const getExpense = async () => {
  const res = await api.get("/expense/get");
  // console.log("Backend response: ", res.data);
  return res.data;
};

const deleteExpense = async (id) => {
  const res = await api.delete(`/expense/${id}`)
  return res.data;
};

export { createExpense, getExpense, deleteExpense };
