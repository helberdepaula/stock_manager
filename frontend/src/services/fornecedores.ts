import { apiService } from './api'
import type {
  Fornecedor,
  CreateFornecedorDto,
  UpdateFornecedorDto,
  SearchFornecedorDto,
  FornecedorResponse,
  CreateFornecedorContatoDto,
  ApiResponse
} from '@/types/fornecedor'

class FornecedoresService {
  private readonly baseUrl = '/fornecedores'

  /**
   * Busca todos os fornecedores com paginação
   */
  async findAll(params?: SearchFornecedorDto): Promise<FornecedorResponse> {
    const queryParams = new URLSearchParams()
    
    if (params?.page) queryParams.append('page', params.page.toString())
    if (params?.limit) queryParams.append('limit', params.limit.toString())
    if (params?.search) queryParams.append('search', params.search)
    if (params?.status) queryParams.append('status', params.status)

    const url = queryParams.toString() 
      ? `${this.baseUrl}?${queryParams.toString()}`
      : this.baseUrl

    return await apiService.get<FornecedorResponse>(url)
  }

  /**
   * Busca um fornecedor por ID
   */
  async findOne(id: number): Promise<Fornecedor> {
    return await apiService.get<Fornecedor>(`${this.baseUrl}/${id}`)
  }

  /**
   * Cria um novo fornecedor
   */
  async create(data: CreateFornecedorDto): Promise<ApiResponse<Fornecedor>> {
    return await apiService.post<ApiResponse<Fornecedor>>(this.baseUrl, data)
  }

  /**
   * Atualiza um fornecedor existente
   */
  async update(id: number, data: UpdateFornecedorDto): Promise<ApiResponse> {
    return await apiService.put<ApiResponse>(`${this.baseUrl}/${id}`, data)
  }

  /**
   * Remove um fornecedor (soft delete)
   */
  async remove(id: number): Promise<ApiResponse> {
    return await apiService.delete<ApiResponse>(`${this.baseUrl}/${id}`)
  }

  /**
   * Cria contatos para um fornecedor
   */
  async createContato(id: number, data: CreateFornecedorContatoDto): Promise<ApiResponse> {
    return await apiService.post<ApiResponse>(`${this.baseUrl}/${id}/contatos`, data)
  }

  /**
   * Busca fornecedores por CNPJ
   */
  async findByCnpj(cnpj: string): Promise<Fornecedor | null> {
    try {
      const response = await this.findAll({ search: cnpj })
      return response.data.length > 0 ? response.data[0] || null : null
    } catch (error) {
      return null
    }
  }

  /**
   * Verifica se um CNPJ já está cadastrado
   */
  async cnpjExists(cnpj: string): Promise<boolean> {
    const fornecedor = await this.findByCnpj(cnpj)
    return fornecedor !== null
  }

  /**
   * Busca fornecedores ativos
   */
  async findActive(params?: Omit<SearchFornecedorDto, 'status'>): Promise<FornecedorResponse> {
    return await this.findAll({ ...params, status: 'ACTIVE' })
  }

  /**
   * Busca fornecedores inativos
   */
  async findInactive(params?: Omit<SearchFornecedorDto, 'status'>): Promise<FornecedorResponse> {
    return await this.findAll({ ...params, status: 'INACTIVE' })
  }
}

export const fornecedoresService = new FornecedoresService()
export default fornecedoresService