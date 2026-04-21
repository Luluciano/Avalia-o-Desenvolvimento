const fs = require('fs');

// Funções de Limpeza
function normalizarCidade(cidade) {
    if (!cidade) return "NÃO INFORMADO";
    return cidade.trim().toUpperCase()
        .normalize("NFD").replace(/[\u0300-\u036f]/g, ""); // Remove acentos
}

function normalizarData(dataStr) {
    if (!dataStr) return null;
    if (dataStr.includes('/')) {
        const [d, m, y] = dataStr.split('/');
        return new Date(`${y}-${m}-${d}`);
    }
    return new Date(dataStr);
}

function normalizarValor(valor) {
    if (typeof valor === 'string') {
        return parseFloat(valor.replace(',', '.').replace(/"/g, ''));
    }
    return parseFloat(valor);
}

// Processamento
async function rodarPipeline() {
    const pedidosRaw = fs.readFileSync('pedidos.csv', 'utf8').split('\n').slice(1);
    const clientesRaw = fs.readFileSync('clientes.csv', 'utf8').split('\n').slice(1);
    const entregasRaw = fs.readFileSync('entregas.csv', 'utf8').split('\n').slice(1);

    // 1. Mapear Clientes
    const clientesMap = {};
    clientesRaw.forEach(linha => {
        const [id, nome, cidade, estado] = linha.split(',');
        if (id) {
            clientesMap[id] = { nome, cidade: normalizarCidade(cidade), estado };
        }
    });

    // 2. Mapear Entregas
    const entregasMap = {};
    entregasRaw.forEach(linha => {
        const [id_e, id_p, d_prev, d_real, status] = linha.split(',');
        if (id_p) {
            entregasMap[id_p] = { d_prev, d_real, status };
        }
    });

    // 3. Consolidar Pedidos
    const consolidado = [];
    pedidosRaw.forEach(linha => {
        const [id, data, id_c, valor, status] = linha.split(',');
        const cliente = clientesMap[id_c];
        const entrega = entregasMap[id];

        // Tratar Registros Órfãos (Só processa se o cliente existir)
        if (!cliente || !id) return;

        const dPedido = normalizarData(data);
        const dPrev = normalizarData(entrega?.d_prev);
        const dReal = normalizarData(entrega?.d_real);

        let atraso = null;
        if (dReal && dPrev) {
            atraso = Math.ceil((dReal - dPrev) / (1000 * 60 * 60 * 24));
        }

        consolidado.push({
            id_pedido: id,
            nome_cliente: cliente.nome,
            cidade: cliente.cidade,
            estado: cliente.estado,
            valor: normalizarValor(valor),
            status_pedido: status,
            data_pedido: dPedido?.toISOString().split('T')[0],
            atraso_dias: atraso,
            status_entrega: entrega?.status || 'NÃO INICIADA'
        });
    });

    fs.writeFileSync('relatorio_consolidado.json', JSON.stringify(consolidado, null, 2));
    
    // Gerar Indicadores
    console.log("--- INDICADORES ---");
    const total = consolidado.length;
    const noPrazo = consolidado.filter(p => p.atraso_dias !== null && p.atraso_dias <= 0).length;
    console.log(`Percentual no Prazo: ${((noPrazo / total) * 100).toFixed(2)}%`);
    console.log("Relatório gerado em relatorio_consolidado.json");
}

rodarPipeline();