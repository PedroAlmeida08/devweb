import { useEffect, useState } from "react";
import TabelaDeProdutos from "../components/TabelaDeProdutos";
import Produto from "../interfaces/Produto";
import recuperarProdutos from "../util/recuperarProdutos";

const ProdutosPage = () => {
  const [produtos, setProdutos] = useState([] as Produto[]);

  // [] indica uma lista de dependências
  // [] indica que o método useEffect só será utilizado uma vez
  useEffect(() => {
    const getProdutos = async () => {
      setProdutos(await recuperarProdutos());
    }
    getProdutos();
  }, [])

  return (
    <>
      <h5>Lista de Produtos</h5>
      <hr />

      <TabelaDeProdutos produtos={produtos} />
    </>
  );
};
export default ProdutosPage;
