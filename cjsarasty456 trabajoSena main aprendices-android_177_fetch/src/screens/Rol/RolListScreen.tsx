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
import { RolService } from "../../api/Services/RolService";
import { IRol } from "../../api/types/IRol";
import GenericCard from "../../components/Components/GenericCard";

type NavigationProp = NativeStackNavigationProp<BooktackParamsList, "RolList">;

const RolListScreen = () => {
  const navigation = useNavigation<NavigationProp>();

  const [roles, setRoles] = useState<IRol[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadRoles();
  }, []);

  const loadRoles = async () => {
    setLoading(true);
    try {
      const data = await RolService.getAll();
      setRoles(data);
    } catch (err: any) {
      setError(err.message || "Error al cargar los roles");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    Alert.alert("Confirmar", "¿Estás seguro de eliminar este rol?", [
      {
        text: "Cancelar",
        style: "cancel",
      },
      {
        text: "Eliminar",
        style: "destructive",
        onPress: async () => {
          try {
            await RolService.deleteLogic(id);
            await loadRoles(); // Recarga la lista
          } catch (err) {
            Alert.alert("Error", "No se pudo eliminar el rol.");
          }
        },
      },
    ]);
  };

  const handleUpdate = (id: number) => {
    navigation.navigate("RolUpdate", { id: String(id) });
  };

  // const renderItem = ({ item }: { item: IRol }) => (
  //   <View style={styles.card}>
  //     <Text style={styles.cardTitle}>{item.name}</Text>
  //     <Text style={styles.cardSubtitle}>ID: {item.id}</Text>
  //     <Text style={styles.cardSubtitle}>Description: {item.description}</Text>


  //     <View style={styles.buttonRow}>
  //       <TouchableOpacity
  //         style={[styles.button, styles.editButton]}
  //         onPress={() => handleUpdate(item.id)}
  //       >
  //         <Text style={styles.buttonText}>Editar</Text>
  //       </TouchableOpacity>

  //       <TouchableOpacity
  //         style={[styles.button, styles.deleteButton]}
  //         onPress={() => handleDelete(item.id)}
  //       >
  //         <Text style={styles.buttonText}>Eliminar</Text>
  //       </TouchableOpacity>
  //     </View>
  //   </View>
  // );

  const renderItem = ({ item }: { item: IRol }) => (
    <GenericCard<IRol>
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
      <Text style={styles.title}>Listado de Roles</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#000" />
      ) : error ? (
        <Text style={styles.error}>{error}</Text>
      ) : (
        <FlatList
          data={roles}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
        />
      )}

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate("RolRegister")}
      >
        <Text style={styles.addButtonText}>➕ Agregar Rol</Text>
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

export default RolListScreen;
