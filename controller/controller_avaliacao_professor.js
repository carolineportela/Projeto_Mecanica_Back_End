/***************************************************************************************************************************************************
 * Objetivo: Responsavel pela regra de negocio referente ao CRUD de AvaliacaoProfessor
 * (GET, POST, PUT, DELETE)
 * Data: 29/05/2023
 * Autor: Caroline Portela
 * Versão: 1.0
 ***************************************************************************************************************************************************/

//Import do arquivo de configuração das variaveis, constantes e funções globais
var message = require('./modulo/config.js')

var avaliacaoProfessorDAO = require('../model/DAO/avaliacaoProfessorDAO.js')

const { request } = require('express')

const inserirAvaliacaoProfessor = async function (dadosAvaliacaoProfessor) {
    if (dadosAvaliacaoProfessor.resultado == '' || dadosAvaliacaoProfessor.resultado == undefined ||
        dadosAvaliacaoProfessor.id_professor == '' || dadosAvaliacaoProfessor.id_professor == undefined ||
        dadosAvaliacaoProfessor.id_criterio == '' || dadosAvaliacaoProfessor.id_criterio == undefined

    ) {
        return message.ERROR_REQUIRED_FIELDS
    } else {
        //Envia os dados para a model inserir no banco de dados
        let resultDadosAvaliacaoProfessor = await avaliacaoProfessorDAO.insertAvaliacaoProfessor(dadosAvaliacaoProfessor)

        //Valida se o banco de dados inseriu corretamente os dados
        if (resultDadosAvaliacaoProfessor) {

            let novaAvaliacaoProfessor = await avaliacaoProfessorDAO.selectLastId()

            let dadosAvaliacaoProfessorJSON = {}
            dadosAvaliacaoProfessorJSON.status = message.SUCESS_CREATED_ITEM.status
            dadosAvaliacaoProfessorJSON.avaliacoesAluno = novaAvaliacaoProfessor

            return dadosAvaliacaoProfessorJSON
        }
        else {
            return message.ERROR_INTERNAL_SERVER
        }

    }

}


const atualizarAvaliacaoProfessor = async function (dadosAvaliacaoProfessor, idAvaliacaoProfessor) {

    if (dadosAvaliacaoProfessor.resultado == '' || dadosAvaliacaoProfessor.resultado == undefined ||
        dadosAvaliacaoProfessor.id_professor == '' || dadosAvaliacaoProfessor.id_professor == undefined ||
        dadosAvaliacaoProfessor.id_criterio == '' || dadosAvaliacaoProfessor.id_criterio == undefined
    ) {
        return message.ERROR_REQUIRED_FIELDS
    } else if (idAvaliacaoProfessor == '' || idAvaliacaoProfessor == undefined || idAvaliacaoProfessor == isNaN(idAvaliacaoProfessor)) {
        return message.ERROR_INVALID_ID
    } else {
        //Adiciona o id do curso no JSON dos dados
        dadosAvaliacaoProfessor.id = idAvaliacaoProfessor

        let statusId = await avaliacaoProfessorDAO.selectAvaliacaoProfessorByID(idAvaliacaoProfessor)

        if (statusId) {
            //Encaminha os dados para a model do curso
            let resultDadosAvaliacaoProfessor = await avaliacaoProfessorDAO.updateAvaliacaoProfessor(dadosAvaliacaoProfessor);

            if (resultDadosAvaliacaoProfessor) {

                let dadosAvaliacaoProfessorJSON = {}

                dadosAvaliacaoProfessorJSON.status = message.SUCESS_UPDATED_ITEM.status
                dadosAvaliacaoProfessorJSON.message = message.SUCESS_UPDATED_ITEM.message
                dadosAvaliacaoProfessorJSON.dados = dadosAvaliacaoProfessorJSON
                return dadosAvaliacaoProfessorJSON
            } else
                return message.ERROR_INTERNAL_SERVER

        } else {
            return message.ERROR_NOT_FOUND
        }
    }

}



const deletarAvaliacaoProfessor = async function (idAvaliacaoProfessor) {

    let statusId = await avaliacaoProfessorDAO.selectAvaliacaoProfessorByID(idAvaliacaoProfessor);

    if (statusId) {

        if (idAvaliacaoProfessor == '' || idAvaliacaoProfessor == undefined || isNaN(idAvaliacaoProfessor)) {
            return message.ERROR_INVALID_ID; 
        } else {
            let resultDadosAvaliacaoProfessor = await avaliacaoProfessorDAO.deletarAvaliacaoProfessor(idAvaliacaoProfessor)

            if (resultDadosAvaliacaoProfessor) {
                return message.SUCESS_DELETED_ITEM
            } else {
                return message.ERROR_INTERNAL_SERVER 
            }
        }

    } else {
        return message.ERROR_NOT_FOUND 
    }
}
module.exports = {
    inserirAvaliacaoProfessor,
    deletarAvaliacaoProfessor,
    atualizarAvaliacaoProfessor
}