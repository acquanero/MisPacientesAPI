const jwt = require('jsonwebtoken');
const connection = require('../conecction/dbconnection');
const mongo = require('mongodb');

module.exports = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.sendStatus(403);
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        const {_id} = decoded;
        connection.getConnection().then((mongoClient) => {
            mongoClient.db(connection.pacientesCollection)
                .collection('Medicos')
                .findOne({_id: new mongo.ObjectID(_id)})
                .then((medico) => {
                    req.medico = medico;
                    next();
                });
        });
    })
};
