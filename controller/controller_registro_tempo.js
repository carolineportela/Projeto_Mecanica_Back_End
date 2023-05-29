/***************************************************************************************************************************************************
 * Objetivo: Responsavel pela regra de negocio referente ao CRUD de TEMPO  
 * (GET, POST, PUT, DELETE)
 * Data: 29/05/2023
 * Autor: Mateus Alves da Silva
 * Versão: 1.0
 ***************************************************************************************************************************************************/

//Import do arquivo de configuração das variaveis, constantes e funções globais
var message = require('./modulo/config.js')

var registroTempoDAO = require('../model/DAO/registroTempoDAO.js')
var tarefaDAO = require('../model/DAO/tarefaDAO.js')

const { request } = require('express')

const inserirRegistroTempo = async function (dadosRegistroTempo) {

    if (dadosRegistroTempo.data == '' || dadosRegistroTempo.data == undefined ||
        dadosRegistroTempo.hora_inicio == '' || dadosRegistroTempo.hora_inicio == undefined ||
        dadosRegistroTempo.hora_termino == '' || dadosRegistroTempo.hora_termino == undefined ||
        dadosRegistroTempo.tempo_intervalo == '' || dadosRegistroTempo.tempo_intervalo == undefined ||
        dadosRegistroTempo.observacao == '' || dadosRegistroTempo.observacao == undefined ||
        dadosRegistroTempo.id_tarefa == '' || dadosRegistroTempo.id_tarefa == undefined || isNaN(dadosRegistroTempo.id_tarefa)
    ) {
        return message.ERROR_REQUIRED_FIELDS
    } else {

        let verificacaoTarefa = await tarefaDAO.selectTarefaByID(dadosRegistroTempo.id_tarefa)

        if(verificacaoTarefa == false) {
            return message.ERROR_INVALID_ID
        } else {
            let resultDados = await registroTempoDAO.insertRegistroTempo(dadosRegistroTempo)

        if (resultDados) {

            let novoRegistro = await registroTempoDAO.selectLastId()

            let dadosJSON = {}

            dadosJSON.status = message.SUCESS_CREATED_ITEM.status
            dadosJSON.message = message.SUCESS_CREATED_ITEM.message
            dadosJSON.registro_tempo = novoRegistro

            return dadosJSON

        } else {

            return message.ERROR_INTERNAL_SERVER
            
        }
        }
    }
}

const atualizarTempo = async function (dadosRegistroTempo, idRegistroTempo) {
    if (dadosRegistroTempo.data == '' || dadosRegistroTempo.data == undefined ||
        dadosRegistroTempo.hora_inicio == '' || dadosRegistroTempo.hora_inicio == undefined ||
        dadosRegistroTempo.hora_termino == '' || dadosRegistroTempo.hora_termino == undefined ||
        dadosRegistroTempo.tempo_intervalo == '' || dadosRegistroTempo.tempo_intervalo == undefined ||
        dadosRegistroTempo.observacao == '' || dadosRegistroTempo.observacao == undefined ||
        dadosRegistroTempo.id_tarefa == '' || dadosRegistroTempo.id_tarefa == undefined || isNaN(dadosRegistroTempo.id_tarefa)
    ) {
        return message.ERROR_REQUIRED_FIELDS
    } else {
        dadosRegistro.id = idRegistro;

        let statusId = await registroTempoDAO.selectRegistroTempoByID(id)

        if (statusId) {
            
            let resultDadosTempo = await registroTempoDAO.updateRegistroTempo(dadosTempo, idRegistroTempo)

            if (resultDadosTempo) {

                let dadosTempoJSON = {}

                dadosTempoJSON.status = message.SUCESS_UPDATED_ITEM.status
                dadosTempoJSON.message = message.SUCESS_UPDATED_ITEM.message
                dadosTempoJSON.registro_tempo = dadosRegistroTempo
                return dadosTempoJSON
            } else
                return message.ERROR_INTERNAL_SERVER

        } else {
            return message.ERROR_NOT_FOUND
        }
    }
}

const deletarRegistroTempo = async function (idRegistroTempo) {

    let statusId = await registroTempoDAO.selectRegistroTempoByID(idRegistroTempo);

    if (statusId) {

        if (idRegistroTempo == '' || idRegistroTempo == undefined || isNaN(idRegistroTempo)) {
            return message.ERROR_INVALID_ID; 
        } else {
            let resultDadosRegistroTempo = await registroTempoDAO.deletarRegistroTempo(idRegistroTempo)

            if (resultDadosRegistroTempo) {
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
    inserirRegistroTempo,
    atualizarTempo,
    deletarRegistroTempo
}