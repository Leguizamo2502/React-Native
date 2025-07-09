import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { BooktackParamsList } from "../../navigations/types";
import { IForm } from "../../api/types/IForm";
import { FormService } from "../../api/Services/FormService";
import GenericCard from "../../components/Components/GenericCard";


type NavigationProp = NativeStackNavigationProp<BooktackParamsList, "FormList">;

const FormListScreen = () => {
  const navigation = useNavigation<NavigationProp>();

  const [formularios, setForm] = useState<IForm[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadForm();
  }, []);

  const loadForm = async () => {
    setLoading(true);
    try {
      const data = await FormService.getAll();
      setForm(data);
    } catch (err: any) {
      setError(err.message || "Error al cargar los formularios");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    Alert.alert("Confirmar", "¿Estás seguro de eliminar este formulario?", [
      {
        text: "Cancelar",
        style: "cancel",
      },
      {
        text: "Eliminar",
        style: "destructive",
        onPress: async () => {
          try {
            await FormService.deleteLogic(id);
            await loadForm(); // Recarga la lista
          } catch (err) {
            Alert.alert("Error", "No se pudo eliminar el formulario.");
          }
        },
      },
    ]);
  };

  const handleUpdate = (id: number) => {
    navigation.navigate("FormUpdate", { id: String(id) });
  };

  const renderItem = ({ item }: { item: IForm }) => (
    <GenericCard<IForm>
      item={item}
      fields={["name", "description"]}
      titleField="name"
      onEdit={handleUpdate}
      onDelete={handleDelete}
      getId={(item) => item.id}
    />
  )

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Listado de Formularios</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#000" />
      ) : error ? (
        <Text style={styles.error}>{error}</Text>
      ) : (
        <FlatList
          data={formularios}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
        />
      )}

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate("FormRegister")}
      >
        <Text style={styles.addButtonText}>➕ Agregar Formulario</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  error: { color: "red", marginBottom: 10 },

  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 16,
    marginBottom: 15,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 5,
  },
  cardSubtitle: {
    fontSize: 14,
    color: "#555",
    marginBottom: 10,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    flex: 1,
    paddingVertical: 10,
    marginHorizontal: 5,
    borderRadius: 8,
    alignItems: "center",
  },
  editButton: {
    backgroundColor: "#4CAF50",
  },
  deleteButton: {
    backgroundColor: "#FF3B30",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
  },
  addButton: {
    marginTop: 20,
    backgroundColor: "#1e90ff",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  addButtonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default FormListScreen;
