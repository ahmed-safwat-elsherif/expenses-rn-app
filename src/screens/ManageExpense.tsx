import { StyleSheet, Text, View } from "react-native";
import React, { useLayoutEffect } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList, ScreenKeys } from "../routes/definitions";
import { useNavigation } from "@react-navigation/native";
import { PALETTE } from "../utils/theme";
import useExpenses from "../hooks/useExpenses";
import Button from "../components/shared/Button";
import IconButton from "../components/shared/IconButton";

interface ManageExpenseProps
  extends NativeStackScreenProps<
    RootStackParamList,
    ScreenKeys.MANAGE_EXPENSES
  > {}

const ManageExpense = ({ route }: ManageExpenseProps) => {
  const { expenseId } = route.params || {};
  const navigation = useNavigation();
  const { addExpense, removeExpense, updateExpense } = useExpenses();
  const isEditMode = !!expenseId;

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

  function confirmHandler() {
    if (isEditMode) {
      updateExpense({
        id: expenseId,
        description: "Test!!!!",
        amount: 29.99,
        date: new Date("2022-05-20"),
      });
    } else {
      addExpense({
        description: "Test",
        amount: 19.99,
        date: new Date("2022-05-19"),
      });
    }
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <View style={styles.buttons}>
        <Button style={styles.button} mode="flat" onPress={cancelHandler}>
          Cancel
        </Button>
        <Button style={styles.button} onPress={confirmHandler}>
          {isEditMode ? "Update" : "Add"}
        </Button>
      </View>
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
  );
};

export default ManageExpense;

const styles = StyleSheet.create({
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
