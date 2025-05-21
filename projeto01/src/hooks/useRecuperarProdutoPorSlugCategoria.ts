import { useQuery } from "@tanstack/react-query";
import Produto from "../interfaces/Produto";

const useRecuperarProdutoPorSlugCategoria = (slugCategoria?: string) => {
  
  const recuperarProdutoPorSlugCategoria = async (slugCategoria?: string): Promise<Produto[]> => {
    const response = await fetch("http://localhost:8080/produtos/" + (slugCategoria ? "/categoria/" + slugCategoria : ""));
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error(await response.text());
      } else {
        throw new Error(
          "Ocorreu um erro ao recuperar os produtos com slugCategoria = " +
            slugCategoria +
            ". Status code = " +
            response.status
        );
      }
    }
    return await response.json();
  };

  return useQuery({
    queryKey: ["produto", slugCategoria],
    queryFn: () => recuperarProdutoPorSlugCategoria(slugCategoria),
    staleTime: 10_000
  });
};
export default useRecuperarProdutoPorSlugCategoria;
