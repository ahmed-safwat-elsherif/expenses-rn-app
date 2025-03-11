import {
  Pressable,
  PressableProps,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

type IoniconsProps = React.ComponentProps<typeof Ionicons>;

export type IconButtonProps = {
  onPress?: PressableProps["onPress"];
} & Pick<IoniconsProps, "name" | "size" | "color">;

const IconButton = (props: IconButtonProps) => {
  const { onPress, ...rest } = props;
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => pressed && styles.pressed}
    >
      <View style={styles.buttonContainer}>
        <Ionicons {...rest} />
      </View>
    </Pressable>
  );
};

export default IconButton;

const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: 24,
    padding: 6,
    marginHorizontal: 8,
    marginVertical: 2,
  },
  pressed: {
    opacity: 0.75,
  },
});
