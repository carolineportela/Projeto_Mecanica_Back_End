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

//Import das controllers
var controllerAluno = require('./controller/controller_aluno.js');
var controllerProfessor = require('./controller/controller_professor.js');
var controllerTipoUsuario = require('./controller/controller_tipoUsuario.js');
var controllerCurso = require('./controller/controller_curso.js')
var controllerTipoCriterio = require('./controller/controller_tipoCriterio.js');
var controllerTipoTarefa = require('./controller/controller_tipoTarefa.js');

/////////////////////////////////////////Tipo_Usuario//////////////////////////////////////////////


/********************************
* Objetivo : API de controle de TIPO_USUARIO
* Data : 25/05/2023
********************************/


//EndPoint: Post - Insere um tipo de usuario
app.post('/v1/mecanica/tipo/usuario', cors(), bodyParserJSON, async function (request, response) {

    let contentType = request.headers['content-type']

    if (String(contentType).toLowerCase() == 'application/json') {
        let dadosBody = request.body

        let resulDados = await controllerTipoUsuario.inserirTipoUsuario(dadosBody)

        response.status(resulDados.status)
        response.json(resulDados)
    } else {
        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(message.ERROR_INVALID_CONTENT_TYPE)
    }

});


//EndPoint: Get - Retorna todos os tipos de usuario
app.get('/v1/mecanica/tipos', cors(), async function (request, response) {

    //Recebe os dados da controller
    let dados = await controllerTipoUsuario.getTipoUsuario();

    response.status(dados.status)
    response.json(dados)

});

/////////////////////////////////////////Aluno//////////////////////////////////////////////


/********************************
* Objetivo : API de controle de ALUNO
* Data : 25/05/2023
********************************/


//EndPoint: Post - Insere um aluno novo 
app.post('/v1/mecanica/aluno', cors(), bodyParserJSON, async function (request, response) {
    let contentType = request.headers['content-type']

    if (String(contentType).toLowerCase() == 'application/json') {

        let dadosBody = request.body
        let resulDadosAluno = await controllerAluno.inserirAluno(dadosBody)

        response.status(resulDadosAluno.status)
        response.json(resulDadosAluno)
    } else {
        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(message.ERROR_INVALID_CONTENT_TYPE)
    }

});

//EndPoint: Delete - Exclui um aluno existente, filtrando pelo ID
app.delete('/v1/mecanica/aluno/:id', cors(), async function (request, response) {
    let idAluno = request.params.id

    let controllerAluno = require('./controller/controller_aluno.js')

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

        let dadosBody = request.body

        let resultDadosCurso = await controllerCurso.inserirCurso(dadosBody, idAluno)

        response.status(resultDadosCurso.status)
        response.json(resultDadosCurso)
    } else {
        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(message.ERROR_INVALID_CONTENT_TYPE)
    }


})

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
});

//EndPoint: Retorna todos os alunos
app.get('/v1/mecanica/aluno', cors(), async function (request, response) {
    let dadosAluno = await controllerAluno.getAlunos()

    response.status(dadosAluno.status)
    response.json(dadosAluno)
});

///////////////////////////////////////Curso//////////////////////////////////////////////////////

/********************************
* Objetivo : API de controle de CURSO
* Data : 22/05/2023
********************************/

//EndPoint: Post - Insere um novo curso
app.post('/v1/mecanica/curso', cors(), bodyParserJSON, async function (request, response) {

    let contentType = request.headers['content-type']

    if (String(contentType).toLowerCase() == 'application/json') {
        //Recebe os dados encaminhados na requisição
        let dadosBody = request.body

        let resultDadosCurso = await controllerCurso.inserirCurso(dadosBody);

        response.status(resultDadosCurso.status)
        response.json(resultDadosCurso)
       
    } else {
        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(message.ERROR_INVALID_CONTENT_TYPE)
    }

});

//EndPoint: Atualiza curso pelo id
app.put('/v1/mecanica/curso/:id', cors(), bodyParserJSON, async function (request, response) {
         //reccebe o content-type da requisicao
         let contentType = request.headers['content-type'];

        //Validacao para receber dados apenas no formato JSON
        if (String(contentType).toLowerCase() == 'application/json') {
        //Recebe o id do curso pelo parametro
        let idCurso = request.params.id;

        //Recebe os dados do curso encaminhado no corpo da requisição
        let dadosBody = request.body;

        //Encaminha os dados para a controller
        let resultDadosCurso = await controllerCurso.atualizarCurso(dadosBody, idCurso);

        response.status(resultDadosCurso.status)
        response.json(resultDadosCurso)

    } else {
        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(message.ERROR_INVALID_CONTENT_TYPE)
    }

});

//EndPoint: Exclui um curso existente, filtrando pelo ID
app.delete('/v1/mecanica/curso/:id', cors(), bodyParserJSON, async function (request, response) {
    
    let idCurso = request.params.id;

    //Recebe os dados do curso encaminhado no corpo da requisição 
    let resultDadosCurso = await controllerCurso.deletarCurso(idCurso)

    if (resultDadosCurso) {
       response.json(resultDadosCurso);
       response.status(200);
   } else {
       response.json();
       response.status(404);
   }
});

//EndPoint: Retorna todos os cursos
app.get('/v1/mecanica/cursos', cors(), bodyParserJSON, async function (request, response) {
 
     //Recebe os dados da controller do curso
     let dadosCurso = await controllerCurso.getCursos()

     response.status(dadosCurso.status)
     response.json(dadosCurso)
});

//EndPoint: Retorna o curso pelo id
app.get('/v1/mecanica/curso/id/:id', cors(), bodyParserJSON, async function(request, response) {

    let id = request.params.id

    let dadosCurso = await controllerCurso.getCursoPorID(id)

    response.status(dadosCurso.status)
    response.json(dadosCurso)
})


///////////////////////////////////////Professor///////////////////////////////////////////////////

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



app.listen(8080, function () {
    console.log('Servidor aguardando requisição na porta 8080')
})

/********************************
* Objetivo : API de controle de TURMA
* Data : 22/05/2023
********************************/

//EndPoint: Post - Insere uma nova turma



/********************************
* Objetivo : API de controle de tipo criterio
* Data : 27/05/2023
********************************/

//EndPoint: Post - Insere um tipo de CRITERIO
app.post('/v1/mecanica/tipo/criterio', cors(), bodyParserJSON, async function (request, response) {

    let contentType = request.headers['content-type']

    if (String(contentType).toLowerCase() == 'application/json') {
        let dadosBody = request.body

        let resulDados = await controllerTipoCriterio.inserirTipoCriterio(dadosBody)

        response.status(resulDados.status)
        response.json(resulDados)
    } else {
        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(message.ERROR_INVALID_CONTENT_TYPE)
    }

});

//EndPoint: Get - Retorna todos os tipos de CRITERIOS
app.get('/v1/mecanica/tipos/criterios', cors(), async function (request, response) {

    //Recebe os dados da controller
    let dados = await controllerTipoCriterio.getTipoCriterio();

    response.status(dados.status)
    response.json(dados)

});

//EndPoint: Exclui um tipo de criterio existente, filtrando pelo ID
app.delete('/v1/mecanica/criterio/:id', cors(), bodyParserJSON, async function (request, response) {
    
    let idCriterio = request.params.id;

    //Recebe os dados do tipo criterio encaminhado no corpo da requisição 
    let resultDadosTipoCriterio = await controllerTipoCriterio.deletarTipoCriterio(idCriterio)

    if (resultDadosTipoCriterio) {
       response.json(resultDadosTipoCriterio);
       response.status(200);
   } else {
       response.json();
       response.status(404);
   }
});

//EndPoint: Atualiza um tipo de criterio pelo id
app.put('/v1/mecanica/criterio/:id', cors(), bodyParserJSON, async function (request, response) {
    //recebe o content-type da requisicao
    let contentType = request.headers['content-type'];

   //Validacao para receber dados apenas no formato JSON
   if (String(contentType).toLowerCase() == 'application/json') {

   //Recebe o id do tipo criterio pelo parametro
   let idCriterio = request.params.id;

   //Recebe os dados do tipo criterio  encaminhado no corpo da requisição
   let dadosBody = request.body;

   //Encaminha os dados para a controller
   let resultDadosTipoCriterio = await controllerTipoCriterio.atualizarTipoCriterio(dadosBody, idCriterio);

   response.status(resultDadosTipoCriterio.status)
   response.json(resultDadosTipoCriterio)

} else {
   response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
   response.json(message.ERROR_INVALID_CONTENT_TYPE)
}

});


/********************************
* Objetivo : API de controle de tipos tarefas
* Data : 27/05/2023
********************************/


//EndPoint: Post - Insere um tipo de TAREFA
app.post('/v1/mecanica/tipo/tarefa', cors(), bodyParserJSON, async function (request, response) {

    let contentType = request.headers['content-type']

    if (String(contentType).toLowerCase() == 'application/json') {
        let dadosBody = request.body

        let resulDados = await controllerTipoTarefa.inserirTipoTarefa(dadosBody)

        response.status(resulDados.status)
        response.json(resulDados)
    } else {
        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(message.ERROR_INVALID_CONTENT_TYPE)
    }

});

//EndPoint: Get - Retorna todos os tipos de TAREFAS
app.get('/v1/mecanica/tipos/tarefas', cors(), async function (request, response) {

    //Recebe os dados da controller
    let dados = await controllerTipoTarefa.getTipoTarefa()

    response.status(dados.status)
    response.json(dados)

});

//EndPoint: Exclui um tipo de tarefa existente, filtrando pelo ID
app.delete('/v1/mecanica/tarefa/:id', cors(), bodyParserJSON, async function (request, response) {
    
    let idTipoTarefa = request.params.id;
    
    let resultDadosTipoTarefa = await controllerTipoTarefa.deletarTipoTarefa(idTipoTarefa)

    if (resultDadosTipoTarefa) {
       response.json(resultDadosTipoTarefa);
       response.status(200);
   } else {
       response.json();
       response.status(404);
   }
});

//EndPoint: Atualiza um tipo de tarefa pelo id
app.put('/v1/mecanica/tarefa/:id', cors(), bodyParserJSON, async function (request, response) {
    //recebe o content-type da requisicao
    let contentType = request.headers['content-type'];

   //Validacao para receber dados apenas no formato JSON
   if (String(contentType).toLowerCase() == 'application/json') {


   let idTipoTarefa = request.params.id;

   //Recebe os dados do tipo criterio  encaminhado no corpo da requisição
   let dadosBody = request.body;

   //Encaminha os dados para a controller
   let resultDadosTipoTarefa = await controllerTipoTarefa.atualizarTipoTarefa(dadosBody, idTipoTarefa);

   response.status(resultDadosTipoTarefa.status)
   response.json(resultDadosTipoTarefa)

} else {
   response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
   response.json(message.ERROR_INVALID_CONTENT_TYPE)
}

});