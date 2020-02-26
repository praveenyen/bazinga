const Express = require("express");
const cors = require('cors')
const BodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectID;
const CONNECTION_URL = 'mongodb+srv://rkvapi:rkvapi@cluster0-athos.mongodb.net/bazinga?retryWrites=true';
const DATABASE_NAME = "bazinga";

let mongoose = require('mongoose')

mongoose.connect('mongodb+srv://rkvapi:rkvapi@cluster0-athos.mongodb.net/bazinga?retryWrites=true', { useNewUrlParser: true, useUnifiedTopology: true })
var db = mongoose.connection

var orderCollection = db.collection('orders')

var app = Express();
app.use(cors);
app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));

app.post("/orders", (request, response) => {
    orderCollection.insert(request.body, (error, result) => {
        if (error) {
            return response.status(500).send(error);
        }
        response.send(result.ops);
    });
});

app.get("/orders", (request, response) => {
    orderCollection.find({}).toArray((error, result) => {
        if (error) {
            return response.status(500).send(error);
        }
        response.send(result);
    });
});

app.get("/orders/:id", (request, response) => {
    orderCollection.findOne({ "_id": new ObjectId(request.params.id) }, (error, result) => {
        if (error) {
            return response.status(500).send(error);
        }
        response.send(result);
    });
});

app.patch('/orders/:id', (req, res) => {
    const options = { returnNewDocument: true };
    orderCollection.findOneAndUpdate({ "_id": new ObjectId(req.params.id) }, { "$set": req.body }, options)
        .then(updatedDocument => {
            if (updatedDocument) {
                res.json(updatedDocument.value);
            } else {
                res.send('Error:');
            }
        })
});

app.delete('/orders/:id', (req, res) => {
    orderCollection.findOneAndDelete({ "_id": new ObjectId(req.params.id) })
        .then(deletedDocument => {
            if (deletedDocument) {
                res.send('Successfully Deleted!');
            } else {
                res.send('Error while deleting!');
            }
        })
});

app.listen(5000, () => {
    MongoClient.connect(CONNECTION_URL, { useNewUrlParser: true }, (error, client) => {
        if (error) {
            throw error;
        }
        console.log("Connected to `" + DATABASE_NAME + "`!");
    });
});