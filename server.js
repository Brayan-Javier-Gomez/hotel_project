const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const cors = require('cors');


app.use(cors())
    /*
    ================================
    Configuraciones de puertos y url
    de conexion de base de datos.
    ================================
    */

//Puerto donde se ejecuta el servidor
//==================================

process.env.PORT = process.env.PORT || 3001

//Entorno dev o prod

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

//url para coneccion a db
//==================================
let urlDB;

if (process.env.NODE_ENV === 'dev') {

    urlDB = 'mongodb://localhost:27017/hotel';


} else {

    urlDB = 'mongodb+srv://bryan_gomez:Brayangomez1986@cluster0.ievef.mongodb.net/hotel';
}

process.env.URLDB = urlDB;

//===================================
//Body_parser para peticiones post
//===================================

app.use(bodyparser.urlencoded({ extended: false }));

app.use(bodyparser.json())

app.use(require('./gestion.js'))

app.use(express.static(__dirname + '/dist/front'));

app.get('/', (req, res) => {


    res.sendFile(path.join(__dirname + '/dist/front/index.html'))


})

//===================================
//Conexion con base de datos
//===================================

mongoose.connect(process.env.URLDB, { useNewUrlParser: true, useUnifiedTopology: true }, (err, resp) => {

    if (err) {

        console.log(err);

    }

    console.log('corriendo base de datos puerto 27017');

});

app.listen(process.env.PORT, () => {

    console.log(`Servidor iniciado en el puerto ${process.env.PORT}`);

})