import useProdutoStore from "../store/ProdutoStore"

const CarrinhoPage = () => {
  const nome = useProdutoStore((s) => s.nome);
  const tamanho = useProdutoStore((s) => s.tamanho);
  const setNome = useProdutoStore((s) => s.setNome);
  
  return (
    <>
      <h5>CarrinhoPage - nome = {nome} e tamanho = {tamanho}</h5>
      <button onClick={() => {setNome("xyz")}}>Mudar nome</button>
    </>
  )
}
export default CarrinhoPage