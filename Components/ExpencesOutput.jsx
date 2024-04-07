import { StyleSheet, View } from "react-native";
import ExpencesSummary from "./ExpencesSummary";
import ExpencesList from "./ExpencesList";
import { GlobalStyles } from "../Constants/GlobalStyles";
import { useExpenseContext } from "../Contexts/ExpenseContext";

function ExpencesOutput({ expences, expencePeriod }) {
  return (
    <View style={styles.container}>
      <ExpencesSummary expences={expences} expencePeriod={expencePeriod} />
      <ExpencesList expences={expences} />
    </View>
  );
}

export default ExpencesOutput;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GlobalStyles.colors.primary50,
    padding: 20,
  },
});
