import React, {
  createContext,
  PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Expense } from "../types/expenses";
import { EXPENSES } from "../data/expenses";
import * as ExpensesService from "../api/expenses";

export type ExpensesContextValues = {
  expenses: Expense[];
  addExpense: (expense: Expense) => void;
  removeExpense: (expenseId: Expense["id"]) => void;
  updateExpense: (
    expenseId: Expense["id"],
    expenseUpdates: Partial<Expense>
  ) => void;
  loading: boolean;
  error: null | string;
};

export const ExpensesContext = createContext<ExpensesContextValues>({
  expenses: EXPENSES,
  addExpense: () => {},
  removeExpense: () => {},
  updateExpense: () => {},
  loading: true,
  error: null,
});

const ExpensesProvider = ({ children }: PropsWithChildren) => {
  const [expenses, setExpenses] = useState([] as Expense[]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<null | string>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    ExpensesService.getExpenses()
      .then((res) => {
        setExpenses(res.data);
      })
      .catch(() => {
        setError("Something went wrong!");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const addExpense = useCallback<ExpensesContextValues["addExpense"]>(
    (expense) => {
      setExpenses((prev) => [...prev, expense]);
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
    (expenseId, expenseUpdates) => {
      setExpenses((prev) =>
        prev.map((item) =>
          item.id === expenseId ? { ...item, ...expenseUpdates } : item
        )
      );
    },
    []
  );

  const ctxValues = useMemo(
    () => ({
      expenses,
      addExpense,
      removeExpense,
      updateExpense,
      loading,
      error,
    }),
    [expenses, addExpense, removeExpense, updateExpense, loading, error]
  );

  return (
    <ExpensesContext.Provider value={ctxValues}>
      {children}
    </ExpensesContext.Provider>
  );
};

export default ExpensesProvider;
