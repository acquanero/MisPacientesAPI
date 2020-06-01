var express = require('express');
var router = express.Router();

const EvolucionesController = require('./controller');

router.get('/', async function(req,res,next){
  let evoluciones = await EvolucionesController.getEvoluciones();
  res.send(evoluciones);
});


router.get('/:id', async function(req,res,next){
  let evolucion = await EvolucionesController.getEvolucion(req.params.id);
  res.send(evolucion);
});

router.post('/', async function(req,res){

  let result = await EvolucionesController.pushEvolucion(
      {
          _id: req.body._id,
          idMedico: req.bod.idMedico, 
          idPaciente: req.bod.idPaciente, 
          fecha: req.bod.fecha,
          motivoConsulta: req.bod.motivoConsulta,
          descripcion: req.bod.descripcion
      }
  )

  res.send(result);
})

router.put('/:id', async function (req,res){
  
  let result = await EvolucionesController.updateEvolucion(
      {
        _id:req.body._id,
        nombre: req.body.nombre, 
        apellido: req.body.apellido, 
        matricula: req.body.matricula,
        mail: req.body.mail,
        usuario: req.body.usuario,
        password: req.body.password,
        calendario: req.body.calendario
      }
  )

  res.send(result);

});

router.delete('/:id', async function(req,res){
  let result = await EvolucionesController.deleteEvolucion(req.params.id);
  res.send(result);
});

module.exports = router;