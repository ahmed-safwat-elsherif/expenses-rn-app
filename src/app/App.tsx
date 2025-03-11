import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import ExpensesList from "../screens/ExpensesList";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ManageExpense from "../screens/ManageExpense";
import RecentExpenses from "../screens/RecentExpenses";
import RootStackNavigation from "../routes/RootStackNavigation";

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <NavigationContainer>
        <RootStackNavigation />
      </NavigationContainer>
    </>
  );
}
