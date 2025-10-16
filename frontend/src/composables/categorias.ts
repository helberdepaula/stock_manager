import { categoriaService } from "@/service/categorias-service";
import { ApiErrorHandler } from "@/service/error-handler-exceptions";
import type {
  Categorias,
  CreateCategoriaDto,
  SearchCategoriaDto,
  UpdateCategoriaDto,
} from "@/types/categorias-types";

import { ref, computed } from "vue";

export function useCategoria() {
  const categorias = ref<Categorias[]>([]);
  const categoria = ref<Categorias | null>(null);
  const loading = ref(false);
  const errorCategoria = ref<string | null>(null);
  const totalItems = ref(0);
  const currentPage = ref(1);
  const itemsPerPage = ref(10);

  const totalPages = computed(() =>
    Math.ceil(totalItems.value / itemsPerPage.value)
  );
  const hasData = computed(() => categorias.value.length > 0);
  const isEmpty = computed(() => !hasData.value && !loading.value);

  const clearError = () => {
    errorCategoria.value = null;
  };

  const setLoading = (value: boolean) => {
    loading.value = value;
    if (value) clearError();
  };

  const handleError = (err: any) => {
    const error = ApiErrorHandler.handle(err);
    errorCategoria.value = error.message;
  };

  const find = async (id: number) => {
    try {
      setLoading(true);
      const response = await categoriaService.findId(id);
      categoria.value = response;
    } catch (err) {
      handleError(err);
      categorias.value = [];
    } finally {
      setLoading(false);
    }
  };

  const fecthCategoria = async (params?: SearchCategoriaDto) => {
    try {
      setLoading(true);
      const response = await categoriaService.findAll(params);
      categorias.value = response.data;
      totalItems.value = response.meta.total;
      currentPage.value = response.meta.page;
      itemsPerPage.value = response.meta.limit;
    } catch (err) {
      handleError(err);
      categorias.value = [];
    } finally {
      setLoading(false);
    }
  };

  const createCategoria = async (data: CreateCategoriaDto) => {
    try {
      setLoading(true);
      const response = await categoriaService.create(data);

      if (response.data) {
        categorias.value.unshift(response.data);
        totalItems.value += 1;
      }

      return response;
    } catch (err) {
      handleError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateCategoria = async (id: number, data: UpdateCategoriaDto) => {
    try {
      setLoading(true);
      const response = await categoriaService.update(id, data);

      const index = categorias.value.findIndex((f) => f.id === id);
      if (index !== -1) {
        const updatedFornecedor = await categoriaService.findId(id);
        categorias.value[index] = updatedFornecedor;
      }

      if (categoria.value?.id === id) {
        categoria.value = await categoriaService.findId(id);
      }

      return response;
    } catch (err) {
      handleError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const removeCategoria = async (id: number) => {
    try {
      setLoading(true);
      const response = await categoriaService.delete(id);
      const index = categorias.value.findIndex((f) => f.id === id);
      if (index !== -1) {
        delete categorias.value[index];
      }
      return response;
    } catch (err) {
      handleError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const clearData = () => {
    categoria.value = null;
    totalItems.value = 0;
    currentPage.value = 1;
    clearError();
  };

  return {
    categorias,
    categoria,
    loading,
    errorCategoria,
    totalItems,
    currentPage,
    itemsPerPage,
    totalPages,
    hasData,
    isEmpty,
    find,
    fecthCategoria,
    createCategoria,
    updateCategoria,
    removeCategoria,
    clearData,
    clearError,
  };
}
