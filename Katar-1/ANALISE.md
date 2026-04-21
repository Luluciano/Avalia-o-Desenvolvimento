Qual estrutura de dados você escolheu para modelar a fila e por quê?
    Optei por ele para simular um ambiente de produção real, onde a consistência dos dados e a escalabilidade são prioridades, especialmente considerando as regras de negócio do Kata 1

Qual a complexidade de tempo do seu algoritmo de ordenação? Seria diferente se a lista tivesse 1 milhão de pacientes?
    Em um cenário de Big Data com 1 milhão de registros, a ordenação em memória no Node.js poderia causar pressão e consumir muita RAM para 1 milhão de linhas, o ideal seria transferir essa carga para o PostgreSQL. Eu utilizaria uma cláusula ORDER BY diretamente no SQL, aproveitando os índices B-Tree do banco de dados. Isso permitiria que o banco entregasse os dados já ordenados sem que o Node.js precisasse processar toda a lista na memória.

As regras 4 e 5 interagem entre si? Descreva o que acontece quando um paciente tem 15 anos e urgência MÉDIA.
    As regras interagem, mas são aplicadas de forma sequencial na lógica de "promoção" de prioridade. No caso de um paciente de 15 anos com urgência MÉDIA:

    Regra 4 (Idosos): Não se aplica (idade < 60).

    Regra 5 (Menores de 18): Se aplica. O paciente ganha +1 nível de prioridade.

    Resultado: A urgência MÉDIA (peso 2) é promovida para ALTA (peso 3).


Se a clínica adicionasse uma 6ª regra amanhã, como seu código lidaria com essa extensão?
    O código foi desenvolvido seguindo o princípio de Responsabilidade Única. A lógica de cálculo de prioridade está encapsulada em uma função separada (ex: calcularPesoPrioridade).

    Para adicionar uma 6ª regra:
    Bastaria inserir uma nova condicional dentro desta função, Como o sistema utiliza um sistema de pesos numéricos, a nova regra apenas ajustaria o valor final do peso antes da ordenação isso garante que a lógica de ordenação principal (.sort ou ORDER BY) permaneça intacta, facilitando a manutenção e a escalabilidade do sistema (Open/Closed Principle).

