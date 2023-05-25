/***************************************************************************************************************************************************
 * Objetivo: Responsavel pela manipulação de dados das Tarefas dos Alunos no Banco de Dados
 * Data: 19/05/2023
 * Autor: Mateus Alves
 * Versão: 1.0
 ***************************************************************************************************************************************************/

//Import da biblioteca do prisma client
var {PrismaClient} = require('@prisma/client')

var prisma = new PrismaClient()

const insertTarefasAluno = async function(idAluno, idTarefa){

}

const deleteTarefaAluno = async function(id){

}

const updateTarefaAluno = async function(idAluno, idTarefa){

}

const selectALLTarefasAluno = async function(){

}

const selectTarefaAlunoByID = async function(id){

}

module.exports = {
    insertTarefasAluno,
    deleteTarefaAluno,
    updateTarefaAluno,
    selectALLTarefasAluno,
    selectTarefaAlunoByID
}