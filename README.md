# Controle de Almoxarifado

🔗 **Deploy:** [https://universidade-cesumar.github.io/prova-2bi-ads-3sem-AngeluzNvs/](https://universidade-cesumar.github.io/prova-2bi-ads-3sem-AngeluzNvs/)

Sistema simples de controle de estoque (almoxarifado), desenvolvido como atividade avaliativa em sprints.

## Sobre o projeto

A aplicação permite cadastrar materiais em estoque, consultar a lista de materiais, dar baixa (retirada) na quantidade disponível e excluir materiais cadastrados. Os dados são persistidos em uma API REST simulada (MockAPI).

## Tecnologias utilizadas

- HTML5
- CSS3
- JavaScript (Vanilla JS, sem frameworks)
- MockAPI — API REST para simular o backend
- Jest + jest-environment-jsdom — testes automatizados

## Funcionalidades por Sprint

### Sprint 1 — Fundação, API e Inventário
- Formulário de cadastro de material (nome e quantidade)
- Listagem dos materiais cadastrados (GET na API)
- Cadastro de novos materiais (POST na API)

### Sprint 2 — Regras de Negócio e Saídas
- Campo para informar a quantidade a retirar (`#input-retirada`)
- Botão de baixa de estoque por item (`.btn-baixar`), que atualiza a quantidade via PUT na API
- Botão de exclusão de material por item (`.btn-excluir`), que remove o item via DELETE na API
- Função `validarRetirada(estoqueAtual, quantidadeRetirada)` que bloqueia retiradas inválidas

### Sprint 3 — Dashboard e Publicação
- Barra de pesquisa (`#input-busca`) para filtrar materiais por nome em tempo real
- Dashboard com total de itens cadastrados (`#total-itens`)
- Destaque visual (`.estoque-critico`) para itens com menos de 10 unidades em estoque
- Tratamento de erros com `try/catch` em todas as requisições fetch
- Deploy publicado via GitHub Pages