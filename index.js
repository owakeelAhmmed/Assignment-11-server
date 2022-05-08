const express = require('express');
const app = express()
const port = 4000;


//owakeel
//2DKqud4b9oX2Og2x




const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://owakeel:2DKqud4b9oX2Og2x@cluster0.qvjmj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
    const collection = client.db("test").collection("devices");
    
    console.log("conneted to db");


  // perform actions on the collection object
//   client.close();
});







app.get('/', (req, res) => {
    
    res.send("hello world")


    })



app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});