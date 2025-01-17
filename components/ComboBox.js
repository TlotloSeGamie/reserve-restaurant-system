import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import RNPickerSelect from "react-native-picker-select";

const ComboBox = ({
  id,
  labelText,
  placeholderText,
  collection,
  selectedItem,
  errors,
  onSelect,
}) => {
  const [value, setValue] = useState(selectedItem || "");

  const handleChange = (newValue) => {
    setValue(newValue);
    if (onSelect) {
      onSelect(newValue);
    }
  };

  return (
    <View style={styles.wrapper}>
      <Text style={styles.label}>{labelText}</Text>
      <RNPickerSelect
        onValueChange={handleChange}
        items={collection.map((item) => ({
          label: item.name,
          value: item.id,
        }))}
        value={value}
        placeholder={{ label: placeholderText, value: "" }}
        style={{
          inputIOS: [styles.input, errors && errors[id] && styles.redBorder],
          inputAndroid: [styles.input, errors && errors[id] && styles.redBorder],
        }}
      />
      {errors && errors[id] && (
        <View style={styles.errorsWrapper}>
          {errors[id].map((err, index) => (
            <View key={index} style={styles.error}>
              <Text style={styles.errorText}>{err}</Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    fontFamily: "Inter-Medium",
    color: "#666666",
    fontSize: 14,
  },
  wrapper: {
    flexDirection: "column",
    width: "100%",
    marginBottom: 30,
  },
  input: {
    padding: 12,
    fontFamily: "Inter-Light",
    color: "#000000",
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#d3d3d3",
    borderRadius: 10,
  },
  redBorder: {
    borderColor: "#FF0000",
  },
  errorsWrapper: {
    marginTop: 5,
  },
  error: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  errorText: {
    fontFamily: "Inter-Light",
    fontSize: 12,
    color: "#FF0000",
  },
});

export default ComboBox;
