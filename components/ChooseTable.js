import React, { useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import ComboBox from "../components/ComboBox";
import SuccessMessage from "../components/SuccessMessage";
import ErrorMessage from "../components/ErrorMessage";

const ChooseTableComponent = ({ freeTables, reservation, onChosen }) => {
  const [payload, setPayload] = useState({ tableId: null });
  const [errMsg, setErrMsg] = useState(null);
  const [isSuccessful, setIsSuccessful] = useState(false);

  const chooseTable = async () => {
    setErrMsg(null);
    setIsSuccessful(false);

    try {
      await new Promise((resolve, reject) => {
        if (payload.tableId) {
          resolve({ success: true });
        } else {
          reject({ response: { status: 400, data: { message: "Please Choose a number of people" } } });
        }
      });

      console.log("Table chosen successfully!");
      setIsSuccessful(true);
      onChosen();
    } catch (err) {
      if (err.response && err.response.data) {
        if (err.response.status === 400) {
          onChosen();
          setErrMsg(err.response.data.message);
        }
      }
      console.error(err);
    }
  };

  return (
    <View>
      <View style={styles.form}>
        <ComboBox
          id="table"
          labelText="Table"
          placeholderText="Choose a table..."
          collection={freeTables}
          selectedItem={payload.tableId}
          onSelect={(value) => setPayload({ tableId: value })}
        />
        <SuccessMessage
          isSuccessful={isSuccessful}
          successMessage="Successfully reserved a table!"
        />
        <ErrorMessage errorFlag={errMsg} errorMessage={errMsg} />
        <TouchableOpacity style={styles.button} onPress={chooseTable}>
          <Ionicons name="save-outline" size={24} color="white" />
          <Text style={styles.buttonText}>Done</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  form: {
    margin: 20,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#6200EE",
    padding: 12,
    borderRadius: 8,
    justifyContent: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    marginLeft: 8,
  },
});

export default ChooseTableComponent;
