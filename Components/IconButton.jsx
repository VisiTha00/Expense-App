import { StyleSheet, View } from "react-native";
import { Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";

function IconButton({ icon, size, color, onPress }) {
  return (
    <Pressable android_ripple={{ color: "#ccc" }} onPress={onPress}>
      <View style={styles.container}>
        <Ionicons name={icon} size={size} color={color} />
      </View>
    </Pressable>
  );
}

export default IconButton;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 15,
  },
});
