import { Alert, StyleSheet, Text, View } from "react-native";
import Input from "./Input";
import { useState } from "react";
import Button from "../Button";

function ExpenseForm({ handleConfirm, handleCancel, id, selectedExpense }) {
  const [amount, setAmount] = useState(
    selectedExpense ? selectedExpense.amount.toString() : ""
  );
  const [date, setDate] = useState(selectedExpense ? selectedExpense.date : "");
  const [description, setDescription] = useState(
    selectedExpense ? selectedExpense.description : ""
  );

  function handleAmountChange(value) {
    setAmount(value);
  }

  function handleDateChange(value) {
    setDate(value);
  }

  function handleDescriptionChange(value) {
    setDescription(value);
  }

  function handleSubmit() {
    const expenseData = {
      amount: +amount,
      date: date,
      description: description,
    };
    const isAmountValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
    const isDateValid = /^\d{4}-\d{2}-\d{2}$/.test(expenseData.date);
    const isDescriptionValid = expenseData.description.trim().length > 0;
    if (!isAmountValid || !isDateValid || !isDescriptionValid) {
      Alert.alert("Invalid Input", "Please check the values entered", [
        { text: "Okay" },
      ]);
      return;
    }
    handleConfirm(expenseData);
  }
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Your Expense</Text>
      <View style={styles.innerContainer}>
        <Input
          label={"Amount"}
          textInputConfig={{
            keyboardType: "decimal-pad",
            placeholder: "Enter amount",
            onChangeText: handleAmountChange,
            value: amount,
          }}
        />
        <Input
          label={"Date"}
          textInputConfig={{
            placeholder: "YYYY-MM-DD",
            maxLength: 10,
            onChangeText: handleDateChange,
            value: date,
          }}
        />
      </View>
      <Input
        label={"Description"}
        textInputConfig={{
          placeholder: "Enter description",
          onChangeText: () => {},
          multiline: true,
          onChangeText: handleDescriptionChange,
          value: description,
          //autoCapitalize: "none",
          //autoCorrect: false
        }}
      />
      <View style={styles.buttonContainer}>
        <Button onPress={handleSubmit}>{id ? "Edit" : "Add"}</Button>
        <Button onPress={handleCancel} style={styles.button}>
          Cancel
        </Button>
      </View>
    </View>
  );
}

export default ExpenseForm;

const styles = StyleSheet.create({
  innerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  container: {
    marginTop: 15,
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#3c36e8",
    textAlign: "center",
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  button: {
    marginHorizontal: 10,
  },
});
