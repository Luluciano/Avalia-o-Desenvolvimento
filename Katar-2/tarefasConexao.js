
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: "postgresql://postgres:postgres@localhost:5432/gerenciador_tarefas"
});

// Teste de conexão simples para nos ajudar no log
pool.on('connect', () => console.log('Postgres Conectado!'));

module.exports = {
  query: (text, params) => pool.query(text, params)
};