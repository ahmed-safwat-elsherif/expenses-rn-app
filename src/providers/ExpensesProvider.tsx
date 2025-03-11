import React, {
  createContext,
  PropsWithChildren,
  useCallback,
  useState,
} from "react";
import { Expense } from "../types/expenses";
import { EXPENSES } from "../data/expenses";
import getId from "../utils/getId";

export type ExpensesContextValues = {
  expenses: Expense[];
  addExpense: (expense: Omit<Expense, "id">) => void;
  removeExpense: (expenseId: Expense["id"]) => void;
  updateExpense: (expense: { id: Expense["id"] } & Partial<Expense>) => void;
};

export const ExpensesContext = createContext<ExpensesContextValues>({
  expenses: EXPENSES,
  addExpense: () => {},
  removeExpense: () => {},
  updateExpense: () => {},
});

const ExpensesProvider = ({ children }: PropsWithChildren) => {
  const [expenses, setExpenses] = useState(EXPENSES);

  const addExpense = useCallback<ExpensesContextValues["addExpense"]>(
    (expense) => {
      setExpenses((prev) => [...prev, { ...expense, id: getId() }]);
    },
    []
  );

  const removeExpense = useCallback<ExpensesContextValues["removeExpense"]>(
    (expenseId) => {
      setExpenses((prev) => prev.filter((item) => item.id !== expenseId));
    },
    []
  );

  const updateExpense = useCallback<ExpensesContextValues["updateExpense"]>(
    (expense) => {
      setExpenses((prev) =>
        prev.map((item) =>
          item.id === expense.id ? { ...item, ...expense } : item
        )
      );
    },
    []
  );

  return (
    <ExpensesContext.Provider
      value={{ expenses, addExpense, removeExpense, updateExpense }}
    >
      {children}
    </ExpensesContext.Provider>
  );
};

export default ExpensesProvider;
