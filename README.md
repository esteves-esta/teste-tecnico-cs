# Teste técnico

----
[![Netlify Status](https://api.netlify.com/api/v1/badges/5df22820-871d-40f3-a6ab-c57287d5614c/deploy-status)](https://app.netlify.com/sites/gerenciado-projeto-teste/deploys)
> Link do projeto em prod (netlify) - https://gerenciado-projeto-teste.netlify.app/
----

Utilizando protótipo fornecido pela empresa realizar uma aplicação gerenciadora de projetos as seguintes funcionalidades.

- [x] Exibir uma listagem inicial sem nenhum projeto cadastrado, conforme o design.  
- [x] Exibir o título da página e o total de projetos cadastrados.
- [x] Implementar um filtro para exibir apenas os projetos favoritos.
- [x] Adicionar a opção de ordenação da listagem por:
  - [x] Ordem alfabética (padrão).
  - [x] Projetos iniciados mais recentemente.
  - [x] Projetos próximos à data de finalização.
- [x] Página com o formulário de edição de projeto.
- [x] Página com o formulário de criação de projeto.
- [x] Modal de confirmação de remoção.
- [x] Favoritar: Permitir favoritar/desfavoritar projetos.
- [x] Implementar uma barra de busca onde o usuário pode digitar ao menos 3 caracteres para disparar a busca.
  - [x] (Opcional) Implementar um histórico das últimas 5 buscas recentes.
  - [x] (Opcional) Exibir um highlight no texto dos resultados que correspondam à busca.

## Versões

- [x] Com dados salvos no localhost - branch main
- [ ]  Com dados salvos em api nodejs - branch feat/api *(on progress)*
## Bibliotecas

- Vite
- Vue
- Typescript
- RadixVue
- Pinia
- VueRouter
- LucideVue (icones)
- Internationalized Date
- date-fns

## Rodando projeto localmente
1. Instalar dependências
```sh
npm install
```
2. Rodar projeto
```sh
npm run dev
```

