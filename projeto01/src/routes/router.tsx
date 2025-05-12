import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout";
import HomePage from "../pages/HomePage";
import ContatosPage from "../pages/ContatosPage";
import CarrinhoPage from "../pages/CarrinhoPage";
import LoginPage from "../pages/LoginPage";
import ErrorPage from "../pages/ErrorPage";
import ProdutoPage from "../pages/ProdutoPage";
import ProdutosComPaginacaoPage from "../pages/ProdutosComPaginacaoPage";

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