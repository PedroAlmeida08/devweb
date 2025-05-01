import TabelaDeProdutos from "../components/TabelaDeProdutos";
import Produto from "../interfaces/Produto";
import recuperarProdutos from "../util/recuperarProdutos";

const ProdutosPage = () => {
  const produtos: Produto[] = recuperarProdutos();

  return (
    <>
      <h5>Lista de Produtos</h5>
      <hr />

      <TabelaDeProdutos produtos={produtos} />
    </>
  );
};
export default ProdutosPage;
