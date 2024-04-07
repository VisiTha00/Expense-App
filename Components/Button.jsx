import { Pressable, StyleSheet, Text, View } from "react-native";
import { GlobalStyles } from "../Constants/GlobalStyles";

function Button({ children, onPress, style }) {
  return (
    <View style={[styles.container, style]}>
      <Pressable android_ripple={{ color: "#ccc" }} onPress={onPress}>
        <View style={styles.innerContainer}>
          <Text style={styles.text}>{children}</Text>
        </View>
      </Pressable>
    </View>
  );
}

export default Button;

const styles = StyleSheet.create({
  container: {
    backgroundColor: GlobalStyles.colors.primary500,
    borderRadius: 20,
    alignItems: "center",
    overflow: "hidden",
  },
  innerContainer: {
    padding: 10,
    width: 75,
    alignItems: "center",
  },
  text: {
    color: "white",
    fontSize: 15,
    fontWeight: "bold",
  },
});
