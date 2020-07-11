const express = require('express');

const router = express.Router();
const isAuthenticated = require('../../auth');

const EvolucionesController = require('./controller');

router.get('/', isAuthenticated, async (req, res) => {
  const evoluciones = await EvolucionesController.getEvoluciones();
  res.send(evoluciones);
});

router.get('/:id', async (req, res) => {
  const evolucion = await EvolucionesController.getEvolucion(req.params.id);
  res.send(evolucion);
});

router.post('/', async (req, res) => {
  const result = await EvolucionesController.pushEvolucion({
    idPaciente: req.body.idPaciente,
    fecha: new Date(req.body.fecha),
    motivoConsulta: req.body.motivoConsulta,
    descripcion: req.body.descripcion,
  });

  res.send(result);
});

router.put('/:id', async (req, res) => {
  const result = await EvolucionesController.updateEvolucion({
    _id: req.body._id,
    idPaciente: req.body.idPaciente,
    fecha: new Date(req.body.fecha),
    motivoConsulta: req.body.motivoConsulta,
    descripcion: req.body.descripcion,
  });

  res.send(result);
});

router.delete('/:id', async (req, res) => {
  const result = await EvolucionesController.deleteEvolucion(req.params.id);
  res.send(result);
});

// Obtener evoluciones por id del paciente
router.get('/paciente/:id_Paciente', async (req, res) => {
  const evols = await EvolucionesController.getEvolucionesDePaciente(req.params.id_Paciente);
  res.send(evols);
});

module.exports = router;
