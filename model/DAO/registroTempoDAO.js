/***************************************************************************************************************************************************
 * Objetivo: Responsavel pela manipulação de dados de REGISTRO DE TEMPO no Banco de Dados
 * Data: 19/05/2023
 * Autor: Mateus Alves
 * Versão: 1.0
 ***************************************************************************************************************************************************/

//Import da biblioteca do prisma client
var {PrismaClient} = require('@prisma/client')

var prisma = new PrismaClient()

////////////////////////Inserts//////////////////////////
const insertRegistroTempo = async function(dadosRegistroTempo) {
    let sql = `insert into tbl_registro_tempo (
        data,
        hora_inicio,
        hora_termino,
        tempo_intervalo,
        observacao,
        id_tarefa
    ) values (
        '${dadosRegistroTempo.data}',
        '${dadosRegistroTempo.hora_inicio}',
        '${dadosRegistroTempo.hora_termino}',
        '${dadosRegistroTempo.tempo_intervalo}',
        '${dadosRegistroTempo.observacao}',
        '${dadosRegistroTempo.id_tarefa}'
    )`

    let resultStatus = await prisma.$executeRawUnsafe(sql)

    if(resultStatus)
        return true
    else
        return false
}

///////////////////////Updates//////////////////////////
const updateRegistroTempo = async function(dadosRegistroTempo) {
    let sql = `update tbl_registro_tempo set
                    data = '${dadosRegistroTempo.data}',
                    hora_inicio = '${dadosRegistroTempo.hora_inicio}',
                    hora_termino = '${dadosRegistroTempo.hora_termino}',
                    tempo_intervalo = '${dadosRegistroTempo.tempo_intervalo}',
                    obsevacao = '${dadosRegistroTempo.observacao}',
                    id_tarefa = '${dadosRegistroTempo.id_tarefa}'
                where id = ${dadosRegistroTempo.id}    
            `

    //Executa o scriptSQL no BD
    let resultStatus = await prisma.$executeRawUnsafe(sql)
    
    if(resultStatus)
        return true
    else
        return false
}

const selectRegistroTempoByID = async function(id) {

    let sql = `select * from tbl_registro_tempo where id = ${id}`;

    let rsRegistroId = await prisma.$queryRawUnsafe(sql);

    if (rsRegistroId.length > 0) {
        return rsRegistroId;
    }
    else {
        return false;
    }
}

const selectLastId = async function () {
    let sql = `select * from tbl_registro_tempo order by id desc limit 1;`

    let rsAluno = await prisma.$queryRawUnsafe(sql)

    if (rsAluno.length > 0) {
        return rsAluno
    } else {
        return false;
    }
}

module.exports = {
    insertRegistroTempo,
    updateRegistroTempo,
    selectRegistroTempoByID,
    selectLastId
}