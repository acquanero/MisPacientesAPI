const { MongoClient } = require('mongodb');
const chalk = require('chalk');

const uri = process.env.MONGODBKEY;
const pacientesCollection = 'MisPacientes';

async function getConnection() {
  if (!uri) {
    console.error(chalk.red('ERROR: MONGODB URI is not provided'));
  }
  return new MongoClient(uri, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
    .connect()
    .catch((err) => console.error(chalk.red(err)));
}

module.exports = { getConnection, pacientesCollection };
