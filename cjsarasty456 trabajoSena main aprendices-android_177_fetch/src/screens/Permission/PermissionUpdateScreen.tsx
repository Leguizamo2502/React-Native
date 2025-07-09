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
import { PermissionService } from "../../api/Services/PermissionService";
import { IPermission } from "../../api/types/IPermission";
import PermissionForm from "../../components/Permission/PermissionForm";
import { validateForm } from "../../Utilities/Validations/ValidateForm";

type PermissionUpdateScreenRouteProp = RouteProp<BooktackParamsList, "PermissionUpdate">;
type NavigationProp = NativeStackNavigationProp<BooktackParamsList, "PermissionUpdate">;

const PermissionUpdateScreen = () => {
  const route = useRoute<PermissionUpdateScreenRouteProp>();
  const navigation = useNavigation<NavigationProp>();
  const { id } = route.params;

  const [form, setPermission] = useState<IPermission>({ id: Number(id), name: "", description: "" });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPermission = async () => {
      try {
        const data = await PermissionService.getById(id);
        setPermission(data);
      } catch (err) {
        Alert.alert("Error", "No se pudo cargar el permiso.");
      } finally {
        setLoading(false);
      }
    };

    loadPermission();
  }, [id]);

  const handleChange = (field: keyof IPermission, value: string) => {
    setPermission({ ...form, [field]: value });
  };

  const handleSubmit = async () => {
    try {
      await PermissionService.update(id, form);
      Alert.alert("Éxito", "Permission actualizado correctamente.", [
        {
          text: "OK",
          onPress: () => navigation.goBack(),
        },
      ]);
    } catch (err) {
      Alert.alert("Error", "No se pudo actualizar el permiso.");
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
      <PermissionForm form={form} handleChange={handleChange} />
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

export default PermissionUpdateScreen;
