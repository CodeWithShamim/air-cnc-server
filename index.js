const express = require('express');
require("dotenv").config();
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;

app.use(cors())
app.use(express.json());



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.d8hdu.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        await client.connect();
        const experienceCollection = client.db("air_cnc").collection("experiences");
        const homeCollection = client.db("air_cnc").collection("homes");

        // get experiences 
        app.get("/experience", async(req, res) => {
            const experiences = await experienceCollection.find({}).toArray();
            res.send(experiences);
        })

        // get homes 
        app.get("/home", async(req, res) => {
            const homes = await homeCollection.find({}).toArray();
            res.send(homes);
        })


    } finally {
        // await client.close();
    }
}
run().catch(console.dir);


app.get("/", (req, res) => {
    res.send("Server is running...")
})

app.listen(port, () => {
    console.log("Listening port is", port)
})