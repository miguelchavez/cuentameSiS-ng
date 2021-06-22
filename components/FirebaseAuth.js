// import { useUser } from '../utils/auth/useUser'
import { useUserState } from '../context/user'

import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Box from '@material-ui/core/Box'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Switch from '@material-ui/core/Switch'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import InputAdornment from '@material-ui/core/InputAdornment'
import IconButton from '@material-ui/core/IconButton'
import { makeStyles } from '@material-ui/core/styles'

import { motion, AnimatePresence } from 'framer-motion'
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
    textField: {
        width: '30ch',
        flex: '1 1 auto',
        alignSelf: 'center',
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
        marginTop: 6,
        marginBottom: 6,
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
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [newUser, setNewUser] = useState(false)
    const [error, setError] = useState('')
    const [loggedIn, setLoggedIn] = useState(false)

    const { user } = useUserState()
    const router = useRouter()

    const handleClickShowPassword = () => setShowPassword(!showPassword)
    const handleMouseDownPassword = () => setShowPassword(!showPassword)

    const handleUsernameChange = (event) => {
        setUsername(event.target.value)
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value)
    }

    const handleSwitchChange = (event) => {
        setNewUser(event.target.checked)
    }

    const onKeyPressed = (event) => {
        if (event.key == 'Enter') {
            if (newUser) signup()
            else signin()
        }
    }

    useEffect(() => {
        if (user) {
            console.log('User signed in...')
            router.push('/')
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user])

    const signin = () => {
        const email = username.trim().toLowerCase()
        if (email) {
            fuego
                .auth()
                .signInWithEmailAndPassword(email, password)
                .then(async (_user) => {
                    // Signed in
                    setError('')
                    setUsername('')
                    setPassword('')
                    // Do nothing, everything is done at the IdTokenChanged listener...
                })
                .catch((error) => {
                    // los errores que vienen de firebase auth estan en ingles..
                    let errMsg = ''
                    switch (error.message) {
                        case 'There is no user record corresponding to this identifier. The user may have been deleted.':
                            errMsg = 'No existe usuario con ese email.'
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
                        case 'The email address is badly formatted.':
                            errMsg = 'El email es inválido.'
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

    const signup = () => {
        const email = username.trim().toLowerCase()
        if (email) {
            fuego
                .auth()
                .createUserWithEmailAndPassword(email, password)
                .then((userCredential) => {
                    // Signed in
                    console.log('User Created:', userCredential)
                    const _user = userCredential.user
                    setError('')
                    setUsername('')
                    setPassword('')
                    // Do nothing, everything is done at the IdTokenChanged listener...
                })
                .catch((error) => {
                    const errorCode = error.code
                    const errorMessage = error.message
                    console.log('Error al crear Usuario:', error)
                    let _error_ = ''
                    switch (error.code) {
                        case 'auth/email-already-in-use':
                            _error_ += 'Ese email ya esta en uso.'
                            break
                        case 'auth/invalid-email':
                            _error_ += 'Email inválido.'
                            break
                        case 'auth/weak-password':
                            _error_ += 'La contraseña es débil, mejorela.'
                            break
                        default:
                            _error_ += error.message
                    }
                    setError(_error_)
                })
        } else {
            setError('Ingrese su dirección de correo electrónico')
        }
    }

    const signinWithGoogle = () => {
        const provider = new fuego.auth.GoogleAuthProvider()
        // provider.addScope('https://www.googleapis.com/auth/contacts.readonly')
        provider.addScope('profile')
        provider.addScope('email')
        fuego.auth().languageCode = 'es'
        fuego
            .auth()
            .signInWithPopup(provider)
            .then((result) => {
                var credential = result.credential
                console.log('SIGNIN WITH GOOGLE:', result)
                // This gives you a Google Access Token. You can use it to access the Google API.
                let token = credential.accessToken
                // The signed-in user info.
                let user = result.user
            })
            .catch((error) => {
                // Handle Errors here.
                const errorCode = error.code
                const errorMessage = error.message
                // The email of the user's account used.
                const email = error.email
                // The firebase.auth.AuthCredential type that was used.
                const credential = error.credential
                let _error_ = ''
                switch (error.code) {
                    case 'auth/email-already-in-use':
                        _error_ += 'Ese email ya esta en uso.'
                        break
                    case 'auth/invalid-email':
                        _error_ += 'Email inválido.'
                        break
                    case 'auth/weak-password':
                        _error_ += 'La contraseña es débil, mejorela.'
                        break
                    default:
                        _error_ += error.message
                }
                setError(_error_)
            })
    }

    if (typeof user === 'undefined' || !user) {
        return (
            <>
                <AnimatePresence>
                    <motion.div
                        positionTransition
                        initial={AnimateUp.initial}
                        animate={AnimateUp.animate}
                        exit={AnimateUp.exit}>
                        <div className='div-flex-centrado-alt'>
                            <TextField
                                className={classes.textField}
                                name='username'
                                id='username'
                                label='Email'
                                aria-label='Email'
                                value={username}
                                onChange={handleUsernameChange}
                                onKeyPress={onKeyPressed}
                                error={error !== ''}
                                size='small'
                                variant='filled'
                                autoComplete='off'
                                autoFocus
                                required
                            />
                            <TextField
                                className={classes.textField}
                                name='password'
                                id='password'
                                type={showPassword ? 'text' : 'password'}
                                label='Contraseña'
                                aria-label='contraseña'
                                value={password}
                                onChange={handlePasswordChange}
                                onKeyPress={onKeyPressed}
                                helperText={error}
                                error={error !== ''}
                                size='small'
                                variant='filled'
                                autoComplete='off'
                                required
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position='end' size='small'>
                                            <IconButton
                                                size='small'
                                                aria-label='Ver/Ocultar Contraseña'
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}>
                                                {showPassword ? <Visibility /> : <VisibilityOff />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            <FormControlLabel
                                className={classes.switchLabel}
                                control={
                                    <Switch
                                        className={classes.switchBase}
                                        checked={newUser}
                                        onChange={handleSwitchChange}
                                        name='newUser'
                                        inputProps={{ 'aria-label': 'Soy nuevo, registrarme' }}
                                    />
                                }
                                label='Soy nuevo, registrarme'
                            />

                            <Box className={classes.cajaBotones}>
                                <Button
                                    variant='contained'
                                    color='primary'
                                    onClick={newUser ? signup : signin}
                                    className={classes.botonSignin}>
                                    {newUser ? 'Registrarme' : 'Iniciar'}
                                </Button>
                            </Box>

                            <span className={classes.spanOr}>&mdash;ó&mdash;</span>

                            <Button
                                variant='outlined'
                                color='secondary'
                                onClick={signinWithGoogle}
                                disableElevation
                                className={classes.botonSigninWithGoogle}>
                                <img src='/google.svg' style={{ width: '18px', heigth: '18x', marginRight: '10px' }} />
                                Iniciar con Google
                            </Button>

                            {newUser && <></>}
                        </div>
                    </motion.div>
                </AnimatePresence>
            </>
        )
    } else if (typeof user !== 'undefined') {
        return <div></div>
    }
}

export default FirebaseAuth
