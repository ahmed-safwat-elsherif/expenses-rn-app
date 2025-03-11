import { Pressable, StyleSheet, Text, View } from "react-native";

import { PALETTE } from "../../utils/theme";
import moment from "moment";
import { Expense } from "../../types/expenses";

const getFormattedDate = (data: Date) => moment(data).format("DD/MM/YYYY");

interface ExpenseItemProps extends Expense {}

const ExpenseItem = (props: ExpenseItemProps) => {
  const { amount, date, description } = props;

  const handleClick = () => {
    console.log(date);
  };

  return (
    <Pressable onPress={handleClick}>
      <View style={styles.expenseItem}>
        <View>
          <Text style={[styles.textBase, styles.description]}>
            {description}
          </Text>
          <Text style={styles.textBase}>{getFormattedDate(date)}</Text>
        </View>
        <View style={styles.amountContainer}>
          <Text style={styles.amount}>{amount.toFixed(2)}</Text>
        </View>
      </View>
    </Pressable>
  );
};

export default ExpenseItem;

const styles = StyleSheet.create({
  expenseItem: {
    padding: 12,
    marginVertical: 8,
    backgroundColor: PALETTE.primary500,
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 6,
    elevation: 3,
    shadowColor: PALETTE.gray500,
    shadowRadius: 4,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4,
  },
  textBase: {
    color: PALETTE.primary50,
  },
  description: {
    fontSize: 16,
    marginBottom: 4,
    fontWeight: "bold",
  },
  amountContainer: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    minWidth: 80,
  },
  amount: {
    color: PALETTE.primary500,
    fontWeight: "bold",
  },
});
