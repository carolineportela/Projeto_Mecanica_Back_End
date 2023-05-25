/***************************************************************************************************************************************************
 * Objetivo: Responsavel pela regra de negocio referente ao CRUD de CURSOS  
 * (GET, POST, PUT, DELETE)
 * Data: 19/05/2023
 * Autor: Mateus Alves da Silva
 * Versão: 1.0
 ***************************************************************************************************************************************************/

//Import do arquivo de configuração das variaveis, constantes e funções globais
var message = require('./modulo/config.js')

var cursoDAO = require('../model/DAO/cursoDAO.js')
const {request} = require('express')

const inserirCurso = async function(dadosCurso) {

    if(dadosCurso.nome == '' || dadosCurso.nome == undefined || dadosCurso.nome.length > 150 ||
       dadosCurso.sigla == '' || dadosCurso.sigla == undefined || dadosCurso.sigla.length > 6 ||
       dadosCurso.descricao== '' || dadosCurso.descricao == undefined || dadosCurso.descricao.length > 300 ||
       dadosCurso.carga_horaria == '' || dadosCurso.carga_horaria == undefined
    ) {
        return message.ERROR_REQUIRED_FIELDS
    } else {

        let resultDadosCurso =  await cursoDAO.insertCurso(dadosCurso) 

        if(resultDadosCurso){
            let novoCurso = await cursoDAO.selectLastId()

            let dadosCursoJSON = {}
            dadosCursoJSON.status = message.SUCESS_CREATED_ITEM.status
            dadosCursoJSON.curso = novoCurso

            return dadosCursoJSON
        } else {
            return message.ERROR_INTERNAL_SERVER
        }
    }
}

const atualizarCurso = async function(dadosCurso, idCurso) {

}

const deletarCurso = async function(idCurso) {

}

const getCursos = async function() {

}

module.exports = {
    inserirCurso,
    atualizarCurso,
    deletarCurso,
    getCursos
}