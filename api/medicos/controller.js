const connection = require('../../conecction/dbconnection');
const mongo = require('mongodb');
const crypto = require('crypto');

const jwt = require('jsonwebtoken');

const signToken = (_id) => {
    return jwt.sign({_id}, process.env.JWT_SECRET, {
        expiresIn: 60 * 60 * 24 * 365,
    });
};

async function getMedicos() {

    const mongoClient = await connection.getConnection();
    const medicosCollection = await mongoClient.db(connection.pacientesCollection)
        .collection('Medicos')
        .find()
        .toArray();
    await mongoClient.close();

    return medicosCollection
}

async function getMedico(medicoId) {

    const mongoClient = await connection.getConnection();
    const medico = await mongoClient.db(connection.pacientesCollection)
        .collection('Medicos')
        .findOne({_id: new mongo.ObjectID(medicoId)});

    await mongoClient.close();

    return medico
}

async function pushMedico(medico) {

    const mongoClient = await connection.getConnection();
    const state = await mongoClient.db(connection.pacientesCollection)
        .collection('Medicos')
        .insertOne(medico);
    await mongoClient.close();

    return state
}

async function updateMedico(medico) {

    const mongoClient = await connection.getConnection();
    const query = {_id: new mongo.ObjectID(medico._id)};
    const newValues = {
        $set:
            {
                _id: new mongo.ObjectID(medico._id),
                mail: medico.mail,
                password: medico.password
            }
    };

    const state = mongoClient.db(connection.pacientesCollection)
        .collection('Medicos')
        .updateOne(query, newValues);
    await mongoClient.close();

    return state
}

async function deleteMedico(medicoId) {

    const mongoClient = await connection.getConnection();
    const state = mongoClient.db(connection.pacientesCollection)
        .collection('Medicos')
        .deleteOne({_id: new mongo.ObjectID(medicoId)});
    await mongoClient.close();

    return state
}

async function register(mail, password) {

    const mongoClient = await connection.getConnection();
    const medicos = await mongoClient.db(connection.pacientesCollection);
    let response = {
        message: 'El usuario ya está registrado'
    };
    const randomKey = await crypto.randomBytes(16);
    const newSalt = randomKey.toString('base64');
    const encryptedPassword = crypto.pbkdf2Sync(password, newSalt, 10000, 64, 'sha1').toString('base64');
    const registeredMail = await medicos.collection('Medicos').findOne({mail})
    if (!registeredMail) {
        medicos.collection('Medicos').insertOne({
            mail,
            password: encryptedPassword,
            salt: newSalt,
        });
        response.message = 'Usuario registrado con éxito';
    }
    await mongoClient.close();

    return response
}

async function login(mail, password) {

    const mongoClient = await connection.getConnection();
    const medicos = await mongoClient.db(connection.pacientesCollection);
    const medic = await medicos.collection('Medicos').findOne({mail});
    if (!medic) {
        console.log('Usuario y/o contraseña incorrectos');
        return 'Usuario y/o contraseña incorrectos';
    }
    const response = await verifyCredentials(medic, password);
    await mongoClient.close();

    return response
}

function verifyCredentials(medic, password) {

    let data = {
        message: 'Usuario y/o contraseña incorrectos'
    };
    const encryptedPassword = crypto.pbkdf2Sync(password, medic.salt, 10000, 64, 'sha1').toString('base64');
    if (medic.password === encryptedPassword) {
        data = {
            message: 'Usuario encontrado',
            token: signToken(medic._id)
        }
    }

    return data
}

module.exports = {getMedicos, getMedico, pushMedico, updateMedico, deleteMedico, login, register};
