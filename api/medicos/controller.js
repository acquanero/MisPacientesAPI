const connection = require('../../conecction/dbconnection');

async function getMedicos(){

    const clientmongo = await connection.getConnection();
    const collection = await clientmongo.db('MisPacientes')
    .collection('Medicos')
    .find()
    .toArray();

    return collection;
}

async function getMedico(medicoId){

    const clientmongo = await connection.getConnection();
    const medico = await clientmongo.db('MisPacientes')
    .collection('Medicos')
    .findOne({idMedico:parseInt(medicoId)});

    return medico;
}

async function pushMedico(medico){

    const clientmongo = await connection.getConnection();
    const result = await clientmongo.db('MisPacientes')
    .collection('Medicos')
    .insertOne(medico);

    return result;
}

async function updateMedico(medico){

    const clientmongo = await connection.getConnection();
    const query = {idMedico:parseInt(medico.idMedico)};
    const newValues = {$set: 
        {
            idMedico:medico.idMedico,
            nombre: medico.nombre, 
            apellido: medico.apellido, 
            matricula: medico.matricula,
            mail: medico.mail,
            usuario: medico.usuario,
            password: medico.password
        }
    };

    const result = await clientmongo.db('MisPacientes')
    .collection('Medicos')
    .updateOne(query, newValues);

    return result;
}

async function deleteMedico(medicoId){

    const clientmongo = await connection.getConnection();

    const result = await clientmongo.db('MisPacientes')
    .collection('Medicos')
    .deleteOne({idMedico:parseInt(medicoId)});

    return result;

}

module.exports = {getMedicos, getMedico, pushMedico, updateMedico, deleteMedico};