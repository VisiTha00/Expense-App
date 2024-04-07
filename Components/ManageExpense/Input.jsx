import { StyleSheet, Text, TextInput, View } from "react-native";

function Input({ label, textInputConfig }) {
  let textInputStyle = [styles.textInput];
  if (textInputConfig && textInputConfig.multiline) {
    textInputStyle.push(styles.textMultiline);
  }
  return (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>{label}</Text>
      <TextInput style={textInputStyle} {...textInputConfig} />
    </View>
  );
}

export default Input;

const styles = StyleSheet.create({
  inputContainer: {
    backgroundColor: "#e5e0f2",
    marginVertical: 10,
    marginHorizontal: 5,
    borderRadius: 8,
    padding: 10,
    borderWidth: 1,
    borderColor: "#3c36e8",
  },
  label: {
    fontSize: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#3c36e8",
    marginBottom: 5,
    fontWeight: "bold",
    color: "#3c36e8",
  },
  textInput: {
    fontSize: 16,
    marginTop: 4,
    padding: 5,
    color: "#3c36e8",
    backgroundColor: "#e9eaf5",
  },
  textMultiline: {
    minHeight: 100,
    textAlignVertical: "top",
  },
});
