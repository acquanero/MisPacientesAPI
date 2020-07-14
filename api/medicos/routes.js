const express = require('express');

const router = express.Router();
const isAuthenticated = require('../../auth');

const MedicosController = require('./controller');

router.get('/', isAuthenticated, async (req, res) => {
  const medicos = await MedicosController.getMedicos();
  res.send(medicos);
});

router.get('/:id', isAuthenticated, async (req, res) => {
  const medico = await MedicosController.getMedico(req.params.id);
  res.send(medico);
});

router.post('/', async (req, res) => {
  const { mail, password } = req.body;
  const result = await MedicosController.pushMedico({
    mail,
    password,
  });

  res.send(result);
});

router.put('/:id', isAuthenticated, async (req, res) => {
  const result = await MedicosController.updateMedico({
    _id: req.body._id,
    mail: req.body.mail,
    password: req.body.password,
  });

  res.send(result);
});

router.delete('/:id', isAuthenticated, async (req, res) => {
  const result = await MedicosController.deleteMedico(req.params.id);
  res.send(result);
});

// Registra los medicos en la base de datos
router.post('/register', async (req, res) => {
  const { mail, password } = req.body;
  const registeredState = await MedicosController.register(mail, password);
  res.send(registeredState);
});

// Login devuelve un token generado para mantener el login dentro del front
router.post('/login', async (req, res) => {
  const { mail, password } = req.body;
  const token = await MedicosController.login(mail, password);
  res.send(token);
});

module.exports = router;
