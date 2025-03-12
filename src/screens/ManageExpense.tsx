import {
  Keyboard,
  StyleSheet,
  Text,
  Touchable,
  TouchableHighlight,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React, { useLayoutEffect, useMemo } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList, ScreenKeys } from "../routes/definitions";
import { useNavigation } from "@react-navigation/native";
import { PALETTE } from "../utils/theme";
import useExpenses from "../hooks/useExpenses";
import Button from "../components/shared/Button";
import IconButton from "../components/shared/IconButton";
import ExpenseForm, {
  FormValues,
} from "../components/manageExpense/ExpenseForm";
import { ExpensesMapper } from "../data/expenses";
import { Expense } from "../types/expenses";

interface ManageExpenseProps
  extends NativeStackScreenProps<
    RootStackParamList,
    ScreenKeys.MANAGE_EXPENSES
  > {}

const ManageExpense = ({ route }: ManageExpenseProps) => {
  const { expenseId } = route.params || {};
  const navigation = useNavigation();
  const { expenses, addExpense, removeExpense, updateExpense } = useExpenses();
  const isEditMode = !!expenseId;

  const activeExpense = useMemo(() => {
    if (!expenseId) return null;
    return expenses.find((exp) => exp.id === expenseId);
  }, [expenseId, expenses]);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditMode ? "Manage Expense" : "Add Expense",
    });
  }, [navigation.setOptions, isEditMode]);

  function deleteExpenseHandler() {
    removeExpense(expenseId as string);
    navigation.goBack();
  }

  function cancelHandler() {
    navigation.goBack();
  }

  function confirmHandler(data: Partial<Expense>) {
    if (isEditMode) {
      updateExpense({
        ...activeExpense,
        ...data,
        amount:
          data.amount && data.amount !== 0
            ? +data.amount
            : activeExpense?.amount,
        id: expenseId,
      });
    } else {
      addExpense({
        ...data,
        amount: +(data.amount as string),
      } as Expense);
    }
    navigation.goBack();
  }

  return (
    <TouchableWithoutFeedback
      style={styles.touchable}
      onPress={() => Keyboard.dismiss()}
    >
      <View style={styles.container}>
        <ExpenseForm
          onSubmit={confirmHandler}
          onCancel={cancelHandler}
          defaultValues={activeExpense as FormValues}
          submitLabel={isEditMode ? "Save" : "Add"}
        />
        {isEditMode && (
          <View style={styles.deleteContainer}>
            <IconButton
              name="trash"
              color={PALETTE.error500}
              size={36}
              onPress={deleteExpenseHandler}
            />
          </View>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default ManageExpense;

const styles = StyleSheet.create({
  touchable: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: PALETTE.primary800,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: PALETTE.primary200,
    alignItems: "center",
  },
});
