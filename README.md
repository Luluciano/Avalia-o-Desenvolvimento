Nome completo: Luciano Honorato Galvão
Telefone de contato: (81) 9 92619830
E-mail: luciano.galvao@unimedcaruaru.com.br


Stack(s) utilizada(s) e justificativa da escolha:
Ambiente de Execução: Node.js
    justificativa: por ser um ambiente muito versatio utilizado para todo tipo problema e para manter a consistência da linguagem em todo o projeto. 

Persistência de Dados: PostgreSQL
    Optei por ele para simular um ambiente de produção real, onde a consistência dos dados e a escalabilidade são prioridades, especialmente considerando as regras de negócio do Kata 1 e a estrutura de pedidos do Kata 4.

Frontend: HTML5, CSS3 e JavaScript Puro (Vanilla JS): 
    Optei por não usar frameworks pesados (como React ou Vue) para manter o projeto leve e demonstrar domínio sobre a manipulação do DOM e requisições assíncronas (Fetch API)

CORS Middleware: 
    Essencial para permitir que o navegador aceite a comunicação entre o frontend (que pode rodar localmente) e o servidor backend.





Instruções para executar cada kata localmente:

Katar-1: instale o visual studio no site official, importe o codigo do github, instale o node.js no no site oficial, instale o postgresSQL, no visual studio aberto va na aba terminal e em abrir um novo terminal istale a biblioteca do postgressql com o comando 'npm install pg' no pgadmin do postgres em databases crie um nov database com o nome filaPacientesBD e execute os seguintes comandos para a criação do banco e preenchimento das tabelas:

CREATE TYPE nivel_urgencia AS ENUM ('BAIXA', 'MÉDIA', 'ALTA', 'CRÍTICA');

CREATE TABLE pacientes (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    idade INTEGER NOT NULL,
    urgencia nivel_urgencia NOT NULL,
    chegada TIME NOT NULL DEFAULT CURRENT_TIME,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO pacientes (nome, idade, urgencia, chegada) VALUES
('Ana Souza', 30, 'CRÍTICA', '09:00'),
('João Silva', 65, 'MÉDIA', '08:00'),
('Enzo Oliveira', 15, 'MÉDIA', '08:05'),
('Bia Santos', 25, 'ALTA', '07:30');

para rodar o katar-1 precisa rodar no terminal dentro da pasta Katar-1 o comando 'node conexaoBD.js'.



Katar-2: instale o visual studio no site official, importe o codigo do github, instale o node.js no no site oficial, instale o postgresSQL, no visual studio aberto va na aba terminal e em abrir um novo terminal istale a biblioteca do postgressql com o comando 'npm install pg' instale o framework express para que funcione as rotas criadas para o banco de dados 'npm install express' instale o framework cors para contruir a conexão do back end com o front end, crie o banco de dados no pgadmin do postgressql gerenciador-tarefas 'create database gerenciador-tarefas' crie a tabela do banco com o comando a seguir

CREATE TABLE tarefas (
    id SERIAL PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    concluida BOOLEAN DEFAULT FALSE,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

para rodar o katar-2 é necessario o comando dentro da pasta Katar-2 o comando 'node tarefasServer.js' para iniciar a conexão com o banco de dados e atraves do navegador colar o link: http://127.0.0.1:5500/Katar-2/telaTarefas.html da tela em HTML.



Katar-4: instale o visual studio no site official, importe o codigo do github, instale o node.js no no site oficial, execute via terminal dentro da pasta Katar-4 'node gerar_dados.js' depois executar na mesma pasta do terminal o arquivo 'node pepiline.js' para gerar o relatorio consolidado






Comentários livres: o que você faria diferente com mais tempo?

Katar-1: colocaria um frontend com uma tela adicionando novos pacientes ao banco de dados e listando em baixo já ordenado a lista dos pacientes por prioridade.


Katar-2: adicionaria novas funcionalidades como alterar o nome da tarefa, adicionar o status em andamento para quando ainda estivesse fazendo a tarefa, adicionaria uma tela de login para cada usuario conseguir visualizar suas tarefas , adicionaria um tempo estipulado para terminar cada tarefa e a opçao de cronometro para quando o tempo da tarefa estivesse acabado automaticamente ela marcaria como feita.


Katar-4: Em vez de mapas em memória, eu carregaria os CSVs para tabelas temporárias em um banco (PostgreSQL) e faria a consolidação via SQL JOIN, que é muito mais eficiente para grandes volumes. 

