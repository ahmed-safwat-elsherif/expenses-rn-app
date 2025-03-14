import axios from "./axios";
import { Expense } from "../types/expenses";
import * as Endpoints from "./endpoints";
import { AxiosResponse } from "axios";

type AddExpenseResponse = {
  name: string;
};

export const addExpense = async (expense: Omit<Expense, "id">) => {
  const response = await axios.post<any, AxiosResponse<AddExpenseResponse>>(
    Endpoints.EXPENSES,
    expense
  );
  return response.data.name;
};

type GetExpenseResponse = {
  [key in Expense["id"]]: Omit<Expense, "id">;
};
export const getExpenses = async () => {
  const response = await axios.get<GetExpenseResponse>(Endpoints.EXPENSES);
  const expenses = [] as Expense[];
  for (const id in response.data) {
    expenses.push({
      id,
      ...response.data[id],
    });
  }
  return { ...response, data: expenses };
};

export const updateExpense = (
  expenseId: string,
  expenseUpdates: Partial<Expense>
) => axios.patch(`${Endpoints.EXPENSES}/${expenseId}`, expenseUpdates);

export const deleteExpense = (expenseId: string) =>
  axios.delete(`${Endpoints.EXPENSES}/${expenseId}`);
