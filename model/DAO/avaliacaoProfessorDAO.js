/***************************************************************************************************************************************************
 * Objetivo: Responsavel pela manipulação de dados das AVALIACOES do PROFESSOR no Banco de Dados
 * Data: 28/05/2023
 * Autor: Mateus Alves
 * Versão: 1.0
 ***************************************************************************************************************************************************/

var {PrismaClient} = require('@prisma/client')

var prisma = new PrismaClient()

const insertAvaliacaoProfessor = async function (dadosAvaliacaoProfessor) {
    let sql = `insert into tbl_avaliacao_professor (
            resultado,
            id_professor,
            id_criterio
    ) values (
            '${dadosAvaliacaoProfessor.resultado}',
            '${dadosAvaliacaoProfessor.id_professor}',
            '${dadosAvaliacaoProfessor.id_criterio}'
    )`

    let resultStatus = await prisma.$executeRawUnsafe(sql)

    if (resultStatus) {
        return true
    } else {
        return false
    }

}

const selectAllAvaliacoesProfessores = async function() {

    let sql = `select * from tbl_avaliacao_professor`

    let rsAvaliacao = await prisma.$queryRawUnsafe(sql)

    if(rsAvaliacao.length > 0) {
        return rsAvaliacao
    } else {
        return false
    }
}

const selectAvaliacaoProfessorByID = async function(id) {

    let sql = `select * from tbl_avaliacao_professor where id = ${id}`

    let rsAvaliacao = await prisma.$queryRawUnsafe(sql)

    if(rsAvaliacao.length > 0) {
        return rsAvaliacao
    } else {
        return false
    }
}

module.exports = {
    insertAvaliacaoProfessor,
    selectAllAvaliacoesProfessores,
    selectAvaliacaoProfessorByID
}