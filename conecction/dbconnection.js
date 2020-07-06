const { MongoClient } = require('mongodb');
const chalk = require('chalk');

const uri = process.env.MONGODBKEY;
const pacientesCollection = 'MisPacientes';

async function getConnection() {
  return await new MongoClient(uri, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
    .connect()
    .catch((err) => console.log(chalk.red(err)));
}

module.exports = { getConnection, pacientesCollection };
