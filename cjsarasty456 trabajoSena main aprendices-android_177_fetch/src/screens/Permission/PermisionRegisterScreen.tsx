import React, { useState } from "react";
import { View, Text, Button, StyleSheet, Alert } from "react-native";

import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { BooktackParamsList } from "../../navigations/types";
import { PermissionService } from "../../api/Services/PermissionService";
import { IPermission } from "../../api/types/IPermission";
import PermissionForm from "../../components/Permission/PermissionForm";
import { validateForm } from "../../Utilities/Validations/ValidateForm";

type NavigationProp = NativeStackNavigationProp<
  BooktackParamsList,
  "PermissionUpdate"
>;

const PermissionRegisterScreen = () => {
  const navigation = useNavigation<NavigationProp>();

  const [form, setPermission] = useState<IPermission>({
    id: 0,
    name: "",
    description: "",
  });
  const handleChange = (name: string, value: string) => {
    setPermission({ ...form, [name]: value });
  };

  const createPermission = async (module: IPermission) => {
    try {
      const created = await PermissionService.create(module);
      // alert(`Permission creado exítosamente: ${created.name}`);
      Alert.alert("Éxito", "Permission Creado correctamente: " + module.name, [
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
      <PermissionForm form={form} handleChange={handleChange} />
      <Button
        title="Guardar"
        onPress={() => {
          if (validateForm(form)) {
            createPermission(form);
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

export default PermissionRegisterScreen;
