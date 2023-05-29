/***************************************************************************************************************************************************
 * Objetivo: Responsavel pela manipulação de dados das AVALIACOES dos ALUNOS no Banco de Dados
 * Data: 28/05/2023
 * Autor: Mateus Alves
 * Versão: 1.0
 ***************************************************************************************************************************************************/

var {PrismaClient} = require('@prisma/client')

var prisma = new PrismaClient()

const insertAvaliacaoAluno = async function (dadosAvaliacaoAluno) {
    let sql = `insert into tbl_avaliacao_aluno (
            resultado,
            id_aluno,
            id_criterio
    ) values (
            '${dadosAvaliacaoAluno.resultado}',
            '${dadosAvaliacaoAluno.id_aluno}',
            '${dadosAvaliacaoAluno.id_criterio}'
    )`

    let resultStatus = await prisma.$executeRawUnsafe(sql)

    if (resultStatus) {
        return true
    } else {
        return false
    }

}

const selectAllAvaliacoesAlunos = async function() {

    let sql = `select * from tbl_avaliacao_aluno`

    let rsAvaliacao = await prisma.$queryRawUnsafe(sql)

    if(rsAvaliacao.length > 0) {
        return rsAvaliacao
    } else {
        return false
    }
}

const selectAvaliacaoAlunoByID = async function(id) {

    let sql = `select * from tbl_avaliacao_aluno where id = ${id}`

    let rsAvaliacao = await prisma.$queryRawUnsafe(sql)

    if(rsAvaliacao.length > 0) {
        return rsAvaliacao
    } else {
        return false
    }
}

module.exports = {
    insertAvaliacaoAluno,
    selectAllAvaliacoesAlunos,
    selectAvaliacaoAlunoByID
}