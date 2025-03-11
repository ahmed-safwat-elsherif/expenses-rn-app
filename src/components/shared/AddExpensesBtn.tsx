import { StyleSheet, Text, View } from "react-native";
import React from "react";
import IconButton, { IconButtonProps } from "./IconButton";
import { useNavigation } from "@react-navigation/native";
import { ScreenKeys } from "../../routes/definitions";

const AddExpensesBtn = (props: IconButtonProps) => {
  const navigation = useNavigation();
  return (
    <IconButton
      {...props}
      onPress={() => navigation.navigate(ScreenKeys.MANAGE_EXPENSES)}
    />
  );
};

export default AddExpensesBtn;

const styles = StyleSheet.create({});
