# Sistema de Cardápio Familiar com IA

Este sistema foi desenvolvido para ajudar famílias a planejar refeições semanais, gerenciar estoque de ingredientes e gerar listas de compras de forma inteligente. O projeto é composto por um backend em Python e um frontend em React.

## Estrutura do Projeto

### Frontend (React)

#### Componentes React

1. **app-principal.js**
   - Componente principal que integra todos os módulos
   - Implementa a navegação entre as diferentes funcionalidades
   - Fornece a interface responsiva para diferentes dispositivos
   - Gerencia o estado global da aplicação

2. **gerenciador-ingredientes.js**
   - Interface para adicionar, editar e excluir ingredientes
   - Permite filtrar ingredientes por categoria e pesquisar por nome
   - Realiza validação de campos obrigatórios
   - Integra-se com a API para persistência de dados

3. **gerenciador-receitas.js**
   - Interface para criar e gerenciar receitas
   - Permite adicionar ingredientes às receitas com quantidades
   - Fornece visualização detalhada de receitas existentes
   - Implementa filtragem por categoria e busca por nome

4. **gerenciador-estoque.js**
   - Controle do estoque de ingredientes disponíveis
   - Interface para atualização rápida de quantidades
   - Visualização categorizada dos ingredientes em estoque
   - Indicação visual de itens em falta ou com baixa quantidade

5. **gerador-cardapio.js**
   - Interface para geração automática de cardápios semanais
   - Configuração de preferências alimentares e restrições
   - Visualização do cardápio gerado por dia e refeição
   - Geração e exportação da lista de compras correspondente

### Backend (Python)

1. **sistema_cardapio.py**
   - Implementa a classe `SistemaCardapio` com toda a lógica do sistema
   - Gerencia o cadastro de ingredientes, receitas, estoque e preferências
   - Contém algoritmos para gerar cardápios balanceados e listas de compras
   - Fornece funções para carregar e salvar dados

2. **api-cardapio.py**
   - Implementa uma API RESTful usando Flask
   - Disponibiliza endpoints para todas as funcionalidades do sistema
   - Realiza validação de dados e tratamento de erros
   - Gerencia a persistência em arquivos JSON

## Funcionalidades Principais

- Cadastro e gerenciamento de ingredientes com categorias
- Criação e edição de receitas com ingredientes e porções
- Controle de estoque de ingredientes disponíveis
- Geração automática de cardápio semanal balanceado
- Criação automática de lista de compras com base no cardápio
- Configuração de preferências alimentares e restrições
- Interface responsiva para uso em diversos dispositivos

## Como executar o projeto

### Backend

1. Certifique-se de ter Python 3.7+ instalado
2. Instale as dependências:
```bash
pip install flask flask-cors
```
3. Execute a API:
```bash
python api-cardapio.py
```

### Frontend

1. Certifique-se de ter Node.js 14+ instalado
2. Instale as dependências:
```bash
npm install
```
3. Execute o servidor de desenvolvimento:
```bash
npm start
```

## Próximos passos e melhorias

- Implementação de autenticação de usuários
- Histórico de cardápios e listas de compras
- Integração com aplicativos de compras online
- Sugestões inteligentes com base em preferências e histórico
- Funcionalidades avançadas para planejamento de dietas específicas
- Aplicativo móvel para acesso fácil durante as compras

## Licença

Este projeto está licenciado sob a licença MIT - veja o arquivo LICENSE para mais detalhes.
