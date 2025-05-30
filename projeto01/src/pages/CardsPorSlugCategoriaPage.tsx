import { useParams } from "react-router-dom";
import useRecuperarProdutosPorSlugCategoria from "../hooks/useRecuperarProdutoPorSlugCategoria"
import Card from "../components/Card";
import { useEffect, useState } from "react";
import Produto from "../interfaces/Produto";

export interface ProdCarrinho {
  idProduto: number;
  quantidade: number;
}

const CardsPorSlugCategoriaPage = () => {
  const [carrinho, setCarrinho] = useState(() => {
    const itensDeCarrinho = localStorage.getItem("carrinho");
    return itensDeCarrinho ? JSON.parse(itensDeCarrinho) : [];
  });

  console.log("carrinho = ", carrinho);

  useEffect(() => {
    localStorage.setItem("carrinho", JSON.stringify(carrinho))
  }, [carrinho])
  
  const adicionarProduto = (produto: Produto) => {
    setCarrinho((prevCarrinho: ProdCarrinho[]) => {
      const existe = prevCarrinho.find((item) => item.idProduto === produto.id);
      if (existe) {
        // Isso não funciona, por conta do useState()
        // useState() não reconhece que houve mudança no vetor se não
        // houver no ponteiro que aponta para o vetor
        // existe.quantidade = existe.quantidade+1;
        // return previousCarrinho;
        const novoCarrinho: ProdCarrinho[] = prevCarrinho
          .map((item: ProdCarrinho) => item.idProduto === produto.id ? 
            {idProduto: item.idProduto, quantidade: item.quantidade + 1} : item);
        return novoCarrinho;    
      }
      else {
        return [...prevCarrinho, {idProduto: produto.id, quantidade: 1}]
      }
    });
  };

  const subtrairProduto = (produto: Produto) => {
    setCarrinho((prevCarrinho: ProdCarrinho[]) => {
      const existe = prevCarrinho.find((item) => item.idProduto === produto.id);
      if (existe) {
        // Isso não funciona, por conta do useState()
        // useState() não reconhece que houve mudança no vetor se não
        // houver no ponteiro que aponta para o vetor
        // existe.quantidade = existe.quantidade+1;
        // return previousCarrinho;
        const novoCarrinho: ProdCarrinho[] = prevCarrinho
          .map((item: ProdCarrinho) => item.idProduto === produto.id ? 
            {idProduto: item.idProduto, quantidade: item.quantidade - 1} : item);
        return novoCarrinho.filter((item) => item.quantidade > 0);    
      }
      else {
        throw new Error("Erro ao subtrair 1 de produto no carrinho.");
      }
    });
  };

  const { slugCategoria } = useParams();
  const {
    data: produtos,
    isPending: carregandoProdutos,
    error: errorProdutos,
  } = useRecuperarProdutosPorSlugCategoria(slugCategoria);

  if (carregandoProdutos) return <h6>Carregando produtos...</h6>;
  if (errorProdutos) throw errorProdutos;

  const produtosNoCarrinho: (ProdCarrinho | null)[] = [];
  produtos.forEach((produto) => {
    const prodCarrinho = carrinho.find(
      (item: ProdCarrinho) => item.idProduto === produto.id
    );
    produtosNoCarrinho.push(prodCarrinho ? prodCarrinho : null);
  });

  console.log("produtos no carrinho = ", produtosNoCarrinho);

  return (
    <>
      <h5>
        {slugCategoria
          ? slugCategoria.charAt(0).toUpperCase() + slugCategoria.slice(1)
          : "Produtos"}
      </h5>
      <div className="row">
        {produtos.map((produto, index) => (
          <div key={produto.id} className="col-lg-2 col-md-3 col-sm-4 col-6">
            <Card
              produto={produto}
              produtoNoCarrinho={produtosNoCarrinho[index]}
              adicionarProduto={adicionarProduto}
              subtrairProduto={subtrairProduto}
            />
          </div>
        ))}
      </div>
    </>
  );
};
export default CardsPorSlugCategoriaPage;