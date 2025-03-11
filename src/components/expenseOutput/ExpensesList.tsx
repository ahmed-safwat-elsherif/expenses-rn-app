import { FlatList, ListRenderItem } from "react-native";

import ExpenseItem from "./ExpenseItem";
import { Expense } from "../../types/expenses";

const renderExpenseItem: ListRenderItem<Expense> = (itemData) => {
  return <ExpenseItem {...itemData.item} />;
};

function ExpensesList({ expenses }: { expenses: Expense[] }) {
  return (
    <FlatList
      data={expenses}
      renderItem={renderExpenseItem}
      keyExtractor={(item) => item.id}
    />
  );
}

export default ExpensesList;
