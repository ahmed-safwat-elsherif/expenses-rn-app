import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

import ExpensesList from "./ExpensesList";
import { PALETTE } from "../../utils/theme";
import ExpensesSummary from "./ExpensesSummary";
import useExpenses from "../../hooks/useExpenses";
import { useMemo } from "react";
import moment from "moment";

type ExpensesOutputProps = {
  expensesPeriodInDays?: number;
};

function ExpensesOutput({ expensesPeriodInDays = 0 }: ExpensesOutputProps) {
  const todayInMoment = useMemo(() => moment(), []);
  const { expenses, loading, error } = useExpenses();

  const periodName = expensesPeriodInDays
    ? `Last ${expensesPeriodInDays} ${
        expensesPeriodInDays > 1 ? "days" : "day"
      }`
    : "Total";

  const displayedExpenses = useMemo(() => {
    if (!expensesPeriodInDays) return expenses;
    return expenses.filter((expense) => {
      const diffDays = todayInMoment.diff(moment(expense.date), "days");

      return diffDays <= expensesPeriodInDays;
    });
  }, [expenses, expensesPeriodInDays, todayInMoment]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator color="white" size={40} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ fontSize: 25 }}>😕</Text>
        <Text style={{ color: PALETTE.error50, fontSize: 18 }}>{error} </Text>
      </View>
    );
  }

  return (
    <>
      <ExpensesSummary expenses={displayedExpenses} periodName={periodName} />
      <ExpensesList expenses={displayedExpenses} />
    </>
  );
}

const ExpensesOutputLayout = (props: ExpensesOutputProps) => {
  return (
    <View style={styles.container}>
      <ExpensesOutput {...props} />
    </View>
  );
};

export default ExpensesOutputLayout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 0,
    backgroundColor: PALETTE.primary700,
  },
});
