import { useUser } from '../utils/auth/useUser'

import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import Avatar from '@material-ui/core/Avatar'
import Divider from '@material-ui/core/Divider'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'

import { motion } from 'framer-motion'
import { AnimateUp } from '../utils/motion-variants'

import { fuego } from '@nandorojo/swr-firestore'

const useStyles = makeStyles((theme) => ({
    root: {
        padding: '12px',
        flexFlow: 'column wrap',
        alignItems: 'center',
        maxWidth: '400px',
        minWidth: '350px',
        borderRadius: '20px',
        backgroundColor: 'white',
        // backgroundImage: 'url("/cuentameapp.png")',
        backgroundSize: '56%',
        backgroundOrigin: 'padding-box',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.4)',
        display: 'flex',
    },
    centrado: {
        display: 'flex',
        flexFlow: 'column wrap',
        alignItems: 'center',
        width: '100vw',
    },
    titulo: {
        fontSize: '2rem',
        fontWeight: 100,
        marginTop: 4,
        marginBottom: 0,
        fontFamily:
            '"Fira Sans Extra Condensed","-apple-system", "system-ui", "BlinkMacSystemFont", "Segoe UI", "Roboto Condensed", "Source Sans Pro", Cantarell, Lato, Candara,"Segoe UI",  Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
    },
    subTitulo: {
        fontSize: '1.3rem',
        fontWeight: 300,
        marginTop: 2,
        marginBottom: 0,
        fontFamily:
            '"Fira Sans Extra Condensed","-apple-system", "system-ui", "BlinkMacSystemFont", "Segoe UI", "Roboto Condensed", "Source Sans Pro", Cantarell, Lato, Candara,"Segoe UI",  Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
    },
    leyenda: {
        fontSize: '0.9rem',
        fontWeight: 100,
        marginTop: 1,
        marginBottom: 1,
        fontFamily:
            '"Fira Sans Extra Condensed","-apple-system", "system-ui", "BlinkMacSystemFont", "Segoe UI", "Roboto Condensed", "Source Sans Pro", Cantarell, Lato, Candara,"Segoe UI",  Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
    },
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
        color: 'rgba(0,0,0,0.7)!important',
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    botonSignin: {
        margin: theme.spacing(1, 2, 1),
    },
    botonSignup: {
        margin: theme.spacing(1, 2, 1),
    },
    spanOr: {
        margin: theme.spacing(1.2),
    },
    cajaBotones: {
        alignSelf: 'end',
    },
    switchLabel: {
        color: theme.palette.secondary.dark,
        fontWeight: '900 !important',
    },
    switchBase: {
        color: theme.palette.secondary.light,
        '&$checked': {
            color: theme.palette.secondary.dark,
        },
        '&$checked + $track': {
            backgroundColor: theme.palette.secondary.dark,
        },
    },
    checked: {},
    track: {},
}))

const FirebaseAuth = (props) => {
    const classes = useStyles()
    const [pasaporte, setPasaporte] = useState('')
    const [error_, setError] = useState('')
    console.log('useUser')
    const { user, logout } = useUser()
    console.log('useUser done')
    const router = useRouter()

    useEffect(() => {
        if (user) {
            console.log('User signed in...')
            router.push('/')
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user])

    const handleChange = (event) => {
        if (error_) {
            // Si habia error, al cambiar el texto, borrar error
            setError('')
        }
        setPasaporte(event.target.value)
    }

    const onKeyPressed = (event) => {
        if (event.key == 'Enter') {
            signin()
        }
    }

    const signin = () => {
        const email = pasaporte.trim().toLowerCase() + '@appcierto.org'
        const passwd =
            'Death is a natural part of life. Rejoice for those around you who transform into the Force. Mourn them do not. Miss them do not. Attachment leads to jealously. The shadow of greed, that is'
        if (pasaporte) {
            fuego
                .auth()
                .signInWithEmailAndPassword(email, passwd)
                .then(async (_user) => {
                    // Signed in
                    setError('')
                    setPasaporte('')
                    // Do nothing, everything is done at the IdTokenChanged listener...
                })
                .catch((error) => {
                    // los errores que vienen de firebase auth estan en ingles..
                    let errMsg = ''
                    switch (error.message) {
                        case 'There is no user record corresponding to this identifier. The user may have been deleted.':
                            errMsg = 'No existe usuario con ese pasaporte.'
                            break
                        case 'The password is invalid or the user does not have a password.':
                            errMsg = 'Password Inválido o el usuario no tiene password.'
                            break
                        case 'Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later.':
                            errMsg = 'Esta cuenta ha sido deshabilitada por tener varios intentos fallidos.'
                            break
                        case 'A network error (such as timeout, interrupted connection or unreachable host) has occurred.':
                            errMsg = 'Error de red.'
                            break
                        // este es un problema en useUser, mientras no se resuelve el usuario.
                        case 'user.getIdToken is not a function':
                            errMsg = ''
                            break
                        default:
                            errMsg = error.message
                    }
                    setError(errMsg)
                })
        }
    }

    if (typeof user === 'undefined' || !user) {
        return (
            <>
                {/* <AnimatePresence> */}
                <motion.div positionTransition initial={AnimateUp.initial} animate={AnimateUp.animate} exit={AnimateUp.exit}>
                    <div className='div-flex-centrado-alt'>
                        <Avatar className='avatar-signin' src='/cuentameapp.png' variant='square' />

                        <TextField
                            className='flex-inner'
                            name='pasaporte'
                            id='pasaporte'
                            label='Pasaporte'
                            value={pasaporte}
                            onChange={handleChange}
                            onKeyPress={onKeyPressed}
                            helperText={error_}
                            error={error_ !== ''}
                            variant='filled'
                            autoFocus
                            required
                        />
                        <Button variant='contained' color='primary' onClick={signin}>
                            Iniciar
                        </Button>
                        <Divider variant='middle' />
                    </div>
                </motion.div>
                {/* </AnimatePresence> */}
            </>
        )
    } else if (typeof user !== 'undefined') {
        return (
            <>
                <div className='spinner'></div>
            </>
        )
    }
}

export default FirebaseAuth
