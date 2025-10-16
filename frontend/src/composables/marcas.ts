import { ApiErrorHandler } from "@/service/error-handler-exceptions";
import { marcasService } from "@/service/marcas-service";
import type { CreateMarcaDto, Marca, SearchMarcaDto, UpdateMarcaDto } from "@/types/marcas.type";
import { ref, computed } from "vue";

export function useMarcas() {
  const marcas = ref<Marca[]>([]);
  const marca = ref<Marca | null>(null);
  const loading = ref(false);
  const errorMarca = ref<string | null>(null);
  const totalItems = ref(0);
  const currentPage = ref(1);
  const itemsPerPage = ref(10);

  const totalPages = computed(() =>
    Math.ceil(totalItems.value / itemsPerPage.value)
  );
  const hasData = computed(() => marcas.value.length > 0);
  const isEmpty = computed(() => !hasData.value && !loading.value);

  const clearError = () => {
    errorMarca.value = null;
  };

  const setLoading = (value: boolean) => {
    loading.value = value;
    if (value) clearError();
  };

  const handleError = (err: any) => {
    const error = ApiErrorHandler.handle(err);
    errorMarca.value = error.message;
  };

  const find = async (id: number) => {
    try {
      setLoading(true);
      const response = await marcasService.findId(id);
      marca.value = response;
    } catch (err) {
      handleError(err);
      marcas.value = [];
    } finally {
      setLoading(false);
    }
  };

  const fetchMarca = async (params?: SearchMarcaDto) => {
    try {
      setLoading(true);
      const response = await marcasService.findAll(params);
      marcas.value = response.data;
      totalItems.value = response.meta.total;
      currentPage.value = response.meta.page;
      itemsPerPage.value = response.meta.limit;
    } catch (err) {
      handleError(err);
      marcas.value = [];
    } finally {
      setLoading(false);
    }
  };

  const createMarca = async (data: CreateMarcaDto) => {
    try {
      setLoading(true);
      const response = await marcasService.create(data);

      if (response.data) {
        marcas.value.unshift(response.data);
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

  const updateMarca = async (id: number, data: UpdateMarcaDto) => {
    try {
      setLoading(true);
      const response = await marcasService.update(id, data);

      const index = marcas.value.findIndex((f) => f.id === id);
      if (index !== -1) {
        const updatedFornecedor = await marcasService.findId(id);
        marcas.value[index] = updatedFornecedor;
      }

      if (marca.value?.id === id) {
        marca.value = await marcasService.findId(id);
      }

      return response;
    } catch (err) {
      handleError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const removerMarca = async (id: number) => {
    try {
      setLoading(true);
      const response = await marcasService.delete(id);
      const index = marcas.value.findIndex((f) => f.id === id);
      if (index !== -1) {
        delete marcas.value[index];
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
    marca.value = null;
    totalItems.value = 0;
    currentPage.value = 1;
    clearError();
  };

  return {
    marcas,
    marca,
    loading,
    errorMarca,
    totalItems,
    currentPage,
    itemsPerPage,
    totalPages,
    hasData,
    isEmpty,
    find,
    fetchMarca,
    createMarca,
    updateMarca,
    removerMarca,
    clearData,
    clearError,
  };
}
