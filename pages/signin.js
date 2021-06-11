// Nextjs & React
import { useEffect, useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'

// Material UI
import CssBaseline from '@material-ui/core/CssBaseline'
import { makeStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import Container from '@material-ui/core/Container'
import Divider from '@material-ui/core/Divider'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Switch from '@material-ui/core/Switch'
import FormGroup from '@material-ui/core/FormGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'

// Animations
import { motion } from 'framer-motion'
import { AnimateUp } from '../utils/motion-variants'

// The signin page needs to be light.. for now.
import { ThemeProvider } from '@material-ui/core/styles'
import { temaLight } from '../style/temaCuentameApp'

import FirebaseAuth from '../components/FirebaseAuth'

// Style
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
        marginTop: 0,
        marginBottom: 1,
        fontFamily:
            '"Fira Sans Extra Condensed","-apple-system", "system-ui", "BlinkMacSystemFont", "Segoe UI", "Roboto Condensed", "Source Sans Pro", Cantarell, Lato, Candara,"Segoe UI",  Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
    },
    leyenda: {
        fontSize: '0.8rem',
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

const Signin = () => {
    const classes = useStyles()
    const router = useRouter()

    if (typeof user === 'undefined' || !user) {
        return (
            <>
                <Head>
                    <title>cuentameSiS</title>
                    <meta charSet='utf-8' />
                    <meta name='description' content='cuentameSiS' />
                    <meta name='viewport' content='initial-scale=1.0, width=device-width' />
                    <link rel='icon' href='/favicon-32x32.png' />
                </Head>
                <ThemeProvider theme={temaLight}>
                    <Container component='main' maxWidth='xl' className='main-container-signin'>
                        <CssBaseline />
                        <motion.div
                            positionTransition
                            initial={AnimateUp.initial}
                            animate={AnimateUp.animate}
                            exit={AnimateUp.exit}>
                            <div className={classes.centrado}>
                                <div className={classes.root}>
                                    <h2 className={classes.titulo}>Cuentame SiS</h2>
                                    <span className={classes.leyenda}>Student Information System</span>
                                    <h5 className={classes.subTitulo}>Inscripciones</h5>
                                    <FirebaseAuth />
                                </div>
                            </div>
                        </motion.div>
                    </Container>
                </ThemeProvider>
            </>
        )
    } else if (typeof user !== 'undefined' && user) {
        return (
            <>
                <div className='spinner'></div>
            </>
        )
    }
}

export default Signin
