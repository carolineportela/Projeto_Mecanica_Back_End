/***************************************************************************************************************************************************
 * Objetivo: Responsavel pela manipulação de dados dos CURSOS no Banco de Dados
 * Data: 19/05/2023
 * Autor: Mateus Alves
 * Versão: 1.0
 ***************************************************************************************************************************************************/

//Import da biblioteca do prisma client
var {PrismaClient} = require('@prisma/client')

var prisma = new PrismaClient()

////////////////////////Inserts//////////////////////////
const insertCurso = async function(dadosCurso) {
    let sql = `insert into tbl_curso (
        nome,
        sigla,
        descricao,
        carga_horaria
    ) values (
        '${dadosCurso.nome}',
        '${dadosCurso.sigla}',
        '${dadosCurso.descricao}',
        '${dadosCurso.carga_horaria}'
    )`

<<<<<<< HEAD
    let resultStatus = await prisma.$executeRawUnsafe(sql)

    if(resultStatus)
        return true
    else
        return 
       
=======
    //Executa o scrip sql no banco de dados        
    let resultStatus = await prisma.$executeRawUnsafe(sql);
    if (resultStatus) {
        return true;
    } else {
        return false;
    }
>>>>>>> b9f1f6b2a9d1584e04a89cc6d49dc424383e4c89
}


//////////////////////Deletes///////////////////////////
const deleteCurso = async function(id) {
    let idCurso = id;

    let sql = `delete from tbl_curso where id = ${idCurso}`

    let resultStatus = await prisma.$executeRawUnsafe(sql)

    if (resultStatus) {
        return true;
    } else {
        return false;
    }
}

///////////////////////Updates//////////////////////////
const updateCurso = async function(dadosCurso) {
    let sql = `update tbl_curso set
                    nome = '${dadosCurso.nome}',
                    sigla = '${dadosCurso.sigla}',
                    descricao = '${dadosCurso.descricao}',
                    carga_horaria = '${dadosCurso.carga_horaria}'
                where id = ${dadosCurso.id}    
            `

    //Executa o scriptSQL no BD
    let resultStatus = await prisma.$executeRawUnsafe(sql)
    ;
      if (resultStatus) {
          return true;
      } else {
          return false;
      }
}

///////////////////////Selects//////////////////////////
const selectAllCursos = async function() {
    let sql = `select * from tbl_curso`
    
    let rsCurso = await prisma.$queryRawUnsafe(sql)

    if (rsAluno.length > 0) {
        return rsAluno;
    }
    else {
        return false;
    }
}

<<<<<<< HEAD
const selectLastId = async function() {
    let sql = `select * from tbl_curso order by id desc limit 1;`

    let rsAluno = await prisma.$queryRawUnsafe(sql)

    if(rsAluno.length > 0)
        return rsAluno
    else
        return false
}

=======
const selectCursoByID = async function (id) {
    let idCurso = id

    let sql = `select * from tbl_curso where id = ${idCurso}`;

    let rsCursoId = await prisma.$queryRawUnsafe(sql);

    if (rsCursoId.length > 0) {
        return rsCursoId;
    }
    else {
        return false;
    }
}


>>>>>>> b9f1f6b2a9d1584e04a89cc6d49dc424383e4c89
module.exports = {
    insertCurso,
    deleteCurso,
    updateCurso,
    selectAllCursos,
<<<<<<< HEAD
    selectLastId
=======
    selectCursoByID
>>>>>>> b9f1f6b2a9d1584e04a89cc6d49dc424383e4c89
}