Decisões de Arquitetura: 
Usei uma arquitetura de Camada de Dados Separada (o arquivo tarefasConexao.js), que isola o banco do resto da aplicação. Se amanhã o banco mudar, só mexemos em um lugar.

Confiabilidade/Qualidade:
Tratamento de Erros: Usei blocos try/catch e retornos HTTP semânticos (400 para erro do usuário, 500 para erro do servidor).
CORS: Implementado para garantir que a API seja acessível apenas por origens autorizadas.

Múltiplos Usuários: 
Se precisasse de login, eu adicionaria uma tabela usuarios, usaria o JWT (JSON Web Token) para autenticação e cada tarefa teria uma coluna usuario_id para garantir que um usuário não veja a tarefa do outro.
