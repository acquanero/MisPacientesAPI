var express = require('express');
var router = express.Router();

const PacientesController = require('./controller');

router.get('/', async function(req,res,next){
  //res.send('Listado de medicos');
  let pacientes = await PacientesController.getPacientes();
  res.send(pacientes);
});


router.get('/:id', async function(req,res,next){
  //res.send('Un inventor: ' + req.params.id);
  let paciente = await PacientesController.getPaciente(req.params.id);
  res.send(paciente);
});

router.post('/', async function(req,res){

  let result = await PacientesController.pushPaciente(
      {
          _id: req.body._id,
          nombre: req.body.nombre, 
          apellido: req.body.apellido,
          fechaNacimiento: req.body.fechaNacimiento,
          obraSocial: req.body.obraSocial,
          plan: req.body.plan,
          numAfiliado: req.body.numAfiliado,
          telefono: req.body.telefono,
          antecedentes: req.body.antecedentes,
          medicacionHabitual: req.body.medicacionHabitual,
          alergias: req.body.alergias,
          cirugias: req.body.cirugias,
          listaEvoluciones: req.body.listaEvoluciones,
          listaTurnos: req.body.listaTurnos
      }
  )

  res.send(result);
})

router.put('/:id', async function (req,res){
  
  let result = await PacientesController.updatePaciente(
      {
        _id: req.body._id,
        nombre: req.body.nombre, 
        apellido: req.body.apellido,
        fechaNacimiento: req.body.fechaNacimiento,
        obraSocial: req.body.obraSocial,
        plan: req.body.plan,
        numAfiliado: req.body.numAfiliado,
        telefono: req.body.telefono,
        antecedentes: req.body.antecedentes,
        medicacionHabitual: req.body.medicacionHabitual,
        alergias: req.body.alergias,
        cirugias: req.body.cirugias,
        listaEvoluciones: req.body.listaEvoluciones,
        listaTurnos: req.body.listaTurnos
      }
  )

  res.send(result);

});

router.delete('/:id', async function(req,res){
  let result = await PacientesController.deletePaciente(req.params.id);
  res.send(result);
});

module.exports = router;