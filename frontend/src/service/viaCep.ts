import { apiService } from "./requet-service";
import type { ViaCepResponse } from "@/types/viacep-types";
import axios, {
  type AxiosInstance,
  type AxiosResponse,
  type AxiosError,
  type AxiosRequestConfig,
} from "axios";

class ViaService {
  private instance: AxiosInstance;

  constructor() {
    this.instance = axios.create({
      baseURL: "https://viacep.com.br",
      timeout: 10000,
      headers: {
        "Content-Type": "application/json",
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors(): void {
    this.instance.interceptors.request.use(
      (config) => {
        return config;
      },
      (error) => Promise.reject(error)
    );

  }
 async find<ViaCepResponse>(cep: string, config?: AxiosRequestConfig): Promise<ViaCepResponse> {
    const response = await this.instance.get<ViaCepResponse>(`/ws/${cep}/json/`,config);
    return response.data;
  }
}

export const viaService = new ViaService();
