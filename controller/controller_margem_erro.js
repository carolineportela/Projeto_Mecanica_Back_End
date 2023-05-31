/***************************************************************************************************************************************************
 * Objetivo: Responsavel pela regra de negocio referente ao CRUD de Margem de Erros
 * (GET, POST, PUT, DELETE)
 * Data: 30/05/2023
 * Autor: Caroline Portela
 * Versão: 1.0
 ***************************************************************************************************************************************************/

//Import do arquivo de configuração das variaveis, constantes e funções globais
var message = require('./modulo/config.js')
var margemErroDAO = require('../model/DAO/margemErroDAO.js')

const { request } = require('express')

// const inserirMargemErro = async function (dadosMargemErro) {

//     if (dadosMargemErro.margem_de_erro == '' || dadosMargemErro.margem_de_erro == undefined ||
//         dadosMargemErro.id_criterio == '' || dadosMargemErro.id_criterio == undefined) {
//         return message.ERROR_REQUIRED_FIELDS
//     } else {

//         let resultDadosMargemErro = await margemErroDAO.insertErro(dadosMargemErro)

//         if (resultDadosMargemErro) {
//             let novoErro = await cursoDAO.selectLastId()

//             let dadosCursoJSON = {}
//             dadosCursoJSON.status = message.SUCESS_CREATED_ITEM.status
//             dadosCursoJSON.curso = novoCurso

//             return dadosCursoJSON
//         } else {
//             return message.ERROR_INTERNAL_SERVER
//         }
//     }
// }