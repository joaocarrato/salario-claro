import { getApiErrorMessage } from "@/src/api/apiErrors";
import { AxiosError } from "axios";

describe("getApiErrorMessage", () => {
  it("formats network errors", () => {
    const error = new AxiosError("Network Error");

    expect(getApiErrorMessage(error, "calcular o salário")).toBe(
      "Erro de rede. Verifique se a API está rodando e se a base URL está correta.",
    );
  });

  it("formats timeout errors", () => {
    const error = new AxiosError("timeout", "ECONNABORTED");

    expect(getApiErrorMessage(error, "calcular o salário")).toBe(
      "A API demorou para responder. Tente novamente em alguns instantes.",
    );
  });

  it("uses the first validation message from 422 responses", () => {
    const error = new AxiosError("validation", undefined, undefined, undefined, {
      status: 422,
      statusText: "Unprocessable Entity",
      headers: {},
      config: {} as never,
      data: {
        message: "Dados inválidos.",
        errors: {
          gross_salary: ["Informe um salário válido."],
        },
      },
    });

    expect(getApiErrorMessage(error, "calcular o salário")).toBe(
      "Informe um salário válido.",
    );
  });

  it("formats generic API errors", () => {
    const error = new AxiosError("server", undefined, undefined, undefined, {
      status: 500,
      statusText: "Internal Server Error",
      headers: {},
      config: {} as never,
      data: {},
    });

    expect(getApiErrorMessage(error, "comparar os salários")).toBe(
      "Não foi possível comparar os salários agora. Tente novamente.",
    );
  });
});
