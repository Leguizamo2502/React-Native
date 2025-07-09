import React, { useState } from "react";
import { View, Text, Button, StyleSheet, Alert } from "react-native";
import { IRol } from "../../api/types/IRol";
import RolForm from "../../components/Rol/RolForm";
import { RolService } from "../../api/Services/RolService";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { BooktackParamsList } from "../../navigations/types";
import { validateForm } from "../../Utilities/Validations/ValidateForm";

type NavigationProp = NativeStackNavigationProp<BooktackParamsList, "RolUpdate">;


const RolRegisterScreen = () => {

    const navigation = useNavigation<NavigationProp>();
  
  const [form, setForm] = useState<IRol>({
    id: 0,
    name: "",
    description: "",
  });
  const handleChange = (name: string, value: string) => {
    setForm({ ...form, [name]: value });
  };
  
  const createRol = async (rol: IRol) => {
    try {
      const created = await RolService.create(rol);
      // alert(`Rol creado exítosamente: ${created.name}`);
      Alert.alert("Éxito", "Rol Creado correctamente: "+ rol.name, [
              {
                text: "OK",
                // onPress: () => navigation.navigate("RolList"), Error
                onPress: () => navigation.goBack(), // Solucion

              },
            ]);
              
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <View>
      <RolForm form={form} handleChange={handleChange} />
      <Button
  title="Guardar"
  onPress={() => {
    if (validateForm(form)) {
      createRol(form);
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

export default RolRegisterScreen;
