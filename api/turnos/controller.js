const connection = require('../../conecction/dbconnection');

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
    .findOne({_id:parseInt(turnoId)});

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
    .deleteOne({_id:parseInt(turnoId)});

    return result;

}

async function getTurnosDePaciente(pacienteId){

    const clientmongo = await connection.getConnection();
    const turnos = await clientmongo.db('MisPacientes')
    .collection('Turnos')
    .find({idPaciente:parseInt(pacienteId)})
    .toArray();

    return turnos;
}

//funcion de busqueda de turnos por fecha(dd-mm-yyyy), del correspondiente medico (id)
async function getTurnosDelDia(dia){

    const fechaE = dia.split("-");

    const medicoId = fechaE[3];

    let fechaInicioString = fechaE[2] + "-" + fechaE[1] + "-" + fechaE[0] + "T" + "00:00:00Z";
    let fechaFinString = fechaE[2] + "-" + fechaE[1] + "-" + fechaE[0] + "T" + "23:59:59Z";

    const fechaInicio = new Date(fechaInicioString);
    const fechaFin = new Date(fechaFinString);

    const clientmongo = await connection.getConnection();
    const turnos = await clientmongo.db('MisPacientes')
    .collection('Turnos')
    .find({
        fecha:{$gte: fechaInicio, $lt: fechaFin},
        idMedico:parseInt(medicoId)
    })
    .toArray();

    return turnos;
}

module.exports = {getTurnos, getTurno, pushTurno, updateTurno, deleteTurno, getTurnosDePaciente, getTurnosDelDia};