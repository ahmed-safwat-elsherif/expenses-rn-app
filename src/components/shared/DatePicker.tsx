import { Modal, Platform, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useMemo, useState } from "react";
import Button from "./Button";
import DateTimePicker, {
  type DateTimePickerEvent,
  DateTimePickerAndroid,
} from "@react-native-community/datetimepicker";
import moment from "moment";
import { PALETTE } from "../../utils/theme";

type DatePickerProps = {
  value: string; // in format YYYYMMDD
  onChange: (date?: string) => void;
  label: string;
};

const DatePicker = (props: DatePickerProps) => {
  if (Platform.OS === "ios") return <DatePickerIOS {...props} />;

  return <DatePickerAndroid {...props} />;
};

const formateInputDate = (value: string) => {
  const initDate = moment(value);
  return initDate.isValid() ? initDate.toDate() : new Date();
};

const DatePickerIOS = (props: DatePickerProps) => {
  const { value, onChange, label } = props;

  const [date, setDate] = useState(() => formateInputDate(value));

  const [show, setShow] = useState(false);

  useEffect(() => {
    if (show) setDate(formateInputDate(value));
  }, [show, value]);

  const handleChange = (_: DateTimePickerEvent, selectedDate?: Date) => {
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  const handleSave = () => {
    onChange(moment(date).format("YYYYMMDD"));
    setShow(false);
  };

  const buttonLabel = useMemo(
    () => (value ? moment(value).format("YYYY-MM-DD") : "Select Date"),
    [value]
  );

  return (
    <View
      style={{
        flex: 0.5,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View style={{ flex: 1 }}>
        <Text style={styles.label}>{label}</Text>
        <Button onPress={() => setShow(true)}>{buttonLabel}</Button>
      </View>
      <Modal
        animationType="fade"
        visible={show}
        onRequestClose={() => setShow(false)}
        transparent
      >
        <View
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{
              backgroundColor: PALETTE.primary100,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 6,
              gap: 10,
              paddingVertical: 10,
            }}
          >
            <Text
              style={{
                fontSize: 20,
                marginBottom: 20,
              }}
            >
              Choose date
            </Text>
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode="date"
              is24Hour={true}
              onChange={handleChange}
              display="spinner"
              themeVariant="dark"
              textColor="black"
              style={{
                borderTopWidth: 1,
                borderBottomWidth: 1,
                borderColor: PALETTE.gray700,
              }}
            />
            <View style={styles.buttons}>
              <Button
                style={styles.button}
                mode="flat"
                onPress={() => setShow(false)}
              >
                Cancel
              </Button>
              <Button style={styles.button} onPress={handleSave}>
                Save
              </Button>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default DatePicker;

const DatePickerAndroid = (props: DatePickerProps) => {
  const { value, onChange, label } = props;
  const [date, setDate] = useState(new Date(1598051730000));

  const buttonLabel = useMemo(
    () => (value ? moment(value).format("YYYY-MM-DD") : "Select Date"),
    [value]
  );

  const handleChange = (_: DateTimePickerEvent, selectedDate?: Date) => {
    if (selectedDate) {
      setDate(selectedDate);
      onChange(moment(date).format("YYYYMMDD"));
    }
  };

  const startDatePicker = () => {
    DateTimePickerAndroid.open({
      value: date,
      onChange: handleChange,
      display: "calendar",
    });
  };

  return (
    <View
      style={{
        flex: 0.5,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View style={{ flex: 1 }}>
        <Text style={styles.label}>{label}</Text>
        <Button onPress={startDatePicker}>{buttonLabel}</Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    fontSize: 12,
    color: PALETTE.primary100,
    marginBottom: 4,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
});
