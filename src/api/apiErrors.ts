import axios from "axios";

type ApiValidationError = {
  message?: string;
  errors?: Record<string, string[]>;
};

export function getApiErrorMessage(error: unknown, action = "concluir") {
  if (!axios.isAxiosError(error)) {
    return `Erro inesperado ao ${action}.`;
  }

  if (error.code === "ECONNABORTED") {
    return "A API demorou para responder. Tente novamente em alguns instantes.";
  }

  if (!error.response) {
    return "Erro de rede. Verifique se a API está rodando e se a base URL está correta.";
  }

  if (error.response.status === 422) {
    const data = error.response.data as ApiValidationError | undefined;
    const firstFieldError = data?.errors
      ? Object.values(data.errors).flat()[0]
      : undefined;

    return firstFieldError || data?.message || "Dados inválidos enviados.";
  }

  return `Não foi possível ${action} agora. Tente novamente.`;
}
