import { createBrowserRouter } from "react-router-dom";
import CarrinhoPage from "../pages/CarrinhoPage";
import ContatosPage from "../pages/ContatosPage";
import ErrorPage from "../pages/ErrorPage";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import ProdutoPage from "../pages/ProdutoPage";
import ProdutosComPaginacaoPage from "../pages/ProdutosComPaginacaoPage";
import Layout from "./Layout";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        errorElement: <ErrorPage />,
        children: [
            {path: "", element: <HomePage />},
            {path: "produtos", element: <ProdutosComPaginacaoPage />},
            {path: "carrinho", element: <CarrinhoPage />},
            {path: "contatos", element: <ContatosPage />},
            {path: "login", element: <LoginPage />},
            {path: "produtos/:id", element: <ProdutoPage />}
        ]
    }
])
export default router;