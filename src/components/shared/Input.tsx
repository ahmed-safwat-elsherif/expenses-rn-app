import {
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  TextStyle,
  View,
} from "react-native";
import { PALETTE } from "../../utils/theme";

type InputProps = {
  label: string;
  invalid?: boolean;
  style?: StyleProp<TextStyle>;
  textInputConfig: TextInputProps;
  error?: string | false;
};

const Input = (props: InputProps) => {
  const { label, invalid, style, textInputConfig, error } = props;
  const inputStyles: (typeof style)[] = [styles.input];

  if (textInputConfig && textInputConfig.multiline) {
    inputStyles.push(styles.inputMultiline);
  }

  if (invalid) {
    inputStyles.push(styles.invalidInput);
  }

  return (
    <View style={[styles.inputContainer, style]}>
      <Text style={[styles.label, invalid && styles.invalidLabel]}>
        {label}
      </Text>
      <TextInput style={inputStyles} {...textInputConfig} />
      {error && <Text style={styles.errText}>{error}</Text>}
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  inputContainer: {
    marginHorizontal: 4,
    marginVertical: 8,
  },
  label: {
    fontSize: 12,
    color: PALETTE.primary100,
    marginBottom: 4,
  },
  input: {
    backgroundColor: PALETTE.primary100,
    color: PALETTE.primary700,
    padding: 6,
    borderRadius: 6,
    fontSize: 18,
  },
  inputMultiline: {
    minHeight: 100,
    textAlignVertical: "top",
  },
  invalidLabel: {
    color: PALETTE.error500,
  },
  invalidInput: {
    backgroundColor: PALETTE.error50,
  },
  errText: {
    marginTop: 2,
    fontSize: 12,
    color: PALETTE.error500,
  },
});
