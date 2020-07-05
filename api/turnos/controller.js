const connection = require('../../conecction/dbconnection');
const mongo = require('mongodb');

async function getTurnos() {

    const mongoClient = await connection.getConnection();
    const collection = await mongoClient.db('MisPacientes')
        .collection('Turnos')
        .find()
        .toArray();
    await mongoClient.close();

    return collection;
}

async function getTurno(turnoId) {

    const mongoClient = await connection.getConnection();
    const turno = await mongoClient.db('MisPacientes')
        .collection('Turnos')
        .findOne({_id: new mongo.ObjectID(turnoId)});
    await mongoClient.close();

    return turno;
}

async function pushTurno(turno) {

    const mongoClient = await connection.getConnection();
    const result = await mongoClient.db('MisPacientes')
        .collection('Turnos')
        .insertOne(turno);
    await mongoClient.close();

    return result;
}

async function updateTurno(turno) {

    const mongoClient = await connection.getConnection();
    const query = {_id: parseInt(turno._id)};
    const newValues = {
        $set:
            {
                _id: new mongo.ObjectID(turno._id),
                idMedico: turno.idMedico,
                idPaciente: turno.idPaciente,
                fecha: turno.fecha,
                motivoConsulta: turno.motivoConsulta
            }
    };
    const result = await mongoClient.db('MisPacientes')
        .collection('Turnos')
        .updateOne(query, newValues);
    await mongoClient.close();

    return result;
}

async function deleteTurno(turnoId) {

    const mongoClient = await connection.getConnection();
    const result = await mongoClient.db('MisPacientes')
        .collection('Turnos')
        .deleteOne({_id: new mongo.ObjectID(turnoId)});
    await mongoClient.close();

    return result;
}

async function getTurnosDePaciente(pacienteId) {

    const mongoClient = await connection.getConnection();
    const turnos = await mongoClient.db('MisPacientes')
        .collection('Turnos')
        .find({idPaciente: pacienteId})
        .toArray();

    await mongoClient.close();

    return turnos;
}

//funcion de busqueda de turnos por fecha(dd-mm-yyyy) del correspondiente medico (id)
async function getTurnosDelDia(dia) {

    const fechaMedico = dia.split("-");
    const medicoId = fechaMedico[3];

    let fechaInicioString = fechaMedico[2] + "-" + fechaMedico[1] + "-" + fechaMedico[0] + "T" + "00:00:00Z";
    let fechaFinString = fechaMedico[2] + "-" + fechaMedico[1] + "-" + fechaMedico[0] + "T" + "23:59:59Z";

    const fechaInicio = new Date(fechaInicioString);
    const fechaFin = new Date(fechaFinString);

    const mongoClient = await connection.getConnection();
    const turnos = await mongoClient.db('MisPacientes')
        .collection('Turnos')
        .find({
            fecha: {$gte: fechaInicio, $lt: fechaFin},
            idMedico: medicoId
        })
        .toArray();

    await mongoClient.close();

    return turnos;
}

module.exports = {getTurnos, getTurno, pushTurno, updateTurno, deleteTurno, getTurnosDePaciente, getTurnosDelDia};
