
# Gerenciador de tarefas

Este projeto é um sistema de Gerenciamento de Tarefas que permite aos usuários organizar e acompanhar suas atividades de forma eficiente. A aplicação oferece funcionalidades como criação, exclusão de tarefas, além de categorização e atribuição de status, facilitando o fluxo de trabalho e a produtividade.

## Funcionalidades principais:

 - Criação de Tarefas: Adicione novas tarefas com títulos, descrições e datas de criação.
 - Criação de Usuários: A aplicação oferece uma página dedicada para registro de novos usuários e uma página de login para autenticação.
 - Adição de Múltiplas Categorias: Permite adicionar uma ou mais categorias a uma tarefa, possibilitando uma organização mais flexível e personalizada das tarefas.
 - Filtro por Categoria: Filtre tarefas por diferentes categorias para uma visão mais organizada.
 - Atribuição de Responsáveis: As tarefas são separadas por usuários, garantindo que cada usuário visualize apenas as tarefas que lhe pertencem.
 - Controle de Status: Atualize o status das tarefas de forma intuitiva, arrastando e soltando-as entre as colunas (To Do, In Progress, Done).
 - Ocultar Tarefas Concluídas Antigas: Para uma melhor visualização, tarefas concluídas há muito tempo são ocultadas por padrão (60 segundos).

# Instalação

### Inicialização com Docker
  Para executar a aplicação utilizando Docker, navegue até a raiz do projeto onde o arquivo docker-compose.yml está localizado e execute o seguinte comando (esse comando vai fazer o build das Images do frontend e backend):
```bash
  docker-compose up -d --build 
```

### Instale frontend e backend com npm
  Para instalar o projeto frontend e backend.

```bash
  // Frontend
  cd ./frontend/
  npm install
  // Inicie a aplicação
  npm run dev
```
```bash
  cd ./backend/
  npm install
  // Inicie a aplicação
  npm run dev
```