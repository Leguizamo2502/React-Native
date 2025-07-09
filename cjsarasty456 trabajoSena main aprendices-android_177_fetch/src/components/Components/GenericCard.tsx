import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

interface Props<T> {
  item: T;
  fields: (keyof T)[];
  titleField?: keyof T;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
  getId: (item: T) => number;
}

function GenericCard<T>({
  item,
  fields,
  titleField,
  onEdit,
  onDelete,
  getId,
}: Props<T>) {
  const id = getId(item);

  return (
    <View style={styles.card}>
      {titleField && (
        <Text style={styles.cardTitle}>{String(item[titleField])}</Text>
      )}
      <Text style={styles.cardSubtitle}>ID: {id}</Text>

      {fields.map((field) => (
        <Text key={String(field)} style={styles.cardSubtitle}>
          {`${String(field)}: ${String(item[field])}`}
        </Text>
      ))}

      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={[styles.button, styles.editButton]}
          onPress={() => onEdit(id)}
        >
          <Text style={styles.buttonText}>Editar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.deleteButton]}
          onPress={() => onDelete(id)}
        >
          <Text style={styles.buttonText}>Eliminar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
    marginBottom: 5,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
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
});

export default GenericCard;
