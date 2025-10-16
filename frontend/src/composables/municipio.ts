import { municipioService } from "@/service/municipio-service";
import { viaService } from "@/service/viaCep";
import type { Municipio } from "@/types/municipio-types";
import { computed, ref } from "vue";

export function useMunicipios() {
  const municipioResponse = ref<Municipio[] | []>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  const hasData = computed(() => municipioResponse.value);

  const clearError = () => {
    error.value = null;
  };

  const setLoading = (value: boolean) => {
    loading.value = value;
    if (value) clearError();
  };

  const handleError = (err: any) => {
    console.error("Erro no municipio service:", err);
    error.value =
      err.response?.data?.message || err.message || "Erro desconhecido";
  };

  const fetchMunicipio = async (estado_id: number) => {
    setLoading(true);
    try {
      const response: Municipio[] = await municipioService.get(estado_id);
      municipioResponse.value = response || [];
      return response;
    } catch (err) {
      handleError(err);
      municipioResponse.value = [];
    } finally {
      setLoading(false);
    }
  };

  const clearData = () => {
    municipioResponse.value = [];
    clearError();
  };

  return {
    municipioResponse,
    loading,
    error,
    hasData,
    fetchMunicipio,
    clearData,
    clearError,
  };
}
