import { ref, computed } from 'vue'
import { fornecedoresService } from '@/services/fornecedores'
import type {
  Fornecedor,
  CreateFornecedorDto,
  UpdateFornecedorDto,
  SearchFornecedorDto,
  CreateFornecedorContatoDto
} from '@/types/fornecedor'

export function useFornecedores() {
  const fornecedores = ref<Fornecedor[]>([])
  const fornecedor = ref<Fornecedor | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)
  const totalItems = ref(0)
  const currentPage = ref(1)
  const itemsPerPage = ref(10)

  // Computed
  const totalPages = computed(() => Math.ceil(totalItems.value / itemsPerPage.value))
  const hasData = computed(() => fornecedores.value.length > 0)
  const isEmpty = computed(() => !hasData.value && !loading.value)

  // Actions
  const clearError = () => {
    error.value = null
  }

  const setLoading = (value: boolean) => {
    loading.value = value
    if (value) clearError()
  }

  const handleError = (err: any) => {
    console.error('Erro no fornecedores service:', err)
    error.value = err.response?.data?.message || err.message || 'Erro desconhecido'
  }

  /**
   * Busca todos os fornecedores
   */
  const fetchFornecedores = async (params?: SearchFornecedorDto) => {
    try {
      setLoading(true)
      const response = await fornecedoresService.findAll(params)
      fornecedores.value = response.data
      totalItems.value = response.meta.total
      currentPage.value = response.meta.page
      itemsPerPage.value = response.meta.limit
    } catch (err) {
      handleError(err)
      fornecedores.value = []
    } finally {
      setLoading(false)
    }
  }

  /**
   * Busca um fornecedor por ID
   */
  const fetchFornecedor = async (id: number) => {
    try {
      setLoading(true)
      fornecedor.value = await fornecedoresService.findOne(id)
    } catch (err) {
      handleError(err)
      fornecedor.value = null
    } finally {
      setLoading(false)
    }
  }

  /**
   * Cria um novo fornecedor
   */
  const createFornecedor = async (data: CreateFornecedorDto) => {
    try {
      setLoading(true)
      const response = await fornecedoresService.create(data)
      
      // Atualiza a lista local se houver dados
      if (response.data) {
        fornecedores.value.unshift(response.data)
        totalItems.value += 1
      }
      
      return response
    } catch (err) {
      handleError(err)
      throw err
    } finally {
      setLoading(false)
    }
  }

  /**
   * Atualiza um fornecedor
   */
  const updateFornecedor = async (id: number, data: UpdateFornecedorDto) => {
    try {
      setLoading(true)
      const response = await fornecedoresService.update(id, data)
      
      // Atualiza o item na lista local
      const index = fornecedores.value.findIndex(f => f.id === id)
      if (index !== -1) {
        // Busca os dados atualizados
        const updatedFornecedor = await fornecedoresService.findOne(id)
        fornecedores.value[index] = updatedFornecedor
      }
      
      // Atualiza o fornecedor atual se for o mesmo
      if (fornecedor.value?.id === id) {
        fornecedor.value = await fornecedoresService.findOne(id)
      }
      
      return response
    } catch (err) {
      handleError(err)
      throw err
    } finally {
      setLoading(false)
    }
  }

  /**
   * Remove um fornecedor
   */
  const removeFornecedor = async (id: number) => {
    try {
      setLoading(true)
      const response = await fornecedoresService.remove(id)
      
      // Remove da lista local
      const index = fornecedores.value.findIndex(f => f.id === id)
      if (index !== -1) {
        fornecedores.value.splice(index, 1)
        totalItems.value -= 1
      }
      
      // Limpa o fornecedor atual se for o mesmo
      if (fornecedor.value?.id === id) {
        fornecedor.value = null
      }
      
      return response
    } catch (err) {
      handleError(err)
      throw err
    } finally {
      setLoading(false)
    }
  }

  /**
   * Adiciona contatos a um fornecedor
   */
  const addContatos = async (id: number, data: CreateFornecedorContatoDto) => {
    try {
      setLoading(true)
      const response = await fornecedoresService.createContato(id, data)
      
      // Atualiza os dados do fornecedor com os novos contatos
      if (fornecedor.value?.id === id) {
        await fetchFornecedor(id)
      }
      
      return response
    } catch (err) {
      handleError(err)
      throw err
    } finally {
      setLoading(false)
    }
  }

  /**
   * Busca fornecedores ativos
   */
  const fetchActiveFornecedores = async (params?: Omit<SearchFornecedorDto, 'status'>) => {
    return await fetchFornecedores({ ...params, status: 'ACTIVE' })
  }

  /**
   * Verifica se um CNPJ já existe
   */
  const checkCnpjExists = async (cnpj: string): Promise<boolean> => {
    try {
      return await fornecedoresService.cnpjExists(cnpj)
    } catch (err) {
      handleError(err)
      return false
    }
  }

  /**
   * Limpa os dados
   */
  const clearData = () => {
    fornecedores.value = []
    fornecedor.value = null
    totalItems.value = 0
    currentPage.value = 1
    clearError()
  }

  return {
    // State
    fornecedores,
    fornecedor,
    loading,
    error,
    totalItems,
    currentPage,
    itemsPerPage,
    
    // Computed
    totalPages,
    hasData,
    isEmpty,
    
    // Actions
    fetchFornecedores,
    fetchFornecedor,
    createFornecedor,
    updateFornecedor,
    removeFornecedor,
    addContatos,
    fetchActiveFornecedores,
    checkCnpjExists,
    clearData,
    clearError
  }
}