import { View, Text, TextInput, StyleSheet } from "react-native";

interface AuthInputProps {
  label: string;
  placeholder?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  secureTextEntry?: boolean;
}

export default function AuthInput({
  label,
  placeholder,
  value,
  onChangeText,
  secureTextEntry,
}: AuthInputProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{label}</Text>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        placeholderTextColor="#B0B0B0"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginBottom: 20,
  },
  input: {
    borderBottomWidth: 1,
    borderColor: "#D9D9D9",
    width: "100%",
    marginTop: -7,
    paddingVertical: 6,
    fontFamily: "Poppins-Regular",
    fontSize: 16,
  },
  text: {
    color: "#7c8494",
    fontFamily: "Poppins-Regular",
    marginBottom: 4,
  },
});
