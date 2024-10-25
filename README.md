# FaithConnect

## Descrição
FaithConnect é uma plataforma de gestão e informação para líderes e responsáveis de igrejas.

## Objetivo
Fornecer uma ferramenta eficaz para gerenciar cadastros de membros, visualizar relatórios e painéis, e facilitar a conexão entre líderes e membros.

## Funcionalidades
- Cadastro de membros da igreja
- Relatórios, painéis e gráficos de dados
- Alertas de aniversários e eventos importantes
- Visualização de famílias e relacionamentos entre membros
- Gerenciamento de cadastros
- Filtros e buscas avançadas
- Geração de relatórios personalizados
- Integração com calendário
- Envio de notificações e lembretes

## Público-alvo
Líderes e responsáveis de igrejas.

## Tecnologias utilizadas
- Node.js
- Express.js
- MongoDB
- Mongoose

## Instalação
1. Clonar repositório: git clone (link unavailable)
2. Instalar dependências: npm install
3. Configurar variáveis de ambiente: criar arquivo .env com configurações
4. Iniciar servidor: node server.js

## Uso
1. Acessar API: http://localhost:3000/

## Estrutura de arquivos e pastas
/faithconnect
    ├── /backend
    │   ├── /middleware
    │   │   └── auth.js
    │   ├── /models
    │   │   └── Church.js
    │   │   └── Membro.js
    │   │   └── User.js
    │   ├── /routes
    │   │   └── membros.js
    │   │   └── users.js
    │   └── server.js
    ├── /frontend