//petición fetch

import { API_END_POINT } from "../constants/endpoints";
import { IBook } from "./types/IBook";

export const createBook = async (register: IBook) => {
  try {
    const response = await fetch(API_END_POINT.book, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(register),
    });

    if (!response.ok) throw new Error("Error al crear el libro");
    let data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    return error;
  }
};

export const getAllBook = async () => {
  try {
    const response = await fetch(API_END_POINT.book);
    if (!response.ok) throw new Error("Error al listar los libros");
    let data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    return error;
  }
};

export const getByIdBook = async (id: number) => {
  try {
    const response = await fetch(API_END_POINT.book + id);

    if (!response.ok) throw new Error("Error al actualizar el libro");
    let data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    return error;
  }
};

export const updateBook = async (id: number, register: IBook) => {
  try {
    const response = await fetch(API_END_POINT.book + id, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(register),
    });

    if (!response.ok) throw new Error("Error al actualizar el libro");
    let data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    return error;
  }
};

export const deleteBook = async (id: string) => {
  try {
    const response = await fetch(API_END_POINT.book + id, {
      method: "DELETE",
    });

    if (!response.ok) throw new Error("Error al eliminar el libro");
    let data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    return error;
  }
};
