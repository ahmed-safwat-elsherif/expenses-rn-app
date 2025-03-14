import {
  Alert,
  Keyboard,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React, { useLayoutEffect, useMemo, useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import * as ExpensesService from "../api/expenses";
import { RootStackParamList, ScreenKeys } from "../routes/definitions";
import { useNavigation } from "@react-navigation/native";
import { PALETTE } from "../utils/theme";
import useExpenses from "../hooks/useExpenses";
import IconButton from "../components/shared/IconButton";
import ExpenseForm, {
  FormValues,
} from "../components/manageExpense/ExpenseForm";
import { Expense } from "../types/expenses";

interface ManageExpenseProps
  extends NativeStackScreenProps<
    RootStackParamList,
    ScreenKeys.MANAGE_EXPENSES
  > {}

const ManageExpense = ({ route }: ManageExpenseProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
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
    Alert.alert("Remove Expense", "Do you want to remove expense?", [
      {
        text: "Delete",
        style: "destructive",
        onPress: confirmDeletion,
      },
      { text: "Cancel", style: "cancel" },
    ]);
  }

  const confirmDeletion = async () => {
    setIsSubmitting(true);
    await ExpensesService.deleteExpense(expenseId as string);
    removeExpense(expenseId as string);
    navigation.goBack();
    setIsSubmitting(false);
  };

  function cancelHandler() {
    navigation.goBack();
  }

  async function confirmHandler(data: Partial<Expense>) {
    setIsSubmitting(true);
    if (isEditMode) {
      const updates = {
        ...data,
        amount:
          data.amount && data.amount !== 0
            ? +data.amount
            : activeExpense?.amount,
      };
      await ExpensesService.updateExpense(expenseId, updates);
      updateExpense(expenseId, {
        ...activeExpense,
        ...updates,
      });
    } else {
      const expnese = {
        ...data,
        amount: +(data.amount as string),
      } as Omit<Expense, "id">;
      const id = await ExpensesService.addExpense(expnese);
      addExpense({
        id,
        ...expnese,
      } as Expense);
    }
    setIsSubmitting(false);
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
          loading={isSubmitting}
        />
        {isEditMode && !isSubmitting && (
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
    backgroundColor: PALETTE.primary700,
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
