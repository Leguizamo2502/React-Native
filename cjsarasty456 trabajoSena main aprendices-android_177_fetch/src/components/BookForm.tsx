import React from "react";
import { IBook } from "../api/types/IBook";
import { ScrollView, TextInput, View, StyleSheet } from "react-native";

interface Props {
  form: IBook;
  handleChange: (field: keyof IBook, value: string) => void;
}

const BookForm: React.FC<Props> = ({ form, handleChange }) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={form.name}
        onChangeText={(text) => handleChange("name", text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Description"
        value={form.description}
        onChangeText={(text) => handleChange("description", text)}
      />
     
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#aaa",
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
});

export default BookForm;
