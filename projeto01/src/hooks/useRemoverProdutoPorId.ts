import { useMutation } from '@tanstack/react-query'
import queryClient from '../main'

const removerProdutoPorId = async (id: number) => {
    const response = await fetch("http://localhost:8080/produtos/" + id, {
      method: "DELETE"
    })
    if(!response.ok){
      throw new Error("Ocorreu um erro ao remover o produto com id = " + id + ". Status code = " + response.status)
    }
    // Não retornar nada porque o backend retorna void
    //return await response.json();
  }

const useRemoverProdutoPorId = () => {
    return useMutation({
        mutationFn: (id: number) => removerProdutoPorId(id),
        onSuccess: (_, id) => {
          queryClient.invalidateQueries({
            queryKey: ["produtos"]
          })
          queryClient.invalidateQueries({
            queryKey: ["produtos", id]
          })
        }
      })
};

export default useRemoverProdutoPorId