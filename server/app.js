const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const teamCtrl = require('./controllers/team');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// CORS
app.use((req, res, next) => {
  // Sitio web que desea permitir que se conecte
  res.setHeader('Access-Control-Allow-Origin', '*');
  // Solicite los métodos que desea permitir
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  // Solicitar encabezados que desees permitir
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type, Authorization, Content-Type');
  // Establezca en verdadero si necesita que el sitio web incluya cookies
  // en las solicitudes enviadas a la API (por ejemplo, en caso de que use sesiones)
  res.setHeader('Access-Control-Allow-Credentials', true);
  // Pase a la siguiente capa de middleware
  next();
});

app.use('/', express['static'](__dirname + '/../client/app'));

// app.get('/', function (req, res) {
//   res.json({
//     message: 'hooray! welcome to our api!'
//   });
// });

app.use('/team', teamCtrl);

module.exports = app;
