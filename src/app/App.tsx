import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import RootStackNavigation from "../routes/RootStackNavigation";
import ExpensesProvider from "../providers/ExpensesProvider";

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <ExpensesProvider>
        <NavigationContainer>
          <RootStackNavigation />
        </NavigationContainer>
      </ExpensesProvider>
    </>
  );
}
