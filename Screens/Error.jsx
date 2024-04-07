import { StyleSheet, Text, View } from "react-native";
import Button from "../Components/Button";

function Error({ message, handleError }) {
  return (
    <View style={styles.container}>
      <Text style={styles.Title}>Error Occured</Text>
      <Text style={styles.Message}>{message}</Text>
      <Button onPress={handleError}>Okay</Button>
    </View>
  );
}

export default Error;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#8b9cf0",
  },
  Title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
    color: "white",
  },
  Message: {
    fontSize: 15,
    marginBottom: 16,
    color: "white",
  },
});
