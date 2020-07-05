const connection = require('../../conecction/dbconnection');
const mongo = require('mongodb');

async function getEvoluciones() {

    const mongoClient = await connection.getConnection();
    const collection = await mongoClient.db(connection.pacientesCollection)
        .collection('Evoluciones')
        .find()
        .toArray();
    await mongoClient.close();

    return collection;
}

async function getEvolucion(evolucionId) {

    const mongoClient = await connection.getConnection();
    const evolucion = await mongoClient.db(connection.pacientesCollection)
        .collection('Evoluciones')
        .findOne({_id: new mongo.ObjectID(evolucionId)});
    await mongoClient.close();

    return evolucion;
}

async function pushEvolucion(evolucion) {

    const mongoClient = await connection.getConnection();
    const result = await mongoClient.db(connection.pacientesCollection)
        .collection('Evoluciones')
        .insertOne(evolucion);
    await mongoClient.close();

    return result;
}

async function updateEvolucion(evolucion) {

    const mongoClient = await connection.getConnection();
    const query = {_id: new mongo.ObjectID(evolucion._id)};
    const newValues = {
        $set:
            {
                _id: new mongo.ObjectID(evolucion._id),
                idMedico: evolucion.idMedico,
                idPaciente: evolucion.idPaciente,
                fecha: evolucion.fecha,
                motivoConsulta: evolucion.motivoConsulta,
                descripcion: evolucion.descripcion
            }
    };

    const result = await mongoClient.db(connection.pacientesCollection)
        .collection('Evoluciones')
        .updateOne(query, newValues);
    await mongoClient.close();

    return result;
}

async function deleteEvolucion(evolucionId) {

    const mongoClient = await connection.getConnection();
    const result = await mongoClient.db(connection.pacientesCollection)
        .collection('Evoluciones')
        .deleteOne({_id: new mongo.ObjectID(evolucionId)});

    await mongoClient.close();

    return result;
}

async function getEvolucionesDePaciente(id_Paciente) {

    const mongoClient = await connection.getConnection();
    const evoluciones = await mongoClient.db(connection.pacientesCollection)
        .collection('Evoluciones')
        .find({idPaciente: id_Paciente})
        .toArray();

    await mongoClient.close();

    return evoluciones;
}

module.exports = {getEvoluciones, getEvolucion, pushEvolucion, updateEvolucion, deleteEvolucion, getEvolucionesDePaciente};
