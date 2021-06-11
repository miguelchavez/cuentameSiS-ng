# Cuentame SiS

_antes conocido como TutorPlus_

```
Version 2 Reloaded, Mid 2021
```

## App de Inscripciones

Estará abierto a los padres de familia para el llenado de la ficha de inscricpión.

#### Authentication

Se usa firebase authentication. Inicialmente la idea era usar las cuentas de familia creadas en el proceso de inscripcion. Sin embargo, esto trae el problema de que es primero, el huevo o la gallina. Es decir, que hacemos primero, crear la cuenta de familia para que pueda iniciar sesion en la app, o crear la cuenta una vez que se formalice la inscripcion.

La nueva idea, es dejar crear una cuenta nueva a los padres, sin necesidad que haya una cuenta de correo familiar (@colegioanahuac.mx) creada. Simplemente como una cuenta email/password, sin validar. El nuevo problema es el reseteo de password, ya que la cuenta no existirá hasta que se formalice la inscripción (o tal vez nunca).

Podemos usar el api de firebase auth para cambiar password sin necesidad de enviar email.

```javascript
/**
 * Importante: Para configurar la contraseña de un usuario, este debe haber accedido recientemente.
 **/
var user = firebase.auth().currentUser
var newPassword = getASecureRandomPassword()

user.updatePassword(newPassword)
    .then(function () {
        // Update successful.
    })
    .catch(function (error) {
        // An error happened.
    })
```

#### Firestore

##### Colecciones

_Fichas_
Las fichas de inscripcion contendrán todos los datos familiares que son comunes a una familia.

```json
{
    "id":'nNHCD1oTZjFpsK4rLzhE',
    "aspirantes": ['Wngt3xYCaw7VQ0ZrKhec','TqiRSl9KtcXepw2OoQQk2QH0naX2', ...],
    "padre": {},
    "madre": {},
    "emergencia": {},
    "created_at": '',
    "updated_at":'',
    "updated_by":'jLRSOBrW6tMLJDCXmSeSSFzs5pW2',
    "created_by":'jLRSOBrW6tMLJDCXmSeSSFzs5pW2',
    "email_familia": 'f.ap.am@colegioanahuac.mx'
}
```

_Aspirantes_
Los registros de los aspirantes, contendrá toda la información personal.

```json
{
    "id": "Wngt3xYCaw7VQ0ZrKhec",
    "fichaId": "nNHCD1oTZjFpsK4rLzhE",
    "email_familia": "f.ap.am@colegioanahuac.mx",
    "nombre": "",
    "apellidoPaterno": "",
    "apellidoMaterno": "",
    "antecedentes_medicos": {},
    "antecedentes_escolares": {},
    "documentos": {},
    "grado_solicitado": 2,
    "nivel_solicitado": "secundaria/preparatoria",
    "escuela_solicitada": "Rsow5xTiLYmCaQ35Kgap7",
    "estatus": "activo",
    "periodos": ["FEB-MAY 2019", "AGO-DIC 2020"]
}
```

_Datos académicos de cada aspirante_
Habra un registro con los datos académicos de cada aspirante

_Datos médicos de cada aspirante_
Habra un registro con los datos médicos de cada aspirante

_Documentos_

Adicionalmente, si se desea, puede contar con un repositorio de documentos por cada aspirante, como actas de nacimiento, certificados escolares oficiales, etc..
Estos documentos se anexarían como imagenes escaneadas, subidas a firebase storage y referenciadas en el campo documentos del aspirante.

#### Inscripciones

Tendrá acceso a la colección de fichas y alumnos, pudiendo escribir sólo los documentos creados por el usuario autentificado.

Los alumnos, estarán ligados a una ficha (y a una cuenta de familia), y tendrán un estatus de preinscrito, inscrito, reinscrito suspendido ó graduado.

La ficha, contendrá los datos familiares, escolares, y medicos de el ó los alumnos.

Los padres podrán editar estas fichas cuantas veces necesiten, mientras este abierto el ciclo de inscripciones.

Del lado administrativo, la dirección, subdirección o estaff de inscripciones podrá marcar una ficha con alumnos como listos para inscribir. El administrador del sistema entonces procesará estos registros para crear las cuentas de correo de los alumnos y posteriormente asignar materias.

(C) 2021 codea.me
