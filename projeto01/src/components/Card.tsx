import Produto from "../interfaces/Produto"

const Card = ({produto}: {produto:Produto}) => {
  return (
    <div className="card h-100 border-0">
      <img src={produto.imagem} className="card-img-top" alt={produto.nome} />
      <div className="card-body">
        <h5 className="card-title">{produto.nome}</h5>
        <p className="card-text">{produto.descricao}</p>
        <p className="card-text" style={{color:"rgb(220, 60, 60)"}}>
          R$ {" "}
          {produto.preco.toLocaleString(
          "pt-BR",{
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
            useGrouping: true
          }
        )}</p>
      </div>
      <div className="card-footer p-0 mb-4">
        <button type="button" className="btn-small btn-success w-100">Comprar</button>
      </div>
    </div>
  )
}

export default Card