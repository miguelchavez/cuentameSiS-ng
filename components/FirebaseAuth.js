import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import Box from '@mui/material/Box'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Switch from '@mui/material/Switch'
import TextField from '@mui/material/TextField'
import FormControlLabel from '@mui/material/FormControlLabel'
import InputAdornment from '@mui/material/InputAdornment'
import FormHelperText from '@mui/material/FormHelperText'
import Divider from '@mui/material/Divider'

import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'

import { motion } from 'framer-motion'
import { AnimateUp } from '../utils/motion-variants'

import { useUserState } from '../context/user'
import initFirebase from '../utils/auth/initFirebase'
import {
    getFirebaseAuth,
    getFireApp,
    getFirebaseConfig,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signInWithPopup,
} from '../utils/auth/initFirebase'

const FirebaseAuth = (props) => {
    const { user } = useUserState()
    const router = useRouter()

    // Init Firebase
    initFirebase()
    const firebaseConfig = getFirebaseConfig()
    const firebaseApp = getFireApp()
    const firebaseAuth = getFirebaseAuth()

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [newUser, setNewUser] = useState(false)
    const [error, setError] = useState('')
    const [loggedIn, setLoggedIn] = useState(false)

    // Ya se verifica en userProvider
    // useEffect(() => {
    //     console.log('[ FirebaseAuth :: onUserChanged ] User:', user)
    //     if (user && user?.id) {
    //         if (router.route == '/signin') {
    //             router.push('/')
    //         }
    //     }
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [user])

    const handleUsernameChange = (event) => {
        if (error) {
            // Si habia error, al cambiar el texto, borrar error
            setError('')
        }
        setUsername(event.target.value)
    }

    const handleClickShowPassword = () => setShowPassword(!showPassword)
    const handleMouseDownPassword = () => setShowPassword(!showPassword)

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

    const signin = () => {
        const email = username.trim().toLowerCase()
        if (email) {
            signInWithEmailAndPassword(firebaseAuth(), email, password)
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
                            errMsg = 'No existe usuario con ese correo.'
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

    const signup = () => {
        const email = username.trim().toLowerCase()
        if (email) {
            createUserWithEmailAndPassword(firebaseAuth, email, password)
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
        // https://firebase.google.com/docs/auth/web/google-signin#web-version-9
        const provider = new GoogleAuthProvider()
        // provider.addScope('profile')
        // provider.addScope('email')
        signInWithPopup(firebaseAuth, provider)
            .then((result) => {
                var credential = result.credential
                console.log('SIGNIN WITH GOOGLE:', result)
                // This gives you a Google Access Token. You can use it to access the Google API.
                let token = credential.accessToken
                // The signed-in user info.
                let user = result.user
                setError('')
                setUsername('')
                setPassword('')
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

    if (typeof user === 'undefined' || !user?.uid) {
        return (
            <>
                <motion.div initial={AnimateUp.initial} animate={AnimateUp.animate} exit={AnimateUp.exit}>
                    <div className='flex flex-col mt-0 sm:mt-2 xs:min-w-full'>
                        <TextField
                            className='mt-3 mb-4'
                            name='username'
                            id='userename'
                            label='Email'
                            value={username}
                            onChange={handleUsernameChange}
                            onKeyPress={onKeyPressed}
                            helperText={error}
                            error={error !== ''}
                            size='small'
                            variant='filled'
                            autoComplete='off'
                            autoFocus
                            required
                        />
                        <TextField
                            className='mt-3 mb-4'
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
                            className='mt-4 mb-6'
                            control={
                                <Switch
                                    className='classes.switchBase'
                                    checked={newUser}
                                    onChange={handleSwitchChange}
                                    name='newUser'
                                    inputProps={{ 'aria-label': 'Soy nuevo, registrarme' }}
                                />
                            }
                            label='Soy nuevo, registrarme'
                        />
                        <Box className='classes.cajaBotones'>
                            <Button variant='contained' color='primary' onClick={newUser ? signup : signin}>
                                {newUser ? 'Registrarme' : 'Iniciar'}
                            </Button>
                        </Box>
                        <span className='mt-3 mb-3'>&mdash;ó&mdash;</span>
                        <Button
                            variant='outlined'
                            color='secondary'
                            onClick={signinWithGoogle}
                            disableElevation
                            className='classes.botonSigninWithGoogle'>
                            <img src='/google.svg' style={{ width: '18px', heigth: '18x', marginRight: '10px' }} />
                            Iniciar con Google
                        </Button>
                    </div>
                </motion.div>
            </>
        )
    } else {
        return (
            <>
                <div className='spinner'></div>
            </>
        )
    }
}

export default FirebaseAuth
