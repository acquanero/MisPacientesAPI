const express = require('express');

const router = express.Router();

const medicos = require('./medicos/routes');
const pacientes = require('./pacientes/routes');
const evoluciones = require('./evoluciones/routes');
const turnos = require('./turnos/routes');
const antecedentes = require('./antecedentes/routes');

router.use('/medicos', medicos);
router.use('/pacientes', pacientes);
router.use('/evoluciones', evoluciones);
router.use('/turnos', turnos);
router.use('/antecedentes', antecedentes);

/* GET home page. */
router.get('/', (req, res) => {
  res.json({ title: 'Mis Pacientes API' });
});

module.exports = router;
