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
  error?: boolean;
}>;

function Button({ children, onPress, mode, style, error }: ButtonProps) {
  return (
    <View style={[style, error && styles.buttonError]}>
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
  buttonError: {
    borderRadius: 4,
    borderWidth: 1,
    borderColor: PALETTE.error500,
  },
});
