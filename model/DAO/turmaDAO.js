/***************************************************************************************************************************************************
 * Objetivo: Responsavel pela manipulação de dados das TURMAS no Banco de Dados
 * Data: 19/05/2023
 * Autor: Mateus Alves
 * Versão: 1.0
 ***************************************************************************************************************************************************/

//Import da biblioteca do prisma client
var {PrismaClient} = require('@prisma/client')

var prisma = new PrismaClient()

////////////////////////Inserts//////////////////////////
const insertTurma = async function (dadosTurma, idCurso) {

    let sql = `insert into tbl_turma (
        nome,
        sigla,
        id_curso
    ) values (
        '${dadosTurma.nome}',
        '${dadosTurma.sigla}',
        '${idCurso}'
    )`

    let resultStatus = await prisma.$executeRawUnsafe(sql)

    if(resultStatus)
        return true
    else
        return false
}

//////////////////////Deletes///////////////////////////
const deleteTurma = async function(id) {
    let sql = `delete from tbl_turma where id = ${id}`

    let resultStatus = await prisma.$executeRawUnsafe(sql)

    if(resultStatus)
        return true
    else
        return false
}

///////////////////////Updates//////////////////////////
const updateTurma = async function(dadosTurma, idCurso) {

    let sql = `update tbl_turma set
                    nome = '${dadosTurma.nome}',
                    sigla = '${dadosTurma.sigla}',
                    id_curso = '${idCurso}'
                where id = ${dadosTurma.id}    
            `

    //Executa o scriptSQL no BD
    let resultStatus = await prisma.$executeRawUnsafe(sql)
    
    if(resultStatus)
        return true
    else
        return false

}

///////////////////////Selects//////////////////////////
const selectAllTurmas = async function() {
    let sql = `select * from tbl_turma`

    let rsTurma = await prisma.$queyRawUnsafe(sql)

    if(rsTurma.length > 0)
        return rsTurma
    else
        return false
}

module.exports = {
    insertTurma,
    deleteTurma,
    updateTurma,
    selectAllTurmas
}