import { useParams } from 'react-router-dom'
import Card from '../components/Card';
import useRecuperarProdutoPorSlugCategoria from '../hooks/useRecuperarProdutoPorSlugCategoria';

const CardsPorSlugCategoriaPage = () => {
  
    const {slugCategoria} = useParams();
    const {data: produtos,
          isPending: carregandoProdutos,
          error: errorProdutos} = useRecuperarProdutoPorSlugCategoria(slugCategoria);
      

     if(carregandoProdutos) return <h6>Carregando Produto</h6>
     if(errorProdutos) throw errorProdutos;

    return (
    <>
    <h5>{slugCategoria ? slugCategoria.charAt(0).toUpperCase() + slugCategoria.slice(1) : "Produtos"}</h5>
    <div className="row">
        {produtos.map((produto) => (
            <div className="col-lg-2 col-md-3 sm-4 col-6">
                <Card produto={produto}/>
            </div>
        ))}
    </div>
    </>
  )
}

export default CardsPorSlugCategoriaPage
