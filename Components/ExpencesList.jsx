import { FlatList, Text } from "react-native";
import ExpencesItem from "./ExpencesItem";
import { useExpenseContext } from "../Contexts/ExpenseContext";

function ExpencesList({ expences }) {
  return (
    <FlatList
      data={expences}
      renderItem={(itemData) => <ExpencesItem item={itemData.item} />}
      keyExtractor={(item) => item.id}
    />
  );
}

export default ExpencesList;
