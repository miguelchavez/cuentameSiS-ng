// Next/React
import React from 'react'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'

//useSnackbar
import { useSnackbar } from 'notistack'

//motion
import { motion } from 'framer-motion'
import { AnimateUp } from '../utils/motion-variants'
import { Container_, FadeInUp } from '../utils/motion-variants'

// MUI
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

// Firestore
// import { useCollection, useDocument } from 'swr-firestore-v9'

// Own
import { getMunicipios } from '../utils/strings'
// import { useUserState } from '../context/user'

// surveyjs
const SurveyComponent = dynamic(() => import('./survey'), {
    ssr: false,
})

const FormaExpediente = (props) => {
    const { data, update, set, tipo } = props

    const expedienteJson = {
        title: 'Expediente del estudiante',
        description: 'Proporcione la siguiente información del estudiante',
        completedHtml: '<h3>Gracias</h3><h5>Su información ha sido actualizada</h5>',
        progressBarType: 'buttons',
        pages: [
            {
                name: 'estudiante',
                title: 'Datos del estudiante',
                description: 'Datos del estudiante',
                showQuestionNumbers: 'off',
                // Con progressBarType: button:
                navigationTitle: 'Estudiante',
                navigationDescription: 'Datos Personales',
                elements: [
                    {
                        type: 'panel',
                        name: 'nombreEstudiante',
                        questionTitleLocation: 'bottom',
                        title: 'Generales',
                        elements: [
                            {
                                name: 'nombre',
                                title: 'Nombre',
                                type: 'text',
                                isRequired: true,
                            },
                            {
                                startWithNewLine: false,
                                isRequired: true,
                                name: 'apaterno',
                                title: 'Apellido Paterno',
                                type: 'text',
                            },
                            {
                                startWithNewLine: false,
                                name: 'amaterno',
                                title: 'Apellido Materno',
                                isRequired: false,
                                type: 'text',
                            },
                            {
                                startWithNewLine: false,
                                isRequired: true,
                                name: 'genero',
                                title: 'Genero',
                                type: 'dropdown',
                                hasOther: true,
                                otherText: 'Otro',
                                colCount: 0,
                                hasNone: false,
                                choices: ['Femenino', 'Masculino'],
                            },
                            {
                                startWithNewLine: true,
                                name: 'curp',
                                title: 'C.U.R.P.',
                                type: 'text',
                                isRequired: true,
                                // https://conocimiento.blob.core.windows.net/conocimiento/2019/Contables/Nominas/Cartastecnicas/CT_Nominas_1110/curp_generica_para_trabajadores_extranjeros_sin_curp.html#
                                // https://www.gob.mx/segob/renapo/acciones-y-programas/preguntas-frecuentes-sobre-la-clave-unica-de-registro-de-poblacion-temporal-para-extranjeros
                                //¿Cuál es la CURP para Extranjeros?
                                // La CURP Temporal designada para el uso de personas extranjeras es la siguiente:
                                //     Hombre: XEXX010101HNEXXXA4
                                //     Mujer: XEXX010101MNEXXXA8
                            },
                        ],
                    },
                    {
                        type: 'panel',
                        name: 'lugarNacimiento',
                        questionTitleLocation: 'bottom',
                        title: 'Lugar y fecha de nacimiento',
                        elements: [
                            {
                                startWithNewLine: true,
                                isRequired: true,
                                name: 'pais_nacimiento',
                                title: 'País',
                                type: 'dropdown',
                                hasOther: true,
                                otherText: 'Otro',
                                choicesByUrl: {
                                    url: 'https://surveyjs.io/api/CountriesExample',
                                    valueName: 'name',
                                },
                            },
                            {
                                startWithNewLine: false,
                                name: 'estado_nacimiento',
                                title: 'Estado',
                                // type: 'text',
                                isRequired: true,
                                type: 'dropdown',
                                hasOther: true,
                                otherText: 'Otro',
                                // type: 'dropdown',
                                // choicesByUrl: {
                                //     url: '/estados',
                                //     valueName: 'nombre',
                                // },
                            },
                            {
                                startWithNewLine: false,
                                name: 'municipio_nacimiento',
                                title: 'Municipio',
                                // type: 'text',
                                type: 'dropdown',
                                hasOther: true,
                                otherText: 'Otro',
                                isRequired: true,
                                // type: 'dropdown',
                                // choicesByUrl: {
                                //     url: '/localidades',
                                //     valueName: 'nombre',
                                // },
                            },
                            {
                                startWithNewLine: false,
                                name: 'localidad_nacimiento',
                                title: 'Localidad/Ciudad',
                                // type: 'text',
                                type: 'dropdown',
                                hasOther: true,
                                otherText: 'Otra',
                                isRequired: true,
                                // type: 'dropdown',
                                // choicesByUrl: {
                                //     url: '/localidades',
                                //     valueName: 'nombre',
                                // },
                            },
                            {
                                type: 'text',
                                title: 'Fecha de Nacimiento',
                                name: 'fecha_nacimiento',
                                inputType: 'date',
                                isRequired: true,
                                // validators: [
                                //     {
                                //         type: 'expression',
                                //         text: 'You should be 14 years old or older',
                                //         expression: '{age} > 13',
                                //     },
                                //     {
                                //         type: 'expression',
                                //         text: 'You should be 90 years old or younger',
                                //         expression: '{age} <= 90',
                                //     },
                                // ],
                            },
                        ],
                    },
                    {
                        type: 'panel',
                        name: 'contactos',
                        questionTitleLocation: 'bottom',
                        title: 'Medios de contacto',
                        elements: [
                            {
                                startWithNewLine: false,
                                name: 'tel_celular',
                                title: 'Teléfono celular',
                                type: 'text',
                                inputMask: 'phone',
                                inputFormat: '+#(###)-###-####',
                            },
                            {
                                startWithNewLine: false,
                                type: 'text',
                                name: 'email_personal',
                                title: 'Correo electrónico Personal',
                                validators: [
                                    {
                                        type: 'email',
                                    },
                                ],
                            },
                        ],
                    },
                    // title: 'El estudiante vive con',
                    {
                        type: 'panel',
                        name: 'domicilio',
                        questionTitleLocation: 'bottom',
                        title: 'Domicilio',
                        elements: [
                            {
                                type: 'radiogroup',
                                name: 'estudiante_vive_con',
                                title: 'El estudiante vive con',
                                hasNone: false, // Si se agrega la opcion 'None'.
                                colCount: 4,
                                choices: ['El padre', 'La madre', 'El tutor', 'Otro domicilio'],
                                isRequired: true,
                            },
                            {
                                visibleIf: `{estudiante_vive_con} == 'Otro domicilio'`,
                                startWithNewLine: true,
                                isRequired: true,
                                name: 'domicilio_pais',
                                title: 'País',
                                type: 'dropdown',
                                hasOther: true,
                                otherText: 'Otro',
                                choicesByUrl: {
                                    url: 'https://surveyjs.io/api/CountriesExample',
                                    valueName: 'name',
                                },
                            },
                            {
                                visibleIf: `{estudiante_vive_con} == 'Otro domicilio'`,
                                startWithNewLine: false,
                                name: 'domicilio_estado',
                                title: 'Estado',
                                // type: 'text',
                                type: 'dropdown',
                                hasOther: true,
                                otherText: 'Otro',
                                // choicesByUrl: {
                                //     url: '/estados',
                                //     valueName: 'nombre',
                                // },
                            },
                            {
                                visibleIf: `{estudiante_vive_con} == 'Otro domicilio'`,
                                startWithNewLine: false,
                                name: 'domicilio_municipio',
                                title: 'Municipio',
                                // type: 'text',
                                type: 'dropdown',
                                hasOther: true,
                                otherText: 'Otro',
                                // choicesByUrl: {
                                //     url: '/localidades',
                                //     valueName: 'nombre',
                                // },
                            },
                            {
                                visibleIf: `{estudiante_vive_con} == 'Otro domicilio'`,
                                startWithNewLine: false,
                                name: 'domicilio_localidad',
                                title: 'Localidad/Ciudad',
                                // type: 'text',
                                type: 'dropdown',
                                hasOther: true,
                                otherText: 'Otra',
                                // choicesByUrl: {
                                //     url: '/localidades',
                                //     valueName: 'nombre',
                                // },
                            },
                            {
                                visibleIf: `{estudiante_vive_con} == 'Otro domicilio'`,
                                startWithNewLine: false,
                                name: 'domicilio_colonia',
                                title: 'Colonia',
                                // type: 'text',
                                type: 'dropdown',
                                hasOther: true,
                                otherText: 'Otro',
                                // choicesByUrl: {
                                //     url: '/colonias',
                                //     valueName: 'nombre',
                                // },
                            },
                            {
                                visibleIf: `{estudiante_vive_con} == 'Otro domicilio'`,
                                startWithNewLine: false,
                                name: 'domicilio_codigopostal',
                                title: 'Código Postal',
                                type: 'text',
                            },
                            {
                                visibleIf: `{estudiante_vive_con} == 'Otro domicilio'`,
                                startWithNewLine: true,
                                name: 'domicilio_calle_numero',
                                title: 'Calle y número',
                                type: 'text',
                            },
                        ],
                    },
                ],
            },
            {
                name: 'DatosEscolares',
                title: 'Datos Escolares',
                description: 'Dato escolares del estudiante',
                showQuestionNumbers: 'off',
                // Con progressBarType: button:
                navigationTitle: 'Escolares',
                navigationDescription: 'Datos Escolares',
                elements: [
                    {
                        startWithNewLine: false,
                        name: 'cura',
                        title: 'C.U.R.A.',
                        type: 'text',
                        isRequired: true,
                    },
                    {
                        startWithNewLine: false,
                        name: 'grado_solicitado',
                        title: 'Grado que solicita',
                        type: 'text',
                        isRequired: true,
                    },
                    {
                        type: 'panel',
                        name: 'escuelaProcedencia',
                        questionTitleLocation: 'bottom',
                        title: 'Escuela de procedencia',
                        elements: [
                            {
                                isRequired: true,
                                name: 'pais_escuela',
                                title: 'País',
                                type: 'dropdown',
                                hasOther: true,
                                otherText: 'Otro',
                                choicesByUrl: {
                                    url: 'https://surveyjs.io/api/CountriesExample',
                                    valueName: 'name',
                                },
                            },
                            {
                                startWithNewLine: false,
                                name: 'estado_escuela',
                                title: 'Estado',
                                // type: 'text',
                                type: 'dropdown',
                                hasOther: true,
                                otherText: 'Otro',
                                isRequired: true,
                                // choicesByUrl: {
                                //     url: '/estados',
                                //     valueName: 'nombre',
                                // },
                            },
                            {
                                startWithNewLine: false,
                                name: 'municipio_escuela',
                                title: 'Municipio',
                                // type: 'text',
                                type: 'dropdown',
                                hasOther: true,
                                otherText: 'Otro',
                                isRequired: true,
                                // choicesByUrl: {
                                //     url: '/localidades',
                                //     valueName: 'nombre',
                                // },
                            },
                            {
                                startWithNewLine: false,
                                name: 'localidad_escuela',
                                title: 'Localidad/Ciudad',
                                // type: 'text',
                                type: 'dropdown',
                                hasOther: true,
                                otherText: 'Otra',
                                isRequired: true,
                                // choicesByUrl: {
                                //     url: '/localidades',
                                //     valueName: 'nombre',
                                // },
                            },
                            {
                                startWithNewLine: false,
                                name: 'nombre_escuela',
                                title: 'Nombre de la Escuela',
                                isRequired: true,
                                type: 'dropdown',
                                hasOther: true,
                                otherText: 'Otra',
                                // choicesByUrl: {
                                //     url: '/estados',
                                //     valueName: 'nombre',
                                // },
                            },
                        ],
                    },
                ],
            },
            {
                name: 'medicos',
                title: 'Datos Médicos del estudiante',
                description: 'Datos Médicos del estudiante',
                showQuestionNumbers: 'off',
                // Con progressBarType: button:
                navigationTitle: 'Médicos',
                navigationDescription: 'Datos Médicos',
                elements: [
                    {
                        name: 'tipoSangre',
                        title: 'Tipo de sangre',
                        type: 'dropdown',
                        isRequired: true,
                        choices: ['O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-'],
                    },
                    {
                        type: 'panel',
                        name: 'condiciones_medicas',
                        title: 'Agregue y describa las condiciones médicas que padece el estudiante.',
                        elements: [
                            {
                                type: 'matrixdynamic',
                                name: 'enferemedades',
                                title: 'Describa la condición médica',
                                rowCount: 1,
                                panelAddText: 'Agregar',
                                panelRemoveText: 'Remover',
                                columns: [
                                    {
                                        name: 'enfermedad',
                                        cellType: 'dropdown',
                                        title: 'Condición médica',
                                        choices: [
                                            'Alergia',
                                            'Anciedad, Depresión o Enfermedad Psiquiátrica',
                                            'Colesterol o Trigliceridos Altos',
                                            'Diabetes',
                                            'Presión Arterial Alta',
                                            'Enfermedades del corazón',
                                            'Otra',
                                        ],
                                        isRequired: true,
                                    },
                                    {
                                        name: 'descripcion_enfermedad',
                                        cellType: 'text',
                                        title: 'Describe',
                                        isRequired: true,
                                    },
                                ],
                            },
                        ],
                    },
                    {
                        type: 'panel',
                        name: 'medico',
                        title: 'Información de su médico',
                        elements: [
                            {
                                name: 'nombre_medico',
                                cellType: 'text',
                                title: 'Nombre',
                                isRequired: true,
                            },
                            {
                                name: 'celular_medico',
                                cellType: 'text',
                                title: 'Celular',
                                isRequired: true,
                            },
                            {
                                name: 'tel_medico',
                                cellType: 'text',
                                title: 'Teléfono del consultorio',
                                isRequired: true,
                            },
                        ],
                    },
                ],
            },
            {
                name: 'final',
                title: 'Aviso de privacidad',
                description: 'Aviso de privacidad',
                showQuestionNumbers: 'off',
                // Con progressBarType: button:
                navigationTitle: 'Fin',
                navigationDescription: 'Aviso de privacidad',
                elements: [
                    {
                        type: 'html',
                        name: 'enferemedades',
                        html: '<h3 style="text-align: center">Instituto Colimense de Educación Básica SC</h3><p>El presente Aviso de Privacidad se emite en cumplimiento a lo dispuesto por el artículo 15 de la Ley Federal de Protección de Datos Personales en Posesión de los Particulares,reglamentada por el segundo párrafo del Artículo 16 de la Constitución Política de los Estados Unidos Mexicanos, publicada en el Diario Oficial de la Federación el lunes 5 de julio del 2010, el cual se pone a disposición de los padres de familia, tutores, alumnos y empleados de esta institución que por cualquier motivo entregue a INSTITUTO COLIMENSE DE EDUCACIÓN BÁSICA, S.C. (COLEGIO ANÁHUAC COLIMA) datos o información personal.</p><p>El objeto del presente escrito es hacer del conocimiento de nuestra comunidad escolar, padres de familia y empleados sobre la importancia del “AVISO DE PRIVACIDAD” y su referida Ley, la cual se creó con la finalidad de regular y sentar las bases para buscar la protección de los datos personales en posesión de los particulares con el fin de regularsu tratamiento legítimo, controlado e informado, a efecto de garantizar la privacidad y el derecho a la autodeterminación informativa de las personas, es decir proteger a losindividuos del acceso, rectificación, cancelación y oposición de sus datos personales (denominados derechos ARCO).</p><p>Es nuestro carácter de responsables en el tratamiento de datos personales observamos los principios que marca la ley, de licitud, consentimiento, información, calidad,finalidad, lealtad, proporcionalidad y responsabilidad acuerdo al artículo 16 de la Ley Federal de Protección de Datos Personales en Posesión de los Particulares:</p><h5>I. NOMBRE Y DOMICILIO DEL RESPONSABLE DE RECAVAR LOS DATOS PERSONALES.</h5><p>INSTITUTO COLIMENSE DE EDUCACIÓN BÁSICA, S.C. es una sociedad civil constituida conforme a la legislación  mexicana, que cuenta con los permisos y autorizaciones correspondientes para poder operar conforme a su objeto social que es la impartición de educación a nivel secundaria (incorporados a laSEP) y bachillerato (incorporado a la U DE C), con domicilio en Genoveva Sánchez No.1229, Col. Jardines Vista Hermosa, Colima, Col.  C.P.28017</p><h5>II. FINALIDADES Y USO DE LOS DATOS PERSONALES</h5><p>Para INSTITUTO COLIMENSE DE EDUCACIÓN BÁSICA, S.C., es muy importante contar con la confianza de los padres de familia, tutores, alumnos, ex-alumnos o empleados, por loque todos los datos que se recaben o sean generados con motivo de la relación  jurídica que se tenga celebrada, o que en su caso, se celebre, son tratados con absoluta confidencialidad, siendo utilizados para todos los fines vinculados con dicha relación, atendiendo a lo dispuesto por los contratos celebrados y la legislación mexicana. Losfines vinculados con dicha relación, serian:</p><ol type="a"><li>Transmitir la información solicitada por la SEP, U DE C, para efectos de incorporar, validar y reconocer los estudios de los alumnos.</li><li>Para evaluar una posible relación jurídica o laboral entre los padres de familia, tutores o empleados e INSTITUTO COLIMENSE DE EDUCACIÓN BÁSICA, S.C.</li><li>Formación del expediente e historial académico de los alumnos.</li><li>Analizar situaciones de solicitud de becas o para negociar descuentos y/o recargos en inscripciones, colegiaturas y demás cargos.</li><li>Atender cualquier queja, pregunta o comentario.</li><li>Para la contratación de la póliza de seguro educacional.</li><li>En el caso de los empleados: para su inscripción en el R.F.C., IMSS e INFONAVIT, Seguro Contra Accidentes, así como la apertura de una cuenta bancaria para el depósito de sueldo.</li><li>Enviar por cualquier medio físico, electrónico o magnético, incluyendo de manera enunciativa y no limitativa, avisos, circulares, noticias, correo ordinario, correo electrónico, mensajes de texto y llamadas telefónicas por conducto de las secretarias, profesores y personal directivo de la sección secundaria, preparatoria yadministrativa.</li><li>Crear bases de datos (incluyendo bases de datos respecto a datos sensibles) para los fines que requieran nuestros servicios educativos.</li><li>Enviar notificaciones de cambios a este aviso de privacidad.</li><li>Cumplir con las leyes o normatividad aplicable respecto a los servicios educativos en los Estados Unidos Mexicanos.</li><li>INSTITUTO COLIMENSE DE EDUCACIÓN BÁSICA, S.C., graba audios, videos y toma fotografías de los diferentes eventos que se realizan dentro y fuera de sus instalaciones, tales como: ceremonias en general, eventos deportivos, conferencias, obras de teatro, conciertos musicales, actividades culturales y recreativas, entre otros. Como parte de esta comunidad educativa, acepta que usted puede ser grabado y/o fotografiado, y que el material podrá ser utilizado con fines ilustrativos, promocionales, mercadotécnicos o de publicidad mediante medios electrónicos e impresos.</li></ol><h5>III. INFORMACIÓN QUE SE RECABA DE LOS PADRES DE FAMILIA, TUTORES, ALUMNOS O EMPLEADOS.</h5><p>Para las finalidades señaladas en el presente Aviso de Privacidad, INSTITUTO COLIMENSE DE EDUCACIÓN BÁSICA, S.C. recabará sus datos personales cuando:</p><ol type="a"><li>Usted los proporcione directamente a través de la cédula de inscripción, cédula de reinscripción o solicitud de empleo.</li><li>Entrega de documentación a la sección correspondiente relativa a usted y/o su hijo(a).</li></ol><p>En forma enunciativa más no limitativa, los datos personales que recabamos y tratamos a través de las formas anteriores pueden ser, entre otros:</p><ol type="a"><li>Datos sobre el alumno: nombre completo, CURP, RFC, fecha de nacimiento, celular personal, correo electrónico personal, nacionalidad, escuela de procedencia y sus datos de domicilio, diversos datos del área médica como alergias, enfermedades, nombre y datos de su doctor, tratamientos médicos o psicológicos que recibe, etc.</li><li>Datos sobre los padres o tutores: el nombre completo del padre y la madre o tutor y tutora del alumno, domicilio completo de la familia o de cada uno de los padres si están separados, así como teléfonos, celulares, correos electrónicos, datos completos del domicilio del trabajo, empleo o negocio del padre y/o de la madre incluyendo teléfonos y correos, ocupación, puesto que desempeña, grado de estudios, estado civil, horarios del trabajo, etc. En el caso de solicitar facturación electrónica, además se podrá solicitar RFC, CURP, domicilio fiscal y demás datos necesarios.</li><li>Datos complementarios del alumno: para el proceso de inscripción, dependiendo de la sección, además de los datos anteriores se podrá también pedir datos como la situación familiar, nombres de otros hijos así como su escolaridad y ocupación, datos sobre el comportamiento del alumno en lo social, familiar, emotivo, salud, deportivo,etc. Así como otro tipo de datos solicitados en entrevistas de admisión y/o de seguimiento que permitan evaluar al alumno y/o su familia.</li><li>Datos complementarios de tipo económico: para el proceso de solicitud de becas y o de acuerdos administrativos para el pago de inscripciones, colegiaturas y demás cargos. Información pertinente al entorno económico de la familia, ingresos, egresos, reporte de buro de crédito, declaraciones de impuestos, recibos de nómina y en general recibos y/o documentación de todo tipo que justifiquen la situación económica de la familia.</li><li>Datos sobre el aspirante y/o interesado o bien, sus padres y/o tutores: nombre completo, CURP, RFC, fecha de nacimiento, edad, celular personal, correo electrónicopersonal, sexo, nacionalidad, escuela de procedencia y sus datos de domicilio</li><li>Datos del Empleado, tales como: nombre, CURP, Registro Federal de Contribuyente, Número de Seguro Social, Número de Pasaporte, Número de Cartilla del Servicio Militar Nacional, Numero de Cedula Profesional, domicilio, teléfono, fecha de nacimiento, lugar de nacimiento, género, correo electrónico, profesión, nacionalidad, parentescos, puestos y lugares de trabajo anteriores y demás datos laborales, entre otros.</li><li>Datos del ex-alumno: nombre, domicilio, teléfono, correo electrónico, profesión, nacionalidad, puestos y demás datos laborales.</li><li>Datos sensibles (datos personales que afecten a la esfera más íntima de usted o su hijo, o cuya utilización indebida pueda dar origen a discriminación o le conlleve unriesgo grave, en particular) como origen racial o étnico, estado de salud presente y creencias religiosas.Cabe señalar que toda la información antes referida será manipulada de forma confidencial por nuestra institución teniendo control sobre el uso y divulgación de la misma.</li></ol><h5>IV. CONSENTIMIENTO DEL USO DE LOS DATOS.</h5><p>Los padres de familia, tutores o empleados aceptan que si solicitaron o expresaron su interés por celebrar un contrato laboral (empleados) o en su caso la inscripción o reinscripción de sus hijos con INSTITUTO COLIMENSE DE EDUCACIÓN BÁSICA, S.C., otorgaron su consentimiento pleno para el tratamiento y transferencia de la Información, para los fines antes descritos.Para los fines distintos a los que se señalan a continuación, cuando se trate de datos personales sensibles, financieros o patrimoniales  INSTITUTO COLIMENSE DE EDUCACIÓN BÁSICA, S.C. recabará el consentimiento pertinente, el cual junto con el presente Aviso de Privacidad le faculta, a darle el tratamiento que haya sido autorizado por los titulares.</p><ol type="I"><li>Esté previsto en una Ley;</li><li>Los datos figuren en fuentes de acceso público;</li><li>Los datos personales se sometan a un procedimiento previo de disociación;</li><li>Tenga el propósito de cumplir obligaciones derivadas de una relación jurídica entre el titular y el responsable;</li><li>Exista una situación de emergencia que potencialmente pueda dañar a un individuo en su persona o en sus bienes;</li><li>Sean indispensables para la atención médica, la prevención, diagnóstico, \
                        la prestación de asistencia sanitaria, tratamientos médicos o la gestión de servicios sanitarios, mientras el titular no esté en condiciones de otorgar el consentimiento, en los términos que establece la Ley General de Salud y demás disposiciones jurídicas aplicables y que dicho tratamiento de datos se realice por una persona sujeta al secreto profesional u obligación equivalente, o</li><li>Se dicte resolución de autoridad competente.</li></ol><p>Al proporcionar sus datos personales por cualquier forma a INSTITUTO COLIMENSE DE EDUCACIÓN BÁSICA, S.C., usted acepta la recopilación, uso, divulgación, procesamiento ytransferencia de la Información personal de acuerdo con los términos de este Aviso de Privacidad. Si usted provee cualquier tipo de información personal relacionada con otra persona, por el presente usted declara y acepta que ha obtenido el consentimiento legal correspondiente de dicha persona para los efectos de dicho aviso de privacidad.</p><h5>V. DERECHOS DE ACCESO, RECTIFICACIÓN, CANCELACIÓN U OPOSICIÓN (ARCO).</h5><p>Usted tiene derecho a acceder a sus datos personales que poseemos y a los detalles del tratamiento de los mismos, así como a rectificarlos en caso de ser inexactos o solicitar la cancelación de los mismos cuando considere que resulten ser excesivos o innecesarios para las finalidades que justificaron su obtención u oponerse al tratamiento de losmismos para fines específicos.</p><p>En caso de que el titular quiera limitar o revocar su consentimiento sobre el tratamiento, divulgación o transferencia o hacer uso de los derechos ARCO (Acceso, Rectificación, Cancelación u Oposición), deberá presentar su solicitud con firma autógrafa, ante la Dirección General de esta institución, acompañada de la identificación oficial que lo acredite como titular de los datos (IFE, pasaporte), indicando las modificaciones a realizar y anexando la documentación que sustente su petición.</p><p>INSTITUTO COLIMENSE DE EDUCACIÓN BÁSICA, S.C. comunicará al solicitante en un plazo máximo de 15 días hábiles contados a partir de la fecha en que se reciba la solicitud de acceso, rectificación, cancelación u oposición la determinación adoptada. Si resulta procedente, se hará efectiva dentro de los 15 días siguientes a la fecha en que se les comunique la respuesta.Se podrá negar el acceso de datos personales, rectificación, cancelación o concesión de la oposición al tratamiento de los mismos, en los siguientes supuestos:</p><ol type="a"><li>Cuando el solicitante no sea el titular de los datos personales, o el representante legal no esté debidamente acreditado para ello.</li><li>Cuando en su base de datos no se encuentren los datos personales del solicitante.</li><li>Cuando se lesionen los derechos de un tercero.</li><li>Cuando exista un impedimento legal, o la resolución de una autoridad competente que restrinja el acceso a los datos personales o que no permita la rectificación, cancelación u oposición de los mismos</li><li>Cuando la rectificación, cancelación u oposición haya sido previamente cancelada.</li></ol><p>La negativa a que se refiere este artículo podrá ser parcial en cuyo caso INSTITUTO COLIMENSE DE EDUCACIÓN BÁSICA, S.C., indicará en qué casos se podrá efectuar el acceso, rectificación, cancelación u oposición requerida por el titular.<br>En todos los casos anteriores, INSTITUTO COLIMENSE DE EDUCACIÓN BÁSICA, S.C. deberá informar el motivo de su decisión y comunicarla a los titulares o en su caso, al representante legal, en los plazos establecidos para tal efecto, por el mismo medio por el que se llevó a cabo la solicitud, acompañando, en su caso, las pruebas que resulten pertinentes.</p><h5>VI. TRANSFERENCIA DE DATOS PERSONALES.</h5><p>INSTITUTO COLIMENSE DE EDUCACIÓN BÁSICA, S.C. podrá compartir todos o parte de  sus datos personales con cualquiera de las empresas relacionadas con la misma, en México y el extranjero; así como con empresas autorizadas de acuerdo a la Legislación Mexicana para la realización de actividades y operaciones en materia educativa; y los demás empleados y asesores del Colegio, quienes podrán o no tratar sus datos personales por cuenta del mismo.Asimismo, nos reservamos el derecho de compartir sus datos personales con autoridades gubernamentales, administrativas y/o judiciales en los Estados Unidos Mexicanos oen el extranjero en caso de ser necesario.<br>INSTITUTO COLIMENSE DE EDUCACIÓN BÁSICA, S.C. no compartirá o transferirá sus datos personales a terceros salvo en los casos previstos en la Ley Federal de Protección deDatos Personales en Posesión de los Particulares o cualquier otra legislación o reglamento aplicable.</p><h5>VII. SEGURIDAD, ALMACENAMIENTO Y UBICACIÓN DE DATOS PERSONALES.</h5><p>INSTITUTO COLIMENSE DE EDUCACIÓN BÁSICA, S.C. podrá conservar sus datos personales en bases de datos ubicadas en los Estados Unidos Mexicanos o en el extranjero sin limitación alguna.<br>Las transmisiones de datos a través de internet nunca son 100% seguras o libres de error. En consecuencia, no garantizamos ni podemos garantizar la seguridad, precisión oexactitud de la información personal. Sin embargo, aplicamos procedimientos físicos, electrónicos y administrativos razonables para proteger la información personal contra destrucción accidental o ilegal, perdida o alteración accidental y divulgación o acceso no autorizado.Los datos personales de los alumnos y empleados se conservarán en nuestras bases de datos permanentemente, salvo que se exprese lo contrario por escrito mediante los mecanismos descritos en el presente aviso de privacidad.</p><h5>VIII. MODIFICACIONES AL AVISO DE PRIVACIDAD.</h5><p>Nos reservamos el derecho de efectuar en cualquier momento modificaciones o actualizaciones al presente aviso de privacidad, para la atención de novedades legislativas o jurisprudenciales, políticas internas o nuevos requerimientos para la prestación u ofrecimiento de nuestro servicio educativo. Estas modificaciones estarán disponibles para la comunidad educativa a través de los siguientes medios:</p><ol type="a"><li>Avisos visibles en las instalaciones del plantel</li><li>Circular informativa dirigida a los padres de familia y/o empleados</li><li>En nuestra página de Internet www.colegioanahuac.edu.mx</li></ol><h5>IX. CANALES DE COMUNICACIÓN.</h5></p>Para mayor información, puede comunicarse a la Dirección Administrativa, con el Ing. Ramón Eduardo Santaana Martínez, quien tiene a su cargo el tratamiento de los datos personales, al teléfono (01312) 3302667 y (01312) 3123885 o enviar un mensaje al correo: avisodeprivacidad@colegioanahuac.mx</p><p class="pull-right"><small>Fecha de elaboración: 04 de Diciembre de 2013</small></p></div>',
                    },
                    {
                        name: 'aceptacion_privacidad',
                        label: 'Acepto aviso de privacidad',
                        title: 'Aceptación de aviso de privacidad',
                        type: 'boolean',
                        labelTrue: 'SI Acepto', // No esta documentado, esta valueTrue
                        labelFalse: 'NO Acepto', // No esta documentado, esta valueFalse
                        isRequired: true,
                        validators: [
                            {
                                type: 'expression',
                                expression: '{aceptacion_privacidad} == True',
                                text: 'Se requiere aceptar el aviso de privacidad',
                            },
                        ],
                    },
                    {
                        visibleIf: `{aceptacion_privacidad} == True`,
                        name: 'firmante',
                        title: 'Nombre de quien firma la ficha de inscripción',
                        type: 'text',
                        isRequired: true,
                    },
                    {
                        visibleIf: `{aceptacion_privacidad} == True`,
                        type: 'signaturepad',
                        name: 'signature',
                        title: 'Firma',
                        errore: 'Se debe firmar',
                        isRequired: true,
                    },
                ],
            },
        ],
    }

    return (
        <Container maxWidth='md'>
            <Box sx={{ my: 2 }}>
                <SurveyComponent tipo={tipo} questions={expedienteJson} data={data} update={update} set={set} />
            </Box>
        </Container>
    )
}

export default FormaExpediente
