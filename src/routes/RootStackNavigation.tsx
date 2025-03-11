import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList, ScreenKeys } from "./definitions";
import ManageExpense from "../screens/ManageExpense";
import BottomTabsNavigation from "./BottomTabsNavigation";

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootStackNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={ScreenKeys.BOTTOM_TABS_ENTRY}
        component={BottomTabsNavigation}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={ScreenKeys.MANAGE_EXPENSES}
        options={{
          presentation: "modal",
        }}
        component={ManageExpense}
      />
    </Stack.Navigator>
  );
};

export default RootStackNavigation;
