const connection = require('../../conecction/dbconnection');
const mongo = require('mongodb');

async function getTurnos(){

    const clientmongo = await connection.getConnection();
    const collection = await clientmongo.db('MisPacientes')
    .collection('Turnos')
    .find()
    .toArray();

    return collection;
}

async function getTurno(turnoId){

    const clientmongo = await connection.getConnection();
    const turno = await clientmongo.db('MisPacientes')
    .collection('Turnos')
    .findOne({_id:new mongo.ObjectID(turnoId)});

    return turno;
}

async function pushTurno(turno){

    const clientmongo = await connection.getConnection();
    const result = await clientmongo.db('MisPacientes')
    .collection('Turnos')
    .insertOne(turno);

    return result;
}

async function updateTurno(turno){

    const clientmongo = await connection.getConnection();
    const query = {_id:parseInt(turno._id)};
    const newValues = {$set: 
        {
            _id: new mongo.ObjectID(turno._id),
            idMedico: turno.idMedico, 
            idPaciente: turno.idPaciente,
            fecha: turno.fecha,
            motivoConsulta: turno.motivoConsulta
        }
    };

    const result = await clientmongo.db('MisPacientes')
    .collection('Turnos')
    .updateOne(query, newValues);

    return result;
}

async function deleteTurno(turnoId){

    const clientmongo = await connection.getConnection();

    const result = await clientmongo.db('MisPacientes')
    .collection('Turnos')
    .deleteOne({_id:new mongo.ObjectID(turnoId)});

    return result;

}

async function getTurnosDePaciente(pacienteId){

    const clientmongo = await connection.getConnection();
    const turnos = await clientmongo.db('MisPacientes')
    .collection('Turnos')
    .find({idPaciente:pacienteId})
    .toArray();

    return turnos;
}

//funcion de busqueda de turnos por fecha(dd-mm-yyyy) del correspondiente medico (id)
async function getTurnosDelDia(dia){

    const fechaMedico = dia.split("-");

    const medicoId = fechaMedico[3];

    let fechaInicioString = fechaMedico[2] + "-" + fechaMedico[1] + "-" + fechaMedico[0] + "T" + "00:00:00Z";
    let fechaFinString = fechaMedico[2] + "-" + fechaMedico[1] + "-" + fechaMedico[0] + "T" + "23:59:59Z";

    const fechaInicio = new Date(fechaInicioString);
    const fechaFin = new Date(fechaFinString);

    const clientmongo = await connection.getConnection();
    const turnos = await clientmongo.db('MisPacientes')
    .collection('Turnos')
    .find({
        fecha:{$gte: fechaInicio, $lt: fechaFin},
        idMedico:medicoId
    })
    .toArray();

    return turnos;
}

module.exports = {getTurnos, getTurno, pushTurno, updateTurno, deleteTurno, getTurnosDePaciente, getTurnosDelDia};