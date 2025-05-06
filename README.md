# Projeto React com Vite + TypeScript + SWC

Este é um projeto inicial em React utilizando o Vite como bundler, com suporte a TypeScript e SWC para uma build rápida e moderna. O projeto também utiliza `react-router-dom` para rotas e `dayjs` para manipulação de datas.

## 🧭 Etapa Atual

 Implementação de uma API fetch utilizando async e await.

## Permission Issues

'npm : {nome do arquivo} não pode ser carregado porque a execução de scripts foi desabilitada neste sistema. Para obter mais informações, consulte about_Execution_Policies   
em https://go.microsoft.com/fwlink/?LinkID=135170.'

### Solução

Executar o comando 'Set-ExecutionPolicy -Scope CurrentUser RemoteSigned' como administrador no PowerShell.

A política de execução RemoteSigned permite a execução de scripts locais sem necessariamente precisar de uma assinatura digital, mas exige assinatura digital para scripts que são baixados da internet.