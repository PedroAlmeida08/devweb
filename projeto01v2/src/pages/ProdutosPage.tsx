import { useEffect, useState } from "react";
import TabelaDeProdutos from "../components/TabelaDeProdutos";
import Produto from "../interfaces/Produto";
import recuperarProdutos from "../util/recuperarProdutos";

const ProdutosPage = () => {
  const [produtos, setProdutos] = useState([] as Produto[]);
  const [erro, setErro] = useState("");

  useEffect(() => {
    fetch("http://localhost:8080/produtos")
      .then((response) => {
        if(!response.ok){
          throw new Error("Ocorreu um erro ao recuperar produtos. Status code = " + response.status);
        }
      // return response.json() as Promise<Produto[]>
      // as Promise<Produto[]> é uma asserção e, diferente de um cast, 
      // dá erro em tempo de execução, mas não em tempo de compilação
      // Faz com que produtos seja um vetor de Produto
      return response.json()
    })
    .then((produtos) => {
      setProdutos(produtos)
    })
    .catch((error) => {
      if (error instanceof Error){
        setErro(error.message);
      } else {
        setErro("Erro desconhecido. Msg = " + error)
      }
    })
  }, [])

  // [] indica uma lista de dependências
  // [] indica que o método useEffect só será utilizado uma vez
  useEffect(() => {
    const getProdutos = async () => {
      setProdutos(await recuperarProdutos());
    }
    getProdutos();
  }, [])

  // == compara apenas valor
  // === compara valor e tipo
  if (produtos.length === 0)
    return <p className="fw-bold">Carregando produtos ...</p>

  if(erro) <p className="fw-bold">{erro}</p>
  
  return (
    <>
      <h5>Lista de Produtos</h5>
      <hr className="mt-1"/>
      <TabelaDeProdutos produtos={produtos} />
    </>
  );
};
export default ProdutosPage;
