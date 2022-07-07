const {MongoClient} = require("mongodb");
require("dotenv").config({path:"@env"});
let uri = process.env.URI;
async function connectDB(){
    const client = new MongoClient(uri);
    await client.connect();
    return client;
}

module.exports = connectDB;