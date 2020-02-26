let express = require('express')
let bodyParser = require('body-parser')
let mongoose = require('mongoose')

let app = express()
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