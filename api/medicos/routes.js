var express = require('express');
var router = express.Router();
const isAuthenticated = require('../../auth');

const MedicosController = require('./controller');

router.get('/', isAuthenticated, async function (req, res, next) {
    //res.send('Listado de medicos');
    let medicos = await MedicosController.getMedicos();
    res.send(medicos);
});


router.get('/:id', isAuthenticated, async function (req, res, next) {
    //res.send('Un medico: ' + req.params.id);
    let medico = await MedicosController.getMedico(req.params.id);
    res.send(medico);
});

router.post('/', async function (req, res) {

    let result = await MedicosController.pushMedico(
        {
            mail: req.body.mail,
            password: req.body.password
        });

    res.send(result);
});

router.put('/:id', isAuthenticated, async function (req, res) {

    let result = await MedicosController.updateMedico(
        {
            _id: req.body._id,
            mail: req.body.mail,
            password: req.body.password
        });

    res.send(result);
});

router.delete('/:id', isAuthenticated, async function (req, res) {
    let result = await MedicosController.deleteMedico(req.params.id);
    res.send(result);
});

//Registra los pacientes en la base de datos
router.post('/register', async function (req, res) {
    const {mail, password} = req.body;
    let registeredState = await MedicosController.register(mail, password);
    res.send(registeredState);
});

//Login devuelve un token generado para mantener el login dentro del front
router.post('/login', async function (req, res) {
    const {mail, password} = req.body;
    let token = await MedicosController.login(mail, password);

    res.send(token);
});

module.exports = router;
