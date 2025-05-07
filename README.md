# Projeto React com Vite + TypeScript + SWC

Este é um projeto inicial em React utilizando o Vite como bundler, com suporte a TypeScript e SWC para uma build rápida e moderna. O projeto também utiliza `react-router-dom` para rotas.

## 🚀 Início Rápido

Siga os passos abaixo para criar o projeto:

```bash
# 1. Criar o projeto com Vite
npm create vite@latest

# Escolher as opções:
# - Framework: React
# - Variant: TypeScript + SWC
# - Nome do projeto: (escolha o nome do seu projeto)

# 2. Acessar o diretório do projeto
cd nome-do-projeto

# 3. Instalar as dependências
npm install

# 4. Rodar o projeto em ambiente de desenvolvimento
npm run dev
```

## 📦 Dependências Adicionais

- **`react-router-dom`**  
  Biblioteca de roteamento para aplicações React. Permite a navegação entre páginas e o gerenciamento de rotas no front-end de forma declarativa.

- **`dayjs`**  
  Biblioteca para manipulação e formatação de datas em JavaScript. Leve, rápida e uma alternativa moderna ao Moment.js.

- **`@tanstack/react-query`**  
  Gerenciador de estado assíncrono e cache para React. Facilita o consumo e sincronização de dados de APIs com uma abordagem baseada em hooks.

```bash
npm install react-router-dom
npm install dayjs
npm install @tanstack/react-query
```

## 🧱 Estrutura do Projeto

- **Vite** como ferramenta de build  
- **React** para a construção da interface  
- **TypeScript** para tipagem estática  
- **SWC** como compilador rápido de JS/TS  
- **React Router DOM** para navegação  

## 🧭 Etapa Atual

Implementação da **Navbar** para navegação entre as páginas da aplicação.

## 🧩 Dica de Snippet

Utilize `rafce` (disponível em extensões como ES7+ React/Redux Snippets no VS Code) para gerar rapidamente um componente funcional com exportação:

```tsx
// Exemplo:
const MeuComponente = () => {
  return <div>Olá, mundo!</div>;
};

export default MeuComponente;
```
