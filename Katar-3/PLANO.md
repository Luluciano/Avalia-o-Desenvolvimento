1. O que está acontecendo (Diagnóstico)
    Olhando os incidentes das últimas semanas, fica claro que o sistema chegou no seu limite operacional. Não é só um problema de código, é um risco real para o faturamento.
    •	Lentidão no Checkout (8-12s): Isso aqui é crítico. No pico, o cliente desiste da compra. A causa deve ser a falta de índices básicos no banco ou alguma query "pesada" que está rodando em loop. É um problema Urgente.
    •	Pedidos Duplicados: Isso é erro de integridade. Provavelmente o botão de "comprar" permite dois cliques ou a API não sabe que aquele pedido já foi processado. É Urgente porque gera custo logístico e reclamação no SAC.
    •	Deploy "na mão" (Correção em Produção): Corrigir bug direto no servidor sem passar pelo Git é receita para o desastre. Se o servidor cair e precisarmos subir de novo, esse patch sumiu. É Importante, mas precisamos de processo.
    •	O Monolito de 4k linhas: O código virou um "espaguete". Ninguém tem coragem de mexer porque não sabe o que quebra do outro lado.
    •	Falta de Testes: É o que nos impede de evoluir rápido. Hoje trabalhamos na base da "fé", torcendo para que nada quebre após um deploy.



2. Plano de ação
    Não dá para fazer tudo de uma vez. Minha proposta é focar no que estanca a perda de dinheiro:
    1.	Travar Duplicidades (Prioridade 1): * O que fazer: subir um ajuste rápido no banco de dados criando uma Unique Constraint nas tabelas de pedidos. Se o sistema tentar inserir o mesmo pedido duas vezes, o banco barra.
    o	Tempo: 1 dia de trabalho.
    o	Sucesso: Parar de receber chamados de clientes que foram cobrados duas vezes.
    2.	Dar fôlego ao Banco (Prioridade 2):
    o	O que fazer: rodar um profiler para achar as queries mais lentas e criar índices. Se for o caso, podemos colocar um cache rápido para desafogar as consultas de histórico.
    o	Tempo: uns 2 a 3 dias entre análise e ajuste.
    o	Sucesso: Baixar o tempo de resposta para menos de 1 segundo.
    3.	Ambiente de Homologação (Prioridade 3):
    o	O que fazer: Criar um espelho da produção para testar as coisas antes de soltar para o cliente final. Acabar com essa história de "consertar no susto" lá no servidor oficial.
    o	Tempo: 2 dias.




3. Estratégia de Arquitetura: Por onde começar a limpeza?
    Entre as opções, a melhor opção é a (Refatoração Incremental).
    Se tentar reescrever tudo do zero (Opção B), vamos ficar meses sem entregar nada novo e, quando lançarmos, o risco de ter esquecido alguma regra de negócio antiga é enorme — principalmente porque não temos testes para comparar.
    A ideia é: toda vez que precisarmos mexer em uma regra (tipo o cálculo de frete), tira ela daquele arquivo gigante, cria um módulo novo e já sobe com testes. É o famoso "deixar o acampamento mais limpo do que encontramos".




4. O que estamos ignorando (Requisitos Não Funcionais)
    Para não ser pego de surpresa de novo, precisamos monitorar:
    •	Escalabilidade: O sistema não aguenta mais pedidos do que já processa hoje. Precisamos medir o Throughput (quantos pedidos por minuto o motor aguenta).
    •	Manutenibilidade: O código está muito difícil de manter. Começar a medir a Dívida Técnica e o tempo que a gente gasta para corrigir um bug simples.
    •	Confiabilidade: Precisamos de uma métrica de Uptime. O sistema precisa estar disponível 99.9% do tempo, e hoje não sabemos se ele cai e volta sem a gente ver.
