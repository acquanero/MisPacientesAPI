var express = require('express');
var router = express.Router();
const isAuthenticated = require('../../auth');
const TurnosController = require('./controller');

//Obtener todos los turnos
router.get('/', isAuthenticated, async function (req, res, next) {
    let turnos = await TurnosController.getTurnos();
    res.send(turnos);
});

//Obtener turno por id
router.get('/:id', isAuthenticated, async function (req, res, next) {
    let turno = await TurnosController.getTurno(req.params.id);
    res.send(turno);
});

//Crear turno
router.post('/', isAuthenticated, async function (req, res) {

    let result = await TurnosController.pushTurno(
        {
            idMedico: req.body.idMedico,
            idPaciente: req.body.idPaciente,
            fecha: new Date(req.body.fecha),
            //new Date(“<YYYY-mm-ddTHH:MM:ss>”) formato a ingresar
            motivoConsulta: req.body.motivoConsulta
        }
    );

    res.send(result);
});

//Actualizar turno
router.put('/:id', isAuthenticated, async function (req, res) {

    let result = await TurnosController.updateTurno(
        {
            _id: req.body._id,
            idMedico: req.body.idMedico,
            idPaciente: req.body.idPaciente,
            fecha: new Date(req.body.fecha),
            motivoConsulta: req.body.motivoConsulta
        }
    );

    res.send(result);

});

//Eliminar turno
router.delete('/:id', isAuthenticated, async function (req, res) {
    let result = await TurnosController.deleteTurno(req.params.id);
    res.send(result);
});

//Obtener todos los turnos por id del paciente
router.get('/paciente/:id', isAuthenticated, async function (req, res, next) {
    let turnos = await TurnosController.getTurnosDePaciente(req.params.id);
    res.send(turnos);
});

//Obtener todos los turnos de una fecha de un medico especifico (pasandole como string en formato dd-mm-yyyy-idMedico)
router.get('/dia/:diamesanio', isAuthenticated, async function (req, res, next) {
    const id = req.medico._id.toString();
    let turnos = await TurnosController.getTurnosDelDia(id, req.params.diamesanio);
    res.send(turnos);
});

module.exports = router;
