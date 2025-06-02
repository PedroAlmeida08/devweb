import { Navigate } from "react-router-dom";
import useUsuarioStore from "../store/UsuarioStore";
import Layout from "./Layout";

const PrivateRoutes = () => {
  const usuarioLogado = useUsuarioStore((s) => s.usuarioLogado);

  if (usuarioLogado) {
    return <Layout />;
  } else {
    return <Navigate to="/login"></Navigate>;
  }
};
export default PrivateRoutes;
