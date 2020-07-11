const mongo = require('mongodb');
const connection = require('../../conecction/dbconnection');

const COLLECTION_NAME = 'Evoluciones'; // variable para no repetir la colección

async function getEvoluciones() {
  const mongoClient = await connection.getConnection();
  const collection = await mongoClient
    .db(connection.pacientesCollection)
    .collection(COLLECTION_NAME)
    .find()
    .toArray();
  await mongoClient.close();

  return collection;
}

async function getEvolucion(evolucionId) {
  const mongoClient = await connection.getConnection();
  const evolucion = await mongoClient
    .db(connection.pacientesCollection)
    .collection(COLLECTION_NAME)
    .findOne({ _id: new mongo.ObjectID(evolucionId) });
  await mongoClient.close();

  return evolucion;
}

async function pushEvolucion(evolucion) {
  const mongoClient = await connection.getConnection();
  const result = await mongoClient
    .db(connection.pacientesCollection)
    .collection(COLLECTION_NAME)
    .insertOne(evolucion);
  await mongoClient.close();

  return result;
}

async function updateEvolucion(evolucion) {
  const mongoClient = await connection.getConnection();
  const query = { _id: new mongo.ObjectID(evolucion._id) };
  const newValues = {
    $set: {
      _id: new mongo.ObjectID(evolucion._id),
      idPaciente: evolucion.idPaciente,
      fecha: evolucion.fecha,
      motivoConsulta: evolucion.motivoConsulta,
      descripcion: evolucion.descripcion,
    },
  };

  const result = await mongoClient
    .db(connection.pacientesCollection)
    .collection(COLLECTION_NAME)
    .updateOne(query, newValues);
  await mongoClient.close();

  return result;
}

async function deleteEvolucion(evolucionId) {
  const mongoClient = await connection.getConnection();
  const result = await mongoClient
    .db(connection.pacientesCollection)
    .collection(COLLECTION_NAME)
    .deleteOne({ _id: new mongo.ObjectID(evolucionId) });

  await mongoClient.close();

  return result;
}

async function getEvolucionesDePaciente(idPaciente) {
  const mongoClient = await connection.getConnection();
  const evoluciones = await mongoClient
    .db(connection.pacientesCollection)
    .collection(COLLECTION_NAME)
    .find({ idPaciente })
    .toArray();

  await mongoClient.close();

  return evoluciones;
}

module.exports = {
  getEvoluciones,
  getEvolucion,
  pushEvolucion,
  updateEvolucion,
  deleteEvolucion,
  getEvolucionesDePaciente,
};
