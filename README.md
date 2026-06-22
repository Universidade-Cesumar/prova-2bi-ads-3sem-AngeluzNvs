[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/72Bdl6Wn)
Controle de Almoxarifado

Sistema simples de controle de estoque (almoxarifado), desenvolvido como atividade avaliativa em sprints.

Sobre o projeto

A aplicação permite cadastrar materiais em estoque, consultar a lista de materiais, dar baixa (retirada) na quantidade disponível e excluir materiais cadastrados. Os dados são persistidos em uma API REST simulada (MockAPI).

Tecnologias utilizadas


HTML5
CSS3
JavaScript (Vanilla JS, sem frameworks)
MockAPI — API REST para simular o backend
Jest + jest-environment-jsdom — testes automatizados


Funcionalidades por Sprint

Sprint 1 — Fundação, API e Inventário


Formulário de cadastro de material (nome e quantidade)
Listagem dos materiais cadastrados (GET na API)
Cadastro de novos materiais (POST na API)


Sprint 2 — Regras de Negócio e Saídas


Campo para informar a quantidade a retirar (#input-retirada)
Botão de baixa de estoque por item (.btn-baixar), que atualiza a quantidade via PUT na API
Botão de exclusão de material por item (.btn-excluir), que remove o item via DELETE na API
Função validarRetirada(estoqueAtual, quantidadeRetirada) que bloqueia retiradas inválidas (negativas, zero ou maiores que o estoque atual)