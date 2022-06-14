// Nextjs & React
import { useEffect, useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'

// Material UI

import CssBaseline from '@mui/material/CssBaseline'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import Container from '@mui/material/Container'
import Paper from '@mui/material/Paper'
import Link from '@mui/material/Link'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import Switch from '@mui/material/Switch'
import TextField from '@mui/material/TextField'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormHelperText from '@mui/material/FormHelperText'
import FormGroup from '@mui/material/FormGroup'
import useMediaQuery from '@mui/material/useMediaQuery'

// Animations
import { motion } from 'framer-motion'
import { AnimateUp } from '../utils/motion-variants'

// Firbase
import FirebaseAuth from '../components/FirebaseAuth'

// Tema
import ThemeProvider from '../theme'
// import theme from '../theme/temaLight'

import { useUserState } from '../context/user'

const Signin = (props) => {
    const router = useRouter()
    const { user } = useUserState()

    // if (typeof user === 'undefined' || !user) {
    return (
        <div className='flex flex-col items-center justify-center min-h-screen bg-orange-300'>
            {/* red-400 orange-300 amber-500 orange-400 purple-200 */}
            <Head>
                <title>cuentameSiS</title>
                <meta charSet='utf-8' />
                <meta name='description' content='cuentameSiS' />
                <meta name='viewport' content='initial-scale=1.0, width=device-width' />
                <link rel='icon' href='/favicon-32x32.png' />
            </Head>
            <ThemeProvider>
                <Container
                    component='main'
                    className='flex flex-col items-center justify-center flex-1 text-center sm:min-w-[350px] min-w-screen min-h-[600px] sm:min-h-[660px]'>
                    <CssBaseline />
                    <motion.div initial={AnimateUp.initial} animate={AnimateUp.animate} exit={AnimateUp.exit}>
                        <div className='relative bg-white rounded-2xl shadow-2xl sm:min-w-[350px] min-w-[330px] min-h-[600px] sm:min-h-[660px]'>
                            <div className='relative flex flex-row flex-nowrap justify-center -inset-0 p-3 rounded-t-2xl bg-slate-100 overflow-hidden'>
                                <img className='w-[12rem] sm:w-[20rem]' src='/colegioanahuac.svg' />
                            </div>
                            <div className='absolute inset-x-0 bottom-0 flex flex-col flex-nowrap justify-center p-3 rounded-b-2xl bg-slate-50 overflow-hidden'>
                                <div className='flex flex-row items-center justify-between w-full'>
                                    <p className='text-2xl sm:text-3xl font-thin text-neutral-400 font-especial subpixel-antialiased'>
                                        Cuentame SiS
                                    </p>
                                    <img className='w-[3.5rem] sm:w-[4.5rem]  mb-0' src='/cuentameapp.png' />
                                </div>
                                <span className='text-sm subpixel-antialiased font-especial font-light tracking-tighter text-neutral-300 self-start -mt-[1.4rem]'>
                                    Student Information System
                                </span>
                            </div>
                            <div className='flex flex-col items-center justify-center w-full'>
                                <p className='text-lg sm:text-xl font-bold text-neutral-500 mt-2'>Sistema de Inscripciones</p>
                                <FirebaseAuth />
                            </div>
                        </div>
                    </motion.div>
                </Container>
            </ThemeProvider>
        </div>
    )
}

export default Signin
