import React from 'react'
import Head from 'next/head'

import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Container from '@material-ui/core/Container'
import Button from '@material-ui/core/Button'

import TextField from '@material-ui/core/TextField'
import FormControl from '@material-ui/core/FormControl'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import InputLabel from '@material-ui/core/InputLabel'

import Stepper from '@material-ui/core/Stepper'
import Step from '@material-ui/core/Step'
import StepLabel from '@material-ui/core/StepLabel'
import StepContent from '@material-ui/core/StepContent'

import { useSnackbar } from 'notistack'
import { useForm, Controller } from 'react-hook-form'

import { useFadedShadowStyles } from '@mui-treasury/styles/shadow/faded'
import { useGutterBorderedGridStyles } from '@mui-treasury/styles/grid/gutterBordered'

import { motion } from 'framer-motion'
import { Container_, FadeInUp } from '../utils/motion-variants'

// import Layout from '../components/layout'
import { TextEdit, CheckBox, PhoneEdit, Selector, AutoCompleter, ChipSelect } from '../components/editFields'
import { getMunicipios } from '../utils/strings'

import { useRouter } from 'next/router'
import { useCollection, useDocument } from '@nandorojo/swr-firestore'
import { useState, useEffect } from 'react'

import { useUserState } from '../context/user'

import PouchDB from 'pouchdb'
import { useFind, useDoc } from 'use-pouchdb'

// Styles
const useStyles = makeStyles((theme) => ({
    rootGrid: {
        flexGrow: 1,
    },
    rootStepper: {
        width: '100%',
    },
    backButton: {
        marginRight: theme.spacing(1),
    },
    instructions: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
    divisor: {
        margin: 0,
        marginTop: theme.spacing(2),
    },
    botonera: {
        margin: theme.spacing(2),
        marginRight: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    boton: {
        margin: theme.spacing(1),
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    grupo: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexWrap: 'wrap',
        [theme.breakpoints.up('md')]: {
            flexWrap: 'nowrap',
        },
        '&>.MuiFormControl-root': {
            margin: theme.spacing(1),
            minWidth: '20ch',
        },
    },
    chips: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    chip: {
        margin: 2,
    },
    noLabel: {
        marginTop: theme.spacing(3),
    },
    menuTab: {
        minWidth: 80,
    },
    envoltorio: {
        width: '100%!important',
    },
    envoltorioTab: {
        marginTop: theme.spacing(1),
        width: '100%!important',
    },
    extraPaddingR: {
        marginRight: '8px !important',
    },
    menuSelectedItem: {
        color: theme.palette.text.secondary,
        '&>#responsable, &>#responsable_contrato': {
            display: 'flex',
            flexFlow: 'row',
            alignItems: 'center',
        },
    },
    avatarMenuItem: {
        width: 32,
        height: 32,
        borderRadius: '50%',
    },
    grow: {
        flexGrow: 1,
        textAlign: 'left',
    },
    cajaTitulo: {
        display: 'flex',
        margin: -14,
        marginBottom: 16,
        padding: 8,
        backgroundColor: theme.palette.background.defaultTitle,
        borderBottom: '1px #6f6f6f63 solid',
    },
    noUpper: {
        textTransform: 'none',
        fontSize: '1rem',
    },
}))

const Home = (props) => {
    const { user } = useUserState()
    const router = useRouter()
    const styles = useStyles()
    const shadowStyles = useFadedShadowStyles()
    const borderedGridStyles = useGutterBorderedGridStyles({
        borderColor: 'rgba(0, 0, 0, 0.08)',
        height: '50%',
    })
    const { enqueueSnackbar, closeSnackbar } = useSnackbar()

    const { toggleDarkMode, darkMode, setDarkMode, fuego } = props

    // Estados
    const [showFicha, setShowFicha] = useState(false)
    const [sinFicha, setSinFicha] = useState(true)
    const [activeStep, setActiveStep] = useState(0)
    const [habilitada, setHabilitada] = useState(false)
    const [localData, setLocalData] = useState({})

    // form control
    const { handleSubmit, control, formState, reset, trigger, getValues, setValue } = useForm({
        mode: 'onBlur',
        criteriaMode: 'all',
        shouldFocusError: true,
        reValidateMode: 'onChange',
        shouldUnregister: false,
    })

    //ficha de inscripcion del usuario
    const ficha = useCollection('fichas', {
        where: ['owner', '==', user?.id],
        listen: false,
    })

    useState(() => {
        setSinFicha(ficha?.data?.length <= 0)
        console.log('Sin Ficha:', ficha?.data?.length <= 0)
    }, [ficha])

    useState(() => {
        console.log('>>> Show Ficha:', showFicha)
    }, [showFicha])

    useEffect(() => {
        setHabilitada(formState.isValid && formState.isDirty)
    }, [formState])

    // form submit
    const onSubmit = async (data) => {
        // save doc on each step...
    }

    // stepper
    const handleNext = () => {
        // validar!
        setActiveStep((prevActiveStep) => prevActiveStep + 1)
    }
    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1)
    }

    const getSteps = () => {
        return ['Datos del Padre', 'Datos de la Madre', 'Datos del Contacto', 'Alumnos']
    }

    const getPadreFields = () => {
        return [
            {
                name: 'Nombre Completo',
                type: 'group',
                items: [
                    { name: 'nombre_padre', label: 'Nombre', type: 'text', required: true, autofocus: true },
                    { name: 'apaterno_padre', label: 'Apellido Paterno', type: 'text', required: true, autofocus: false },
                    { name: 'amaterno_padre', label: 'Apellido Materno', type: 'text', required: true, autofocus: false },
                ],
            },
            {
                name: 'Telefonos',
                type: 'group',
                items: [
                    {
                        name: 'telTrabajo_padre',
                        label: 'Telefono del trabajo',
                        type: 'phone',
                        required: false,
                        autofocus: false,
                    },
                    { name: 'telCasa_padre', label: 'Telefono de casa', type: 'phone', required: false, autofocus: false },
                    { name: 'telCel_padre', label: 'Telefono celular', type: 'phone', required: true, autofocus: false },
                ],
            },
            { name: 'ocupacion_padre', label: 'Ocupación', type: 'text', required: true, autofocus: false },
            { name: 'email_padre', label: 'Correo electrónico', type: 'email', required: true, autofocus: false },
            {
                name: 'Domicilio',
                type: 'group',
                items: [
                    {
                        name: 'domicilioPais_padre',
                        label: 'País',
                        type: 'edit_select',
                        required: false,
                        autofocus: false,
                        options: ['México', 'Estados Unidos', 'Canada'],
                    },
                    {
                        name: 'domicilioEstado_padre',
                        label: 'Estado',
                        type: 'edit_select',
                        required: false,
                        autofocus: false,
                        options: [
                            'Aguascalientes',
                            'Baja California',
                            'Baja California Sur',
                            'Campeche',
                            'Chiapas',
                            'Chihuahua',
                            'Coahuila de Zaragoza',
                            'Colima',
                            'Ciudad de México',
                            'Durango',
                            'Guanajuato',
                            'Guerrero',
                            'Hidalgo',
                            'Jalisco',
                            'Estado de Mexico',
                            'Michoacan de Ocampo',
                            'Morelos',
                            'Nayarit',
                            'Nuevo Leon',
                            'Oaxaca',
                            'Puebla',
                            'Queretaro de Arteaga',
                            'Quintana Roo',
                            'San Luis Potosi',
                            'Sinaloa',
                            'Sonora',
                            'Tabasco',
                            'Tamaulipas',
                            'Tlaxcala',
                            'Veracruz de Ignacio de la Llave',
                            'Yucatan',
                            'Zacatecas',
                        ],
                    },
                    {
                        name: 'domicilioMunicipio_padre',
                        label: 'Municipio',
                        required: false,
                        autofocus: false,
                        type: 'edit_select',
                        options: [],
                    },
                    {
                        name: 'domicilioLocalidad_padre',
                        label: 'Ciuda',
                        required: false,
                        autofocus: false,
                        type: 'edit_select',
                        options: [],
                    },
                    {
                        name: 'domicilioCP_padre',
                        label: 'Código Postal',
                        type: 'edit_select',
                        required: false,
                        autofocus: false,
                        options: [],
                    },
                    {
                        name: 'domicilioColonia_padre',
                        label: 'Colonia',
                        type: 'edit_select',
                        required: false,
                        autofocus: false,
                        options: [],
                    },
                    {
                        name: 'domicilioCalle_padre',
                        label: 'Calle',
                        required: false,
                        autofocus: false,
                        type: 'edit_select',
                        options: [],
                    },
                    {
                        name: 'domicilioNumExt_padre',
                        label: 'Número Exterior',
                        type: 'number',
                        autofocus: false,
                        required: false,
                    },
                    {
                        name: 'domicilioNumInt_padre',
                        label: 'Número Interior',
                        type: 'number',
                        required: false,
                        autofocus: false,
                    },
                ],
            },
        ]
    }

    const getStepNumber = (step_name) => {
        // tenemos nombre sin acentos y en una sola palabra
        // y coinciden con los steps de arriba en posicion.
        return ['padre', 'madre', 'contacto'].indexOf(step_name)
    }

    const steps = getSteps()

    const renderField = (field) => {
        if (field.type == 'text' || field.type == 'number' || field.type == 'password' || field.type == 'email') {
            return (
                <TextEdit
                    formState={formState}
                    control={control}
                    type={field.type}
                    multiline={false}
                    autofocus={field.autofocus}
                    field_name={field.name}
                    field_label={field.label}
                    required={field.required}
                    default_value='' // fixme
                />
            )
        } else if (field.type == 'phone') {
            return (
                <PhoneEdit
                    formState={formState}
                    control={control}
                    type={field.type}
                    autofocus={field.autofocus}
                    field_name={field.name}
                    field_label={field.label}
                    required={field.required}
                    default_value='' // fixme
                />
            )
        } else if (field.type == 'edit_select') {
            return (
                <AutoCompleter
                    formState={formState}
                    control={control}
                    type={field.type}
                    multi={false}
                    options={field.options}
                    autofocus={field.autofocus}
                    field_name={field.name}
                    field_label={field.label}
                    required={field.required}
                    default_value='' // fixme
                />
            )
        }
    }

    const getStepContent = (stepIndex) => {
        switch (stepIndex) {
            case getStepNumber('padre'):
                return (
                    <React.Fragment>
                        {getPadreFields().map((field) => {
                            if (field.type == 'group') {
                                // hacemos un div flex de campos
                                return (
                                    <div className={styles.grupo}>
                                        {field.items.map((item) => {
                                            return renderField(item)
                                        })}
                                    </div>
                                )
                            } else {
                                return renderField(field)
                            }
                        })}
                    </React.Fragment>
                )
            case getStepNumber('madre'):
                return <></>
            default:
                return 'Unknown stepIndex'
        }
    }

    return (
            <Container>
                {user && !showFicha && (
                    <Typography component='p' variant='subtitle1' color='inherit' paragraph className={styles.title}>
                        Bienvenido, {user.nombre || user.displayName}.{' '}
                        {ficha && ficha.length > 0 ? (
                            <>
                                <span>Tienes una ficha de inscripción, </span>{' '}
                                <Button
                                    color='primary'
                                    size='small'
                                    variant='contained'
                                    onClick={() => {
                                        setShowFicha(true)
                                    }}>
                                    continúa editándola
                                </Button>
                            </>
                        ) : (
                            <>
                                <span>No tienes una ficha de inscripción, </span>{' '}
                                <Button
                                    color='primary'
                                    size='small'
                                    variant='contained'
                                    onClick={() => {
                                        setShowFicha(!showFicha)
                                        console.log('Mostrando ficha:', showFicha)
                                    }}>
                                    comienza con una nueva
                                </Button>
                            </>
                        )}
                    </Typography>
                )}

                <motion.div exit={{ opacity: 0 }} animate='animate' initial='initial'>
                    {showFicha && (
                        <motion.div key='stepper' variants={FadeInUp}>
                            <Grid container className={styles.rootGrid} direction='row' spacing={1}>
                                <Grid item xs={12}>
                                    {/* Stepper  */}
                                    <div className={styles.envoltorio}>
                                        <form onSubmit={handleSubmit(onSubmit)}>
                                            <div className={styles.envoltorioWizard}>
                                                <div className={styles.root}>
                                                    <Stepper activeStep={activeStep} alternativeLabel>
                                                        {steps.map((label) => (
                                                            <Step key={label}>
                                                                <StepLabel>{label}</StepLabel>
                                                            </Step>
                                                        ))}
                                                    </Stepper>
                                                    <div>
                                                        {activeStep === steps.length ? (
                                                            <div>
                                                                <Typography className={styles.instructions}>
                                                                    Ha terminado.
                                                                </Typography>
                                                            </div>
                                                        ) : (
                                                            <div>
                                                                <Typography className={styles.instructions}>
                                                                    {getStepContent(activeStep)}
                                                                </Typography>
                                                                <div>
                                                                    <Button
                                                                        disabled={activeStep === 0}
                                                                        onClick={handleBack}
                                                                        className={styles.backButton}>
                                                                        Regresar
                                                                    </Button>
                                                                    <Button
                                                                        variant='contained'
                                                                        color='primary'
                                                                        onClick={handleSubmit((d) => {
                                                                            console.log(d)
                                                                            handleNext()
                                                                        })}>
                                                                        {activeStep === steps.length - 1
                                                                            ? 'Terminar'
                                                                            : 'Siguiente'}
                                                                    </Button>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                            {/* fin envoltorio wizard */}
                                        </form>
                                    </div>
                                    {/* END Stepper */}
                                </Grid>
                            </Grid>
                        </motion.div>
                    )}
                </motion.div>
            </Container>
    )
}

export default Home
