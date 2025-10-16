import type {
  CreateMarcaDto,
  Marca,
  MarcaResponse,
  MarcasResult,
  SearchMarcaDto,
  UpdateMarcaDto,
} from "@/types/marcas.type";
import { apiService } from "./requet-service";

class MarcasService {
  async findAll(params?: SearchMarcaDto): Promise<MarcasResult> {
    return apiService.get<MarcasResult>("/marcas", { params });
  }

  async findId(id: number): Promise<Marca> {
    return apiService.get<Marca>(`/marcas/${id}`);
  }

  async create(data: CreateMarcaDto): Promise<MarcaResponse> {
    return apiService.post<MarcaResponse>("/marcas", data);
  }

  async update(id: number, data: UpdateMarcaDto): Promise<MarcaResponse> {
    return apiService.patch<MarcaResponse>(`/marcas/${id}`, data);
  }

  async delete(id: number): Promise<MarcaResponse> {
    return apiService.delete<MarcaResponse>(`/marcas/${id}`);
  }
}

export const marcasService = new MarcasService();
