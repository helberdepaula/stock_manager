import type {
  ContatosFornecedor,
  ContatosFornecedorCreateResponse,
  CreateContatoDto,
  CreateFornecedorDto,
  Fornecedor,
  FornecedorCreateResponse,
  FornecedorDeleteResponse,
  FornecedoreResult,
  FornecedorUpdateResponse,
  SearchFornecedorDto,
  UpdateFornecedorDto,
} from "@/types/fornecedores-type";
import { apiService } from "./requet-service";

class FornecedorService {
  async findAll(params?: SearchFornecedorDto): Promise<FornecedoreResult> {
    return apiService.get<FornecedoreResult>("/fornecedores", { params });
  }

  async findId(id: number): Promise<Fornecedor> {
    return apiService.get<Fornecedor>(`/fornecedores/${id}`);
  }

  async create(data: CreateFornecedorDto): Promise<FornecedorCreateResponse> {
    return apiService.post<FornecedorCreateResponse>("/fornecedores", {
      cnpj: data.cnpj,
      nome: data.nome,
      municipio_id: data.municipio_id,
      logradouro: data.logradouro,
      cep: data.cep,
      numero: data.numero,
      complemento: data.complemento,
      bairro: data.bairro,
    });
  }

  async update(
    id: number,
    data: UpdateFornecedorDto
  ): Promise<FornecedorUpdateResponse> {
    return apiService.patch<FornecedorUpdateResponse>(`/fornecedores/${id}`, {
      cnpj: data.cnpj,
      nome: data.nome,
      municipio_id: data.municipio_id,
      logradouro: data.logradouro,
      cep: data.cep,
      numero: data.numero,
      complemento: data.complemento,
      bairro: data.bairro,
    });
  }

  async delete(id: number): Promise<FornecedorDeleteResponse> {
    return apiService.delete<FornecedorDeleteResponse>(`/fornecedores/${id}`);
  }

  async getContato(fornecaedor_id: number): Promise<ContatosFornecedor> {
    return apiService.get<ContatosFornecedor>(
      `/fornecedores/contato/${fornecaedor_id}`
    );
  }

  async createContato(
    fornecaedor_id: number,
    data: { contatos: CreateContatoDto[] }
  ): Promise<ContatosFornecedorCreateResponse> {
    return apiService.post<ContatosFornecedorCreateResponse>(
      `/fornecedores/contato/${fornecaedor_id}`,
      data
    );
  }
}

export const fornecedorService = new FornecedorService();
