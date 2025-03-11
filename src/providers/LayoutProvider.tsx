import React, { PropsWithChildren } from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

const LayoutProvider = ({ children }: PropsWithChildren) => {
  return (
    <View style={styles.container}>
      <SafeAreaProvider>
        <SafeAreaView style={styles.container}>{children}</SafeAreaView>
      </SafeAreaProvider>
    </View>
  );
};

export default LayoutProvider;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
