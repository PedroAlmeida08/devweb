import { useState } from "react";
import TabelaDeProdutos from "../components/TabelaDeProdutos";
import useRecuperarProdutosComPaginacao from "../hooks/useRecuperarProdutosComPaginacao";
import Produto from "../interfaces/Produto";
import Paginacao from "../components/Paginacao";
import Pesquisa from "../components/Pesquisa";
import { useMutation } from "@tanstack/react-query";
import queryClient from "../main";

const ProdutosComPaginacaoPage = () => {
  const [pagina, setPagina] = useState(0);
  const [nome, setNome] = useState("")
  const tamanho: number = 5;
  
  const {data: resultadoPaginado,
         isPending: carregandoProdutos,
         error: errorProdutos} = useRecuperarProdutosComPaginacao({pagina: pagina.toString(), 
                                                                   tamanho: tamanho.toString(),
                                                                   nome: nome});
 
  const tratarPaginacao = (pagina: number) => {
    setPagina(pagina);
  }

  const tratarNome = (nome: string) => {
    setNome(nome);
    setPagina(0);
  }

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

  const {mutate: removerProduto} = useMutation({
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

  const tratarRemocao = (id: number) => {
    removerProduto(id);
    setPagina(0);
  }

  if (carregandoProdutos) return <p className="fw-bold">Carregando produtos...</p>
  if (errorProdutos) throw errorProdutos;
  
  const produtos: Produto[] = resultadoPaginado.itens;
  const totalDePaginas: number = resultadoPaginado.totalDePaginas;

  return (
    <>
      <h5>Lista de Produtos</h5>
      <hr className="mt-1"/>
      
      <Pesquisa tratarNome={tratarNome} />
      <TabelaDeProdutos produtos={produtos} tratarRemocao={tratarRemocao} />
      <Paginacao pagina={pagina} totalDePaginas={totalDePaginas} tratarPaginacao={tratarPaginacao} />
    </>
  );
};
export default ProdutosComPaginacaoPage;
