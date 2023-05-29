/***************************************************************************************************************************************************
 * Objetivo: Responsavel pela manipulação de dados das MATERIAS das TURMAS no Banco de Dados
 * Data: 28/05/2023
 * Autor: Mateus Alves
 * Versão: 1.0
 ***************************************************************************************************************************************************/

var {PrismaClient} = require('@prisma/client')

var prisma = new PrismaClient()

const selectAllTurmasMaterias = async function() {
    let sql = `select * from tbl_turma_materia`

    let rsTurmaTarefaID = await prisma.$queryRawUnsafe(sql)

    if (rsTurmaTarefaID.length > 0) {
        return rsTurmaTarefaID;
    }
    else {
        return false;
    }

}

const selectTurmaMateriaByID = async function(id) {
    let sql = `select * from tbl_turma_materia where id = ${id}`;

    let rsTurmaTarefaId = await prisma.$queryRawUnsafe(sql);

    if (rsTurmaTarefaId.length > 0) {
        return rsTurmaTarefaId;
    }
    else {
        return false;
    }
}

module.exports = {
    selectAllTurmasMaterias,
    selectTurmaMateriaByID
}