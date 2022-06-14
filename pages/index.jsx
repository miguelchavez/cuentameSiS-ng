// Next/React
import React from 'react'
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
import { useCollection, useDocument } from 'swr-firestore-v9'

// Own
import { useUserState } from '../context/user'
import { getMunicipios } from '../utils/strings'

export default function Home(props) {
    const { user } = useUserState()

    const {
        data: perfil,
        update,
        set,
        deleteDocument,
    } = useDocument(user?.id ? `usuarios/${user?.id}` : null, {
        listen: false, // No queremos que al estar editando se sobre escriban datos...
        shouldRetryOnError: false,
        parseDates: ['createdAt', 'lastUpdated.date'],
        onSuccess: () => {
            // console.log('[ 47 editarPerfil :: onUseDocument got ] Perfil:', perfil)
        },
        onError: (error) => {
            console.log('[ 50 editarPerfil :: onUseDocument got ] ERROR AL OBTENER Expediente:', error)
        },
    })

    return (
        <Container maxWidth='sm'>
            <Box sx={{ my: 4 }}>
                <Typography variant='h4' component='h1' gutterBottom className='text-slate-700'>
                    Bienvenido al sistema de inscripciones del Colegio Anáhuac.
                </Typography>
                {!perfil?.userId ? (
                    <Typography variant='h5' component='h5' className='text-slate-500'>
                        Para iniciar, por favor llena tu perfil, el cual contendrá información de los padres de los estudiantes que
                        inscribirás.
                    </Typography>
                ) : (
                    <Typography variant='h5' component='h5' className='text-slate-500'>
                        Agrega los expedientes de cada uno de tus estudiantes a inscribir.
                    </Typography>
                )}
            </Box>
        </Container>
    )
}
