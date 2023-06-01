/***************************************************************************************************************************************************
 * Objetivo: Responsavel pela regra de negocio referente ao CRUD de AvaliacaoAluno
 * (GET, POST, PUT, DELETE)
 * Data: 29/05/2023
 * Autor: Caroline Portela
 * Versão: 1.0
 ***************************************************************************************************************************************************/

//Import do arquivo de configuração das variaveis, constantes e funções globais
var message = require('./modulo/config.js')

var avaliacaoAlunoDAO = require('../model/DAO/avaliacaoAlunoDAO.js')

const { request } = require('express')


const inserirAvaliacaoAluno = async function (dadosAvaliacaoAluno) {
    if (dadosAvaliacaoAluno.resultado == '' || dadosAvaliacaoAluno.resultado == undefined ||
        dadosAvaliacaoAluno.id_aluno == '' || dadosAvaliacaoAluno.id_aluno == undefined ||
        dadosAvaliacaoAluno.id_criterio == '' || dadosAvaliacaoAluno.id_criterio == undefined

    ) {
        return message.ERROR_REQUIRED_FIELDS
    } else {
        //Envia os dados para a model inserir no banco de dados
        let resultDadosAvaliacaoAluno = await avaliacaoAlunoDAO.insertAvaliacaoAluno(dadosAvaliacaoAluno)

        //Valida se o banco de dados inseriu corretamente os dados
        if (resultDadosAvaliacaoAluno) {

            let novaAvaliacaoAluno = await avaliacaoAlunoDAO.selectLastId()

            let dadosAvaliacaoAlunoJSON = {}
            dadosAvaliacaoAlunoJSON.status = message.SUCESS_CREATED_ITEM.status
            dadosAvaliacaoAlunoJSON.avaliacoesAluno = novaAvaliacaoAluno

            return dadosAvaliacaoAlunoJSON
        }
        else {
            return message.ERROR_INTERNAL_SERVER
        }

    }

}

const atualzarAvaliacaoAluno = async function (dadosAvaliacaoAluno, id_aluno) {

    if (dadosAvaliacaoAluno.resultado == '' || dadosAvaliacaoAluno.resultado == undefined ||
        dadosAvaliacaoAluno.id_aluno == '' || dadosAvaliacaoAluno.id_aluno == undefined ||
        dadosAvaliacaoAluno.id_criterio == '' || dadosAvaliacaoAluno.id_criterio == undefined

    ) {
        return message.ERROR_REQUIRED_FIELDS
    } else if (id_aluno == '' || id_aluno == undefined || id_aluno == isNaN(id_aluno)) {
        return message.ERROR_INVALID_ID
    } else {
       
        dadosAvaliacaoAluno.id = id_aluno;

        let statusId = await avaliacaoAlunoDAO.selectAvaliacaoAlunoByID(id_aluno)

        if (statusId) {
       
            let resultDadosAvaliacaoAluno = await avaliacaoAlunoDAO.updateAvaliacaoAluno(dadosAvaliacaoAluno);

            if (resultDadosAvaliacaoAluno) {

                let dadosJSON = {}

                dadosJSON.status = message.SUCESS_UPDATED_ITEM.status
                dadosJSON.message = message.SUCESS_UPDATED_ITEM.message
                dadosJSON.avaliacaoAluno = dadosAvaliacaoAluno
                return dadosJSON
            } else
                return message.ERROR_INTERNAL_SERVER

        } else {
            return message.ERROR_NOT_FOUND
        }
    }

}


const deletarAvaliacaoAluno = async function (idAvaliacaoAluno) {

    let statusId = await avaliacaoAlunoDAO.selectAvaliacaoAlunoByID(idAvaliacaoAluno);

    if (statusId) {

        if (idAvaliacaoAluno == '' || idAvaliacaoAluno == undefined || isNaN(idAvaliacaoAluno)) {
            return message.ERROR_INVALID_ID; 
        } else {
            let resultDadosAvaliacaoAluno = await avaliacaoAlunoDAO.deleteAvaliacaoAluno(idAvaliacaoAluno)

            if (resultDadosAvaliacaoAluno) {
                return message.SUCESS_DELETED_ITEM
            } else {
                return message.ERROR_INTERNAL_SERVER 
            }
        }

    } else {
        return message.ERROR_NOT_FOUND 
    }
}


const getAvaliacaoAluno = async function () {
    let avaliacaoAlunoJSON = {}

    let avaliacoes = await avaliacaoAlunoDAO.selectAllAvaliacoesAlunos()

    if (avaliacoes) {

        avaliacaoAlunoJSON.status = message.SUCESS_REQUEST.status
        avaliacaoAlunoJSON.message = message.SUCESS_REQUEST.message
        avaliacaoAlunoJSON.quantidade =avaliacoes.length;
        avaliacaoAlunoJSON.avaliacao = avaliacoes

        return avaliacaoAlunoJSON
    } else {
        return message.ERROR_NOT_FOUND
    }
}

const getAvaliacaoAlunoPorId = async function (id) {

    if (id == '' || id == undefined || isNaN(id)) {
        return message.ERROR_INVALID_ID
    } else {
        let dadosAvaliacaoAlunoJSON = {}

        let dadosAvaliacaoAluno = await avaliacaoAlunoDAO.selectAvaliacaoAlunoByID(id)

        if (dadosAvaliacaoAluno) {
            dadosAvaliacaoAlunoJSON.status = message.SUCESS_REQUEST.status
            dadosAvaliacaoAlunoJSON.message = message.SUCESS_REQUEST.message
            dadosAvaliacaoAlunoJSON.avaliacao = dadosAvaliacaoAluno
            return dadosAvaliacaoAlunoJSON
        } else {
            return message.ERROR_NOT_FOUND
        }
    }
}

module.exports = {
    inserirAvaliacaoAluno,
    deletarAvaliacaoAluno,
    getAvaliacaoAlunoPorId,
    getAvaliacaoAluno,
    atualzarAvaliacaoAluno
}