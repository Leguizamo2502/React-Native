import React, { useState } from "react";
import { View, Text, Button, StyleSheet, Alert } from "react-native";

import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { BooktackParamsList } from "../../navigations/types";
import { FormService } from "../../api/Services/FormService";
import { IForm } from "../../api/types/IForm";
import FormForm from "../../components/Form/FormForm";
import { validateForm } from "../../Utilities/Validations/ValidateForm";

type NavigationProp = NativeStackNavigationProp<
  BooktackParamsList,
  "PermissionUpdate"
>;

const FormRegisterScreen = () => {
  const navigation = useNavigation<NavigationProp>();

  const [form, setForm] = useState<IForm>({
    id: 0,
    name: "",
    description: "",
  });
  const handleChange = (name: string, value: string) => {
    setForm({ ...form, [name]: value });
  };
  

  const createForm = async (module: IForm) => {
    try {
      const created = await FormService.create(module);
      // alert(`Form creado exítosamente: ${created.name}`);
      Alert.alert("Éxito", "Form Creado correctamente: " + module.name, [
        {
          text: "OK",
          onPress: () => navigation.goBack(),
        },
      ]);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <View>
      <FormForm form={form} handleChange={handleChange} />
      <Button
  title="Guardar"
  onPress={() => {
    if (validateForm(form)) {
      createForm(form);
    }
  }}
/>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 50,
    textAlign: "center",
  },
});

export default FormRegisterScreen;
