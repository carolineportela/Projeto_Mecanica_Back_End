/***************************************************************************************************************************************************
 * Objetivo: Responsavel pela regra de negocio referente ao CRUD de Semestre
 * (GET, POST, PUT, DELETE)
 * Data: 29/05/2023
 * Autor: Caroline Portela
 * Versão: 1.0
 ***************************************************************************************************************************************************/

//Import do arquivo de configuração das variaveis, constantes e funções globais
var message = require('./modulo/config.js')
var semestreDAO = require('../model/DAO/semestreDAO.js')
var cursoDAO = require('../model/DAO/cursoDAO.js')

const { request } = require('express')

const inserirSemestre = async function (dadosSemestre) {

    if (
        dadosSemestre.numero == '' || dadosSemestre.numero == undefined ||
        dadosSemestre.id_curso == '' || dadosSemestre.id_curso == undefined 
     
    ) {
        return message.ERROR_REQUIRED_FIELDS
    } else {
        let verificacaoCurso = await cursoDAO.selectCursoByID(dadosSemestre.id_mcurso)

        if (verificacaoCurso == false) {
            return message.ERROR_INVALID_ID
        }
        else {

            let resultDadosSemestre = await semestreDAO.insertSemestre(dadosSemestre)

            if (resultDadosSemestre) {
                let novoSemestre = await semestreDAO.selectLastId()

                let dadosSemestreJSON = {}
                dadosSemestreJSON.status = message.SUCESS_CREATED_ITEM.status
                dadosSemestreJSON.semestre = novoSemestre

                return dadosSemestreJSON
            } else {
                return message.ERROR_INTERNAL_SERVER
            }
        }
    }
}

const atualizarSemestre = async function (dadosSemestre, idSemestre) {

    if (
        dadosSemestre.numero == '' || dadosSemestre.numero == undefined ||
        dadosSemestre.id_curso == '' || dadosSemestre.id_curso == undefined    
    ) {
        return message.ERROR_REQUIRED_FIELDS
    } else if (idSemestre == '' || idSemestre == undefined || idSemestre == isNaN(idSemestre)) {
        return message.ERROR_INVALID_ID
    } else {

        dadosSemestre.id = idSemestre;

        let statusId = await semestreDAO.selectSemestreByID(idSemestre)

        if (statusId) {
            //Encaminha os dados para a model 
            let resultDadosSemestre = await semestreDAO.updateSemestre(dadosSemestre);

            if (resultDadosSemestre) {

                let dadosSemestreJSON = {}

                dadosSemestreJSON.status = message.SUCESS_UPDATED_ITEM.status
                dadosSemestreJSON.message = message.SUCESS_UPDATED_ITEM.message
                dadosSemestreJSON.semestre = dadosSemestre
                return dadosSemestreJSON
            } else
                return message.ERROR_INTERNAL_SERVER

        } else {
            return message.ERROR_NOT_FOUND
        }
    }

}

const deletarSemestre = async function (idSemestre) {

    let statusId = await semestreDAO.selectSemestreByID(idSemestre);

    if (statusId) {

        if (idSemestre == '' || idSemestre == undefined || isNaN(idSemestre)) {
            return message.ERROR_INVALID_ID; 
        } else {
            let resultDadosSemestre = await semestreDAO.deleteSemestre(idSemestre)

            if (resultDadosSemestre) {
                return message.SUCESS_DELETED_ITEM
            } else {
                return message.ERROR_INTERNAL_SERVER 
            }
        }

    } else {
        return message.ERROR_NOT_FOUND 
    }
}

const getSemestre = async function () {
    let semestreJSON = {}

    let semestres = await semestreDAO.selectAllSemestres()

    if (semestres) {

        semestreJSON.status = message.SUCESS_REQUEST.status
        semestreJSON.message = message.SUCESS_REQUEST.message
        semestreJSON.quantidade =  semestres.length;
        semestreJSON.semestre = semestres

        return semestreJSON

    } else {
        return message.ERROR_NOT_FOUND
    }
}

const getSemestreId = async function (id) {

    if(id == '' || id == undefined || isNaN(id)) {
        return message.ERROR_INVALID_ID
    } else {
        let dadosSemestreJSON = {}

        let dadosSemestre = await semestreDAO.selectSemestreByID(id)

        if(dadosSemestre) {
            dadosSemestreJSON.status = message.SUCESS_REQUEST.status
            dadosSemestreJSON.message = message.SUCESS_REQUEST.message
            dadosSemestreJSON.semestre = dadosSemestr
            return dadosSemestreJSON
        } else {
            return message.ERROR_NOT_FOUND
        }
    }
}

module.exports = {
    inserirSemestre,
    atualizarSemestre,
    getSemestre,
    deletarSemestre,
    getSemestreId
}