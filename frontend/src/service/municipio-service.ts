import { apiService } from "./requet-service";
import type { Municipio } from "@/types/municipio-types";

class MunicipioService {
  async get(estado_id: number): Promise<Municipio[]> {
    return apiService.get<Municipio[]>(`/municipios/${estado_id}`);
  }
}

export const municipioService = new MunicipioService();
