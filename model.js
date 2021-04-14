const mongoose = require('mongoose');
const Shema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');

const hotelShema = new Shema({
    codigo: {
        type: String,
        required: true,
        unique: true
    },
    usuario: {
        type: String,
        default: 'disponible'
    },
    cedula: {
        type: String,
        default: 'Disponible'
    },
    disponible: {
        type: Boolean,
        default: true

    }
});

hotelShema.plugin(uniqueValidator, { message: '{PATH} debe ser unico' })
module.exports = mongoose.model('Hotel', hotelShema);