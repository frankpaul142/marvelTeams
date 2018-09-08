'use strict';

var mongoose = require('mongoose');
var app = require('./app');

const environment = app.get('env');

const dbUrl = { uri: 'mongodb://127.0.0.1:27017/team' };
const options = { useNewUrlParser: true, autoIndex: false };

mongoose.connect(dbUrl.uri, options)
  .then(() => {
    console.log('Conexión a la base de datos establecida...');

    app.listen(3001, () => {
      console.log(`API REST corriendo en http://localhost:${3001}`);
    });
  })
  .catch((err) => {
    return console.log(`Error al conectar a la base de datos: ${err}`);
  });
