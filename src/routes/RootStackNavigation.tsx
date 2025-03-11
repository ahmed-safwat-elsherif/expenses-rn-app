import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList, ScreenKeys } from "./definitions";
import ManageExpense from "../screens/ManageExpense";
import BottomTabsNavigation from "./BottomTabsNavigation";
import { PALETTE } from "../utils/theme";

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootStackNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: PALETTE.primary500 },
        headerTintColor: "white",
      }}
    >
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
