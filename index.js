let express = require('express')
let bodyParser = require('body-parser')
let cors = require('cors')

let app = express()
var allowedOrigins = ['http://localhost:3000', 'https://bazinga-dev.herokuapp.com'];
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
let storeApiRoutes = require('./store/api-routes')

var PORT = process.env.PORT || 8000

app.use(bodyParser.urlencoded(
    {
        extended: true
    }
));
app.use(bodyParser.json())

app.use('/api/v1', storeApiRoutes)
app.listen(PORT, () => {
    console.log(`Server started on ${PORT}`)
});