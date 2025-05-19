import dayjs from "dayjs";
import Produto from "../interfaces/Produto";
import { Link } from "react-router-dom";

 interface Props {
     produtos: Produto[];
     tratarRemocao: (id:number) => void;
 }

  const TabelaDeProdutos = ({produtos, tratarRemocao}: Props) => {
//const TabelaDeProdutos = ({ produtos, tratarRemocao }: { produtos: Produto[], tratarRemocao: (id: number) => void }) => {
  return (
    <div className="table-responsive">
      <table className="table table-bordered table-sm table-hover table-striped">
        <thead>
          <tr>
            <th className="text-center align-middle">Id</th>
            <th className="text-center align-middle">Imagem</th>
            <th className="text-center align-middle">Categoria</th>
            <th className="text-center align-middle">Nome</th>
            <th className="text-center align-middle">Disponível</th>
            <th className="text-center align-middle">Data de Cadastro</th>
            <th className="text-center align-middle">Preço</th>
            <th className="text-center align-middle">Ação</th>
          </tr>
        </thead>
        <tbody>
          {produtos.map((produto) => (
            <tr key={produto.id}>
              <td width="8%" className="text-center align-middle">{produto.id}</td>
              <td width="13%" className="text-center align-middle">
                <img
                  src={produto.imagem}
                  alt="imagem de produto"
                  style={{ width: "40px" }}
                />
              </td>
              <td width="13%" className="text-center align-middle">
                {produto.categoria.nome}
              </td>
              <td width="17%" className="align-middle ps-3">
                <Link style={{textDecoration: "none"}} to={"/produtos/" + produto.id}>{produto.nome}</Link>
              </td>
              <td width="13%" className="text-center align-middle">
                {produto.disponivel ? "Sim" : "Não"}
              </td>
              <td width="13%" className="text-center align-middle">
                {dayjs(produto.dataCadastro).format("DD/MM/YYYY")}
              </td>
              <td width="10%" className="text-end align-middle pe-3">
                {produto.preco.toLocaleString("pt-BR", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                  useGrouping: true,
                })}
              </td>
              <td width="13%" className="text-center align-middle">
                <button onClick = {()=> tratarRemocao(produto.id)} className="btn btn-danger btn-sm" type="button">
                  Remover
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default TabelaDeProdutos;
