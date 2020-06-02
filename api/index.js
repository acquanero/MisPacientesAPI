var express = require('express');
var router = express.Router();

const medicos = require('./medicos/routes');
const pacientes = require('./pacientes/routes');
const evoluciones = require('./evoluciones/routes');
const turnos = require('./turnos/routes');

router.use("/medicos", medicos);
router.use("/pacientes", pacientes);
router.use("/evoluciones", evoluciones);
router.use("/turnos", turnos);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Mis Pacientes API' });
});

module.exports = router;
