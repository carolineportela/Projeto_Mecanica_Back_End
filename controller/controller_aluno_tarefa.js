/***************************************************************************************************************************************************
 * Objetivo: Responsavel pela regra de negocio referente ao CRUD de aluno e tarefa
 * (GET, POST, PUT, DELETE)
 * Autor: Caroline Portela
 * Versão: 1.0
 ***************************************************************************************************************************************************/

//Import do arquivo de configuração das variaveis, constantes e funções globais
var message = require('./modulo/config.js')
var alunoTarefaDAO = require('../model/DAO/alunoTarefaDAO.js')

const { request } = require('express')

const inserirAlunoTarefa = async function (dadosAlunoTarefa) {

    if (dadosAlunoTarefa.id_aluno == '' || dadosAlunoTarefa.id_aluno == undefined ||
        dadosAlunoTarefa.id_tarefa == '' || dadosAlunoTarefa.id_tarefa == undefined
    ) {
        return message.ERROR_REQUIRED_FIELDS
    } else {

        let resultDadosAlunoTarefa = await alunoTarefaDAO.insertAlunoTarefa(dadosAlunoTarefa)

        if (resultDadosAlunoTarefa) {

            let novoAlunoTarefa = await alunoTarefaDAO.selectLastId()

            let dadosAlunoTarefaJSON = {}
            dadosAlunoTarefaJSON.status = message.SUCESS_CREATED_ITEM.status
            dadosAlunoTarefaJSON.alunoTarefa = novoAlunoTarefa

            return dadosAlunoTarefaJSON
        } else {
            return message.ERROR_INTERNAL_SERVER
        }
    }
}

const atualizarAlunoTarefa = async function (dadosAlunoTarefa, idAlunoTarefa) {

    if (dadosAlunoTarefa.id_aluno == '' || dadosAlunoTarefa.id_aluno == undefined ||
        dadosAlunoTarefa.id_tarefa == '' || dadosAlunoTarefa.id_tarefa == undefined
    ) {
        return message.ERROR_REQUIRED_FIELDS
    } else if (idAlunoTarefa == '' || idAlunoTarefa == undefined || idAlunoTarefa == isNaN(idAlunoTarefa)) {
        return message.ERROR_INVALID_ID
    } else {
        //Adiciona o id no JSON dos dados
        dadosAlunoTarefa.id = idAlunoTarefa

        let statusId = await alunoTarefaDAO.selectTarefaAlunoByID(idAlunoTarefa)

        if (statusId) {

            let resultDadosAlunoTarefa = await alunoTarefaDAO.updateAlunoTarefa(dadosAlunoTarefa);

            if (resultDadosAlunoTarefa) {

                let resultDadosAlunoTarefaJSON = {}

                resultDadosAlunoTarefaJSON.status = message.SUCESS_UPDATED_ITEM.status
                resultDadosAlunoTarefaJSON.message = message.SUCESS_UPDATED_ITEM.message
                resultDadosAlunoTarefaJSON.alunoTarefa = resultDadosAlunoTarefa
                return resultDadosAlunoTarefaJSON
            } else
                return message.ERROR_INTERNAL_SERVER

        } else {
            return message.ERROR_NOT_FOUND
        }
    }

}
const getAlunoTarefa = async function () {
    let alunoTarefaJSON = {}

    let alunoTarefa = await alunoTarefaDAO.selectALLTarefasAluno()

    if (alunoTarefa) {

        alunoTarefaJSON.status = message.SUCESS_REQUEST.status
        alunoTarefaJSON.message = message.SUCESS_REQUEST.message
        alunoTarefaJSON.quantidade = alunoTarefa.length;
        alunoTarefaJSON.alunoTarefa = alunoTarefa

        return alunoTarefaJSON

    } else {
        return message.ERROR_NOT_FOUND
    }
}
const deletarAlunoTarefa = async function (idAlunoTarefa) {

    let statusId = await alunoTarefaDAO.selectTarefaAlunoByID(idAlunoTarefa);

    if (statusId) {

        if (idAlunoTarefa == '' ||idAlunoTarefa == undefined || isNaN(idAlunoTarefa)) {
            return message.ERROR_INVALID_ID; 
        } else {
            let resultDadosAlunoTarefa = await alunoTarefaDAO.deleteAlunoTarefa(idAlunoTarefa)

            if (resultDadosAlunoTarefa) {
                return message.SUCESS_DELETED_ITEM
            } else {
                return message.ERROR_INTERNAL_SERVER 
            }
        }

    } else {
        return message.ERROR_NOT_FOUND 
    }
}

const getAlunoTarefaID = async function (id) {

    if(id == '' || id == undefined || isNaN(id)) {
        return message.ERROR_INVALID_ID
    } else {
        let dadosAlunoTarefaJSON = {}

        let dadosAlunoTarefa = await alunoTarefaDAO.selectTarefaAlunoByID(id)

        if(dadosAlunoTarefa) {
            dadosAlunoTarefaJSON.status = message.SUCESS_REQUEST.status
            dadosAlunoTarefaJSON.message = message.SUCESS_REQUEST.message
            dadosAlunoTarefaJSON.alunoTarefa = dadosAlunoTarefa
            return dadosAlunoTarefaJSON
        } else {
            return message.ERROR_NOT_FOUND
        }
    }
}

module.exports = {
    inserirAlunoTarefa,
    atualizarAlunoTarefa,
    getAlunoTarefa,
    deletarAlunoTarefa,
    getAlunoTarefaID
}