import { NavigatorScreenParams, RouteProp } from "@react-navigation/native";
import { Expense } from "../types/expenses";

export enum ScreenKeys {
  MANAGE_EXPENSES = "MANAGE_EXPENSES",
  RECENT_EXPENSES = "RECENT_EXPENSES",
  EXPENSES_LIST = "EXPENSES_LIST",
  BOTTOM_TABS_ENTRY = "BOTTOM_TABS_ENTRY",
}

export type BottomTabsParamList = {
  [ScreenKeys.RECENT_EXPENSES]: undefined;
  [ScreenKeys.EXPENSES_LIST]: undefined;
};

export type RootStackParamList = {
  [ScreenKeys.BOTTOM_TABS_ENTRY]: NavigatorScreenParams<BottomTabsParamList>;
  [ScreenKeys.MANAGE_EXPENSES]?: { expenseId?: Expense["id"] };
};

export type UseRouteReturn<TScreenName extends keyof RootStackParamList> =
  RouteProp<RootStackParamList, TScreenName>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
