let express = require('express')

let app = express()

var PORT = process.env.PORT || 8000

app.get('/', (req, res) => {
    res.send('Welcome to the world');
});

app.listen(PORT, () => {
    console.log(`Server started on ${PORT}`);
});