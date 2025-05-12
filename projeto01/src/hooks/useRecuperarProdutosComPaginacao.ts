import { keepPreviousData, useQuery } from "@tanstack/react-query";
import ResultadoPaginado from "../interfaces/ResultadoPaginado";
import Produto from "../interfaces/Produto";

const useRecuperarProdutosComPaginacao = async (pagina: number, tamanho: number): Promise<ResultadoPaginado<Produto>> => {
  // await new Promise<void>((resolve) => {
  //  setTimeout(()=> {
  //   resolve();
  //  }, 2000)
  //})
  await new Promise<void>((resolve) => {
    setTimeout(resolve, 2000)
  })
  const RecuperarProdutosComPaginacao = async (pagina: number, tamanho: number) => {
    const response = await fetch(`http://localhost:8080/produtos/paginacao?pagina=${pagina}&tamanho=${tamanho}`);
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
    queryKey: ["produtos", "paginacao", pagina, tamanho],
    queryFn: () => RecuperarProdutosComPaginacao(pagina, tamanho),
    staleTime: 10_000,
    placeholderData: keepPreviousData
  });
};
export default useRecuperarProdutosComPaginacao;
