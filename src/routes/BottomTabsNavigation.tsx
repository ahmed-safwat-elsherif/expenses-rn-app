import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import { BottomTabsParamList, ScreenKeys } from "./definitions";
import RecentExpenses from "../screens/RecentExpenses";
import ExpensesList from "../screens/ExpensesList";
import { PALETTE } from "../utils/theme";
import AddExpensesBtn from "../components/shared/AddExpensesBtn";

const BottomTabs = createBottomTabNavigator<BottomTabsParamList>();

const BottomTabsNavigation = () => (
  <BottomTabs.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: PALETTE.primary500,
      },
      headerTintColor: "white",
      tabBarStyle: { backgroundColor: PALETTE.primary500 },
      tabBarActiveTintColor: "white",
      headerRight: ({ tintColor }) => (
        <AddExpensesBtn name="add" size={24} color={tintColor} />
      ),
    }}
  >
    <BottomTabs.Screen
      name={ScreenKeys.RECENT_EXPENSES}
      component={RecentExpenses}
      options={{
        title: "Recent Expenses",
        tabBarLabel: "Recent",
        tabBarIcon: ({ size, color }) => (
          <Ionicons name="time" size={size} color={color} />
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
