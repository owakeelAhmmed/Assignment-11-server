const express = require('express');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());
   

//user: dbowakel
//password: 7vrn5HtKfA4RcHWj



const uri = "mongodb+srv://dbowakel:7vrn5HtKfA4RcHWj@cluster0.qvjmj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";


const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });



async function run() {
    
    try {
        await client.connect();
        const usercollection = client.db("mediHouse").collection("user");


 
// get api 
//http://localhost:4000/user       
        app.get('/user', async (req, res) => {
           
            const q = req.query;
            console.log(q);

            const user = usercollection.find({});
            const result = await user.toArray();

            res.send(result);
        })
        
//create  medi-house    
// http://localhost:4000/user  

//   {
//     "userName":"owakeel2",
//     "textData":"hellow2"
// }      
        
        
        app.post('/user', async (req, res) => {
            const newUser = req.body;
           const result = await usercollection.insertOne(newUser)
            res.send(result);
        })
 

//update api
        //http://localhost:4000/user/62797a0e7734f26ba197b4e3
        app.put('/user/:id', async (req, res) => {
            
            const id = req.params.id
            const newUser = req.body;


            const filter = { _id: ObjectId(id) };
            const options = {upsert: true };

            const updateDoc = {
                $set: {
                   ...newUser
            },
            };

            const result = await usercollection.updateOne(filter, updateDoc, options);

            res.send(result);

        })


// delete api 
   //http://localhost:4000/user/62797a0e7734f26ba197b4e3     
        
        
        app.delete('/user/:id', async (req, res) => {
            const id = req.params.id
            const filter = { _id: ObjectId(id) };
            const result = await usercollection.deleteOne(filter)


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