const connection = require('../../conecction/dbconnection');
const mongo = require('mongodb');

async function getAntecedente(antecedenteId) {

    const mongoClient = await connection.getConnection();
    const Antecedente = await mongoClient.db(connection.pacientesCollection)
        .collection('Antecedentes')
        .findOne({_id: new mongo.ObjectID(antecedenteId)});
    await mongoClient.close();

    return Antecedente;
}

async function pushAntecedente(Antecedente) {

    const mongoClient = await connection.getConnection();
    const result = await mongoClient.db(connection.pacientesCollection)
        .collection('Antecedentes')
        .insertOne(Antecedente);
    await mongoClient.close();

    return result;
}

async function updateAntecedente(Antecedente) {

    const mongoClient = await connection.getConnection();
    const query = {_id: parseInt(Antecedente._id)};
    const newValues = {
        $set:
            {
                _id: new mongo.ObjectID(Antecedente._id),
                idMedico: Antecedente.idMedico, // todo: deberíamos confiar en el id de médico que nos manda la UI?
                name: Antecedente.name
            }
    };
    const result = await mongoClient.db(connection.pacientesCollection)
        .collection('Antecedentes')
        .updateOne(query, newValues);
    await mongoClient.close();

    return result;
}

async function deleteAntecedente(antecedenteId) {

    const mongoClient = await connection.getConnection();
    const result = await mongoClient.db(connection.pacientesCollection)
        .collection('Antecedentes')
        .deleteOne({_id: new mongo.ObjectID(antecedenteId)});
    await mongoClient.close();

    return result;
}

async function getAntecedentesDeMedico(medicoId) {

    const mongoClient = await connection.getConnection();
    const Antecedentes = await mongoClient.db(connection.pacientesCollection)
        .collection('Antecedentes')
        .find({idMedico: medicoId})
        .toArray();

    await mongoClient.close();

    return Antecedentes;
}

module.exports = {getAntecedente, pushAntecedente, updateAntecedente, deleteAntecedente, getAntecedentesDeMedico};
