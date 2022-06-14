// Next/React
import React from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'

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
import { getMunicipios } from '../utils/strings'
import { useUserState } from '../context/user'

export default function Home() {
    return (
        <Container maxWidth='sm'>
            <Box sx={{ my: 4 }}>
                <Typography variant='h4' component='h1' gutterBottom>
                    Next.js example
                </Typography>
            </Box>
        </Container>
    )
}
