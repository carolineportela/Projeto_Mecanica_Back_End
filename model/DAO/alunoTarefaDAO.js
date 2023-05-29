/***************************************************************************************************************************************************
 * Objetivo: Responsavel pela manipulação de dados das Tarefas dos Alunos no Banco de Dados
 * Data: 19/05/2023
 * Autor: Mateus Alves
 * Versão: 1.0
 ***************************************************************************************************************************************************/

//Import da biblioteca do prisma client
var {PrismaClient} = require('@prisma/client')

var prisma = new PrismaClient()

const selectALLTarefasAluno = async function(){
    let sql = `select * from tbl_aluno_tarefa`
    
    let rsAlunoTarefaID = await prisma.$queryRawUnsafe(sql)

    if (rsAlunoTarefaID.length > 0) {
        return rsAlunoTarefaID;
    }
    else {
        return false;
    }
}

const selectTarefaAlunoByID = async function(id){
    let sql = `select * from tbl_tarefa_aluno where id = ${id}`;

    let rsTarefaAlunoId = await prisma.$queryRawUnsafe(sql);

    if (rsTarefaAlunoId.length > 0) {
        return rsTarefaAlunoId;
    }
    else {
        return false;
    }
}

module.exports = {
    selectALLTarefasAluno,
    selectTarefaAlunoByID
}