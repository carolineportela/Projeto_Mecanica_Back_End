/***************************************************************************************************************************************************
 * Objetivo: Responsavel pela manipulação de dados de TEMPO no Banco de Dados
 * Data: 19/05/2023
 * Autor: Mateus Alves
 * Versão: 1.0
 ***************************************************************************************************************************************************/

//Import da biblioteca do prisma client
var {PrismaClient} = require('@prisma/client')

var prisma = new PrismaClient()

////////////////////////Inserts//////////////////////////
const insertTempo = async function(dadosTempo, idTarefa) {
    let sql = `insert into tbl_registro_tempo (
        data,
        hora_inicio,
        hora_termino,
        tempo_intervalo,
        observacao,
        id_tarefa
    ) values (
        '${dadosTempo.data}',
        '${dadosTempo.hora_inicio}',
        '${dadosTempo.hora_termino}',
        '${dadosTempo.tempo_intervalo}',
        '${dadosTempo.observacao}',
        '${idTarefa}'
    )`

    let resultStatus = await prisma.$executeRawUnsafe(sql)

    if(resultStatus)
        return true
    else
        return false
}

///////////////////////Updates//////////////////////////
const updateTempo = async function(dadosTempo, idTarefa) {
    let sql = `update tbl_registro_tempo set
                    data = '${dadosTempo.data}',
                    hora_inicio = '${dadosTempo.hora_inicio}',
                    hora_termino = '${dadosTempo.hora_termino}',
                    tempo_intervalo = '${dadosTempo.tempo_intervalo}',
                    obsevacao = '${dadosTempo.observacao}',
                    id_tarefa = '${idTarefa}'
                where id = ${dadosTempo.id}    
            `

    //Executa o scriptSQL no BD
    let resultStatus = await prisma.$executeRawUnsafe(sql)
    
    if(resultStatus)
        return true
    else
        return false
}

module.exports = {
    insertTempo,
    updateTempo
}