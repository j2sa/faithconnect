# FaithConnect

## Descrição
FaithConnect é uma plataforma de gestão e informação para líderes e responsáveis de igrejas.

## Objetivo
Fornecer uma ferramenta eficaz para gerenciar cadastros de membros, visualizar relatórios e painéis, e facilitar a conexão entre líderes e membros.

## Funcionalidades
- Cadastro de membros da igreja
- Relatórios, painéis e gráficos de dados
- Alertas de aniversários e eventos importantes - AINDA NÃO IMPLEMENTADO
- Visualização de famílias e relacionamentos entre membros - AINDA NÃO IMPLEMENTADO
- Gerenciamento de cadastros
- Filtros e buscas avançadas - AINDA NÃO IMPLEMENTADO
- Geração de relatórios personalizados - AINDA NÃO IMPLEMENTADO
- Integração com calendário - AINDA NÃO IMPLEMENTADO
- Envio de notificações e lembretes - AINDA NÃO IMPLEMENTADO

## Público-alvo
Líderes e responsáveis de igrejas.

## Tecnologias utilizadas
- Node.js
- Express.js
- MongoDB
- Mongoose

## Instalação
1. Clonar repositório: git clone https://github.com/j2sa/faithconnect/
2. Instalar dependências do backend: npm install express mongoose dotenv body-parser bcrypt jsonwebtoken cors
3. Configurar variáveis de ambiente: criar arquivo .env na pasta root

## Uso
1. Acessar API: http://localhost:5000/

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