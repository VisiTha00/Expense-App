import axios from "axios";

const BACKEND_URL = "https://expense-app-6d41c-default-rtdb.firebaseio.com";
export async function storeExpense(expenseData) {
  const response = await axios.post(
    `${BACKEND_URL}/expenses.json`,
    expenseData
  );
  const id = response.data.name;
  return id;
}

export async function fetchExpenses() {
  const response = await axios.get(`${BACKEND_URL}/expenses.json`);
  let expenses = [];
  for (let key in response.data) {
    expenses.push({
      id: key,
      ...response.data[key],
    });
  }
  return expenses;
}

export async function updateExpenseFireBase(id, expenseData) {
  return await axios.put(`${BACKEND_URL}/expenses/${id}.json`, expenseData);
}

export async function deleteExpenseFireBase(id) {
  return await axios.delete(`${BACKEND_URL}/expenses/${id}.json`);
}
