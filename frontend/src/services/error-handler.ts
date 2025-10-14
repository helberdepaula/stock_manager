import { AxiosError } from 'axios'

export interface ApiError {
  message: string
  status?: number
  errors?: Record<string, string[]>
}

export class ApiErrorHandler {
  static handle(error: unknown): ApiError {
    if (error instanceof AxiosError) {
      const response = error.response

      if (response?.data) {
        return {
          message: response.data.message || 'Erro na requisição',
          status: response.status,
          errors: response.data.errors
        }
      }

      if (error.code === 'ECONNABORTED') {
        return {
          message: 'Tempo limite da requisição excedido',
          status: 408
        }
      }

      if (error.code === 'ERR_NETWORK') {
        return {
          message: 'Erro de conexão com o servidor',
          status: 0
        }
      }
    }

    return {
      message: 'Erro interno do sistema',
      status: 500
    }
  }

  static getValidationErrors(error: ApiError): Record<string, string> {
    if (!error.errors) return {}

    const validationErrors: Record<string, string> = {}
    
    Object.entries(error.errors).forEach(([field, messages]) => {
      validationErrors[field] = messages[0] ?? ''
    })

    return validationErrors
  }
}