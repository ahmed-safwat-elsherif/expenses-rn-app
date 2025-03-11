import { useContext } from "react";
import ExpensesProvider, {
  ExpensesContext,
} from "../providers/ExpensesProvider";

const useExpenses = () => {
  const ctx = useContext(ExpensesContext);

  if (!ctx) {
    throw new Error(
      `"${useExpenses.name}" can't be used outside "${ExpensesProvider.name}"`
    );
  }

  return ctx;
};

export default useExpenses;
