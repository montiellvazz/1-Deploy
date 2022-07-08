const axios = require("axios");
const connectDB = require("@Utils")
const instance = axios.create({
    baseURL:'https://capable-concha-706d58.netlify.app/products'
})
async function getDB(){
try{
    const client = await connectDB();
    const productsDB = client.db("NodeApiStore").collection("Products");
    const showProducts = await productsDB.find({}).toArray();
    return showProducts;
}catch(err){
console.log(err);
}
}

module.exports = getDB;