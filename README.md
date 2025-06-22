# Desafio Flugo: Sistema de Cadastro de Colaboradores Multi-etapas

Este repositório contém a implementação frontend de um sistema de cadastro e listagem de colaboradores, conforme os requisitos do desafio Flugo. A aplicação foca na criação de um formulário multi-etapas com validação robusta e persistência de dados via Firebase.

## Stack Tecnológica

O projeto é construído com as seguintes tecnologias e bibliotecas-chave:

* **ReactJS (v19.1.0):** Biblioteca JavaScript para construção de user interfaces declarativas e baseadas em componentes.
* **TypeScript (v5.8.3):** Superset do JavaScript que adiciona tipagem estática, aprimorando a manutenibilidade e detecção de erros em tempo de desenvolvimento.
* **Vite (v6.3.5):** Bundler e servidor de desenvolvimento otimizado para a web moderna, garantindo Fast Refresh e builds eficientes.
* **Material UI (MUI v7.1.1):** Biblioteca de componentes React que implementa o Material Design, oferecendo uma vasta gama de componentes estilizados e personalizáveis.
* **React Hook Form (v7.58.0):** Solução performática para gerenciamento de estados de formulário e validações em React, utilizando hooks.
* **React Router DOM (v7.6.2):** Biblioteca para roteamento declarativo no React, facilitando a navegação entre as views da Single Page Application (SPA).
* **Firebase (v11.9.1):** Plataforma de desenvolvimento de aplicações que fornece serviços de backend como um serviço (BaaS), utilizado especificamente o Firestore para persistência de dados.

## Funcionalidades Implementadas

A aplicação oferece as seguintes capacidades:

* **Formulário de Cadastro Multi-etapas:**
    * **Etapa 1 - Informações Básicas (`src/shared/components/formulario/Formulario.tsx`):** Coleta `name`, `email` e `status` do colaborador. Campos `name` e `email` são obrigatórios, com validação de formato para `email`. O `status` é um `Switch` com valor padrão "Ativo".
    * **Etapa 2 - Informações Profissionais (`src/shared/components/formulario/FormularioProfissional.tsx`):** Coleta `department` (seleção via `Select` de uma lista pré-definida) e `avatarUrl` (opcional). O campo `department` é obrigatório.
* **Validação de Campos:** Implementação de validações `required` e `pattern` (para email) utilizando `react-hook-form`, com feedback visual de erros.
* [cite_start]**Persistência de Dados:** Integração com Firebase Firestore para adição de novos colaboradores através da função `addCollaborator` no `src/shared/services/collaboratorService.ts`. 
* **Listagem de Colaboradores (`src/pages/ListarColaboradores.tsx`):** Exibição tabular dos colaboradores cadastrados, com funcionalidade de ordenação por `name`, `email`, `department` e `status`.
* **UI/UX:**
    * [cite_start]**Dashboard Layout (`src/shared/layouts/DashboardLayout.tsx`):** Estrutura principal da aplicação, adaptativa para desktop e mobile, incluindo um menu lateral (`src/shared/components/menu-lateral/MenuLateral.tsx`) e um header com `Avatar`. 
    * [cite_start]**Breadcrumbs (`src/shared/components/breadcrumbs-navegacao/BreadcrumbsNavegacao.tsx`):** Componente de navegação hierárquica. 
    * [cite_start]**Barra de Progresso (`src/shared/components/barra-de-progresso/BarraDeProgresso.tsx`):** Indicador visual do progresso do formulário. 
    * **Indicadores de Passo (`src/shared/components/indicador-de-passo/IndicadorDePassoDesktop.tsx`, `src/shared/components/indicador-de-passo/IndicadorDePassoMobile.tsx`):** Componentes visuais para indicar a etapa atual e concluídas do formulário, com adaptação para diferentes viewports.
    * [cite_start]**Modal de Sucesso (`src/shared/components/modal-validacao/ModalValidacao.tsx`):** Feedback visual ao usuário após o cadastro bem-sucedido. 
    * [cite_start]**Sistema de Notificações (`src/shared/contexts/NotificationContext.tsx`):** Contexto React para exibir notificações (`Snackbar` com `Alert`) de sucesso ou erro em toda a aplicação. 
* **Tratamento de Erros:** Implementação de `ErrorBoundary` (`src/shared/components/error-boundary/ErrorBoundary.tsx`) para capturar e exibir erros de componentes na UI.

## Configuração e Execução Local

Para colocar o projeto em funcionamento em seu ambiente local:

### Pré-requisitos

* Node.js (versão `>=18.0.0` recomendada)
* npm (ou Yarn/pnpm)

### 1. Clone o Repositório

```bash
git clone [https://github.com/renatogarcialopes/desafio_flugo.git](https://github.com/renatogarcialopes/desafio_flugo.git)
cd desafio-flugo
```

### 2. Instale as Dependências

```bash
npm install
# ou yarn install
# ou pnpm install
```


### 3. Configuração do Firebase

1.  Crie um projeto no [Firebase Console](https://console.firebase.google.com/).
2.  Registre um aplicativo web no projeto e obtenha suas credenciais de configuração.
3.  Crie um arquivo `.env.local` na raiz do projeto com as seguintes variáveis de ambiente, substituindo pelos valores obtidos do Firebase:

    ```dotenv
    VITE_FIREBASE_API_KEY=[COLOQUE_SUA_API_KEY]
    VITE_FIREBASE_AUTH_DOMAIN=[COLOQUE_SUA_AUTH_DOMAIN]
    VITE_FIREBASE_PROJECT_ID=[COLOQUE_SUA_PROJECT_ID]
    VITE_FIREBASE_STORAGE_BUCKET=[COLOQUE_SUA_STORAGE_BUCKET]
    VITE_FIREBASE_MESSAGING_SENDER_ID=[COLOQUE_SUA_MESSAGING_SENDER_ID]
    VITE_FIREBASE_APP_ID=[COLOQUE_SUA_APP_ID]
    ```
4.  No Firebase Console, configure o `Firestore Database` e defina as regras de segurança apropriadas para leitura e escrita.

### 4. Inicie o Servidor de Desenvolvimento

```bash
npm run dev
# ou yarn dev
# ou pnpm dev
```

A aplicação estará acessível em `http://localhost:5173`.

### 5. Build para Produção

```bash
npm run build
# ou yarn build
# ou pnpm build
```
Os artefatos de build serão gerados no diretório `dist/`.

### Estrutura do Projeto

```bash
.
├── public/                 # Assets estáticos
├── src/
│   ├── assets/             # Imagens e ícones
│   ├── App.tsx             # Componente raiz da aplicação
│   ├── main.tsx            # Ponto de entrada da aplicação
│   ├── pages/              # Views principais da aplicação
│   │   ├── ListarColaboradores.tsx
│   │   └── RegistrarColaboradores.tsx
│   ├── routes/
│   │   └── index.tsx       # Definição das rotas com React Router DOM
│   ├── shared/             # Módulos compartilhados e reutilizáveis
│   │   ├── components/     # Componentes UI reutilizáveis
│   │   │   ├── barra-de-progresso/
│   │   │   ├── botoes-navegacao-form/
│   │   │   ├── breadcrumbs-navegacao/
│   │   │   ├── error-boundary/
│   │   │   ├── formulario/
│   │   │   ├── indicador-de-passo/
│   │   │   ├── menu-lateral/
│   │   │   ├── modal-validacao/
│   │   │   ├── multi-step-form-container/
│   │   │   ├── section-header/
│   │   │   └── tabela-colaboradores/
│   │   │   └── index.ts
│   │   ├── constants/
│   │   │   └── FuncionarioForm.ts # Constantes relacionadas ao formulário de colaborador
│   │   ├── contexts/
│   │   │   └── NotificationContext.tsx # Provedor para notificações globais
│   │   ├── hooks/
│   │   │   └── useMultiStepForm.ts # Hook customizado para lógica de formulário multi-etapas
│   │   ├── layouts/
│   │   │   └── DashboardLayout.tsx # Layout principal da aplicação
│   │   ├── services/
│   │   │   ├── collaboratorService.ts # Funções para interação com o Firestore
│   │   │   └── firebase.ts # Inicialização e configuração do Firebase
│   │   ├── themes/ # Temas e paletas do Material UI
│   │   │   ├── index.ts
│   │   │   ├── paleta.ts
│   │   │   └── tipografia.ts
│   │   └── types/
│   │       └── funcionario.ts # Definições de tipo para entidades de dados
│   └── vite-env.d.ts       # Declarações de tipo para o ambiente Vite
├── .gitignore              # Arquivos e diretórios a serem ignorados pelo Git
├── index.html              # Arquivo HTML principal
├── package.json            # Metadados do projeto e lista de dependências
├── package-lock.json       # Registro de dependências exatas
├── README.md               # Documentação do projeto
├── tsconfig.json           # Configuração de compilação do TypeScript
├── tsconfig.app.json       # Configuração TS específica para o aplicativo
├── tsconfig.node.json      # Configuração TS específica para o ambiente Node.js
└── vite.config.ts          # Configuração do Vite
```