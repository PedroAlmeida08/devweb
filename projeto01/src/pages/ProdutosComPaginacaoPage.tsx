import { useState } from "react";
import TabelaDeProdutos from "../components/TabelaDeProdutos";
import useRecuperarProdutosComPaginacao from "../hooks/useRecuperarProdutosComPaginacao";
import Produto from "../interfaces/Produto";
import Paginacao from "../components/Paginacao";
import Pesquisa from "../components/Pesquisa";
import useRemoverProdutoPorId from "../hooks/useRemoverProdutoPorId";

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

  const{mutate: removerProduto,
    error: errorRemocaoProduto } = useRemoverProdutoPorId();

  //const {mutate: removerProduto} = useMutation({
  //  mutationFn: (id: number) => removerProdutoPorId(id),
  //  onSuccess: (_, id) => {
  //    queryClient.invalidateQueries({
  //      queryKey: ["produtos"]
  //    })
  //    queryClient.invalidateQueries({
  //      queryKey: ["produtos"]
  //    })
  //  }
  //})

  const tratarRemocao = (id: number) => {
    removerProduto(id);
    setPagina(0);
  }

  if (carregandoProdutos) return <p className="fw-bold">Carregando produtos...</p>
  if (errorProdutos) throw errorProdutos;
  if (errorRemocaoProduto) throw errorRemocaoProduto;
  
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
