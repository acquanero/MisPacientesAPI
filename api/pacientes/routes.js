var express = require('express');
var router = express.Router();

const PacientesController = require('./controller');

//Obtener todos los Pacientes
router.get('/', async function(req,res,next){
  let pacientes = await PacientesController.getPacientes();
  res.send(pacientes);
});

//Obtener paciente por id
router.get('/:id', async function(req,res,next){
  let paciente = await PacientesController.getPaciente(req.params.id);
  res.send(paciente);
});

//Crear paciente
router.post('/', async function(req,res){

  //Convierto la fecha de string dd-mm-yyyy a formato Date de Mongo

  let birthday = req.body.fechaNacimiento.split("-");
  let fechaString = birthday[2] + "-" + birthday[1] + "-" + birthday[0] + "T" + "00:00:00Z";
  let nacimientoDate = new Date(fechaString);

  let result = await PacientesController.pushPaciente(
      {
          idMedico: req.body.idMedico,
          nombre: req.body.nombre, 
          apellido: req.body.apellido,
          dni: req.body.dni,
          fechaNacimiento: nacimientoDate,
          obraSocial: req.body.obraSocial,
          plan: req.body.plan,
          numAfiliado: req.body.numAfiliado,
          telefono: req.body.telefono,
          antecedentes: req.body.antecedentes,
          medicacionHabitual: req.body.medicacionHabitual,
          alergias: req.body.alergias,
          cirugias: req.body.cirugias
      }
  )

  res.send(result);
})

//Actualizar paciente
router.put('/:id', async function (req,res){

  //Convierto la fecha de string dd-mm-yyyy a formato Date de Mongo
  let birthday = req.body.fechaNacimiento.split("-");
  let fechaString = birthday[2] + "-" + birthday[1] + "-" + birthday[0] + "T" + "00:00:00Z";
  let nacimientoDate = new Date(fechaString);
  
  let result = await PacientesController.updatePaciente(
      {
        _id: req.body.idPaciente,
        idMedico: req.body.idMedico,
        nombre: req.body.nombre, 
        apellido: req.body.apellido,
        dni: req.body.dni,
        fechaNacimiento: nacimientoDate,
        obraSocial: req.body.obraSocial,
        plan: req.body.plan,
        numAfiliado: req.body.numAfiliado,
        telefono: req.body.telefono,
        antecedentes: req.body.antecedentes,
        medicacionHabitual: req.body.medicacionHabitual,
        alergias: req.body.alergias,
        cirugias: req.body.cirugias
      }
  )

  res.send(result);

});

//Eliminar paciente
router.delete('/:id', async function(req,res){
  let result = await PacientesController.deletePaciente(req.params.id);
  res.send(result);
});

//Obtener paciente por id del medico
router.get('/medico/:id_medico', async function(req,res,next){
  let pacientes = await PacientesController.getPacientePorMedico(req.params.id_medico);
  res.send(pacientes);
});

module.exports = router;