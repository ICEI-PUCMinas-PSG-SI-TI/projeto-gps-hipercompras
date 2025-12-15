![ICEI](images/icei-pucminas.png)

# HiperCompras

HiperCompras é uma aplicação web acadêmica que simula o processo de compras no supermercado HiperBarato. O projeto entrega um catálogo de produtos, autenticação de usuários, carrinho de compras e sistema de pontos de fidelidade, com frontend em React e backend em Node.js/Express, utilizando SQLite para persistência. O objetivo é proporcionar uma experiência prática de e-commerce (sem pagamento online), focando em boas práticas de desenvolvimento, integração entre camadas e documentação completa de gerenciamento de projetos.

Escopo realista: funcionalidades de compra e fidelidade foram entregues; integrações de pagamento real e sistema de estacionamento ficaram como escopo futuro (v2.0). Orçamento financeiro: R$ 0,00 — todo o trabalho foi realizado com tempo/esforço dos integrantes.

## Alunos integrantes da equipe

* [Amanda Canizela Guimarães](https://github.com/amandacanizela)
* [Ariel Inácio Jordão Coelho](https://github.com/Ariel-Inacio)
* [Júlia de Mello Teixeira](https://github.com/jujupoipo)
* [Pedro Vitor Martins Caiafa Andrade](https://github.com/Pedro0826)

## Professor responsável

* Pedro Felipe Alves de Oliveira

## Gerenciamento do Projeto

- Metodologia: ágil com sprints semanais e Kanban (GitHub Projects)
- Fases: Iniciação, Planejamento, Execução, Monitoramento, Encerramento
- Entregas principais: Frontend (React), Backend (API REST), Banco (SQLite), Documentação
- Orçamento: R$ 0,00 (projeto acadêmico, esforço/tempo)
- Apresentação em sala: 12/12/2025

Fases do Gerenciamento do Projeto:
1. [Iniciação](docs/01-iniciacao)
2. [Planejamento](docs/02-planejamento)
3. [Execução](docs/03-execucao)
4. [Monitoramento](docs/04-monitoramento)
5. [Encerramento](docs/05-encerramento)

## Estrutura do Projeto

```
GPS-HiperCompras-master/
├─ README.md
├─ backend/
│  ├─ package.json
│  └─ src/
│     ├─ server.js        # API REST (Express, CORS)
│     └─ database.js      # SQLite schema e conexão
├─ frontend/
│  ├─ package.json
│  ├─ public/
│  │  └─ index.html
│  └─ src/
│     ├─ App.js
│     ├─ index.js
│     ├─ components/
│     │  ├─ Header.js
│     │  └─ ProductCard.js
│     └─ pages/
│        ├─ Home.js
│        ├─ Login.js
│        └─ ProductPage.js
├─ docs/
│  ├─ 01-iniciacao/
│  ├─ 02-planejamento/
│  ├─ 03-execucao/
│  ├─ 04-monitoramento/
│  └─ 05-encerramento/
└─ images/
```

Principais funcionalidades:
- Autenticação (cadastro/login)
- Catálogo e filtro de produtos
- Carrinho de compras
- Sistema de pontos de fidelidade
- Integração frontend-backend via Axios

Limites e próximos passos:
- Pagamento real e estacionamento não implementados (v2.0 proposto)
- Recomendações: documentação de API com Swagger, CI/CD, testes automatizados

## Informações Adicionais

- Ambiente: Visual Studio Code, Git/GitHub, Google Docs, Figma
- Stack: React, Node.js/Express, SQLite, Axios
- Requisitos: site funcional, interface intuitiva, estética consistente
- Aceitação: entregue e apresentado em 12/12/2025
