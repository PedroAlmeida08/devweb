import { useEffect, useState } from "react";
import TabelaDeProdutos from "../components/TabelaDeProdutos";
import Produto from "../interfaces/Produto";

const ProdutosPage = () => {
  const [produtos, setProdutos] = useState([] as Produto[]);
  const [erro, setErro] = useState("");

  console.log("1, 8");

  useEffect(() => {
    console.log("3");

    const getProdutos = async () => {
      console.log("5");

      try {
        const response = await fetch("http://localhost:8080/produtos");
        console.log("7");

        if (!response.ok) {
          // throw "deu erro!";
          throw new Error(
            "Ocorreu um erro ao recuperar produtos. Status code = " +
              response.status
          );
        }
        setProdutos((await response.json()) as Produto[]);
      } catch (error) {
        if (error instanceof Error) {
          setErro(error.message);
        } else {
          setErro("Erro desconhecido. Msg = " + error);
        }
      }
    };
    console.log("4");

    getProdutos();
    console.log("6");

  // [] indica uma lista de dependências
  // [] indica que o método useEffect só será utilizado uma vez
  }, []);

  console.log("2, 9");
  
  if (erro) return <p className="fw-bold">{erro}</p>;
  if (produtos.length === 0) return <p className="fw-bold">Carregando produtos...</p>;

  console.log("10");

  return (
    <>
      <h5>Lista de Produtos</h5>
      <hr className="mt-1" />

      <TabelaDeProdutos produtos={produtos} />
    </>
  );
};
export default ProdutosPage;
