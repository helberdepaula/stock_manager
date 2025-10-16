import { viaService } from "@/service/viaCep";
import type { ViaCepResponse } from "@/types/viacep-types";
import { computed, ref } from "vue";

export function useViaCEP() {
  const viaCepResponse = ref<ViaCepResponse | null>(null);
  const loading = ref(false);
  const error = ref<string | null>(null);

  const hasData = computed(() => viaCepResponse.value);

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

  const fetchViaCep = async (cep: string) => {
    setLoading(true);
    try {
      const response: ViaCepResponse = await viaService.find(cep);
      viaCepResponse.value = response || null;
    } catch (err) {
      handleError(err);
      viaCepResponse.value = null;
    } finally {
      setLoading(false);
    }
  };

  const clearData = () => {
    viaCepResponse.value = null;
    clearError();
  };

  return {
    viaCepResponse,
    loading,
    error,
    hasData,
    fetchViaCep,
    clearData,
    clearError,
  };
}
