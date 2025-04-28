import { createBrowserRouter } from "react-router-dom"
import Layout from "./layout"
import HomePage from "../pages/HomePage"
import ProdutosPage from "../pages/ProdutosPage"
import ContatosPage from "../pages/ContatosPage"
import LoginPage from "../pages/LoginPage"

const Router = createBrowserRouter([
    {  
        path: "/",
        element: <Layout />,
        children: [
            {path: "", element: <HomePage/>},
            {path: "produtos", element: <ProdutosPage />},
            {path: "contatos", element: <ContatosPage />},
            {path: "login", element: <LoginPage />}
        ]
    }
])
export default Router;