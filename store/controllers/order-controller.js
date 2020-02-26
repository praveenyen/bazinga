let mongoose = require('mongoose')

mongoose.connect('mongodb+srv://rkvapi:rkvapi@cluster0-athos.mongodb.net/bazinga?retryWrites=true', { useNewUrlParser: true, useUnifiedTopology: true })
var db = mongoose.connection

var orderCollection = db.collection('orders')
if (!db)
    console.log("Error connecting db")
else
    console.log("Db connected successfully")

exports.index = (req, res) => {
    orderCollection.find({}).toArray((err, result) => {
        if (err) {
            return res.status(500).send(error);
        }
        res.send(result);
    })
}

exports.new = (req, res) => {
    orderCollection.insertOne(req.body, (err, result) => {
        if (err) {
            return res.status(500).send(error);
        }
        res.send(result.ops);
    })
}

exports.view = (req, res) => {
    console.log(req.params.order_id)
    orderCollection.find({ "_id": req.params.order_id }).toArray(
        (err, result) => {
            if (err) {
                return res.status(500).send(error);
            }
            console.log(result)
            res.send(result);
        }
    )

}