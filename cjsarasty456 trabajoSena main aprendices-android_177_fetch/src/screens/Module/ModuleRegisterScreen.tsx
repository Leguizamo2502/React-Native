import React, { useState } from "react";
import { View, Text, Button, StyleSheet, Alert } from "react-native";

import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { BooktackParamsList } from "../../navigations/types";
import { ModuleService } from "../../api/Services/ModuleService";
import { IModule } from "../../api/types/IModule";
import ModuleForm from "../../components/Module/ModuleForm";
import { validateForm } from "../../Utilities/Validations/ValidateForm";

type NavigationProp = NativeStackNavigationProp<BooktackParamsList, "PermissionUpdate">;


const ModuleRegisterScreen = () => {

    const navigation = useNavigation<NavigationProp>();
  
  const [form, setModule] = useState<IModule>({
    id: 0,
    name: "",
    description: "",
  });
  const handleChange = (name: string, value: string) => {
    setModule({ ...form, [name]: value });
  };
  
  const createModule = async (module: IModule) => {
    try {
      const created = await ModuleService.create(module);
      // alert(`Module creado exítosamente: ${created.name}`);
      Alert.alert("Éxito", "Module Creado correctamente: "+ module.name, [
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
      <ModuleForm form={form} handleChange={handleChange} />
      <Button
  title="Guardar"
  onPress={() => {
    if (validateForm(form)) {
      createModule(form);
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

export default ModuleRegisterScreen;
