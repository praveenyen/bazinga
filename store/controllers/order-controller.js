const mongoose = require('mongoose')
const ObjectId = require("mongodb").ObjectID;

mongoose.connect('mongodb+srv://rkvapi:rkvapi@cluster0-athos.mongodb.net/bazinga?retryWrites=true', { useNewUrlParser: true, useUnifiedTopology: true })
var db = mongoose.connection

var orderCollection = db.collection('orders')
if (!db)
    console.log("Error connecting db")
else
    console.log("Db connected successfully")

exports.index = (req, res) => {
    orderCollection.find({}).toArray((error, result) => {
        if (error) {
            return res.status(500).send(error);
        }
        res.send(result);
    });
}

exports.new = (req, res) => {
    orderCollection.insert(req.body, (error, result) => {
        if (error) {
            return response.status(500).send(error);
        }
        res.send(result.ops);
    });
}

exports.view = (req, res) => {
    orderCollection.findOne({ "_id": new ObjectId(req.params.id) }, (error, result) => {
        if (error) {
            return res.status(500).send(error);
        }
        res.send(result);
    });

}

exports.patch = (req, res) => {
    orderCollection.findOne({ "_id": new ObjectId(req.params.id) }, (error, result) => {
        if (error) {
            return response.status(500).send(error);
        }
        result['customer']['email'] = req.body.email;
        result['customer']['phone'] = req.body.phone;

        const options = { returnNewDocument: true };
        orderCollection.findOneAndUpdate({ "_id": new ObjectId(req.params.id) }, { "$set": result }, options)
            .then(updatedDocument => {
                if (updatedDocument) {
                    res.json(updatedDocument.value);
                } else {
                    res.send('Error:');
                }
            })
    });
}

exports.delete = (req, res) => {
    orderCollection.findOneAndDelete({ "_id": new ObjectId(req.params.id) })
        .then(deletedDocument => {
            if (deletedDocument) {
                res.send('Successfully Deleted!');
            } else {
                res.send('Error while deleting!');
            }
        })
}