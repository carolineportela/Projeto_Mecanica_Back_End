/***************************************************************************************************************************************************
 * Objetivo: Responsavel pela manipulação de dados das Tarefas dos Alunos no Banco de Dados
 * Data: 19/05/2023
 * Autor: Mateus Alves
 * Versão: 1.0
 ***************************************************************************************************************************************************/

//Import da biblioteca do prisma client
var {PrismaClient} = require('@prisma/client')

var prisma = new PrismaClient()


const insertAlunoTarefa = async function (dadosAlunoTarefa) {
    let sql = `insert into tbl_aluno_tarefa (
        id_aluno,
        id_tarefa
    ) values (
        '${dadosAlunoTarefa.id_aluno}',
        '${dadosAlunoTarefa.id_tarefa}'
    )`
    //Executa o scrip sql no banco de dados        
    let resultStatus = await prisma.$executeRawUnsafe(sql);

    if (resultStatus) {
        return true;
    } else {
        return false;
    }

}

const updateAlunoTarefa = async function(dadosAlunoTarefa) {
    let sql = `update tbl_aluno_tarefa set
                    id_aluno = '${dadosAlunoTarefa.id_aluno}',
                    id_tarefa = '${dadosAlunoTarefa.id_tarefa}'
                where id = ${dadosAlunoTarefa.id}    
            `

    //Executa o scriptSQL no BD
    let resultStatus = await prisma.$executeRawUnsafe(sql);
      if (resultStatus) {
          return true;
      } else {
          return false;
      }
}


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
    let sql = `select * from tbl_aluno_tarefa where id = ${id}`;

    let rsTarefaAlunoId = await prisma.$queryRawUnsafe(sql);

    if (rsTarefaAlunoId.length > 0) {
        return rsTarefaAlunoId;
    }
    else {
        return false;
    }
}

const selectLastId = async function() {
    let sql = `select * from tbl_aluno_tarefa order by id desc limit 1;`

    let rsAlunoTarefa = await prisma.$queryRawUnsafe(sql)

    if(rsAlunoTarefa.length > 0)
        return rsAlunoTarefa
    else
        return false
}
const deleteAlunoTarefa = async function(id) {
    let idAlunoTarefa = id;

    let sql = `delete from tbl_aluno_tarefa where id = ${idAlunoTarefa}`

    let resultStatus = await prisma.$executeRawUnsafe(sql)

    if (resultStatus) {
        return true;
    } else {
        return false;
    }
}

module.exports = {
    selectALLTarefasAluno,
    selectTarefaAlunoByID,
    selectLastId,
    insertAlunoTarefa,
    updateAlunoTarefa,
    deleteAlunoTarefa
}