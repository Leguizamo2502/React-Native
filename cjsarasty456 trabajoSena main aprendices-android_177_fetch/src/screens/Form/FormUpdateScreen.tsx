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
import { FormService } from "../../api/Services/FormService";
import { IForm } from "../../api/types/IForm";
import FormForm from "../../components/Form/FormForm";
import { validateForm } from "../../Utilities/Validations/ValidateForm";

type FormUpdateScreenRouteProp = RouteProp<BooktackParamsList, "FormUpdate">;
type NavigationProp = NativeStackNavigationProp<
  BooktackParamsList,
  "FormUpdate"
>;

const FormUpdateScreen = () => {
  const route = useRoute<FormUpdateScreenRouteProp>();
  const navigation = useNavigation<NavigationProp>();
  const { id } = route.params;

  const [form, setForm] = useState<IForm>({
    id: Number(id),
    name: "",
    description: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadForm = async () => {
      try {
        const data = await FormService.getById(id);
        setForm(data);
      } catch (err) {
        Alert.alert("Error", "No se pudo cargar el modulo.");
      } finally {
        setLoading(false);
      }
    };

    loadForm();
  }, [id]);

  const handleChange = (field: keyof IForm, value: string) => {
    setForm({ ...form, [field]: value });
  };

  const handleSubmit = async () => {
    try {
      await FormService.update(id, form);
      Alert.alert("Éxito", "Form actualizado correctamente.", [
        {
          text: "OK",
          onPress: () => navigation.goBack(),
        },
      ]);
    } catch (err) {
      Alert.alert("Error", "No se pudo actualizar el modulo.");
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
    <View style={{ ...styles.container, padding: 16 }}>
      <Text style={styles.title}>Actualizar</Text>

      <FormForm form={form} handleChange={handleChange} />
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
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  container: { flex: 1, padding: 16 },
});

export default FormUpdateScreen;
