import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { BottomTabsParamList, ScreenKeys } from "./definitions";
import RecentExpenses from "../screens/RecentExpenses";
import ExpensesList from "../screens/ExpensesList";
import { PALETTE } from "../utils/theme";
import IconButton from "../components/shared/IconButton";
import AddExpensesBtn from "../components/shared/AddExpensesBtn";

const BottomTabs = createBottomTabNavigator<BottomTabsParamList>();

const BottomTabsNavigation = () => (
  <BottomTabs.Navigator
    screenOptions={({ navigation }) => ({
      headerStyle: {
        backgroundColor: PALETTE.primary500,
      },
      headerTintColor: "white",
      tabBarStyle: { backgroundColor: PALETTE.primary500 },
      tabBarActiveTintColor: PALETTE.accent500,
      headerRight: ({ tintColor }) => (
        <AddExpensesBtn name="add" size={24} color={tintColor} />
      ),
    })}
  >
    <BottomTabs.Screen
      name={ScreenKeys.RECENT_EXPENSES}
      component={RecentExpenses}
      options={{
        title: "Recent Expenses",
        tabBarLabel: "Recent",
        tabBarIcon: ({ size, color }) => (
          <Ionicons name="hourglass" size={size} color={color} />
        ),
      }}
    />
    <BottomTabs.Screen
      name={ScreenKeys.EXPENSES_LIST}
      component={ExpensesList}
      options={{
        title: "Expenses List",
        tabBarLabel: "Expenses",
        tabBarIcon: ({ size, color }) => (
          <Ionicons name="calendar" size={size} color={color} />
        ),
      }}
    />
  </BottomTabs.Navigator>
);

export default BottomTabsNavigation;
