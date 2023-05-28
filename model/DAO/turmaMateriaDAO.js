/***************************************************************************************************************************************************
 * Objetivo: Responsavel pela manipulação de dados dos turma_materia no Banco de Dados
 ***************************************************************************************************************************************************/


//Import da biblioteca do prisma client
var {PrismaClient} = require('@prisma/client')

var prisma = new PrismaClient()

////////////////////////Inserts//////////////////////////
const insertTurmaMateria = async function(idTurma,idMateria) {
    let sql = `insert into tbl_turma_materia (
        id_turma,
        id_materia,
    ) values (
        '${idTurma}',
        '${idMateria}'
    )`

    let resultStatus = await prisma.$executeRawUnsafe(sql)

    if(resultStatus)
        return true
    else
        return false
}

///////////////////////Selects//////////////////////////
const selectAllTurmaMateria = async function() {
    let sql = `select * from tbl_turma_materia`
    
    let rsTurmaMateria = await prisma.$queryRawUnsafe(sql)

    if (rsTurmaMateria.length > 0) {
        return rsCurso;
    }
    else {
        return false;
    }
}


//////////////////////Deletes///////////////////////////
const deleteTurmaMateria = async function(id) {
    let sql = `delete from tbl_turma_materia where id = ${id}`

    let resultStatus = await prisma.$executeRawUnsafe(sql)

    if(resultStatus)
        return true
    else
        return false
}

const selectLastId = async function() {
    let sql = `select * from tbl_turma_materia order by id desc limit 1;`

    let rsAluno = await prisma.$queryRawUnsafe(sql)

    if(rsAluno.length > 0)
        return rsAluno
    else
        return false
}



module.exports = {
    insertTurmaMateria,
    deleteTurmaMateria,
    selectAllTurmaMateria,
    selectLastId
}
