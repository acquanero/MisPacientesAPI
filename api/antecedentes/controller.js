const mongo = require('mongodb');
const connection = require('../../conecction/dbconnection');

const COLLECTION_NAME = 'Antecedentes';

async function getAntecedente(antecedenteId) {
  const mongoClient = await connection.getConnection();
  const Antecedente = await mongoClient
    .db(connection.pacientesCollection)
    .collection(COLLECTION_NAME)
    .findOne({ _id: new mongo.ObjectID(antecedenteId) });
  await mongoClient.close();

  return Antecedente;
}

async function pushAntecedente(Antecedente) {
  const mongoClient = await connection.getConnection();
  const result = await mongoClient
    .db(connection.pacientesCollection)
    .collection(COLLECTION_NAME)
    .insertOne(Antecedente);
  await mongoClient.close();

  return result;
}

async function updateAntecedente(Antecedente) {
  const mongoClient = await connection.getConnection();
  const query = { _id: parseInt(Antecedente._id, 10) }; // base 10 decimal
  const newValues = {
    $set: {
      _id: new mongo.ObjectID(Antecedente._id),
      idMedico: Antecedente.idMedico, // todo: deberíamos confiar en el id de médico que nos manda la UI?
      name: Antecedente.name,
    },
  };
  const result = await mongoClient
    .db(connection.pacientesCollection)
    .collection(COLLECTION_NAME)
    .updateOne(query, newValues);
  await mongoClient.close();

  return result;
}

async function deleteAntecedente(antecedenteId) {
  const mongoClient = await connection.getConnection();
  const result = await mongoClient
    .db(connection.pacientesCollection)
    .collection(COLLECTION_NAME)
    .deleteOne({ _id: new mongo.ObjectID(antecedenteId) });
  await mongoClient.close();

  return result;
}

async function getAntecedentesDeMedico(medicoId) {
  const mongoClient = await connection.getConnection();
  const Antecedentes = await mongoClient
    .db(connection.pacientesCollection)
    .collection(COLLECTION_NAME)
    .find({ idMedico: medicoId })
    .toArray();

  await mongoClient.close();

  return Antecedentes;
}

module.exports = {
  getAntecedente,
  pushAntecedente,
  updateAntecedente,
  deleteAntecedente,
  getAntecedentesDeMedico,
};
