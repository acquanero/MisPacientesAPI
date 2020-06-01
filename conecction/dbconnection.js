const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://pablo:strangedays1984@cluster0-jc2di.mongodb.net/test";
const chalk = require('chalk');

const client = new MongoClient(uri, {useUnifiedTopology: true, useNewUrlParser: true})

async function getConnection(){

    return await client.connect().catch(err => console.log(chalk.red(err)));

}

module.exports = {getConnection};