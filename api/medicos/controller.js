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
    .findOne({_id:parseInt(medicoId)});

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
    const query = {_id:parseInt(medico._id)};
    const newValues = {$set: 
        {
            nombre: medico.nombre, 
            apellido: medico.apellido, 
            matricula: medico.matricula,
            mail: medico.mail,
            usuario: medico.usuario,
            password: medico.password,
            calendario: medico.calendario
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
    .deleteOne({_id:parseInt(medicoId)});

    return result;

}

module.exports = {getMedicos, getMedico, pushMedico, updateMedico, deleteMedico};