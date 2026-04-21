
// Lógica de ordenação da fila de triagem.
// Criei um mapa de pesos para facilitar o cálculo da prioridade.
 
const NIVEIS_URGENCIA = {
  'CRÍTICA': 4,
  'ALTA': 3,
  'MÉDIA': 2,
  'BAIXA': 1
};

function ordenarFila(pacientes) {
  return pacientes
    .map(paciente => {
      // Começamos com o peso base do nível de urgência
      let pesoPrioridade = NIVEIS_URGENCIA[paciente.urgencia] || 0;

      // Regra 5: Menores de 18 ganham +1 nível. 
      // Faço isso antes da regra 4 para garantir a lógica acumulativa.
      if (paciente.idade < 18) {
        pesoPrioridade += 1;
      }

      // Regra 4: Idosos (60+) com urgência MÉDIA sobem para ALTA.
      // Se ele já subiu por ser menor de 18 (o que é impossível), 
      // ou se o peso já for alto, a regra se aplica ao valor original.
      if (paciente.idade >= 60 && paciente.urgencia === 'MÉDIA') {
        // Se ele era MÉDIA (2) e não teve outro bônus, sobe para ALTA (3)
        if (pesoPrioridade === 2) pesoPrioridade = 3;
      }

      // Garantindo que o peso não ultrapasse o limite da urgência CRÍTICA
      if (pesoPrioridade > 4) pesoPrioridade = 4;

      return { ...paciente, pesoCalculado: pesoPrioridade };
    })
    .sort((a, b) => {
      // Primeiro critério: Peso de Prioridade (Decrescente)
      if (b.pesoCalculado !== a.pesoCalculado) {
        return b.pesoCalculado - a.pesoCalculado;
      }
      // Segundo critério: Horário de Chegada (Crescente - FIFO)
      return a.chegada.localeCompare(b.chegada);
    });
}



module.exports = { ordenarFila };