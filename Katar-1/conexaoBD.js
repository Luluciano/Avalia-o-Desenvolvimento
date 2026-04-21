const { ordenarFila } = require('./filaPacientes');

const { Client } = require('pg');

async function buscarFilaDoBanco() {
  const client = new Client({
    connectionString: "postgresql://postgres:postgres@localhost:5432/filaPacientesBD"
  });

  try {
    await client.connect();
    const res = await client.query('SELECT nome, idade, urgencia, chegada FROM pacientes');

    console.log("Dados brutos do banco:", res.rows.length, "pacientes encontrados.");
    
    // Ordenamos os dados vindos do banco usando nossa função
    const filaOrdenada = ordenarFila(res.rows);
    
    return filaOrdenada;
  } finally {
    await client.end();
  }
}

// Como a função é async, usamos o .then() para ver o resultado no console
buscarFilaDoBanco().then(fila => {
  if (fila) {
    console.log("--- FILA DE ATENDIMENTO ORDENADA ---");
    console.table(fila); // O console.table mostra os dados organizados em formato de tabela
  }
});