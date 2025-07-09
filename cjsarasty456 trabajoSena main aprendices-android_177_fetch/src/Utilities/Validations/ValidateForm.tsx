
import { Alert } from "react-native";

export const validateForm = (form: any): boolean => {
  if (!form.name.trim()) {
    Alert.alert("Validación", "El nombre es obligatorio.");
    return false;
  }

  if (!form.description.trim()) {
    Alert.alert("Validación", "La descripción es obligatoria.");
    return false;
  }

  return true;
};
