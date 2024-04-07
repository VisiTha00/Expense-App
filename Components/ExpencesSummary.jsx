import { StyleSheet, Text, View } from "react-native";
import { GlobalStyles } from "../Constants/GlobalStyles";
import { useExpenseContext } from "../Contexts/ExpenseContext";

function ExpencesSummary({ expences, expencePeriod }) {
  const totalExpences = expences.reduce(
    (acc, expence) => acc + expence.amount,
    0
  );

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{expencePeriod}</Text>
      <Text style={styles.text}>{`$ ${totalExpences.toFixed(2)}`}</Text>
    </View>
  );
}

export default ExpencesSummary;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 30,
    marginVertical: 10,

    backgroundColor: GlobalStyles.colors.primary100,
    padding: 10,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: GlobalStyles.colors.primary700,
  },
  text: {
    color: GlobalStyles.colors.primary700,
    fontSize: 16,
    fontWeight: "bold",
  },
});
