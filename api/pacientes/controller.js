const connection = require('../../conecction/dbconnection');
const mongo = require('mongodb');

async function getPacientes(){

    const clientmongo = await connection.getConnection();
    const collection = await clientmongo.db('MisPacientes')
    .collection('Pacientes')
    .find()
    .toArray();

    return collection;
}

async function getPaciente(pacienteId){

    const clientmongo = await connection.getConnection();
    const paciente = await clientmongo.db('MisPacientes')
    .collection('Pacientes')
    .findOne({_id:new mongo.ObjectID(pacienteId)});

    return paciente;
}

async function pushPaciente(paciente){

    const clientmongo = await connection.getConnection();
    const result = await clientmongo.db('MisPacientes')
    .collection('Pacientes')
    .insertOne(paciente);

    return result;
}

async function updatePaciente(paciente){

    const clientmongo = await connection.getConnection();
    const query = {idPaciente:parseInt(paciente.idPaciente)};
    const newValues = {$set: 
        {
            _id: new mongo.ObjectID(paciente._id),
            idMedico: pacientey.idMedico,
            nombre: pacientey.nombre, 
            apellido: paciente.apellido,
            dni: paciente.dni,
            fechaNacimiento: paciente.fechaNacimiento,
            obraSocial: pacientey.obraSocial,
            plan: paciente.plan,
            numAfiliado: paciente.numAfiliado,
            telefono: paciente.telefono,
            antecedentes: paciente.antecedentes,
            medicacionHabitual: paciente.medicacionHabitual,
            alergias: paciente.alergias,
            cirugias: paciente.cirugias
        }
    };

    const result = await clientmongo.db('MisPacientes')
    .collection('Pacientes')
    .updateOne(query, newValues);

    return result;
}

async function deletePaciente(pacienteId){

    const clientmongo = await connection.getConnection();

    const result = await clientmongo.db('MisPacientes')
    .collection('Pacientes')
    .deleteOne({_id:new mongo.ObjectID(pacienteId)});

    return result;

}

//devuelve un array con todos los pacientes que pertenecen a ese id medico
async function getPacientePorMedico(id_medico){

    const clientmongo = await connection.getConnection();
    const pacientes = await clientmongo.db('MisPacientes')
    .collection('Pacientes')
    .find({idMedico:id_medico})
    .toArray();

    return pacientes;
}

module.exports = {getPacientes, getPaciente, pushPaciente, updatePaciente, deletePaciente, getPacientePorMedico};