// Next/React
import React from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'

//useSnackbar
import { useSnackbar } from 'notistack'

//motion
import { motion } from 'framer-motion'
import { AnimateUp, Container_, FadeInUp, Item } from '../utils/motion-variants'

// MUI
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import Badge from '@mui/material/Badge'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import AccountBoxIcon from '@mui/icons-material/AccountBox'

// Firestore
import { useCollection, useDocument } from 'swr-firestore-v9'

// Own
import { useUserState } from '../context/user'
import TarjetaExpediente from '../components/tarjetaExpediente'

export default function Home(props) {
    const { user } = useUserState()

    // Perfil del usuario
    const {
        data: perfil,
        update,
        set,
        deleteDocument,
    } = useDocument(user?.id ? `usuarios/${user?.id}` : null, {
        listen: false, // No queremos que al estar editando se sobre escriban datos...
        parseDates: ['createdAt', 'lastUpdated.date'],
        onSuccess: () => {
            // console.log('[ 47 editarPerfil :: onUseDocument got ] Perfil:', perfil)
        },
        onError: (error) => {
            console.log('[ 50 editarPerfil :: onUseDocument got ] ERROR AL OBTENER Expediente:', error)
        },
    })

    // Expedientes del usuario
    const { data: expedientes } = useCollection('expedientes', {
        where: ['owner', '==', user?.id],
        listen: true,
        parseDates: ['createdAt', 'lastUpdated.date'],
    })

    return (
        <motion.div initial={AnimateUp.initial} animate={AnimateUp.animate} exit={AnimateUp.exit}>
            <Container maxWidth='md'>
                <Box>
                    <Typography variant='h4' component='h1' gutterBottom className='text-slate-700'>
                        Bienvenido al sistema de inscripciones del Colegio Anáhuac.
                    </Typography>
                    {!perfil?.userId ? (
                        <Typography variant='h5' component='h5' className='text-slate-500'>
                            Para iniciar, por favor llena tu perfil, el cual contendrá información de los padres de los estudiantes que
                            inscribirás.
                        </Typography>
                    ) : expedientes?.length <= 0 ? (
                        <Typography variant='h5' component='h5' className='text-slate-500'>
                            Agrega los expedientes de cada uno de tus estudiantes a inscribir.
                        </Typography>
                    ) : (
                        <div>
                            <Typography className='text-slate-600'>Tienes los siguientes expedientes de inscripción</Typography>
                            <div className='m-8'>
                                <motion.div variants={Container} initial='hidden' animate='show'>
                                    <Grid container spacing={3} justify='flex-start' alignItems='flex-start'>
                                        {expedientes &&
                                            expedientes.length &&
                                            expedientes.map((expediente) => (
                                                <Grid item key={expediente._id} className=''>
                                                    <motion.div key={expediente._id} variants={Item}>
                                                        <TarjetaExpediente expediente={expediente} />
                                                    </motion.div>
                                                </Grid>
                                            ))}
                                    </Grid>
                                </motion.div>
                            </div>
                        </div>
                    )}
                </Box>
            </Container>
        </motion.div>
    )
}
