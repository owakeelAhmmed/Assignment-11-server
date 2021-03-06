const express = require('express');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const cors = require('cors');
const app = express();
require('dotenv').config();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());
   




const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.qvjmj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;


const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });



async function run() {
    
    try {
        await client.connect();
        const usercollection = client.db("mediHouse").collection("user");
        const oderCollection = client.db("mediHouse").collection("order");

 
// get api 
//http://localhost:4000/user       
        app.get('/user', async (req, res) => {
           
            const q = req.query;
            console.log(q);

            const cursor = usercollection.find(q);
            const users = await cursor.toArray();

            res.send(users);
        })

        app.get('/user/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            console.log(id);
            const result = await usercollection.findOne(query);
            res.send(result);
        })
        
//create  medi-house    
// http://localhost:4000/user  

     
        
        app.post('/user', async (req, res) => {
            const newUser = req.body;
           const result = await usercollection.insertOne(newUser)
            res.send(result);
        })

 

        
//update api
        //http://localhost:4000/user/62797a0e7734f26ba197b4e3

        app.put('/user/:id', async (req, res) => {
            
            const id = req.params.id
            const updatedUser = req.body;


            const filter = { id: ObjectId(id) };
            const options = {upsert: true };

            const updateDoc = {
                $set: {
                   ...updatedUser
            },
            };

            const result = await usercollection.updateOne(filter, updateDoc, options);

            res.send(result);

        })


// delete api 
   //http://localhost:4000/user/62797a0e7734f26ba197b4e3     
        
        
        app.delete('/user/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await usercollection.deleteOne(query);

            res.send(result);
        })

//Order api

        app.post('/order', async (req, res) => {
            const order = req.body;
            const result = await oderCollection.insertOne(order);
            res.send(result);
            })

    }
    finally {
        
    }


}

run().catch(console.dir);




app.get('/', (req, res) => {
    res.send('Running My Server')
});

app.listen(port, () => {
    console.log('CURD Server is running');
})