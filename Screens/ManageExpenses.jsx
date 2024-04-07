import { useEffect, useState } from "react";
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
import Spinner from "./Spinner";
import Error from "./Error";

function ManageExpenses({ route, navigation }) {
  const { expences, addExpence, deleteExpence, updateExpence } =
    useExpenseContext();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const id = route.params.id;

  const selectedExpense = expences.find((expense) => expense.id === id);

  useEffect(() => {
    navigation.setOptions({ title: id ? "Edit Expense" : "Add Expense" });
  }, [id, navigation]);

  async function handleDelete() {
    setIsSubmitting(true);
    try {
      await deleteExpenseFireBase(id);
      deleteExpence(id);
    } catch (error) {
      setErrorMessage("There is an error occured while deleting the expense");
    }
    navigation.goBack();
  }

  async function handleConfirm(data) {
    setIsSubmitting(true);
    if (id) {
      try {
        updateExpence({
          id: id,
          ...data,
        });
        await updateExpenseFireBase(id, data);
      } catch (error) {
        setErrorMessage("There is an error occured while updating the expense");
      }
    } else {
      try {
        const id = await storeExpense(data);
        addExpence({
          id: id,
          ...data,
        });
      } catch (error) {
        setErrorMessage("There is an error occured while adding the expense");
      }
      navigation.goBack();
    }
  }

  function handleCancel() {
    navigation.goBack();
  }

  function handleError() {
    setMessage(null);
  }

  if (errorMessage !== null) {
    return <Error message={errorMessage} handleError={handleError} />;
  }

  if (isSubmitting) {
    return <Spinner />;
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
