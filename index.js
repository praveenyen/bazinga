const BodyParser = require("body-parser");
const Express = require("express");
const cors = require('cors')
const mongoose = require('mongoose')

const CONNECTION_URL = 'mongodb+srv://rkvapi:rkvapi@cluster0-athos.mongodb.net/bazinga?retryWrites=true';
const PORT = process.env.PORT || 8000

var app = Express();
var allowedOrigins = ['http://localhost:3000', 'http://yourapp.com']
app.use(cors({
    origin: (origin, callback) => {
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            var msg = 'The CORS policy for this site does not allow';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    }
}));
app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));

let storeRoutes = require('./store/api-routes')
app.use('/api/v1', storeRoutes);

app.listen(PORT, () => {
    mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
        if (error) {
            throw error;
        }
    });
});