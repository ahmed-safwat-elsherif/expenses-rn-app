import { StyleSheet, View } from "react-native";

import ExpensesList from "./ExpensesList";
import { PALETTE } from "../../utils/theme";
import ExpensesSummary from "./ExpensesSummary";
import { EXPENSES } from "../../data/expenses";

function ExpensesOutput({ expensesPeriod }: { expensesPeriod: string }) {
  return (
    <View style={styles.container}>
      <ExpensesSummary expenses={EXPENSES} periodName={expensesPeriod} />
      <ExpensesList expenses={EXPENSES} />
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
