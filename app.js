/* ***************************************************************************************************************************************************
 * Objetivo : API para integração entre back e banco de dados (GET,POST,PUT,DELETE)
 * Autor : Caroline Portela
 * Data 22/05
 * Versão : 1.0 
 *************************************************************************************************************************************************** */

//Import das bibliotecas para API
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { application } = require('express');

//Import do arquivo de configuração das variaveis,constantes e funcoes globais.
var message = require('./controller/modulo/config.js')

//Cria um objeto conforme a classe do express
const app = express();

app.use((request, response, next) => {
    //Define quem poderá acessar a API()
    response.header('Access-Control-Allow-Origin', '*');

    //Define quais metodos serão utilizados na API
    response.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');

    //Atribui as permissões as cors
    app.use(cors());

    next();

})

//Define que os dados que irão chegar no body da requisição será no padrão JSON
const bodyParserJSON = bodyParser.json();

<<<<<<< HEAD
var controllerTipoUsuario = require('./controller/controller_tipoUsuario.js');
var controllerCurso = require('./controller/controller_curso.js')


/////////////////////////////////////////Tipo_Usuario//////////////////////////////////////////////
//EndPoint: Post - Insere um tipo de usuario
app.post('/v1/mecanica/tipo/usuario', cors(), bodyParserJSON, async function (request, response) { 

    let contentType =  request.headers['content-type']

    if(String(contentType).toLowerCase() == 'application/json') {
        let dadosBody = request.body

        let resulDados = await controllerTipoUsuario.inserirTipoUsuario(dadosBody)
=======
var controllerAluno = require('./controller/controller_aluno.js');
var controllerProfessor = require('./controller/controller_professor.js');

//EndPoint: Post - Insere um aluno novo 
app.post('/v1/mecanica/aluno', cors(), bodyParserJSON, async function (request, response) {
    let contentType = request.headers['content-type']

    if (String(contentType).toLowerCase() == 'application/json') {

        let dadosBody = request.body
        let resulDadosAluno = await controllerAluno.inserirAluno(dadosBody)
>>>>>>> b9f1f6b2a9d1584e04a89cc6d49dc424383e4c89

        response.status(resulDados.status)
        response.json(resulDados)
    } else {
        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(message.ERROR_INVALID_CONTENT_TYPE)
    }

});

<<<<<<< HEAD
//EndPoint: Get - Retorna todos os tipos de usuario
app.get('/v1/mecanica/tipos', cors(),  async function (request, response) { 
=======
//EndPoint: Delete - Exclui um aluno existente, filtrando pelo ID
app.delete('/v1/mecanica/aluno/:id', cors(), async function (request, response) {
    let idAluno = request.params.id
>>>>>>> b9f1f6b2a9d1584e04a89cc6d49dc424383e4c89

    let dados = await controllerTipoUsuario.getTipoUsuario()

<<<<<<< HEAD
    response.json(dados)
});

///////////////////////////////////////Curso//////////////////////////////////////////////////////

//EndPoint: Post - Insere um novo curso
app.post('v1/mecanica/curso', cors(), bodyParserJSON, async function (request, response) {
    
    let contentType =  request.headers['content-type']

    if(String(contentType).toLowerCase() == 'application/json') {
=======
    let resultDadosAluno = await controllerAluno.deletarAluno(idAluno)

    if (resultDadosAluno) {
        response.json(resultDadosAluno)
        response.status(message.SUCESS_DELETED_ITEM.status)
    } else {
        response.json()
        response.status(message.ERROR_NOT_FOUND.status)
    }
});

//EndPoint: Put - Atualiza um aluno existente, filtrando pelo ID
app.put('/v1/mecanica/aluno/:id', cors(), bodyParserJSON, async function (request, response) {
    let contentType = request.headers['content-type']

    if (String(contentType).toLowerCase() == 'application/json') {
        let idAluno = request.params.id

>>>>>>> b9f1f6b2a9d1584e04a89cc6d49dc424383e4c89
        let dadosBody = request.body

        let resultDadosCurso = await  controllerCurso.inserirCurso(dadosBody)

        response.status(resultDadosCurso.status)
        response.json(resultDadosCurso)
    } else {
        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(message.ERROR_INVALID_CONTENT_TYPE)
    }

<<<<<<< HEAD
})


=======
//EndPoint: Retorna todos os aluno
app.get('/v1/mecanica/aluno', cors(), async function (request, response) {
    let dadosAluno = await controllerAluno.getAlunos()

    response.status(dadosAluno.status)
    response.json(dadosAluno)
});

//EndPoint: Retorna o aluno filtrando pelo ID 
app.get('/v1/mecanica/aluno/id/:id', cors(), async function (request, response) {
    let idAluno = request.params.id

    let dadosAluno = await controllerAluno.getAlunoPorID(idAluno)

    response.status(dadosAluno.status)
    response.json(dadosAluno)
});

//EndPoint: Retorna o aluno filtrando pelo nome
app.get('/v1/mecanica/aluno/nome/:nome', cors(), async function (request, response) {

    let nome = request.params.nome;


    let dadosAluno = await controllerAluno.getBuscarAlunoNome(nome);

    if (dadosAluno) {
        response.json(dadosAluno);
        response.status(200);
    } else {
        response.json();
        response.status(404);
    }
})

///////////////////////////////////////////////////////////////////////////////////////////

/********************************
* Objetivo : API de controle de PROFESSOR
* Data : 22/05/2023
********************************/

//EndPoint: Post - INSERE um professor novo 
app.post('/v1/mecanica/professor', cors(), bodyParserJSON, async function (request, response) {
    let contentType = request.headers['content-type']

    if (String(contentType).toLowerCase() == 'application/json') {

        let dadosBody = request.body
        let resultDadosProfessor = await controllerProfessor.inserirProfessor(dadosBody)

        response.status(resultDadosProfessor.status)
        response.json(resultDadosProfessor)
    } else {
        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(message.ERROR_INVALID_CONTENT_TYPE)
    }
});

//EndPoint: Delete - EXCLUI um professor existente filtrado pelo ID.
app.delete('/v1/mecanica/professor/:id', cors(), async function (request, response) {
    let idProfessor = request.params.id

    let controllerProfessor = require('./controller/controller_professor.js')

    let resultDadosProfessor = await controllerProfessor.deletarProfessor(idProfessor)

    if (resultDadosProfessor) {
        response.json(resultDadosProfessor)
        response.status(message.SUCESS_DELETED_ITEM.status)
    } else {
        response.json()
        response.status(message.ERROR_NOT_FOUND.status)
    }
});

//EndPoint: Put - ATUALIZA um professor existente, filtrando pelo ID.
app.put('/v1/mecanica/professor/:id', cors(), bodyParserJSON, async function (request, response) {
    let contentType = request.headers['content-type']

    if (String(contentType).toLowerCase() == 'application/json') {

        let idProfessor = request.params.id

        let dadosBody = request.body

        let resultDadosProfessor = await controllerProfessor.atualizarProfessor(dadosBody, idProfessor)

        response.status(resultDadosProfessor.status)
        response.json(resultDadosProfessor)
    } else {
        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(message.ERROR_INVALID_CONTENT_TYPE)
    }

});

//EndPoint: Retorna o professor filtrando pelo ID 
app.get('/v1/mecanica/professor/id/:id', cors(), async function (request, response) {
    let idProfessor = request.params.id

    let dadosProfessor = await controllerProfessor.getProfessorPorID(idProfessor)

    response.status(dadosProfessor.status)
    response.json(dadosProfessor)
});


//EndPoint: Retorna todos os professores
app.get('/v1/mecanica/professor', cors(), async function (request, response) {
    let dadosProfessor = await controllerProfessor.getProfessores()

    response.status(dadosProfessor.status)
    response.json(dadosProfessor)
});
>>>>>>> b9f1f6b2a9d1584e04a89cc6d49dc424383e4c89










app.listen(8080, function() {
    console.log('Servidor aguardando requisição na porta 8080')
})