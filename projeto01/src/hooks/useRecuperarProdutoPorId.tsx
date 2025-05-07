import { useQuery } from "@tanstack/react-query"
import Produto from "../interfaces/Produto";

const useRecuperarProdutoPorId = (id: number) => {
  const RecuperarProdutoPorId = async(id: number): Promise<Produto> => {
    const response = await fetch(`http://localhost:8080/produtos/${id}`);
    // fetch retorna uma promisse
    if(!response.ok){
        throw new Error ("Ocorreu um erro ao recuperar o produto " + id + ". Status code = " + response.status)
    };
    return await response.json();
  }
  
  return useQuery({
    queryKey: ["produto", id],
    queryFn: () => RecuperarProdutoPorId(id),
    staleTime: 10_000
  })
}

export default useRecuperarProdutoPorId