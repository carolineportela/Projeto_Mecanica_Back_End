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
var controllerMateria = require('./controller/controller_materia.js');
var controllerTurma = require('./controller/controller_turma.js');
var controllerTurmaMateria = require('./controller/controller_turma_materia.js')
var controllerUsuario = require('./controller/controller_usuario.js');
var controllerTarefa = require('./controller/controller_tarefa.js');
var controllerCriterio = require('./controller/controller_criterio.js');
var controllerSemestre =  require('./controller/controller_semestre.js');
var controllerRegistroTempo =  require('./controller/controller_registro_tempo.js');
var controllerAvaliacaoAluno =  require('./controller/controller_avaliacaoAluno.js');
var controllerAvaliacaoProfessor =  require('./controller/controller_avaliacao_professor.js');
var controllerResultadoObtido =  require('./controller/controller_resultado_obtido.js');
var controllerTurmaMateria = require('./controller/controller_turma_materia.js');
var controllerAlunoTarefa = require('./controller/controller_aluno_tarefa.js');

/////////////////////////////////////////Tipo_Usuario//////////////////////////////////////////////


/********************************
* Objetivo : API de controle de TIPO_USUARIO
* Data : 25/05/2023
********************************/


//EndPoint: Post - Insere um TIPO de usuario
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

/////////////////////////////////////////Usuario//////////////////////////////////////////////

//EndPoint: Post - Insere um  usuario
app.post('/v1/mecanica/usuario', cors(), bodyParserJSON, async function (request, response) {

    let contentType = request.headers['content-type']

    if (String(contentType).toLowerCase() == 'application/json') {
        let dadosBody = request.body

        let resulDados = await controllerUsuario.inserirUsuario(dadosBody)

        response.status(resulDados.status)
        response.json(resulDados)
    } else {
        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(message.ERROR_INVALID_CONTENT_TYPE)
    }

});

//EndPoint: Get - Retorna todos os usuario
app.get('/v1/mecanica/usuarios', cors(), async function (request, response) {

    //Recebe os dados da controller
    let dados = await controllerUsuario.getUsuario()

    response.status(dados.status)
    response.json(dados)

});

//EndPoint: Exclui um usuario existente, filtrando pelo ID
app.delete('/v1/mecanica/usuario/:id', cors(), bodyParserJSON, async function (request, response) {
    
    let idUsuario = request.params.id;

    let resultDadosUsuario = await controllerUsuario.deletarUsuario(idUsuario)

    if (resultDadosUsuario) {
       response.json(resultDadosUsuario);
       response.status(200);
   } else {
       response.json();
       response.status(404);
   }
});


//EndPoint: Atualiza usuario pelo id
app.put('/v1/mecanica/usuario/:id', cors(), bodyParserJSON, async function (request, response) {
    //reccebe o content-type da requisicao
    let contentType = request.headers['content-type'];


   if (String(contentType).toLowerCase() == 'application/json') {

   let idUsuario = request.params.id;

   let dadosBody = request.body;

   //Encaminha os dados para a controller
   let resultDadosUsuario = await controllerUsuario.atualizarUsuario(dadosBody, idUsuario);

   response.status(resultDadosUsuario.status)
   response.json(resultDadosUsuario)

} else {
   response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
   response.json(message.ERROR_INVALID_CONTENT_TYPE)
}

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
//teste
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

/////////////////////////////////////////Turma/////////////////////////////////////////////

/********************************
* Objetivo : API de controle de TURMA
* Data : 22/05/2023
********************************/

//EndPoint: Post - Insere uma nova turma
app.post('/v1/mecanica/turma', cors(), bodyParserJSON, async function (request, response) {

    let contentType = request.headers['content-type']

    if (String(contentType).toLowerCase() == 'application/json') {
        //Recebe os dados encaminhados na requisição
        let dadosBody = request.body

        let resultDadosTurma = await controllerTurma.inserirTurma(dadosBody);

        response.status(resultDadosTurma.status)
        response.json(resultDadosTurma)
       
    } else {
        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(message.ERROR_INVALID_CONTENT_TYPE)
    }

});

//EndPoint: Put -  Atualiza turma pelo id
app.put('/v1/mecanica/turma/:id', cors(), bodyParserJSON, async function (request, response) {
    //reccebe o content-type da requisicao
    let contentType = request.headers['content-type'];

   //Validacao para receber dados apenas no formato JSON
   if (String(contentType).toLowerCase() == 'application/json') {
   //Recebe o id da turma pelo parametro
   let idTurma = request.params.id;

   //Recebe os dados do curso encaminhado no corpo da requisição
   let dadosBody = request.body;

   //Encaminha os dados para a controller
   let resultDadosTurma = await controllerTurma.atualizarTurma(dadosBody, idTurma);

   response.status(resultDadosTurma.status)
   response.json(resultDadosTurma)

} else {
   response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
   response.json(message.ERROR_INVALID_CONTENT_TYPE)
}

});

//EndPoint: Exclui uma turma existente, filtrando pelo ID
app.delete('/v1/mecanica/turma/:id', cors(), bodyParserJSON, async function (request, response) {
    
    let idTurma = request.params.id;

    let resultDadosTurma = await controllerTurma.deletarTurma(idTurma)

    if (resultDadosTurma) {
       response.json(resultDadosTurma);
       response.status(200);
   } else {
       response.json();
       response.status(404);
   }
});

//EndPoint: Retorna todas as turmas
app.get('/v1/mecanica/turmas', cors(), bodyParserJSON, async function (request, response) {
 
    //Recebe os dados da controller da turma
    let dadosTurma = await controllerTurma.getTurmas()

    response.status(dadosTurma.status)
    response.json(dadosTurma)
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

        let resultDadosAluno = await controllerAluno.inserirAluno(dadosBody, idAluno)

        response.status(resultDadosAluno.status)
        response.json(resultDadosAluno)
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


/////////////////////////////////////////Materia//////////////////////////////////////////////

/********************************
* Objetivo : API de controle de Materia
* Data : 27/05/2023
********************************/

//EndPoint: Post - Insere uma nova materia
app.post('/v1/mecanica/materia', cors(), bodyParserJSON, async function (request, response) {

    let contentType = request.headers['content-type']

    if (String(contentType).toLowerCase() == 'application/json') {
        //Recebe os dados encaminhados na requisição
        let dadosBody = request.body

        let resultDadosMateria = await controllerMateria.inserirMateria(dadosBody);

        response.status(resultDadosMateria.status)
        response.json(resultDadosMateria)
       
    } else {
        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(message.ERROR_INVALID_CONTENT_TYPE)
    }

});

//EndPoint: Atualiza a materia pelo id
app.put('/v1/mecanica/materia/:id', cors(), bodyParserJSON, async function (request, response) {

    let contentType = request.headers['content-type'];

   if (String(contentType).toLowerCase() == 'application/json') {

   let idCurso = request.params.id;

   let dadosBody = request.body;

   //Encaminha os dados para a controller
   let resultDadosMateria = await controllerMateria.atualizarMateria(dadosBody, idCurso);

   response.status(resultDadosMateria.status)
   response.json(resultDadosMateria)

} else {
   response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
   response.json(message.ERROR_INVALID_CONTENT_TYPE)
}

});

//EndPoint: Exclui uma materia existente, filtrando pelo ID
app.delete('/v1/mecanica/materia/:id', cors(), bodyParserJSON, async function (request, response) {
    
    let idMateria = request.params.id;

    //Recebe os dados da materia encaminhado no corpo da requisição 
    let resultDadosMateria = await controllerMateria.deletarMateria(idMateria)

    if (resultDadosMateria) {
       response.json(resultDadosMateria);
       response.status(200);
   } else {
       response.json();
       response.status(404);
   }
});

//EndPoint: Retorna todas materias
app.get('/v1/mecanica/materias', cors(), bodyParserJSON, async function (request, response) {
 
    //Recebe os dados da controller da materia
    let dadosMateria = await controllerMateria.getMaterias()

    response.status(dadosMateria.status)
    response.json(dadosMateria)
});

//EndPoint: Retorna a materia pelo id
app.get('/v1/mecanica/materia/id/:id', cors(), bodyParserJSON, async function(request, response) {

   let id = request.params.id

   let dadosMateria = await controllerMateria.getMateriaPorId(id)

   response.status(dadosMateria.status)
   response.json(dadosMateria)
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

//EndPoint: Delete - EXCLUIR um professor existente filtrado pelo ID.
app.delete('/v1/mecanica/professor/:id', cors(), bodyParserJSON, async function (request, response) {
    let idProfessor = request.params.id

    let resultDadosProfessor = await controllerProfessor.deletarProfessor(idProfessor)

    if (resultDadosProfessor) {
        response.json(resultDadosProfessor)
        response.status(200)
    } else {
        response.json()
        response.status(404)
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
app.delete('/v1/mecanica/tipo/criterio/:id', cors(), bodyParserJSON, async function (request, response) {
    
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

/////////////////////////////////////////Tipo Tarefas//////////////////////////////////////////////


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
app.delete('/v1/mecanica/tipo/tarefa/:id', cors(), bodyParserJSON, async function (request, response) {
    
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
app.put('/v1/mecanica/tipo/tarefa/:id', cors(), bodyParserJSON, async function (request, response) {
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

/////////////////////////////////////////Tarefa//////////////////////////////////////////////

/********************************
* Objetivo : API de controle de  tarefas
* Data : 27/05/2023
********************************/


//EndPoint: Post - Insere uma nova tarefa
app.post('/v1/mecanica/tarefa', cors(), bodyParserJSON, async function (request, response) {

    let contentType = request.headers['content-type']

    if (String(contentType).toLowerCase() == 'application/json') {
        //Recebe os dados encaminhados na requisição
        let dadosBody = request.body

        let resultDadosTarefa = await controllerTarefa.inserirTarefa(dadosBody);

        response.status(resultDadosTarefa.status)
        response.json(resultDadosTarefa)
       
    } else {
        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(message.ERROR_INVALID_CONTENT_TYPE)
    }

});

//EndPoint: Atualiza tarefa por id
app.put('/v1/mecanica/tarefa/:id', cors(), bodyParserJSON, async function (request, response) {
         //reccebe o content-type da requisicao
         let contentType = request.headers['content-type'];

        //Validacao para receber dados apenas no formato JSON
        if (String(contentType).toLowerCase() == 'application/json') {

        let idTarefa= request.params.id;
   
        let dadosBody = request.body;

        //Encaminha os dados para a controller
        let resultDadosTarefa = await controllerTarefa.atualizarTarefa(dadosBody, idTarefa);

        response.status(resultDadosTarefa.status)
        response.json(resultDadosTarefa)

    } else {
        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(message.ERROR_INVALID_CONTENT_TYPE)
    }

});

//EndPoint: Exclui uma tarefa existente, filtrando pelo ID
app.delete('/v1/mecanica/tarefa/:id', cors(), bodyParserJSON, async function (request, response) {
    
    let idTarefa = request.params.id;

    //Recebe os dados da tarefa encaminhado no corpo da requisição 
    let resultDadosTarefa = await controllerTarefa.deletarTarefa(idTarefa)

    if (resultDadosTarefa) {
       response.json(resultDadosTarefa);
       response.status(200);
   } else {
       response.json();
       response.status(404);
   }
});

//EndPoint: Retorna todas tarefas
app.get('/v1/mecanica/tarefas', cors(), bodyParserJSON, async function (request, response) {
 
     //Recebe os dados da controller do curso
     let dadosCurso = await controllerCurso.getCursos()

     response.status(dadosCurso.status)
     response.json(dadosCurso)
});

//EndPoint: Retorna a tarefa por id
app.get('/v1/mecanica/tarefa/id/:id', cors(), bodyParserJSON, async function(request, response) {

    let id = request.params.id

    let dadosTarefa = await controllerTarefa.getTarefaPorID(id)

    response.status(dadosTarefa.status)
    response.json(dadosTarefa)
})


/////////////////////////////////////////Turma_Materia//////////////////////////////////////////////

/********************************
* Objetivo : API de controle de turma_materia
* Data : 27/05/2023
********************************/

//EndPoint: Post
app.post('/v1/mecanica/turma/materia', cors(), bodyParserJSON, async function (request, response) {

    let contentType = request.headers['content-type']

    if (String(contentType).toLowerCase() == 'application/json') {
        //Recebe os dados encaminhados na requisição
        let dadosBody = request.body

        let resultDadosTurmaMateria = await controllerTurmaMateria.inserirTurmaMateria(dadosBody);

        response.status(resultDadosTurmaMateria.status)
        response.json(resultDadosTurmaMateria)
       
    } else {
        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(message.ERROR_INVALID_CONTENT_TYPE)
    }

});

//EndPoint: Retorna todos id turmas_materias
app.get('/v1/mecanica/turmas/materias', cors(), bodyParserJSON, async function (request, response) {
 
    //Recebe os dados da controller da turma_materia
    let dadosMateria = await controllerTurmaMateria.getTurmaMateria()

    response.status(dadosMateria.status)
    response.json(dadosMateria)
});

//EndPoint: Retorna a materia pelo id
app.get('/v1/mecanica/turmas/materias/:id', cors(), bodyParserJSON, async function(request, response) {

    let id = request.params.id
 
    let dadosTurmaMateria = await controllerTurmaMateria.getTurmaMateriaID(id)
 
    response.status(dadosTurmaMateria.status)
    response.json(dadosTurmaMateria)
 })

//EndPoint: Atualiza 
app.put('/v1/mecanica/turma/materia/:id', cors(), bodyParserJSON, async function (request, response) {
         //reccebe o content-type da requisicao
         let contentType = request.headers['content-type'];

        //Validacao para receber dados apenas no formato JSON
        if (String(contentType).toLowerCase() == 'application/json') {

        let idTurmaMateria = request.params.id;

        //Recebe os dados do curso encaminhado no corpo da requisição
        let dadosBody = request.body;

        //Encaminha os dados para a controller
        let resultDadosTurmaMateria = await controllerTurmaMateria.atualizarTurmaMateria(dadosBody, idTurmaMateria);

        response.status(resultDadosTurmaMateria.status)
        response.json(resultDadosTurmaMateria)

    } else {
        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(message.ERROR_INVALID_CONTENT_TYPE)
    }

});

//EndPoint: Exclui 
app.delete('/v1/mecanica/turma/materia/:id', cors(), bodyParserJSON, async function (request, response) {
    
    let idTurmaMateria = request.params.id;

    let resultDadosTurmaMateria = await controllerTurmaMateria.deletarTurmaMateria(idTurmaMateria)

    if (resultDadosTurmaMateria) {
       response.json(resultDadosTurmaMateria);
       response.status(200);
   } else {
       response.json();
       response.status(404);
   }
});


/////////////////////////////////////////Criterio//////////////////////////////////////////////

/********************************
* Objetivo : API de controle de Criterio
* Data : 29/05/2023
********************************/

//EndPoint: Post - Insere um novo criterio
app.post('/v1/mecanica/criterio', cors(), bodyParserJSON, async function (request, response) {

    let contentType = request.headers['content-type']

    if (String(contentType).toLowerCase() == 'application/json') {
        //Recebe os dados encaminhados na requisição
        let dadosBody = request.body

        let resultDadosCriterio = await controllerCriterio.inserirCriterio(dadosBody);

        response.status(resultDadosCriterio.status)
        response.json(resultDadosCriterio)
       
    } else {
        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(message.ERROR_INVALID_CONTENT_TYPE)
    }

});

//EndPoint: Atualiza criterio pelo id
app.put('/v1/mecanica/criterio/:id', cors(), bodyParserJSON, async function (request, response) {
    //reccebe o content-type da requisicao
    let contentType = request.headers['content-type'];

   //Validacao para receber dados apenas no formato JSON
   if (String(contentType).toLowerCase() == 'application/json') {

   let idCriterio = request.params.id;

   //Recebe os dados do curso encaminhado no corpo da requisição
   let dadosBody = request.body;

   //Encaminha os dados para a controller
   let resultDadosCriterio = await controllerCriterio.atualizarCriterio(dadosBody, idCriterio);

   response.status(resultDadosCriterio.status)
   response.json(resultDadosCriterio)

} else {
   response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
   response.json(message.ERROR_INVALID_CONTENT_TYPE)
}

});

//EndPoint: Exclui um criterioexistente, filtrando pelo ID
app.delete('/v1/mecanica/criterio/:id', cors(), bodyParserJSON, async function (request, response) {
    
    let idCriterio = request.params.id;

    let resultDadosCriterio = await controllerCriterio.deletarCriterio(idCriterio)

    if (resultDadosCriterio) {
       response.json(resultDadosCriterio);
       response.status(200);
   } else {
       response.json();
       response.status(404);
   }
});


//EndPoint: Retorna todos os criterios
app.get('/v1/mecanica/criterios', cors(), bodyParserJSON, async function (request, response) {
 
     //Recebe os dados da controller
     let dadosCriterio = await controllerCriterio.getCriterio()

     response.status(dadosCriterio.status)
     response.json(dadosCriterio)
});

/////////////////////////////////////////Semestre//////////////////////////////////////////////

/********************************
* Objetivo : API de controle de Semestre
* Data : 29/05/2023
********************************/

//EndPoint: Post - Insere um novo semestre
app.post('/v1/mecanica/semestre', cors(), bodyParserJSON, async function (request, response) {

    let contentType = request.headers['content-type']

    if (String(contentType).toLowerCase() == 'application/json') {
        //Recebe os dados encaminhados na requisição
        let dadosBody = request.body

        let resultDadosSemestre = await controllerSemestre.inserirSemestre(dadosBody);

        response.status(resultDadosSemestre.status)
        response.json(resultDadosSemestre)
       
    } else {
        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(message.ERROR_INVALID_CONTENT_TYPE)
    }

});

//EndPoint: Atualiza semestre pelo id
app.put('/v1/mecanica/semestre/:id', cors(), bodyParserJSON, async function (request, response) {
         //reccebe o content-type da requisicao
         let contentType = request.headers['content-type'];

        //Validacao para receber dados apenas no formato JSON
        if (String(contentType).toLowerCase() == 'application/json') {
        //Recebe o id pelo parametro
        let idSemestre = request.params.id;

        //Recebe os dados encaminhado no corpo da requisição
        let dadosBody = request.body;

        //Encaminha os dados para a controller
        let resultDadosSemestre = await controllerSemestre.atualizarSemestre(dadosBody, idSemestre);

        response.status(resultDadosSemestre.status)
        response.json(resultDadosSemestre)

    } else {
        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(message.ERROR_INVALID_CONTENT_TYPE)
    }

});

//EndPoint: Exclui um semestre existente, filtrando pelo ID
app.delete('/v1/mecanica/semestre/:id', cors(), bodyParserJSON, async function (request, response) {
    
    let idSemestre = request.params.id;

    //Recebe os dados do semestre encaminhado no corpo da requisição 
    let resultDadosSemestre = await controllerSemestre.deletarSemestre(idSemestre)

    if (resultDadosSemestre) {
       response.json(resultDadosSemestre);
       response.status(200);
   } else {
       response.json();
       response.status(404);
   }
});

//EndPoint: Retorna todos os semestres
app.get('/v1/mecanica/semestres', cors(), bodyParserJSON, async function (request, response) {
 
     //Recebe os dados da controller do semestre
     let dadosSemestre = await controllerSemestre.getSemestre()

     response.status(dadosSemestre.status)
     response.json(dadosSemestre)
});

//EndPoint: Retorna o semestre pelo id
app.get('/v1/mecanica/semestre/id/:id', cors(), bodyParserJSON, async function(request, response) {

    let id = request.params.id

    let dadosSemestre = await controllerSemestre.getSemestreId(id)

    response.status(dadosSemestre.status)
    response.json(dadosSemestre)
})

/////////////////////////////////////////Registro Tempo//////////////////////////////////////////////

/********************************
* Objetivo : API de controle de Registro Tempo
* Data : 29/05/2023
********************************/

//EndPoint: Post - Insere um novo registro tempo
app.post('/v1/mecanica/registro/tempo', cors(), bodyParserJSON, async function (request, response) {

    let contentType = request.headers['content-type']

    if (String(contentType).toLowerCase() == 'application/json') {
        //Recebe os dados encaminhados na requisição
        let dadosBody = request.body

        let resultDadosRegistroTempo = await controllerRegistroTempo.inserirRegistroTempo(dadosBody);

        response.status(resultDadosRegistroTempo.status)
        response.json(resultDadosRegistroTempo)
       
    } else {
        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(message.ERROR_INVALID_CONTENT_TYPE)
    }

});


//EndPoint: Exclui um registro de tempo existente, filtrando pelo ID
app.delete('/v1/mecanica/registro/tempo/:id', cors(), bodyParserJSON, async function (request, response) {
    
    let idRegistroTempo = request.params.id;

    let resultDadosRegistroTempo = await controllerRegistroTempo.deletarRegistroTempo(idRegistroTempo)

    if (resultDadosRegistroTempo) {
       response.json(resultDadosRegistroTempo);
       response.status(200);
   } else {
       response.json();
       response.status(404);
   }
});


/////////////////////////////////////////Avaliacao Aluno//////////////////////////////////////////////

/********************************
* Objetivo : API de controle de Avaliacao Aluno
* Data : 29/05/2023
********************************/

//EndPoint: Post - Insere uma nova avaliacao do aluno
app.post('/v1/mecanica/avaliacao/aluno', cors(), bodyParserJSON, async function (request, response) {

    let contentType = request.headers['content-type']

    if (String(contentType).toLowerCase() == 'application/json') {
        //Recebe os dados encaminhados na requisição
        let dadosBody = request.body

        let resultDadosAvaliacaoAluno = await controllerAvaliacaoAluno.inserirAvaliacaoAluno(dadosBody);

        response.status(resultDadosAvaliacaoAluno.status)
        response.json(resultDadosAvaliacaoAluno)
       
    } else {
        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(message.ERROR_INVALID_CONTENT_TYPE)
    }

});

//EndPoint: Exclui uma avaliacao de aluno existente, filtrando pelo ID
app.delete('/v1/mecanica/avaliacao/aluno/:id', cors(), bodyParserJSON, async function (request, response) {
    
    let idAvaliacaoAluno = request.params.id;

    let resultDadosAvaliacaoAluno = await controllerAvaliacaoAluno.deletarAvaliacaoAluno(idAvaliacaoAluno)

    if (resultDadosAvaliacaoAluno) {
       response.json(resultDadosAvaliacaoAluno);
       response.status(200);
   } else {
       response.json();
       response.status(404);
   }
});

//EndPoint: Atualiza uma avaliacao aluno pelo id
app.put('/v1/mecanica/avaliacao/aluno/:id', cors(), bodyParserJSON, async function (request, response) {

    let contentType = request.headers['content-type'];

   if (String(contentType).toLowerCase() == 'application/json') {

   let idAvaliacaoAluno = request.params.id;

   let dadosBody = request.body;


   let resultDadosAvaliacaoAluno = await controllerAvaliacaoAluno.atualzarAvaliacaoAluno(dadosBody, idAvaliacaoAluno);

   response.status(resultDadosAvaliacaoAluno.status)
   response.json(resultDadosAvaliacaoAluno)

} else {
   response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
   response.json(message.ERROR_INVALID_CONTENT_TYPE)
}

});


//EndPoint: Retorna todas as avaliacoes aluno
app.get('/v1/mecanica/avaliacao/aluno', cors(), bodyParserJSON, async function (request, response) {
 
    //Recebe os dados da controller 
    let dadosAvaliacaoAluno = await controllerAvaliacaoAluno.getAvaliacaoAluno()

    response.status(dadosAvaliacaoAluno.status)
    response.json(dadosAvaliacaoAluno)
});


//EndPoint: Retorna a avaliacao aluno pelo id
app.get('/v1/mecanica/avaliacao/aluno/:id', cors(), bodyParserJSON, async function(request, response) {

    let id = request.params.id

    let dadosAvaliacaoAluno = await controllerAvaliacaoAluno.getAvaliacaoAlunoPorId(id)

    response.status(dadosAvaliacaoAluno.status)
    response.json(dadosAvaliacaoAluno)
})



/////////////////////////////////////////Avaliacao Professor//////////////////////////////////////////////

/********************************
* Objetivo : API de controle de Avaliacao Professor
* Data : 29/05/2023
********************************/

//EndPoint: Post - Insere uma nova avaliacao do Professor
app.post('/v1/mecanica/avaliacao/professor', cors(), bodyParserJSON, async function (request, response) {

    let contentType = request.headers['content-type']

    if (String(contentType).toLowerCase() == 'application/json') {
        //Recebe os dados encaminhados na requisição
        let dadosBody = request.body

        let resultDadosAvaliacaoProfessor = await controllerAvaliacaoProfessor.inserirAvaliacaoProfessor(dadosBody);

        response.status(resultDadosAvaliacaoProfessor.status)
        response.json(resultDadosAvaliacaoProfessor)
       
    } else {
        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(message.ERROR_INVALID_CONTENT_TYPE)
    }

});

//EndPoint: Atualiza a avaliacao professor pelo id
app.put('/v1/mecanica/avaliacao/professor/:id', cors(), bodyParserJSON, async function (request, response) {

    let contentType = request.headers['content-type'];

   if (String(contentType).toLowerCase() == 'application/json') {

   let idAvaliacaoProfessor = request.params.id;

   let dadosBody = request.body;

   //Encaminha os dados para a controller
   let resultDadosAvaliacaoProfessor = await controllerAvaliacaoProfessor.atualizarAvaliacaoProfessor(dadosBody, idAvaliacaoProfessor);

   response.status(resultDadosAvaliacaoProfessor.status)
   response.json(resultDadosAvaliacaoProfessor)

} else {
   response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
   response.json(message.ERROR_INVALID_CONTENT_TYPE)
}

});


//EndPoint: Exclui uma avaliacao do professor existente, filtrando pelo ID
app.delete('/v1/mecanica/avaliacao/professor/:id', cors(), bodyParserJSON, async function (request, response) {
    
    let idAvaliacaoProfessor = request.params.id;

    let resultDadosAvaliacaoProfessor = await controllerAvaliacaoProfessor.deletarAvaliacaoProfessor(idAvaliacaoProfessor)

    if (resultDadosAvaliacaoProfessor) {
       response.json(resultDadosAvaliacaoProfessor);
       response.status(200);
   } else {
       response.json();
       response.status(404);
   }
});

//EndPoint: Retorna todas as avaliacoes professor
app.get('/v1/mecanica/avaliacao/professor', cors(), bodyParserJSON, async function (request, response) {
 
    //Recebe os dados da controller 
    let dadosAvaliacaoProfessor = await controllerAvaliacaoProfessor.getAvaliacaoProfessor()

    response.status(dadosAvaliacaoProfessor.status)
    response.json(dadosAvaliacaoProfessor)
});

//EndPoint: Retorna a avaliacao professor pelo id
app.get('/v1/mecanica/avaliacao/professor/id/:id', cors(), bodyParserJSON, async function(request, response) {

    let id = request.params.id

    let dadosAvaliacaoProfessor = await controllerAvaliacaoProfessor.getAvaliacaoProfessorPorId(id)

    response.status(dadosAvaliacaoProfessor.status)
    response.json(dadosAvaliacaoProfessor)
})


/////////////////////////////////////////Resultado Obtido//////////////////////////////////////////////

/********************************
* Objetivo : API de controle de Resultado Obtido
* Data : 30/05/2023
********************************/

//EndPoint: Post - Insere um novo resultado
app.post('/v1/mecanica/resultado', cors(), bodyParserJSON, async function (request, response) {

    let contentType = request.headers['content-type']

    if (String(contentType).toLowerCase() == 'application/json') {
        //Recebe os dados encaminhados na requisição
        let dadosBody = request.body

        let resultDadosResultado = await controllerResultadoObtido.inserirResultadoObtido(dadosBody);

        response.status(resultDadosResultado.status)
        response.json(resultDadosResultado)
       
    } else {
        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(message.ERROR_INVALID_CONTENT_TYPE)
    }

});

//EndPoint: Atualiza resultado pelo id
app.put('/v1/mecanica/resultado/:id', cors(), bodyParserJSON, async function (request, response) {
         //reccebe o content-type da requisicao
         let contentType = request.headers['content-type'];

        //Validacao para receber dados apenas no formato JSON
        if (String(contentType).toLowerCase() == 'application/json') {

        let idResultado = request.params.id;

        let dadosBody = request.body;

        //Encaminha os dados para a controller
        let resultDados = await controllerResultadoObtido.atualizarResultadoObtido(dadosBody, idResultado);

        response.status(resultDados.status)
        response.json(resultDados)

    } else {
        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(message.ERROR_INVALID_CONTENT_TYPE)
    }

});

//EndPoint: Exclui um resultado existente, filtrando pelo ID
app.delete('/v1/mecanica/resultado/:id', cors(), bodyParserJSON, async function (request, response) {
    
    let idResultado = request.params.id;


    let resultDadosResultado = await controllerResultadoObtido.deletarResultadoObtido(idResultado)

    if (resultDadosResultado) {
       response.json(resultDadosResultado);
       response.status(200);
   } else {
       response.json();
       response.status(404);
   }
});


/////////////////////////////////////// Aluno Tarefa - Intermediaria //////////////////////////////////////////////////////

/********************************
* Objetivo : API de controle de Aluno Tarefa
* Data : 31/05/2023
********************************/

//EndPoint: Post - Insere os id de aluno e tarefa
app.post('/v1/mecanica/aluno/tarefa', cors(), bodyParserJSON, async function (request, response) {

    let contentType = request.headers['content-type']

    if (String(contentType).toLowerCase() == 'application/json') {
        //Recebe os dados encaminhados na requisição
        let dadosBody = request.body

        let resultDadosAlunoTarefa = await controllerAlunoTarefa.inserirAlunoTarefa(dadosBody);

        response.status(resultDadosAlunoTarefa.status)
        response.json(resultDadosAlunoTarefa)
       
    } else {
        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(message.ERROR_INVALID_CONTENT_TYPE)
    }

});

//EndPoint: Put - Atualiza os id de aluno e tarefa
app.put('/v1/mecanica/aluno/tarefa/:id', cors(), bodyParserJSON, async function (request, response) {
    let contentType = request.headers['content-type']

    if (String(contentType).toLowerCase() == 'application/json') {
        let idAlunoTarefa = request.params.id

        let dadosBody = request.body

        let resultDadosAlunoTarefa = await controllerAlunoTarefa.atualizarAlunoTarefa(dadosBody, idAlunoTarefa)

        response.status(resultDadosAlunoTarefa.status)
        response.json(resultDadosAlunoTarefa)
    } else {
        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(message.ERROR_INVALID_CONTENT_TYPE)
    }


})

//EndPoint: Get - Retorna todos 
app.get('/v1/mecanica/alunos/tarefas', cors(), async function (request, response) {

    //Recebe os dados da controller
    let dados = await controllerAlunoTarefa.getAlunoTarefa()

    response.status(dados.status)
    response.json(dados)

});

//EndPoint: Retorna pelo id
app.get('/v1/mecanica/aluno/tarefa/:id', cors(), bodyParserJSON, async function(request, response) {

    let id = request.params.id

    let dadosAlunoTarefa = await controllerAlunoTarefa.getAlunoTarefaID(id)

    response.status(dadosAlunoTarefa.status)
    response.json(dadosAlunoTarefa)
})


//EndPoint: Exclui pelo id
app.delete('/v1/mecanica/alunos/tarefa/:id', cors(), bodyParserJSON, async function (request, response) {
    
    let idAlunoTarefa = request.params.id;


    let resultDadosAlunoTarefa = await controllerAlunoTarefa.deletarAlunoTarefa(idAlunoTarefa)

    if (resultDadosAlunoTarefa) {
       response.json(resultDadosAlunoTarefa);
       response.status(200);
   } else {
       response.json();
       response.status(404);
   }
});



app.listen(8080, function () {
    console.log('Servidor aguardando requisição na porta 8080')
})