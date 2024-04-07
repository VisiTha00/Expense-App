import { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { GlobalStyles } from "../Constants/GlobalStyles";
import IconButton from "../Components/IconButton";
import Button from "../Components/Button";
import { useExpenseContext } from "../Contexts/ExpenseContext";
import ExpenseForm from "../Components/ManageExpense/ExpenseForm";
import {
  deleteExpenseFireBase,
  storeExpense,
  updateExpenseFireBase,
} from "../Utils/http";

function ManageExpenses({ route, navigation }) {
  const { expences, addExpence, deleteExpence, updateExpence } =
    useExpenseContext();
  const id = route.params.id;

  const selectedExpense = expences.find((expense) => expense.id === id);

  useEffect(() => {
    navigation.setOptions({ title: id ? "Edit Expense" : "Add Expense" });
  }, [id, navigation]);

  async function handleDelete() {
    await deleteExpenseFireBase(id);
    deleteExpence(id);
    navigation.goBack();
  }

  async function handleConfirm(data) {
    if (id) {
      updateExpence({
        id: id,
        ...data,
      });
      await updateExpenseFireBase(id, data);
    } else {
      const id = await storeExpense(data);
      addExpence({
        id: id,
        ...data,
      });
    }
    navigation.goBack();
  }

  function handleCancel() {
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <ExpenseForm
        handleConfirm={handleConfirm}
        handleCancel={handleCancel}
        id={id}
        selectedExpense={selectedExpense}
      />

      <View style={styles.innerContainer}>
        {id ? (
          <IconButton
            icon="trash"
            size={36}
            color={GlobalStyles.colors.error500}
            onPress={handleDelete}
          />
        ) : null}
      </View>
    </View>
  );
}

export default ManageExpenses;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  innerContainer: {
    alignItems: "center",
    marginTop: 20,
    paddingTop: 10,
    borderTopColor: GlobalStyles.colors.primary200,
    borderTopWidth: 2,
    paddingHorizontal: 30,
  },
});
