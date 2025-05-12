import { useState } from "react";
import TabelaDeProdutos from "../components/TabelaDeProdutos";
import useRecuperarProdutosComPaginacao from "../hooks/useRecuperarProdutosComPaginacao";
import Produto from "../interfaces/Produto";

const ProdutosComPaginacaoPage = () => {
  const [pagina, setPagina] = useState(0);
  const tamanho: number = 5;
  
  const {data: resultadoPaginado,
         isPending: carregandoProdutos,
         error: errorProdutos} = useRecuperarProdutosComPaginacao(pagina, tamanho);
 
  if (carregandoProdutos) return <p className="fw-bold">Carregando produtos...</p>
  if (errorProdutos) throw errorProdutos;
  
    const produtos: Produto[] = resultadoPaginado.itens;
    const totalDePaginas: number = resultadoPaginado.totalDePaginas;

  return (
    <>
      <h5>Lista de Produtos</h5>
      <hr className="mt-1"/>
      
      <TabelaDeProdutos produtos={produtos} />
      <button onClick={() => setPagina(pagina-1)} disabled={pagina === 0} className="btn btn-primary btn-sm me-3">Anterior</button>
      <button onClick={() => setPagina(pagina+1)} disabled={pagina === totalDePaginas - 1} className="btn btn-primary btn-sm">Próxima</button>
    </>
  );
};
export default ProdutosComPaginacaoPage;
