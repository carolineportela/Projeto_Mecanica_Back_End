/***************************************************************************************************************************************************
 * Objetivo: Responsavel pela regra de negocio referente ao CRUD de TURMAS  
 * (GET, POST, PUT, DELETE)
 * Data: 19/05/2023
 * Autor: Mateus Alves da Silva
 * Versão: 1.0
 ***************************************************************************************************************************************************/

//Import do arquivo de configuração das variaveis, constantes e funções globais
var message = require('./modulo/config.js')

var turmaDAO = require('../model/DAO/turmaDAO.js')
const { request } = require('express')

const inserirTurma = async function (dadosTurma) {

    if (dadosTurma.nome == '' || dadosTurma.nome == undefined || dadosTurma.nome > 150 ||
        dadosTurma.sigla == '' || dadosTurma.sigla == undefined || dadosTurma.sigla > 5 ||
        dadosTurma.id_curso == '' || dadosTurma.id_curso == undefined || isNaN(dadosTurma.id_curso)
    ) {

        return message.ERROR_REQUIRED_FIELDS

    } else {

        let verificacaoCurso = await cursoDAO.selectCursoByID(dadosTurma.id_curso)

        if (verificacaoCurso == false) {

            return message.ERROR_INVALID_ID

        } else {

            let resultDadosTurma = await turmaDAO.insertTurma(dadosTurma)

            if (resultDadosTurma) {

                let novaTurma = await turmaDAO.selectLastId()

                let dadosTurmaJSON = {}

                dadosTurmaJSON.status = message.SUCESS_CREATED_ITEM.status
                dadosTurmaJSON.message = message.SUCESS_CREATED_ITEM.message
                dadosTurmaJSON.turma = novaTurma

                return dadosTurmaJSON

            } else {
                return message.ERROR_INTERNAL_SERVER

            }
        }
    }
}

const atualizarTurma = async function (dadosTurma, id) {
    if (dadosTurma.nome == '' || dadosTurma.nome == undefined || dadosTurma.nome > 150 ||
        dadosTurma.sigla == '' || dadosTurma.sigla == undefined || dadosTurma.sigla > 5 ||
        dadosTurma.id_curso == '' || dadosTurma.id_curso == undefined || isNaN(dadosTurma.id_curso)
    ) {
        return message.ERROR_REQUIRED_FIELDS
        //Validação de id incorreto ou não informado
    } else if (id == '' || id == undefined || id == isNaN(id)) {
        return message.ERROR_INVALID_ID
    } else {
        //Adiciona o id da turma no JSON dos dados
        dadosTurma.id = id;

        let statusId = await turmaDAO.selectLastId()

        if (statusId) {
            //Encaminha os dados para a model 
            let resultDadosTurma = await turmaDAO.updateTurma(dadosTurma, id)

            if (resultDadosTurma) {

                let dadosTurmaJSON = {}
                dadosTurmaJSON.status = message.SUCCESS_UPDATED_ITEM.status
                dadosTurmaJSON.message = message.SUCCESS_UPDATED_ITEM.message
                dadosTurmaJSON.turma = dadosTurma
                return dadosTurmaJSON
            } else
                return message.ERROR_INTERNAL_SERVER

        } else {
            return message.ERROR_NOT_FOUND
        }
    }
}

const deletarTurma = async function (id) {
    let statusId = await turmaDAO.selectTurmaByID(id)

    if (statusId) {
        if (id == '' || id == undefined || isNaN(id)) {
            return message.ERROR_INVALID_ID; //Status code 400
        } else {
            let resultDadosTurma = await turmaDAO.deleteTurma(id)

            if (resultDadosTurma) {
                return message.SUCESS_DELETED_ITEM
            } else {
                return message.ERROR_INTERNAL_SERVER
            }
        }
    } else {
        return message.ERROR_NOT_FOUND
    }
}

const getTurmas = async function () {
    let dadosTurmaJSON = {};

    //chama a funcao do arquivo DAO que irá retornar todos os registros do Banco de dados
    let dadosTurma = await turmaDAO.selectAllTurmas()

    if (dadosTurma) {
        dadosTurmaJSON.status = message.SUCESS_REQUEST.status
        dadosTurmaJSON.message = message.SUCESS_REQUEST.message
        dadosTurmaJSON.quantidade = dadosAluno.length;
        dadosTurmaJSON.turmas = dadosTurma
        return dadosTurmaJSON
    } else {
        return message.ERROR_NOT_FOUND
    }
}

module.exports = {
    inserirTurma,
    atualizarTurma,
    deletarTurma,
    getTurmas
}