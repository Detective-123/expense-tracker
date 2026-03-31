import api from "./axios.js";

const createExpense = async (data) => {
  const res = await api.post("api/v1/expense/add", data);
  return res.data;
};

const getExpense = async () => {
  const res = await api.get("api/v1/expense/get");
  // console.log("Backend response: ", res.data);
  return res.data;
};

const deleteExpense = async (id) => {
  const res = await api.delete(`api/v1/expense/${id}`)
  return res.data;
};

export { createExpense, getExpense, deleteExpense };
