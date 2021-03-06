const jwt = require('jsonwebtoken');
const mongo = require('mongodb');
const connection = require('../conecction/dbconnection');

module.exports = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.sendStatus(403);
  }
  return jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (!decoded) {
      return res.sendStatus(403);
    }
    const { _id } = decoded;
    return connection.getConnection().then((mongoClient) => {
      mongoClient
        .db(connection.pacientesCollection)
        .collection('Medicos')
        .findOne({ _id: new mongo.ObjectID(_id) })
        .then((medico) => {
          req.medico = medico;
          return next();
        });
    });
  });
};
