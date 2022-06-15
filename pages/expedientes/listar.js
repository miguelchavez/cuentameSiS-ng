// Next/React
import React from 'react'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

//useSnackbar
import { useSnackbar } from 'notistack'

//motion
import { motion } from 'framer-motion'
import { AnimateUp, Container_, FadeInUp, Item } from '../../utils/motion-variants'

// MUI
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import Badge from '@mui/material/Badge'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import Link from '@mui/material/Link'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import AccountBoxIcon from '@mui/icons-material/AccountBox'

// Firestore
import { useCollection, useDocument, getFuego } from 'swr-firestore-v9'

// Own
import TarjetaExpediente from '../../components/tarjetaExpediente'
import { useUserState } from '../../context/user'

export default function listadoExpedientes(props) {
    const router = useRouter()
    const { setTitulo } = props
    // const { userMeta, alfredLocalDb } = useUserState()
    const { user } = useUserState()

    //Expedientes del usuario
    const { data: expedientes } = useCollection('expedientes', {
        where: ['owner', '==', user?.id],
        listen: true,
        parseDates: ['createdAt', 'lastUpdated.date'],
    })

    useEffect(() => {
        // set page title
        setTitulo(`Listado de mis expedientes`)
    }, [])

    useState(() => {
        console.log('Expedientes:', expedientes)
    }, [expedientes])

    return (
        <Container maxWidth='md'>
            <Grid container className='' direction='row' spacing={2}>
                <Grid item xs={12}>
                    <Box className=''>
                        <Box className='flex flex-row flex-nowrap justify-end'>
                            <Button
                                color='secondary'
                                size='small'
                                variant='contained'
                                startIcon={<AccountBoxIcon />}
                                className=''
                                onClick={(e) => {
                                    e.preventDefault()
                                    router.push(
                                        '/expedientes/editar/[...params]',
                                        `/expedientes/editar/${encodeURIComponent('nueva')}`
                                    )
                                }}>
                                Agregar Expediente para un nuevo Estudiante
                            </Button>
                        </Box>
                    </Box>
                </Grid>
            </Grid>

            {/* listado */}

            <motion.div initial={AnimateUp.initial} animate={AnimateUp.animate} exit={AnimateUp.exit}>
                <Grid container spacing={3} justify='flex-start' alignItems='flex-start'>
                    {/* Cards  */}
                    {expedientes && expedientes.length ? (
                        expedientes?.map((expediente) => (
                            <Grid item key={expediente._id} className=''>
                                <motion.div key={expediente._id} variants={Item}>
                                    <TarjetaExpediente
                                        key={expediente._id}
                                        // userMeta={userMeta}
                                        // localDb={alfredLocalDb}
                                        expediente={expediente}
                                    />
                                </motion.div>
                            </Grid>
                        ))
                    ) : (
                        <span className=''>No tienes expedientes</span>
                    )}
                    {/* END Entity Cards */}
                </Grid>
            </motion.div>
        </Container>
    )
}
