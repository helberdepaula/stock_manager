import { estadosService } from "@/service/estados-service";
import type { Estados } from "@/types/estados-types";
import { computed, ref } from "vue";

export function useEstados() {
  const estadoResponse = ref<Estados[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  const hasData = computed(() => estadoResponse.value.length > 0);

  const clearError = () => {
    error.value = null;
  };

  const setLoading = (value: boolean) => {
    loading.value = value;
    if (value) clearError();
  };

  const handleError = (err: any) => {
    console.error("Erro no fornecedores service:", err);
    error.value =
      err.response?.data?.message || err.message || "Erro desconhecido";
  };

  const fechEstado = async () => {
    setLoading(true);
    try {
      const response: Estados[] = await estadosService.get();
      estadoResponse.value = response || [];
    } catch (err) {
      handleError(err);
      estadoResponse.value = [];
    } finally {
      setLoading(false);
    }
  };

  const clearData = () => {
    estadoResponse.value = [];
    clearError();
  };

  return {
    estadoResponse,
    loading,
    error,
    hasData,
    fechEstado,
    clearData,
    clearError,
  };
}
