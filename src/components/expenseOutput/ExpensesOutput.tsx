import { StyleSheet, View } from "react-native";

import ExpensesList from "./ExpensesList";
import { PALETTE } from "../../utils/theme";
import ExpensesSummary from "./ExpensesSummary";
import useExpenses from "../../hooks/useExpenses";
import { useMemo } from "react";
import moment from "moment";
import { EXPENSES } from "../../data/expenses";

console.log(moment(EXPENSES[0].date).diff(moment(), "d") <= 7);

function ExpensesOutput({
  expensesPeriodInDays = 0,
}: {
  expensesPeriodInDays?: number;
}) {
  const todayInMoment = useMemo(() => moment(), []);
  const { expenses } = useExpenses();

  const periodName = expensesPeriodInDays
    ? `Last ${expensesPeriodInDays} ${
        expensesPeriodInDays > 1 ? "days" : "day"
      }`
    : "Total";

  const displayedExpenses = useMemo(() => {
    if (!expensesPeriodInDays) return expenses;

    return expenses.filter((expense) => {
      const diffDays = moment(expense.date).diff(todayInMoment, "days");
      return diffDays >= expensesPeriodInDays;
    });
  }, [expenses, expensesPeriodInDays, todayInMoment]);

  return (
    <View style={styles.container}>
      <ExpensesSummary expenses={displayedExpenses} periodName={periodName} />
      <ExpensesList expenses={displayedExpenses} />
    </View>
  );
}

export default ExpensesOutput;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 0,
    backgroundColor: PALETTE.primary700,
  },
});
