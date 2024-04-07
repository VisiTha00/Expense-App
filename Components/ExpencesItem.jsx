import { Pressable, StyleSheet, Text, View } from "react-native";
import { GlobalStyles } from "../Constants/GlobalStyles";
import { format, parseISO } from "date-fns";
import { useNavigation } from "@react-navigation/native";

function ExpencesItem({ item }) {
  const { id, description, amount, date: stringDate } = item;
  const navigation = useNavigation();

  if (typeof stringDate !== "string") {
    console.error("Expected item.date to be a string, got", typeof stringDate);
    return null;
  }

  const date = parseISO(stringDate);
  const formattedDate = format(date, "MMMM do yyyy");

  function handlePress() {
    navigation.navigate("Manage Expences", { id: id });
  }

  return (
    <View style={styles.container}>
      <Pressable android_ripple={{ color: "#6e0bc0" }} onPress={handlePress}>
        <View style={styles.innerContainer}>
          <View>
            <Text style={styles.textContainer}>{description}</Text>
            <Text style={styles.smallText}>{formattedDate}</Text>
          </View>
          <View style={styles.amountContainer}>
            <Text style={styles.textContainer}>{amount.toFixed(2)}</Text>
          </View>
        </View>
      </Pressable>
    </View>
  );
}

export default ExpencesItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GlobalStyles.colors.primary100,
    marginVertical: 5,
    borderRadius: 20,
    overflow: "hidden",
    elevation: 4,
  },
  innerContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    paddingHorizontal: 10,
  },
  textContainer: {
    fontSize: 15,
    fontWeight: "bold",
    color: GlobalStyles.colors.primary700,
  },
  smallText: {
    fontSize: 12,
    color: GlobalStyles.colors.primary700,
    fontWeight: "bold",
  },
  amountContainer: {
    backgroundColor: GlobalStyles.colors.primary50,
    borderRadius: 10,
    padding: 5,
    alignItems: "center",
    width: "25%",
  },
});
