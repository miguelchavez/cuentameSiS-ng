// Next/React
import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'

//useSnackbar
import { useSnackbar } from 'notistack'

//motion
import { motion, useElementScroll } from 'framer-motion'
import { AnimateUp, Container_, FadeInUp, Item } from '../../../utils/motion-variants'

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

import useMediaQuery from '@mui/material/useMediaQuery'

// Firestore
import { useDocument } from 'swr-firestore-v9'

// Own
import FormaExpediente from '../../../components/formaExpediente'
// import { getMunicipios } from '../../../utils/strings'
// import { useUserState } from '../../../context/user'

export default function editarExpedientes(props) {
    const { setTitulo } = props

    const router = useRouter()
    const { params } = router.query // get params
    const [instanceId, setInstanceId] = useState(null)

    const {
        data: expediente,
        update,
        set,
        deleteDocument,
    } = useDocument(instanceId ? `expedientes/${instanceId}` : null, {
        listen: false, // No queremos que al estar editando se sobre escriban datos...
        shouldRetryOnError: false,
        parseDates: ['createdAt', 'lastUpdated.date'],
        onSuccess: () => {
            // console.log('[ 55 editarExpediente :: onUseDocument got ] Expediente:', expediente)
        },
        onError: (error) => {
            console.log('[ 58 editarExpediente :: onUseDocument got ] ERROR AL OBTENER Expediente:', error)
        },
    })

    useEffect(() => {
        if (params && params.length) {
            // instance_id.id = params[0] // debe solo ser un parametro: nueva o el id !
            setInstanceId(params[0])
            // console.log(' INSTANCE ID:', instanceId)
        }
    }, [params])

    return (
        <Container maxWidth='md'>
            {/* editor de Expedientes */}
            <motion.div initial={AnimateUp.initial} animate={AnimateUp.animate} exit={AnimateUp.exit}>
                <Grid container spacing={3} justify='flex-start' alignItems='flex-start'>
                    <Grid item key='el_expediente' className=''>
                        <motion.div positionTransition key={expediente?.id} variants={Item}>
                            <FormaExpediente
                                data={expediente}
                                set={expediente?.id ? set : null}
                                update={expediente?.id ? update : null}
                                instance_id={instanceId}
                                tipo='expediente'
                            />
                        </motion.div>
                    </Grid>
                </Grid>
            </motion.div>
        </Container>
    )
}
