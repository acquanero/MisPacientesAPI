const mongo = require('mongodb');
const connection = require('../../conecction/dbconnection');

const COLLECTION_NAME = 'Turnos'; // variable para no repetir la colección

async function getTurnos() {
  const mongoClient = await connection.getConnection();
  const collection = await mongoClient
    .db(connection.pacientesCollection)
    .collection(COLLECTION_NAME)
    .find()
    .toArray();
  await mongoClient.close();

  return collection;
}

async function getTurno(turnoId) {
  const mongoClient = await connection.getConnection();
  const turno = await mongoClient
    .db(connection.pacientesCollection)
    .collection(COLLECTION_NAME)
    .findOne({ _id: new mongo.ObjectID(turnoId) });
  await mongoClient.close();

  return turno;
}

async function pushTurno(turno) {
  const mongoClient = await connection.getConnection();
  const result = await mongoClient
    .db(connection.pacientesCollection)
    .collection(COLLECTION_NAME)
    .insertOne(turno);
  await mongoClient.close();

  return result;
}

async function updateTurno(turno) {
  const mongoClient = await connection.getConnection();
  const query = { _id: parseInt(turno._id, 10) }; // base 10 decimal
  const newValues = {
    $set: {
      _id: new mongo.ObjectID(turno._id),
      idMedico: turno.idMedico,
      NombrePaciente: turno.NombrePaciente,
      TelefonoPaciente: turno.TelefonoPaciente,
      fecha: turno.fecha,
      motivoConsulta: turno.motivoConsulta,
    },
  };
  const result = await mongoClient
    .db(connection.pacientesCollection)
    .collection(COLLECTION_NAME)
    .updateOne(query, newValues);
  await mongoClient.close();

  return result;
}

async function deleteTurno(turnoId) {
  const mongoClient = await connection.getConnection();
  const result = await mongoClient
    .db(connection.pacientesCollection)
    .collection(COLLECTION_NAME)
    .deleteOne({ _id: new mongo.ObjectID(turnoId) });
  await mongoClient.close();

  return result;
}

// Función de busqueda de turnos por fecha(dd-mm-yyyy) del correspondiente medico (id)
async function getTurnosDelDia(medicoId, dia) {
  const fechaMedico = dia.split('-');

  const fechaInicioString = `${fechaMedico[2]}-${fechaMedico[1]}-${fechaMedico[0]}T00:00:00Z`;
  const fechaFinString = `${fechaMedico[2]}-${fechaMedico[1]}-${fechaMedico[0]}T23:59:59Z`;

  const fechaInicio = new Date(fechaInicioString);
  const fechaFin = new Date(fechaFinString);

  const mongoClient = await connection.getConnection();
  const turnos = await mongoClient
    .db(connection.pacientesCollection)
    .collection(COLLECTION_NAME)
    .find({
      fecha: { $gte: fechaInicio, $lt: fechaFin },
      idMedico: medicoId,
    })
    .toArray();

  await mongoClient.close();

  return turnos;
}

module.exports = {
  getTurnos,
  getTurno,
  pushTurno,
  updateTurno,
  deleteTurno,
  getTurnosDelDia,
};
