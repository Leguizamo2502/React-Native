import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  ActivityIndicator,
  StyleSheet,
  Alert,
} from "react-native";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { BooktackParamsList } from "../../navigations/types";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RolService } from "../../api/Services/RolService";
import { IRol } from "../../api/types/IRol";
import RolForm from "../../components/Rol/RolForm";
import { validateForm } from "../../Utilities/Validations/ValidateForm";

type FormUpdateScreenRouteProp = RouteProp<BooktackParamsList, "FormUpdate">;
type NavigationProp = NativeStackNavigationProp<
  BooktackParamsList,
  "FormUpdate"
>;

const RolUpdateScreen = () => {
  const route = useRoute<FormUpdateScreenRouteProp>();
  const navigation = useNavigation<NavigationProp>();
  const { id } = route.params;

  const [form, setForm] = useState<IRol>({
    id: Number(id),
    name: "",
    description: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadRol = async () => {
      try {
        const data = await RolService.getById(id);
        setForm(data);
      } catch (err) {
        Alert.alert("Error", "No se pudo cargar el formulario.");
      } finally {
        setLoading(false);
      }
    };

    loadRol();
  }, [id]);

  const handleChange = (field: keyof IRol, value: string) => {
    setForm({ ...form, [field]: value });
  };

  const handleSubmit = async () => {
    try {
      await RolService.update(id, form);
      Alert.alert("Éxito", "Rol actualizado correctamente.", [
        {
          text: "OK",
          onPress: () => navigation.goBack(),
        },
      ]);
    } catch (err) {
      Alert.alert("Error", "No se pudo actualizar el formulario.");
    }
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <RolForm form={form} handleChange={handleChange} />
      <View style={styles.buttonContainer}>
        <Button
          title="Actualizar"
          onPress={() => {
            if (validateForm(form)) {
              handleSubmit();
            }
          }}
          color="#1e90ff"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    padding: 20,
  },
});

export default RolUpdateScreen;
