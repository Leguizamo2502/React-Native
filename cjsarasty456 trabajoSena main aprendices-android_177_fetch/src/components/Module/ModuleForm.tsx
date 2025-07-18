import React from "react";
import { ScrollView, TextInput, View, StyleSheet } from "react-native";
import { IModule } from "../../api/types/IModule";

interface Props {
  form: IModule;
  handleChange: (field: keyof IModule, value: string) => void;
}

const ModuleForm: React.FC<Props> = ({ form, handleChange }) => {
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

export default ModuleForm;
