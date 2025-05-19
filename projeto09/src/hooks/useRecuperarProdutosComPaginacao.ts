import { keepPreviousData, useQuery } from "@tanstack/react-query";
import Produto from "../interfaces/Produto";
import ResultadoPaginado from "../interfaces/ResultadoPaginado";

interface QueryString {
  pagina: string;
  tamanho: string;
  nome: string;
}

const useRecuperarProdutosComPaginacao = (queryString: QueryString) => {

  // const umRecord: Record<string, string> = {pagina: "0", tamanho: "5"};
  // const pessoa = {nome: "Matim", endereco: "Rua X n. 10"};
  // const empregado = {...pessoa, salario: 7000, cargo: "programador"}; // spread
  // console.log(empregado.nome)

  const recuperarProdutosComPaginacao = async (queryString: QueryString): Promise<ResultadoPaginado<Produto>> => {
    const response = await fetch("http://localhost:8080/produtos/paginacao?" + new URLSearchParams({...queryString}));
    if (!response.ok) {
      // throw "deu erro!";
      throw new Error(
        "Ocorreu um erro ao recuperar produtos. Status code = " +
          response.status
      );
    }
    return await response.json();
  };

  return useQuery({
    queryKey: ["produtos", "paginacao", queryString],
    queryFn: () => recuperarProdutosComPaginacao(queryString),
    staleTime: 10_000,
    placeholderData: keepPreviousData
  });
};
export default useRecuperarProdutosComPaginacao;
