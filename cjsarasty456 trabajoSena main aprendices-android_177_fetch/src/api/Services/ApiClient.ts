export class ApiClient<T> {
  constructor(private baseUrl: string) {}

  async getAll(): Promise<T[]> {
    const response = await fetch(`${this.baseUrl}?getAllType=0`);
    if (!response.ok) throw new Error("Error al listar recursos");
    return await response.json();
  }

  async getById(id: number | string): Promise<T> {
    const response = await fetch(`${this.baseUrl}/${id}`);
    if (!response.ok) throw new Error("Error al obtener recurso por ID");
    return await response.json();
  }

  async create(data: T): Promise<T> {
    const response = await fetch(this.baseUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error("Error al crear recurso");
    // console.log(await response.json());
    return await response.json();
  }

  async update(id: number | string, data: T): Promise<T> {
    const response = await fetch(`${this.baseUrl}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error("Error al actualizar recurso");
    return await response.json();
  }

  async delete(id: number | string): Promise<T> {
    const response = await fetch(`${this.baseUrl}/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) throw new Error("Error al eliminar recurso");
    return await response.json();
  }

  async deleteLogic(id: number | string): Promise<T> {
    const response = await fetch(`${this.baseUrl}/${id}?deleteType=Logical`, {
      method: "DELETE",
    });
    if (!response.ok) throw new Error("Error al eliminar logicamente elrecurso");
    return await response.json();
  }
}