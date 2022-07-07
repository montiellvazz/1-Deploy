require('module-alias/register');
const connectDB = require("@Utils");

const handler = async (event,context)=>{
    let {id,data} = event.queryStringParameters;
    data = JSON.parse(data);
    let dataId = data.ID;
    let dataQuery = {'data.ID':{$eq:data.ID}};
    try{
    const client = await connectDB();
    const trolley = client.db("NodeApiStore").collection("Trolley");
    const validateTrolleyData = await trolley.find(dataQuery).toArray();
    if (validateTrolleyData == undefined || validateTrolleyData.length==0){
        await trolley.updateOne({id},{$push:{data}});
    return({
        statusCode:200,
        body:"Ha sido actualizada"
    })
}else{
    await trolley.updateOne({id},{$inc:{"data.$[elem].cantidad":1}},{arrayFilters:[{"elem.ID":{ $eq:dataId}}]});
    return({
        statusCode:200,
        body:"se aumentó el conteo"
    })
}
    }catch(error){
        console.log(error);
    }
}

module.exports = {handler};