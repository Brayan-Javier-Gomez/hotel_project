const express = require('express');
const app = express();
const path = require('path');


const PORT = process.env.PORT || 4200;

app.use(express.static(__dirname + '/dist/front'));

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/dist/front/index.html'))
});


app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
})