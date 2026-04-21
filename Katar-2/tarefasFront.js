const API_URL = 'http://localhost:3000/tasks';

        async function carregarTarefas(status = '') {
            try{
                const res = await fetch(`${API_URL}?status=${status}`);
                const tarefas = await res.json();
                const lista = document.getElementById('lista');
                lista.innerHTML = '';

                tarefas.forEach(t => {
                // Se estiver concluída, usa a classe verde
                const classeStatus = (t.concluida === true) ? 'concluida-verde' : '';

                lista.innerHTML += `
                    <div class="tarefa">
                        <span class="${classeStatus}">${t.titulo}</span>
                        <div>
                            <button onclick="marcarTarefa(${t.id}, ${!t.concluida})">✓</button>
                            <button onclick="deletarTarefa(${t.id})">🗑️</button>
                        </div>
                    </div>
                `;
                });
        
            }catch (error) {
                console.error("Erro ao listar tarefa:", error);
                }
            
        }

        async function criarTarefa() {
            try{
                const titulo = document.getElementById('novoTitulo').value;
                await fetch(API_URL, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ titulo })
                });
                document.getElementById('novoTitulo').value = '';
                carregarTarefas();
                }catch (error) {
                console.error("Erro ao cria tarefa:", error);
                }
            
        }



        async function marcarTarefa(id, novoStatus) {
            try {
                await fetch(`${API_URL}/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ concluida: novoStatus })
            });
            carregarTarefas(); 
        } catch (error) {
            console.error("Erro ao marcar tarefa:", error);
        }
}



        async function deletarTarefa(id) {
            try{
                await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
                carregarTarefas();
            }catch (error) {
            console.error("Erro ao deletar tarefa:", error);
        }
            
        }


        carregarTarefas();