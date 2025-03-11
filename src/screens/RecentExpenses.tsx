import React from "react";
import ExpensesOutput from "../components/expenseOutput/ExpensesOutput";

const RecentExpenses = () => {
  return <ExpensesOutput expensesPeriodInDays={7} />;
};

export default RecentExpenses;
