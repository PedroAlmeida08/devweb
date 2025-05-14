import { keepPreviousData, queryOptions, useQuery } from "@tanstack/react-query";
import ResultadoPaginado from "../interfaces/ResultadoPaginado";
import Produto from "../interfaces/Produto";

interface QueryString{
  pagina: string,
  tamanho: string,
  nome: string
}

const useRecuperarProdutosComPaginacao = async (queryString: QueryString): Promise<ResultadoPaginado<Produto>> => {
  // await new Promise<void>((resolve) => {
  //  setTimeout(()=> {
  //   resolve();
  //  }, 2000)
  //})
  await new Promise<void>((resolve) => {
    setTimeout(resolve, 2000)
  })
  const RecuperarProdutosComPaginacao = async (queryString: QueryString) => {
    const response = await fetch("http://localhost:8080/produtos/paginacao?" + new URLSearchParams((...queryString)));
    if (!response.ok) {
      // throw "deu erro!";
      throw new Error(
        "Ocorreu um erro ao recuperar produtos. Status code = " +
          response.status
      );
    }
    return (await response.json());
  };

  return useQuery({
    queryKey: ["produtos", "paginacao", queryString],
    queryFn: () => RecuperarProdutosComPaginacao(QueryString),
    staleTime: 10_000,
    placeholderData: keepPreviousData
  });
};
export default useRecuperarProdutosComPaginacao;
