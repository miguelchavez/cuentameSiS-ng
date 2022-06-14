// React & NextJs
import React, { useEffect } from 'react'
import { useRouter } from 'next/router'

// SurveyJS
import { StylesManager, Model, surveyLocalization } from 'survey-core'
import { Survey, SurveyTimerPanel } from 'survey-react-ui'
// import { inputmask } from 'surveyjs-widgets'

import { getMd5 } from '../utils/strings'

// Modern & defaultV2 theme
import 'survey-core/modern.min.css'
import 'survey-core/defaultV2.min.css'

import { getFireApp } from '../utils/auth/initFirebase'
import { doc, setDoc as setDocument, getFirestore, serverTimestamp } from '@firebase/firestore'
import { getApp } from '@firebase/app'

import { useUserState } from '../context/user'

// for SurveyJs
// import Inputmask from 'inputmask'
// // import 'inputmask/dist/inputmask/phone-codes/phone'
// import * as widgets from 'surveyjs-widgets'
// import $ from 'jquery'
// import * as velocity from 'velocity-animate'

const SurveyComponent = ({ questions, tipo, data, update: updateDoc, set: setDoc }) => {
    const { user } = useUserState()
    const firestore = getFirestore(getApp())
    const router = useRouter()

    // fixme: faltan algunas cosas por traducir: 'Choose' en dropdowns, errores en campo (tooltips)
    const mycustomSurveyStrings = {
        pagePrevText: 'Anterior',
        pageNextText: 'Siguiente',
        completeText: 'Finalizar',
        requiredError: 'Se requiere responder',
        otherItemText: 'Otro (describa)',
        noneItemText: 'Ninguno',
        selectAllItemText: 'Seleccione Todo',
        progressText: 'Pagina {0} de {1}',
        indexText: '{0} de {1}',
        panelDynamicProgressText: '{0} de {1}',
        questionsProgressText: 'Completado {0}/{1}',
        optionsCaption: 'Seleccione...',
        addColumn: 'Agregar columna',
        addRow: 'Agregar renglon',
        removeRow: 'Remover',
        emptyRowsText: 'No hay renglones.',
        addPanel: 'Agregar nuevo',
        removePanel: 'Remover',
        cleanCaption: 'Limpiar',
        clearCaption: 'Limpiar',
        signaturePlaceHolder: 'Firme aquí',
        chooseFileCaption: 'Seleccione archivo',
        removeFileCaption: 'Remover archivo',
        booleanCheckedLabel: 'Si',
        booleanUncheckedLabel: 'No',
    }

    StylesManager.applyTheme('defaultV2') // defaultV2
    surveyLocalization.locales['es'] = mycustomSurveyStrings

    // inputmask(Survey)

    const survey = new Model(questions)

    survey.locale = 'es'
    survey.showProgressBar = 'top'

    survey.sendResultOnPageNext = true // Para Obtener datos parciales de cada pagina (cambio de pagina) NO ACTUALIZA NUM PAGINA.
    survey.showCompletedPage = true // este no jala con firebase update

    /**
     * TODO NOTE: Guardar en localStorage no toma en cuenta el usuario de firebase, si multiples usuarios usan la misma computadora/tel/tablet... problemas!!!
     * Tiene inconvenientes como perder datos si se cambia de pagina antes del timer de guardado en localstorage.
     * Ademas, si guardamos en firebase con este metodo, seria una escritura el firestore cada 10 segundos, por cada survey en el browser, por cada usuario.
     *      podemos cambiar de metodo, en lugar de timer, al cambiar cada dato.. pero habria que investigar si SurveyJs nos da esta posibilidad.
     *      O simplemente enviar datos a firebase cada que cambia pagina. Nos cubrimos con perdida de datos con el timer, cada menos tiempo, cada 5 segundos
     *      (esto tiene problemas? demasiadas escrituras en localstorage).
     * Otro inconveniente, es que survey.data contiene solo la info de la pagina actual, no las anteriores... entonces al guardar en localstorage no guarda
     *      lo anterior, necesitaremos obtenerlo y agregarlo....
     *      FIX: survey.clearInvisibleValues = 'none'
     *  */

    let hayDatosGuardados = false

    function loadState(survey) {
        if (data && data.id) {
            const res = data
            delete res.snapshot
            delete res.__snapshot
            delete res.exists
            delete res.hasPendingWrites
            if (res) {
                // if (res.currentPageNo) survey.currentPageNo = res.currentPageNo
                survey.currentPageNo = res.pageNo //res.currentPageNo
                survey.data = res
                hayDatosGuardados = true
                console.log('LoadState new survey data:', survey.data)
            }
        }
    }

    const saveToFirebase = async (survey) => {
        // update firestore document
        if (tipo == 'expediente') {
            console.log('EXPEDIENTE Save:', survey.data.id)
            if (survey && survey.data && survey.data.id) {
                // actualizar con updateDoc from firebase-swr-v9
                const next = survey.currentPageNo >= 3 ? 0 : survey.currentPageNo + 1
                return await updateDoc({
                    ...survey.data,
                    pageNo: next, // workaround problem when using firebase here
                    lastUpdated: new Date(),
                    updated_timestamp: serverTimestamp(), // Solo es timestamp para creacion
                })
                    .then(() => {
                        console.log('Se actualizo documento en firestore correctamente')
                        return true
                    })
                    .catch((err) => {
                        console.log('Error al actualizar documento en firestore:', e)
                        return false
                    })
            } else {
                // crear
                // setDoc from firebase
                console.log('EXPEDIENTE CREATE NEW')
                const fecha = new Date()
                getMd5(`expediente_${survey?.data?.nombre}_${survey?.data?.apaterno}_${fecha?.toISOString()}`)
                    .then((_id) => {
                        console.log(' MD5 :', _id)
                        const docRef = doc(firestore, 'expedientes', _id)
                        const next = survey.currentPageNo >= 3 ? 0 : survey.currentPageNo + 1
                        const datos = {
                            ...survey.data,
                            owner: user?.id,
                            id: _id, // no lo pone automaticamente..
                            pageNo: next, // workaround problem when using firebase here
                            createdAt: fecha,
                            lastUpdated: fecha,
                            created_timestamp: serverTimestamp(), // Solo es timestamp para creacion
                        }
                        setDocument(docRef, datos, { merge: true })
                            .then(() => {
                                console.log('Expediente creado:', datos)
                            })
                            .catch((error) => {
                                console.error('Error enviando expediente: ', error)
                            })
                    })
                    .catch((error) => {
                        console.error('Error Obteniendo MD5 hash: ', error)
                    })
            }
            // PERFIL
        } else if (tipo == 'perfil') {
            console.log('PERFIL Save:', survey.data.userId)
            if (survey && survey.data && survey.data.userId) {
                // actualizar con updateDoc from firebase-swr-v9
                const next = survey.currentPageNo >= 3 ? 0 : survey.currentPageNo + 1
                return await updateDoc({
                    ...survey.data,
                    pageNo: next, // workaround problem when using firebase here
                    lastUpdated: new Date(),
                    updated_timestamp: serverTimestamp(), // Solo es timestamp para creacion
                })
                    .then(() => {
                        console.log('Se actualizo documento en firestore correctamente')
                        return true
                    })
                    .catch((err) => {
                        console.log('Error al actualizar documento en firestore:', e)
                        return false
                    })
            } else {
                // crear
                // setDoc from firebase
                console.log('PERFIL CREATE NEW')
                const fecha = new Date()
                const docRef = doc(firestore, 'usuarios', user?.id)
                const next = survey.currentPageNo >= 3 ? 0 : survey.currentPageNo + 1
                const datos = {
                    ...survey.data,
                    owner: user?.id,
                    roles: [], // sin roles
                    userId: user?.id, // no lo pone automaticamente..
                    pageNo: next, // workaround problem when using firebase here
                    createdAt: fecha,
                    lastUpdated: fecha,
                    created_timestamp: serverTimestamp(), // Solo es timestamp para creacion
                }
                setDocument(docRef, datos, { merge: true })
                    .then(() => {
                        console.log('Perfil creado:', datos)
                        survey.data.userId = user?.id // agregamos el id para el siguiente paso no se vuelva a crear...
                    })
                    .catch((error) => {
                        console.error('Error enviando perfil: ', error)
                    })
            }
        }
        return true
    }

    // Send data to firebase
    survey.onPartialSend.add(function (survey) {
        console.log('[ SAVING survey onPartialSend ] data:', survey.data)
        return saveToFirebase(survey)
    })

    // metodo para obtener los datos cuando se termina completamente un survey.
    survey.onComplete.add(function (sender, options) {
        console.log('[ SAVING survey :: onComplete ] data:', sender.data)
        options.showDataSavingSuccess('Terminado, gracias') // you may pass a text parameter to show your own text
        saveToFirebase(sender)
        router.replace('/')
    })

    // survey.onValueChanged.add(function (survey, options) {
    //     console.log('[ SAVING survey :: onValueChanged ] data:', survey.data)
    //     saveToFirebase(survey)
    // })

    // Load the initial state
    loadState(survey)

    // TODO: Fin de Obtener datos de BD...

    // TODO / fixme: obtener paises,estados,ciudades de nuestra API.
    // var q = survey.getQuestionByName('domicilio_pais_padre')
    // if (q & q.choicesByUrl) {
    //     // q.choicesByUrl.url = 'https://surveyjs.io/api/CountriesExample'
    //     q.choicesByUrl.run()
    // }

    if (!hayDatosGuardados) {
        console.log('[ survey :: No hay datos guardados en localStorage ] Poniendo defaults...')
        if (tipo == 'perfil') {
            survey.setValue('domicilio_pais_padre', 'Mexico')
            survey.setValue('domicilio_pais_madre', 'Mexico')
            survey.setValue('domicilio_pais_tutor', 'Mexico')
            survey.setValue('domicilio_estado_padre', 'Colima')
            survey.setValue('domicilio_estado_madre', 'Colima')
            survey.setValue('domicilio_estado_tutor', 'Colima')
            survey.setValue('domicilio_municipio_padre', 'Colima')
            survey.setValue('domicilio_municipio_madre', 'Colima')
            survey.setValue('domicilio_municipio_tutor', 'Colima')
            survey.setValue('domicilio_localidad_padre', 'Colima')
            survey.setValue('domicilio_localidad_madre', 'Colima')
            survey.setValue('domicilio_localidad_tutor', 'Colima')
            survey.setValue('domicilio_colonia_padre', 'Centro')
            survey.setValue('domicilio_colonia_madre', 'Centro')
            survey.setValue('domicilio_colonia_tutor', 'Centro')
        } else if (tipo == 'expediente') {
            survey.setValue('domicilio_pais', 'Mexico')
            survey.setValue('domicilio_estado', 'Colima')
            survey.setValue('domicilio_municipio', 'Colima')
            survey.setValue('domicilio_localidad', 'Colima')
            survey.setValue('pais_nacimiento', 'Mexico')
            survey.setValue('pais_escuela', 'Mexico')
            survey.setValue('estado_escuela', 'Colima')
            survey.setValue('municipio_escuela', 'Colima')
            survey.setValue('localidad_escuela', 'Colima')
        }
    }

    function validarAceptacion(s, options) {
        if (options.name == 'aceptacion_privacidad') {
            const aceptado = options.value['aceptacion_privacidad']
            const firmante = options.value['firmante']
            const firma = options.value['firma']
            if (firmante?.length > 0 && firma?.length > 0 && aceptado.toLowerCase() == 'si acepto') {
                options.error = 'Se debe aceptar el aviso de privacidad, poner el nombre de quien firma y firmar'
            }
        }
    }

    // custom css!!!
    var myCss = {
        question: {
            content: 'border-dashed border-amber-700 border',
            titleOnAnswer: 'question-title-answered',
        },
    }

    // CSS classes
    // survey.onUpdateQuestionCssClasses.add(function (survey, options) {
    //     var classes = options.cssClasses
    //     classes.mainRoot += ' sv_qstn2'
    //     classes.root = 'sq-root'
    //     classes.title += ' text-slate-700'
    //     if (options.question.isRequired) {
    //         classes.title += ' text-orange-600'
    //         classes.root += ' sq-root-required'
    //     }
    //     if (options.question.getType() === 'checkbox') {
    //         classes.root += ' sq-root-cb'
    //     }
    // })

    // Theme Customization
    // Agregar el CSS:

    //   body #surveyElement {
    //      --primary: #7ff07f;
    //      --primary-light: rgba(25, 179, 148, 0.1);
    //      --primary-foreground: #fff;
    //      --secondary: #7ff07f;
    //      --secondary-light: rgba(255, 152, 20, 0.1);
    //      --secondary-foreground: #fff;
    //      --background: #f8f8f8;
    //      --background-dim: #f3f3f3;
    //      --background-for-editors: #f9f9f9;
    //      --foreground: #4a4a4a;
    //      --foreground-light: #909090;
    //      --foreground-disabled: rgba(#161616, 0.16);
    //      --border: #d6d6d6;
    //      --border-inside: rgba(0, 0, 0, 0.16);
    //      --red: #e60a3e;
    //      --red-light: rgba(230, 10, 62, 0.1);
    //      --green: #19b394;
    //      --green-light: rgba(25, 179, 148, 0.1);
    //  }

    // NO FUNCIONA.. plugin???
    // function animate(animitionType, duration) {
    //     if (!duration) duration = 1000

    //     var element = document.getElementById('surveyElement')
    //     $(element).velocity(animitionType, { duration: duration })
    // }
    // var doAnimantion = true
    // survey.onCurrentPageChanging.add(function (sender, options) {
    //     if (!doAnimantion) return

    //     options.allowChanging = false
    //     setTimeout(function () {
    //         doAnimantion = false
    //         sender.currentPage = options.newCurrentPage
    //         doAnimantion = true
    //     }, 500)
    //     animate('slideUp', 500)
    // })
    // survey.onCurrentPageChanged.add(function (sender) {
    //     animate('slideDown', 500)
    // })
    // survey.onCompleting.add(function (sender, options) {
    //     if (!doAnimantion) return

    //     options.allowComplete = false
    //     setTimeout(function () {
    //         doAnimantion = false
    //         sender.doComplete()
    //         doAnimantion = true
    //     }, 500)
    //     animate('slideUp', 500)
    // })
    // animate('slideDown', 1000)
    ///

    // NOTE: Para pasarle el custom CSS al survey:
    // <Survey model={survey} css={myCss} />

    return <Survey model={survey} />
}

export default SurveyComponent
