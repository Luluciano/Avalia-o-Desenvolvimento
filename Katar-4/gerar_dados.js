const fs = require('fs');

const pedidos = `id_pedido,data_pedido,id_cliente,valor_total,status
1,2026-04-10,101,"150,50",pago
2,11/04/2026,102,200.00,pendente
3,2026-04-12,103,"350,75",pago
4,2026-04-13,999,50.00,pago`; // Pedido 4 tem cliente inexistente

const clientes = `id_cliente,nome,cidade,estado,data_cadastro
101,Joao Silva,São Paulo,SP,2025-01-01
102,Maria Souza,sao paulo,SP,2025-02-10
103,Jose Santos,SAO PAULO,SP,2025-03-05`;

const entregas = `id_entrega,id_pedido,data_prevista,data_realizada,status_entrega
1,1,2026-04-15,2026-04-14,entregue
2,2,2026-04-20,,pendente
3,3,2026-04-15,2026-04-17,entregue
4,500,2026-04-20,2026-04-21,entregue`; // Entrega 4 é órfã (pedido 500 não existe)

fs.writeFileSync('pedidos.csv', pedidos);
fs.writeFileSync('clientes.csv', clientes);
fs.writeFileSync('entregas.csv', entregas);
console.log("Arquivos CSV criados com sucesso!");