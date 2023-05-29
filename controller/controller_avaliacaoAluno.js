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
    if (dadosAvaliacaoAluno.resultado == '' || dadosUsuario.resultado == undefined ||
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

const deletarAvaliacaoAluno = async function (idAvaliacaoAluno) {

    let statusId = await avaliacaoAlunoDAO.selectAvaliacaoAlunoByID(idAvaliacaoAluno);

    if (statusId) {

        if (idAvaliacaoAluno == '' || idAvaliacaoAluno == undefined || isNaN(idAvaliacaoAluno)) {
            return message.ERROR_INVALID_ID; 
        } else {
            let resultDadosAvaliacaoAluno = await avaliacaoAlunoDAO.deletarAvaliacaoAluno(idAvaliacaoAluno)

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
module.exports = {
    inserirAvaliacaoAluno,
    deletarAvaliacaoAluno
}