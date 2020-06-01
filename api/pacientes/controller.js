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
    .findOne({_id:parseInt(pacienteId)});

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
    const query = {_id:parseInt(paciente._id)};
    const newValues = {$set: 
        {
            nombre: paciente.nombre, 
            apellido: paciente.apellido,
            fechaNacimiento: paciente.fechaNacimiento,
            obraSocial: paciente.obraSocial,
            plan: paciente.plan,
            numAfiliado: paciente.numAfiliado,
            telefono: paciente.telefono,
            antecedentes: paciente.antecedentes,
            medicacionHabitual: paciente.medicacionHabitual,
            alergias: paciente.alergias,
            cirugias: paciente.cirugias,
            listaEvoluciones: paciente.listaEvoluciones,
            listaTurnos: paciente.listaTurnos
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
    .deleteOne({_id:parseInt(pacienteId)});

    return result;

}

module.exports = {getPacientes, getPaciente, pushPaciente, updatePaciente, deletePaciente};