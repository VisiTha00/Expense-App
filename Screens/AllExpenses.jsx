import { StyleSheet, Text } from "react-native";
import ExpencesOutput from "../Components/ExpencesOutput";
import { useExpenseContext } from "../Contexts/ExpenseContext";

function AllExpenses() {
  const { expences } = useExpenseContext();
  return <ExpencesOutput expences={expences} expencePeriod="All" />;
}

export default AllExpenses;
