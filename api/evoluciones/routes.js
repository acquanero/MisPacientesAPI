var express = require('express');
var router = express.Router();
const isAuthenticated = require('../../auth');

const EvolucionesController = require('./controller');

router.get('/',isAuthenticated, async function (req, res, next) {
    let evoluciones = await EvolucionesController.getEvoluciones();
    res.send(evoluciones);
});


router.get('/:id', async function (req, res, next) {
    let evolucion = await EvolucionesController.getEvolucion(req.params.id);
    res.send(evolucion);
});

router.post('/', async function (req, res) {

    let result = await EvolucionesController.pushEvolucion(
        {
            idMedico: req.body.idMedico,
            idPaciente: req.body.idPaciente,
            fecha: new Date(req.body.fecha),
            motivoConsulta: req.body.motivoConsulta,
            descripcion: req.body.descripcion
        }
    );

    res.send(result);
});

router.put('/:id', async function (req, res) {

    let result = await EvolucionesController.updateEvolucion(
        {
            _id: req.body._id,
            idMedico: req.body.idMedico,
            idPaciente: req.body.idPaciente,
            fecha: new Date(req.body.fecha),
            motivoConsulta: req.body.motivoConsulta,
            descripcion: req.body.descripcion
        });

    res.send(result);

});

router.delete('/:id', async function (req, res) {
    let result = await EvolucionesController.deleteEvolucion(req.params.id);
    res.send(result);
});

//Obtener evoluciones por id del paciente
router.get('/paciente/:id_Paciente', async function (req, res, next) {
    let evols = await EvolucionesController.getEvolucionesDePaciente(req.params.id_Paciente);
    res.send(evols);
});

module.exports = router;
