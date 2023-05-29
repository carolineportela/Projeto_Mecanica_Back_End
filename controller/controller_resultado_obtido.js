/***************************************************************************************************************************************************
 * Objetivo: Responsavel pela regra de negocio referente ao CRUD de resultado obtido
 * (GET, POST, PUT, DELETE)
 * Data: 29/05/2023
 * Autor: Caroline Portela
 * Versão: 1.0
 ***************************************************************************************************************************************************/

//Import do arquivo de configuração das variaveis, constantes e funções globais
var message = require('./modulo/config.js')
var semestreDAO = require('../model/DAO/semestreDAO.js')
var cursoDAO = require('../model/DAO/cursoDAO.js')