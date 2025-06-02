import useProdutoStore from "../store/ProdutoStore"

const LoginPage = () => {
  const tamanho = useProdutoStore((s) => s.tamanho);
  const setTamanho = useProdutoStore((s) => s.setTamanho);
  
  return (
    <>
      <h5>Login Page - Tamanho = {tamanho}</h5>
      <button onClick={() => {setTamanho(8)}}>Mudar tamanho</button>
    </>
  )
}
export default LoginPage