const connection = require('../../conecction/dbconnection');

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
    .findOne({idPaciente:parseInt(pacienteId)});

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
            idPaciente: paciente.idPaciente,
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
    .deleteOne({idPaciente:parseInt(pacienteId)});

    return result;

}

//devuelve un array con todos los pacientes que pertenecen a ese id medico
async function getPacientePorMedico(id_medico){

    const clientmongo = await connection.getConnection();
    const pacientes = await clientmongo.db('MisPacientes')
    .collection('Pacientes')
    .find({idMedico:parseInt(id_medico)})
    .toArray();

    return pacientes;
}

module.exports = {getPacientes, getPaciente, pushPaciente, updatePaciente, deletePaciente, getPacientePorMedico};