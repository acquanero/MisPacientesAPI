# MisPacientesAPI
API para consultar MisPacientes

Rutas:
------
/medicos
/pacientes
/evoluciones
/turnos


Rutas Evoluciones
=================
GET /evoluciones/
devuelve todas las evoluciones

GET /evoluciones/id
devuelve una evolcuion por id

POST
/evoluciones/
carga una evolucion

PUT
/evoluciones/id
actualiza la evolucion

DELETE
/evoluciones/id
borra la evolucion

GET
/evoluciones/paciente/id_paciente
devuelve las evoluciones correspondientes al paciente

Rutas Medicos
=================
GET /medicos/
devuelve todos los medicos

GET /medicos/id
devuelve el medico por id

GET /medicos/checkexistence/mail-password
devuelve el idMedico (en formato String) en caso de existir, de lo contrario devuelve none 

POST
/medicos/
carga una medico

PUT
/medicos/id
actualiza un medico

DELETE
/medicos/id
borra un medico


Rutas Pacientes
=================
GET /pacientes/
devuelve todos los pacientes

GET /pacientes/id
devuelve el paciente por id

POST
/pacientes/
carga una paciente

PUT
/pacientes/id
actualiza un paciente

DELETE
/pacientes/id
borra un paciente

GET
/pacientes/medico/id_medico
devuelve todos los pacientes de ese medico

Rutas Turnos
=================
GET /turnos/
devuelve todos los turnos

GET /turnos/id
devuelve el turno por id

POST
/turnos/
carga un turno

PUT
/turnos/id
actualiza un turno

DELETE
/turnos/id
borra un turno

GET
/turnos/paciente/id_paciente
Obtiene todos los turnos correspondientes a ese paciente por id

GET
/turnos/dia/dia-mes-anio-idmedico
Devuelve todos los turnos de un determinado dia correspondiente a un determinado medico por id