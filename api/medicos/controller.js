const connection = require('../../conecction/dbconnection');

async function getMedicos(){

    const clientmongo = await connection.getConnection();
    const collection = await clientmongo.db('MisPacientes')
    .collection('Medicos')
    .find()
    .toArray();

    return collection;
}

async function getMedico(medicoId){

    const clientmongo = await connection.getConnection();
    const medico = await clientmongo.db('MisPacientes')
    .collection('Medicos')
    .findOne({idMedico:parseInt(medicoId)});

    return medico;
}

async function pushMedico(medico){

    const clientmongo = await connection.getConnection();
    const result = await clientmongo.db('MisPacientes')
    .collection('Medicos')
    .insertOne(medico);

    return result;
}

async function updateMedico(medico){

    const clientmongo = await connection.getConnection();
    const query = {idMedico:parseInt(medico.idMedico)};
    const newValues = {$set: 
        {
            idMedico:medico.idMedico,
            nombre: medico.nombre, 
            apellido: medico.apellido, 
            matricula: medico.matricula,
            mail: medico.mail,
            usuario: medico.usuario,
            password: medico.password
        }
    };

    const result = await clientmongo.db('MisPacientes')
    .collection('Medicos')
    .updateOne(query, newValues);

    return result;
}

async function deleteMedico(medicoId){

    const clientmongo = await connection.getConnection();

    const result = await clientmongo.db('MisPacientes')
    .collection('Medicos')
    .deleteOne({idMedico:parseInt(medicoId)});

    return result;

}

//busqueda de la existencia del medico por mail y contraseña, devuelve el idMedico si existe (en formato String), de lo contrario devuelve none
async function checkMedicExistence(mailpassword){

    const arrayMailPass = mailpassword.split("-");

    const Elmail = arrayMailPass[0];
    const Elpassword = arrayMailPass[1];

    const clientmongo = await connection.getConnection();
    const medicos = await clientmongo.db('MisPacientes')
    .collection('Medicos')
    .find({
        mail:Elmail,
        password:Elpassword
    })
    .toArray();

    let rta = 0;

    if(medicos.length < 1){
        rta = 'none'
    }else{
        rta = medicos[0].idMedico
        rta = rta.toString();
    }

    return rta;
}

module.exports = {getMedicos, getMedico, pushMedico, updateMedico, deleteMedico, checkMedicExistence};