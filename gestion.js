const express = require('express');
const app = express();
const mongoose = require('mongoose');


const hotelCategoria = require('./model');


app.get('/habitaciones', (req, res) => {

    hotelCategoria.find({})
        // .sort('codigo')
        .exec((err, habitaciones) => {
            if (err) {
                return res.status(402).json({
                    ok: false,
                    err
                })




            }
            hotelCategoria.count({}, (err, n_elementos) => {
                res.json({
                    ok: true,
                    habitaciones: habitaciones,
                    elementos: n_elementos
                })

            })
        })


});

app.get('/habitaciones/:id', (req, res) => {
    let id = req.params.id
    hotelCategoria.findById(id, (err, habitacion) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }
        if (!habitacion) {
            return res.status(404).json({
                ok: false,
                err: {
                    message: 'El identificador de habitacion no existe'
                }
            })
        }

        res.json({
            ok: true,
            habitaciones: habitacion
        })
    })

});

app.post('/habitaciones', (req, res) => {

    let body = req.body;

    let habitacion = new hotelCategoria({
        codigo: body.codigo,
        usuario: body.usuario,
        cedula: body.cedula,
        celular: body.celular,
        disponible: body.disponible
    })

    habitacion.save((err, habitacion) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }
        if (!habitacion) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Ha ocurrido un error al intentar crear la habitacion'
                }
            })
        }

        res.json({
            ok: true,
            message: 'Se ha creado correctamente la habitacion',
            dataHabitacion: habitacion
        })
    })

});

app.put('/habitaciones/:id', (req, res) => {
    let id = req.params.id;
    let body = req.body;

    hotelCategoria.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, habitacion) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        };
        if (!habitacion) {
            return res.status(404).json({
                ok: false,
                err: {
                    message: 'El identificador de habitacion no existe'
                }
            })
        }

        res.json({
            ok: true,
            habitacion: habitacion
        })

    })

});

app.delete('/habitaciones/:id', (req, res) => {
    let id = req.params.id;
    let body = {
        usuario: 'disponible',
        cedula: '',
        celular: '',
        disponible: 'true'
    };

    hotelCategoria.findByIdAndUpdate(id, body, (err, habitacion) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        };
        if (!habitacion) {
            return res.status(404).json({
                ok: false,
                err: {
                    message: 'El identificador de habitacion no existe'
                }
            })
        }

        res.json({
            ok: true,
            habitacion: habitacion
        })
    })

});

module.exports = app;