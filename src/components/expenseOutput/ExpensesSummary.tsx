import { View, Text, StyleSheet } from "react-native";

import { Expense } from "../../types/expenses";
import { PALETTE } from "../../utils/theme";
import { useMemo } from "react";

function ExpensesSummary({
  expenses,
  periodName,
}: {
  expenses: Expense[];
  periodName: string;
}) {
  const expensesSum = useMemo(
    () =>
      expenses.reduce((sum, expense) => {
        return sum + expense.amount;
      }, 0),
    [expenses]
  );

  return (
    <View style={styles.container}>
      <Text style={styles.period}>{periodName}</Text>
      <Text style={styles.sum}>${expensesSum.toFixed(2)}</Text>
    </View>
  );
}

export default ExpensesSummary;

const styles = StyleSheet.create({
  container: {
    padding: 8,
    backgroundColor: PALETTE.primary50,
    borderRadius: 6,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  period: {
    fontSize: 12,
    color: PALETTE.primary400,
  },
  sum: {
    fontSize: 16,
    fontWeight: "bold",
    color: PALETTE.primary500,
  },
});
