const express = require('express');

const router = express.Router();
const isAuthenticated = require('../../auth');
const AntecedentesController = require('./controller');

router.get('/:id', isAuthenticated, async (req, res) => {
  const Antecedente = await AntecedentesController.getAntecedente(req.params.id);
  res.send(Antecedente);
});

router.post('/', isAuthenticated, async (req, res) => {
  const result = await AntecedentesController.pushAntecedente({
    idMedico: req.body.idMedico,
    name: req.body.name,
  });

  res.send(result);
});

router.put('/:id', isAuthenticated, async (req, res) => {
  const result = await AntecedentesController.updateAntecedente({
    _id: req.body._id,
    idMedico: req.body.idMedico, // todo: deberíamos confiar en lo que nos pasa la UI?
    name: req.body.name,
  });

  res.send(result);
});

router.delete('/:id', isAuthenticated, async (req, res) => {
  const result = await AntecedentesController.deleteAntecedente(req.params.id);
  res.send(result);
});

router.get('/medico/:id', isAuthenticated, async (req, res) => {
  const antecedentes = await AntecedentesController.getAntecedentesDeMedico(req.params.id);
  res.send(antecedentes);
});

module.exports = router;
