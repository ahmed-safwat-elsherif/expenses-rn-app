import React, { type PropsWithChildren } from "react";
import {
  ScrollView,
  StyleProp,
  StyleSheet,
  type ViewStyle,
} from "react-native";

const ScrollViewRoot = ({
  children,
  style,
}: PropsWithChildren<{ style?: StyleProp<ViewStyle> }>) => {
  return (
    <ScrollView
      style={[{ flex: 1, marginBottom: 20 }, style]}
      keyboardDismissMode="on-drag"
    >
      {children}
    </ScrollView>
  );
};

export default ScrollViewRoot;

const styles = StyleSheet.create({});
