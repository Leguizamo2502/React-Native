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
import { ModuleService } from "../../api/Services/ModuleService";
import { IModule } from "../../api/types/IModule";
import ModuleForm from "../../components/Module/ModuleForm";
import { validateForm } from "../../Utilities/Validations/ValidateForm";

type ModuleUpdateScreenRouteProp = RouteProp<
  BooktackParamsList,
  "ModuleUpdate"
>;
type NavigationProp = NativeStackNavigationProp<
  BooktackParamsList,
  "ModuleUpdate"
>;

const ModuleUpdateScreen = () => {
  const route = useRoute<ModuleUpdateScreenRouteProp>();
  const navigation = useNavigation<NavigationProp>();
  const { id } = route.params;

  const [form, setModule] = useState<IModule>({
    id: Number(id),
    name: "",
    description: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadModule = async () => {
      try {
        const data = await ModuleService.getById(id);
        setModule(data);
      } catch (err) {
        Alert.alert("Error", "No se pudo cargar el modulo.");
      } finally {
        setLoading(false);
      }
    };

    loadModule();
  }, [id]);

  const handleChange = (field: keyof IModule, value: string) => {
    setModule({ ...form, [field]: value });
  };

  const handleSubmit = async () => {
    try {
      await ModuleService.update(id, form);
      Alert.alert("Éxito", "Module actualizado correctamente.", [
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
    <View style={{ flex: 1 }}>
      <ModuleForm form={form} handleChange={handleChange} />
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

export default ModuleUpdateScreen;
