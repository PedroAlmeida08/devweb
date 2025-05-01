# Projeto React com Vite + TypeScript + SWC

Este é um projeto inicial em React utilizando o Vite como bundler, com suporte a TypeScript e SWC para uma build rápida e moderna. O projeto também utiliza `react-router-dom` para rotas e `dayjs` para manipulação de datas.

## 🧭 Etapa Atual

Implementação da **página de produtos**, que serão exibidos dinamicamente ao usuário.

## 📁 Versão: projeto01v2

Esta segunda versão utiliza os hooks `useEffect` e `useState` para controlar o fluxo de dados e o estado da aplicação:

- `useEffect(() => { ... }, [])`: executa a função apenas uma vez após a montagem do componente.
- `useState`: controla o estado da lista de produtos.
- Quando a função `recuperarProdutos()` retorna uma *Promise*, ela é resolvida com `await`, e então `setProdutos(...)` atualiza o estado.
- A atualização de estado provoca uma nova renderização, agora exibindo os produtos recuperados ao usuário final.