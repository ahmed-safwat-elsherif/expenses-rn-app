import { ActivityIndicator, StyleSheet, View } from "react-native";

import { Expense } from "../../types/expenses";
import { Controller, useForm } from "react-hook-form";
import Input from "../shared/Input";
import Button from "../shared/Button";
import DatePicker from "../shared/DatePicker";

export interface FormValues extends Omit<Expense, "id"> {
  amount: string;
}

type ExpenseFormProps = {
  onSubmit: (expense: Partial<Expense>) => void;
  onCancel: () => void;
  submitLabel: string;
  defaultValues?: FormValues | null;
  loading?: boolean;
};

const ExpenseForm = (props: ExpenseFormProps) => {
  const { defaultValues, onCancel, onSubmit, submitLabel, loading } = props;

  const { control, handleSubmit } = useForm<FormValues>({
    defaultValues: {
      description: "",
      ...defaultValues,
      amount: defaultValues?.amount?.toString() ?? "",
    },
    mode: "onTouched",
  });

  if (loading) {
    return <ActivityIndicator color="white" size={40} />;
  }

  return (
    <View style={styles.root}>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value }, fieldState }) => (
            <Input
              label="Amount"
              style={{ flex: 0.5 }}
              textInputConfig={{
                placeholder: "00.00",
                value,
                onChangeText: onChange,
                onBlur,
                inputMode: "decimal",
              }}
              invalid={fieldState.invalid}
              error={
                fieldState.error?.type === "required" && "Item is required"
              }
            />
          )}
          name="amount"
        />
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, value }, fieldState }) => (
            <DatePicker
              value={value}
              onChange={onChange}
              label="Date"
              invalid={fieldState.invalid}
              error={
                fieldState.error?.type === "required" && "Item is required"
              }
            />
          )}
          name="date"
        />
      </View>
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value }, fieldState }) => (
          <Input
            label="Description"
            style={{ minHeight: 100 }}
            textInputConfig={{
              placeholder: "Something that describes the expense",
              value,
              onChangeText: onChange,
              multiline: true,
              onBlur,
            }}
            invalid={fieldState.invalid}
            error={fieldState.error?.type === "required" && "Item is required"}
          />
        )}
        name="description"
      />
      <View style={styles.buttons}>
        <Button style={styles.button} mode="flat" onPress={onCancel}>
          Cancel
        </Button>
        <Button style={styles.button} onPress={handleSubmit(onSubmit)}>
          {submitLabel}
        </Button>
      </View>
    </View>
  );
};

export default ExpenseForm;

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
});
