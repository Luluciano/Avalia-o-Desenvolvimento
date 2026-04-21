const express = require('express');
const db = require('./tarefasConexao');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors()); // Para o frontend conseguir acessar a API

// GET /tasks - Listar com filtro
app.get('/tasks', async (req, res) => {
  const { status } = req.query; // espera 'pendente' ou 'concluida'
  let queryText = 'SELECT * FROM tarefas';
  let params = [];

  if (status) {
    queryText += ' WHERE concluida = $1';
    params = [status === 'concluida'];
  }

  try {
    const result = await db.query(queryText, params);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: "Erro ao buscar tarefas" });
  }
});



// POST /tasks - Criar
app.post('/tasks', async (req, res) => {
  const { titulo } = req.body;
  if (!titulo) return res.status(400).json({ error: "Título é obrigatório" });

  try {
    const result = await db.query(
      'INSERT INTO tarefas (titulo, concluida) VALUES ($1, false) RETURNING *',
      [titulo]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: "Erro ao criar tarefa" });
  }
});



// PATCH /tasks/:id - Atualizar status
app.patch('/tasks/:id', async (req, res) => {
  const { id } = req.params;
  const { concluida } = req.body;

  try {
    const result = await db.query(
      'UPDATE tarefas SET concluida = $1 WHERE id = $2 RETURNING *',
      [concluida, id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: "Erro ao atualizar" });
  }
});



// DELETE /tasks/:id - Remover
app.delete('/tasks/:id', async (req, res) => {
  try {
    await db.query('DELETE FROM tarefas WHERE id = $1', [req.params.id]);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: "Erro ao deletar" });
  }
});

app.listen(3000, () => console.log('Servidor rodando na porta 3000'));



