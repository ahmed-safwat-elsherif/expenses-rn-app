import {
  Pressable,
  PressableProps,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from "react-native";
import { PropsWithChildren } from "react";
import { PALETTE } from "../../utils/theme";

type ButtonProps = PropsWithChildren<{
  onPress?: PressableProps["onPress"];
  mode?: "flat";
  style?: StyleProp<ViewStyle>;
}>;

function Button({ children, onPress, mode, style }: ButtonProps) {
  return (
    <View style={style}>
      <Pressable
        onPress={onPress}
        style={({ pressed }) => pressed && styles.pressed}
      >
        <View style={[styles.button, mode === "flat" && styles.flat]}>
          <Text style={[styles.buttonText, mode === "flat" && styles.flatText]}>
            {children}
          </Text>
        </View>
      </Pressable>
    </View>
  );
}

export default Button;

const styles = StyleSheet.create({
  button: {
    borderRadius: 4,
    padding: 8,
    backgroundColor: PALETTE.primary500,
  },
  flat: {
    backgroundColor: "transparent",
  },
  buttonText: {
    color: "white",
    textAlign: "center",
  },
  flatText: {
    color: PALETTE.primary200,
  },
  pressed: {
    opacity: 0.75,
    backgroundColor: PALETTE.primary100,
    borderRadius: 4,
  },
});
