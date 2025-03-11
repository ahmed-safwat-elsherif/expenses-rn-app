import { StyleSheet, Text, View } from "react-native";
import React, { useLayoutEffect } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList, ScreenKeys } from "../routes/definitions";
import { useNavigation } from "@react-navigation/native";

interface ManageExpenseProps
  extends NativeStackScreenProps<
    RootStackParamList,
    ScreenKeys.MANAGE_EXPENSES
  > {}

const ManageExpense = ({ route }: ManageExpenseProps) => {
  const { expenseId } = route.params || {};
  const navigation = useNavigation();
  const isEditMode = !!expenseId;

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditMode ? "Manage Expense" : "Add Expense",
    });
  }, [navigation.setOptions, isEditMode]);

  return (
    <View>
      <Text>ManageExpense {expenseId}</Text>
    </View>
  );
};

export default ManageExpense;

const styles = StyleSheet.create({});
