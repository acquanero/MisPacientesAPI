var express = require('express');
var router = express.Router();

const TurnosController = require('./controller');

//Obtener todos los turnos
router.get('/', async function(req,res,next){
  let turnos = await TurnosController.getTurnos();
  res.send(turnos);
});

//Obtener turno por id
router.get('/:id', async function(req,res,next){
  let turno = await TurnosController.getTurno(req.params.id);
  res.send(turno);
});

//Crear turno
router.post('/', async function(req,res){

  let result = await TurnosController.pushTurno(
      {
          _id: req.body._id,
          idMedico: req.body.idMedico, 
          idPaciente: req.body.idPaciente,
          fecha: req.body.fecha,
          motivoConsulta: req.body.motivoConsulta
      }
  )

  res.send(result);
})

//Actualizar turno
router.put('/:id', async function (req,res){
  
  let result = await TurnosController.updateTurno(
      {
        _id: req.body._id,
        idMedico: req.body.idMedico, 
        idPaciente: req.body.idPaciente,
        fecha: req.body.fecha,
        motivoConsulta: req.body.motivoConsulta
      }
  )

  res.send(result);

});

//Eliminar turno
router.delete('/:id', async function(req,res){
  let result = await TurnosController.deleteTurno(req.params.id);
  res.send(result);
});

//Obtener todos los turnos por id del paciente
router.get('/paciente/:id', async function(req,res,next){
    let turnos = await TurnosController.getTurno(req.params.id);
    res.send(turnos);
  });

//Obtener todos los turnos de una fecha (pasandola como string en formato d-m-y)
router.get('/dia/:diamesanio', async function(req,res,next){
    let turnos = await TurnosController.getTurnosDelDia(req.params.diamesanio);
    res.send(turnos);
  });

module.exports = router;