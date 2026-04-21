1. Ambiguidades e Dúvidas
   Ambiguidade / Info FaltantePergunta ao ClienteDecisão Tomada (Ausência de resposta)

   Persistência de Dados "As tarefas devem sumir ao atualizar a página ou devem ser salvas permanentemente?" Utilizarei PostgreSQL para garantir que as tarefas não sejam perdidas.

   Definição de Situação "Quais são exatamente os estados? Apenas 'Pendente' e 'Feita' ou existe 'Em Andamento'?" Adotarei um modelo booleano: concluida (true/false).

   Limite de Texto "Existe um tamanho máximo para o título da tarefa?" Definirei um limite de 255 caracteres para evitar abusos no banco de dados.

2. Requisitos Formais
   Requisitos Funcionais (RF):

   RF01: O sistema deve permitir a criação de tarefas com um título.

   RF02: O sistema deve listar tarefas cadastradas.

   RF03: O sistema deve permitir filtrar tarefas por status (Pendentes/Concluídas).

   RF04: O sistema deve permitir alterar o status de uma tarefa para "Concluída".

   RF05: O sistema deve permitir a exclusão física de uma tarefa.

   Requisitos Não Funcionais (RNF):

   RNF01: O backend deve ser uma API REST construída em Node.js.

   RNF02: Os dados devem ser persistidos em banco de dados PostgreSQL.

   RNF03: A interface deve ser responsiva e intuitiva (Web).

3. O "Puxadinho" da Prioridade
   No meu backlog, eu trataria a prioridade como um item de refinamento técnico. Eu já criaria a tabela no banco com uma coluna prioridade (opcional/null) para que, quando o cliente decidir implementar, o banco já esteja preparado (evitando migrações complexas depois).
