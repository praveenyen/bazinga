const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectID;
const BodyParser = require("body-parser");
const Express = require("express");
const cors = require('cors')
const mongoose = require('mongoose')

const CONNECTION_URL = 'mongodb+srv://rkvapi:rkvapi@cluster0-athos.mongodb.net/bazinga?retryWrites=true';
const PORT = process.env.PORT || 8000

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
var db = mongoose.connection
var orderCollection = db.collection('orders')

var app = Express();
var allowedOrigins = ['http://localhost:3000', 'http://yourapp.com']
app.use(cors({
    origin: function (origin, callback) {
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            var msg = 'The CORS policy for this site does not ' +
                'allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    }
}));
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
    console.log('Welcome get orders')
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

app.listen(PORT, () => {
    MongoClient.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
        if (error) {
            throw error;
        }
    });
});