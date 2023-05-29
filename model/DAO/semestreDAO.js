/***************************************************************************************************************************************************
 * Objetivo: Responsavel pela manipulação de dados dos Semestres no Banco de Dados
 * Data: 19/05/2023
 * Autor: Mateus Alves
 * Versão: 1.0
 ***************************************************************************************************************************************************/

//Import da biblioteca do prisma client
var {PrismaClient} = require('@prisma/client')

var prisma = new PrismaClient()

////////////////////////Inserts//////////////////////////
const insertSemestre = async function(dadosSemestre) {
    let sql = `insert into tbl_semestre (
        numero,
        id_curso
    ) values (
        '${dadosSemestre.numero}',
        '${dadosSemestre.id_curso}'
    )`

    let resultStatus = await prisma.$executeRawUnsafe(sql)

    if(resultStatus)
        return true
    else
        return false
}

//////////////////////Deletes///////////////////////////
const deleteSemestre = async function(id) {
    let sql = `delete from tbl_semestre where id = ${id}`

    let resultStatus = await prisma.$executeRawUnsafe(sql)

    if(resultStatus)
        return true
    else
        return false
}

///////////////////////Updates//////////////////////////
const updateSemestre = async function(dadosSemestre) {
    let sql = `update tbl_semestre set
                    numero = '${dadosSemestre.numero}',
                    id_curso = '${dadosSemestre.id_curso}'
                where id = ${dadosSemestre.id}
            `
    //Executa o scriptSQL no BD
    let resultStatus = await prisma.$executeRawUnsafe(sql)
    
    if(resultStatus)
        return true
    else
        return false
}

///////////////////////Selects//////////////////////////
const selectAllSemestres = async function() {
    let sql = `select * from tbl_semestre`
    
    let rsSemestre = await prisma.$queryRawUnsafe(sql)

    if(rsSemestre.length > 0)
        return rsSemestre
    else
        return false
}

const selectSemestreByID = async function(id) {

    let sql = `select * from tbl_semestre where id = ${id}`;

    let rsSemestreId = await prisma.$queryRawUnsafe(sql);

    if (rsSemestreId.length > 0) {
        return rsSemestreId;
    }
    else {
        return false;
    }
}

const selectLastId = async function () {
    let sql = `select * from tbl_semestre order by id desc limit 1;`

    let rsSemestre = await prisma.$queryRawUnsafe(sql)

    if (rsSemestre.length > 0)
        return rsSemestre
    else
        return false
}

module.exports = {
    insertSemestre,
    deleteSemestre,
    updateSemestre,
    selectAllSemestres,
    selectSemestreByID,
    selectLastId
}