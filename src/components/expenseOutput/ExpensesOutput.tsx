import { StyleSheet, View } from "react-native";

import ExpensesList from "./ExpensesList";
import { PALETTE } from "../../utils/theme";
import ExpensesSummary from "./ExpensesSummary";
import useExpenses from "../../hooks/useExpenses";

function ExpensesOutput({ expensesPeriod }: { expensesPeriod: string }) {
  const { expenses } = useExpenses();
  return (
    <View style={styles.container}>
      <ExpensesSummary expenses={expenses} periodName={expensesPeriod} />
      <ExpensesList expenses={expenses} />
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
