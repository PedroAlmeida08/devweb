import { useQuery } from "@tanstack/react-query";
import Produto from "../interfaces/Produto";

const useRecuperarProdutoPorId = (id: number, removido: boolean) => {
  
  const recuperarProdutoPorId = async (id: number): Promise<Produto> => {
    const response = await fetch("http://localhost:8080/produtos/" + id);
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error(await response.text());
      } else {
        throw new Error(
          "Ocorreu um erro ao recuperar o produto com id = " +
            id +
            ". Status code = " +
            response.status
        );
      }
    }
    return await response.json();
  };

  return useQuery({
    queryKey: ["produto", id],
    queryFn: () => recuperarProdutoPorId(id),
    staleTime: 10_000,
    enabled: !removido
  });
};
export default useRecuperarProdutoPorId;
