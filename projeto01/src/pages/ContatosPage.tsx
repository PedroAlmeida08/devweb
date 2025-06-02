import useProdutoStore from "../store/ProdutoStore"
import CarrinhoPage from "./CarrinhoPage";
import LoginPage from "./LoginPage";

const ContatosPage = () => {
  const pagina = useProdutoStore((s) => s.pagina);
  const setPagina = useProdutoStore((s) => s.setPagina)

  return (
    <>
      <div>
        <h5>ContatosPage = pagina = {pagina}</h5>
        <button onClick={() => {setPagina(6)}}>Mudar página</button>
        <hr />
        <LoginPage />
        <hr />
        <CarrinhoPage />
      </div>
    </>
  )
}
export default ContatosPage