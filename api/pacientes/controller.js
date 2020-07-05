const connection = require('../../conecction/dbconnection');
const mongo = require('mongodb');

async function getPacientes() {

    const mongoClient = await connection.getConnection();
    const collection = await mongoClient.db(connection.pacientesCollection)
        .collection('Pacientes')
        .find()
        .toArray();
    await mongoClient.close();

    return collection;
}

async function getPaciente(pacienteId) {

    const mongoClient = await connection.getConnection();
    const paciente = await mongoClient.db(connection.pacientesCollection)
        .collection('Pacientes')
        .findOne({_id: new mongo.ObjectID(pacienteId)});
    await mongoClient.close();

    return paciente;
}

async function pushPaciente(paciente) {

    const mongoClient = await connection.getConnection();
    const result = await mongoClient.db(connection.pacientesCollection)
        .collection('Pacientes')
        .insertOne(paciente);
    await mongoClient.close();

    return result;
}

async function updatePaciente(paciente) {

    const mongoClient = await connection.getConnection();
    const query = {idPaciente: parseInt(paciente.idPaciente)};
    const newValues = {
        $set:
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

    const result = await mongoClient.db('MisPacientes')
        .collection('Pacientes')
        .updateOne(query, newValues);
    await mongoClient.close();

    return result;
}

async function deletePaciente(pacienteId) {

    const mongoClient = await connection.getConnection();

    const result = await mongoClient.db(connection.pacientesCollection)
        .collection('Pacientes')
        .deleteOne({_id: new mongo.ObjectID(pacienteId)});
    await mongoClient.close();

    return result;
}

//devuelve un array con todos los pacientes que pertenecen a ese id medico
async function getPacientePorMedico(idMedico) {

    const mongoClient = await connection.getConnection();
    const pacientes = await mongoClient.db(connection.pacientesCollection)
        .collection('Pacientes')
        .find({idMedico: idMedico})
        .toArray();
    await mongoClient.close();

    return pacientes;
}

module.exports = {getPacientes, getPaciente, pushPaciente, updatePaciente, deletePaciente, getPacientePorMedico};
