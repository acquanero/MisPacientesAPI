const connection = require('../../conecction/dbconnection');

async function getEvoluciones(){

    const clientmongo = await connection.getConnection();
    const collection = await clientmongo.db('MisPacientes')
    .collection('Evoluciones')
    .find()
    .toArray();

    return collection;
}

async function getEvolucion(evolucionId){

    const clientmongo = await connection.getConnection();
    const evolucion = await clientmongo.db('MisPacientes')
    .collection('Evoluciones')
    .findOne({_id:parseInt(evolucionId)});

    return evolucion;
}

async function pushEvolucion(evolucion){

    const clientmongo = await connection.getConnection();
    const result = await clientmongo.db('MisPacientes')
    .collection('Evoluciones')
    .insertOne(evolucion);

    return result;
}

async function updateEvolucion(evolucion){

    const clientmongo = await connection.getConnection();
    const query = {_id:parseInt(evolucion._id)};
    const newValues = {$set: 
        {
            idMedico: evolucion.idMedico, 
            idPaciente: evolucion.idPaciente, 
            fecha: evolucion.fecha,
            motivoConsulta: evolucion.motivoConsulta,
            descripcion: evolucion.descripcion
        }
    };

    const result = await clientmongo.db('MisPacientes')
    .collection('Evoluciones')
    .updateOne(query, newValues);

    return result;
}

async function deleteEvolucion(evolucionId){

    const clientmongo = await connection.getConnection();

    const result = await clientmongo.db('MisPacientes')
    .collection('Evoluciones')
    .deleteOne({_id:parseInt(evolucionId)});

    return result;

}

async function getEvolucionesDePaciente(id_Paciente){

    const clientmongo = await connection.getConnection();
    const evoluciones = await clientmongo.db('MisPacientes')
    .collection('Evoluciones')
    .find({idPaciente:parseInt(id_Paciente)})
    .toArray();

    return evoluciones;
}

module.exports = {getEvoluciones, getEvolucion, pushEvolucion, updateEvolucion, deleteEvolucion, getEvolucionesDePaciente};