import type {
  CategoriaResponse,
  Categorias,
  CategoriasResult,
  CreateCategoriaDto,
  SearchCategoriaDto,
  UpdateCategoriaDto,
} from "@/types/categorias-types";
import { apiService } from "./requet-service";

class CategoriasService {
  async findAll(params?: SearchCategoriaDto): Promise<CategoriasResult> {
    return apiService.get<CategoriasResult>("/categorias", { params });
  }

  async findId(id: number): Promise<Categorias> {
    return apiService.get<Categorias>(`/categorias/${id}`);
  }

  async create(data: CreateCategoriaDto): Promise<CategoriaResponse> {
    return apiService.post<CategoriaResponse>("/categorias", data);
  }

  async update(
    id: number,
    data: UpdateCategoriaDto
  ): Promise<CategoriaResponse> {
    return apiService.patch<CategoriaResponse>(`/categorias/${id}`, data);
  }

  async delete(id: number): Promise<CategoriaResponse> {
    return apiService.delete<CategoriaResponse>(`/categorias/${id}`);
  }
}

export const categoriaService = new CategoriasService();
