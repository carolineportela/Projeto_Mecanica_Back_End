/***************************************************************************************************************************************************
 * Objetivo: Responsavel pela manipulação de dados dos Margem de erros no Banco de Dados
 * Data: 30/05/2023
 * Autor: Caroline Portela
 * Versão: 1.0
 ***************************************************************************************************************************************************/

//Import da biblioteca do prisma client
var { PrismaClient } = require('@prisma/client')

var prisma = new PrismaClient()

const insertErro = async function (dadosErro) {
    let sql = `insert into tbl_margem_erro (
        margem_de_erro,
        id_criterio
    ) values (
        '${dadosErro.margem_de_erro}',
        '${dadosErro.id_criterio}',
    )`

    //Executa o scrip sql no banco de dados        
    let resultStatus = await prisma.$executeRawUnsafe(sql);

    if (resultStatus) {
        return true;
    } else {
        return false;
    }

}

module.exports = {
    insertErro
}
