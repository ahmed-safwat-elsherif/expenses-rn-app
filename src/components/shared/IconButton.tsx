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

type IconButtonProps = {
  onPress: PressableProps["onPress"];
} & Pick<IoniconsProps, "name" | "size" | "color">;

const IconButton = (props: IconButtonProps) => {
  const { onPress, ...rest } = props;
  return (
    <Pressable onPress={onPress}>
      <View>
        <Ionicons {...rest} />
      </View>
    </Pressable>
  );
};

export default IconButton;

const styles = StyleSheet.create({});
