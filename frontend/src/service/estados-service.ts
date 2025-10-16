import type { Estados } from "@/types/estados-types";
import { apiService } from "./requet-service";

class EstadosService {
  async get(): Promise<Estados[]> {
    return apiService.get<Estados[]>(`/estados`);
  }
}

export const estadosService = new EstadosService();
