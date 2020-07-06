var express = require('express');
var router = express.Router();
const isAuthenticated = require('../../auth');
const AntecedentesController = require('./controller');

router.get('/:id', isAuthenticated, async function (req, res, next) {
    let Antecedente = await AntecedentesController.getAntecedente(req.params.id);
    res.send(Antecedente);
});

router.post('/', isAuthenticated, async function (req, res) {

    let result = await AntecedentesController.pushAntecedente(
        {
            idMedico: req.body.idMedico,
            name: req.body.name
        }
    );

    res.send(result);
});

router.put('/:id', isAuthenticated, async function (req, res) {

    let result = await AntecedentesController.updateAntecedente(
        {
            _id: req.body._id,
            idMedico: req.body.idMedico, // todo: deberíamos confiar en lo que nos pasa la UI?
            name: req.body.name
        }
    );

    res.send(result);

});

router.delete('/:id', isAuthenticated, async function (req, res) {
    let result = await AntecedentesController.deleteAntecedente(req.params.id);
    res.send(result);
});


router.get('/medico/:id', isAuthenticated, async function (req, res, next) {
    let Antecedentes = await AntecedentesController.getAntecedentesDePaciente(req.params.id);
    res.send(Antecedentes);
});

//Obtener todos los Antecedentes de una fecha de un medico especifico (pasandole como string en formato dd-mm-yyyy-idMedico)
router.get('/dia/:diamesanio', isAuthenticated, async function (req, res, next) {
    const id = req.medico._id.toString();
    let Antecedentes = await AntecedentesController.getAntecedentesDelDia(id, req.params.diamesanio);
    res.send(Antecedentes);
});

module.exports = router;
