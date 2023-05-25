/***************************************************************************************************************************************************
 * Objetivo: Responsavel pela manipulação de dados das TAREFAS no Banco de Dados
 * Data: 19/05/2023
 * Autor: Mateus Alves
 * Versão: 1.0
 ***************************************************************************************************************************************************/

//Import da biblioteca do prisma client
var {PrismaClient} = require('@prisma/client')

var prisma = new PrismaClient()

////////////////////////Inserts//////////////////////////
const insertTarefa = async function(dadosTarefa, idMateria, idTipoTarefa) {
    let sql = `insert into tbl_tarefa (
        nome,
        numero,
        tempo_previsto,
        id_materia,
        id_tipo_tarefa
    ) values (
        '${dadosTarefa.nome}',
        '${dadosTarefa.numero}',
        '${dadosTarefa.tempo_previsto}',
        '${idMateria}',
        '${idTipoTarefa}'
    )`

    let resultStatus = await prisma.$executeRawUnsafe(sql)

    if(resultStatus)
        return true
    else
        return false
}

//////////////////////Deletes///////////////////////////
const deleteTarefa = async function(id) {
    let sql = `delete from tbl_tarefa where id = ${id}`

    let resultStatus = await prisma.$executeRawUnsafe(sql)

    if(resultStatus)
        return true
    else
        return false
}

///////////////////////Updates//////////////////////////
const updateTarefa = async function(id) {
     let sql = `update tbl_tarefa set
                    nome = '${dadosAluno.nome}',
                    data_nascimento = '${dadosAluno.data_nascimento}',
                    cpf = '${dadosAluno.cpf}',
                    matricula = '${dadosAluno.matricula}',
                    id_turma = '${idTurma}',
                    id_usuario = '${idUsuario}'
                where id = ${dadosAluno.id}    
            `

    //Executa o scriptSQL no BD
    let resultStatus = await prisma.$executeRawUnsafe(sql)
    
    if(resultStatus)
        return true
    else
        return false
}

///////////////////////Selects//////////////////////////
const selectAllTarefas = async function() {
    let sql = `select * from tbl_tarefa`
    
    let rsTarefa = await prisma.$queryRawUnsafe(sql)

    if(rsTarefa.length > 0)
        return rsTarefa
    else
        return false
}

module.exports = {
    insertTarefa,
    deleteTarefa,
    updateTarefa,
    selectAllTarefas
}