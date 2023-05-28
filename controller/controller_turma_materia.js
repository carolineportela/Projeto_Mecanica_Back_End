/***************************************************************************************************************************************************
 * Objetivo: Responsavel pela regra de negocio referente ao CRUD de turma  e materia
 * (GET, POST, PUT, DELETE)
 * Autor: Caroline Portela
 * Versão: 1.0
 ***************************************************************************************************************************************************/

//Import do arquivo de configuração das variaveis, constantes e funções globais
var message = require('./modulo/config.js')
var turmaMateria = require('../model/DAO/turmaMateriaDAO.js')

const { request } = require('express')

const inserirTurmaMateria = async function (dadosTurmaMateria) {

    if (dadosTurmaMateria.id_turma == '' || dadosTurmaMateria.id_turma == undefined ||
        dadosTurmaMateria.id_materia == '' || dadosTurmaMateria.id_materia == undefined
    ) {
        return message.ERROR_REQUIRED_FIELDS
    } else {

        let resultDadosTurmaMateria = await turmaMateria.insertTurmaMateria(dadosTurmaMateria)

        if (resultDadosTurmaMateria) {
            let novaTurmaMateria = await turmaMateria.selectLastId()

            let dadosTurmaMateriaJSON = {}
            dadosTurmaMateriaJSON.status = message.SUCESS_CREATED_ITEM.status
            dadosTurmaMateriaJSON.turmaMateria = novaTurmaMateria

            return dadosTurmaMateriaJSON
        } else {
            return message.ERROR_INTERNAL_SERVER
        }
    }
}

module.exports = {
    inserirTurmaMateria
}