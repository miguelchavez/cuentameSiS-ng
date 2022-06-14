import * as React from 'react'
import { useState, useEffect } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import clsx from 'clsx'

// MUI
import { styled } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import MuiDrawer from '@mui/material/Drawer'
import Box from '@mui/material/Box'
import MuiAppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import List from '@mui/material/List'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import Badge from '@mui/material/Badge'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import Link from '@mui/material/Link'
import MenuIcon from '@mui/icons-material/Menu'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import NotificationsIcon from '@mui/icons-material/Notifications'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'

import useMediaQuery from '@mui/material/useMediaQuery'

import { motion } from 'framer-motion'
import { AnimateFadeIn } from '../utils/motion-variants'

import { useDocument } from 'swr-firestore-v9'

// own
import { useUserState } from '../context/user'
import theme from '../theme/temaLight'
import { MainListItems } from './menuItems'

function Copyright(props) {
    return (
        <Typography variant='body2' color='text.secondary' align='center' {...props}>
            {'Copyright © '}
            <Link color='inherit' href='https://codea.me/cuentame/'>
                Miguel Chávez &mdash; codea::me
            </Link>{' '}
            {new Date().getFullYear()}
        </Typography>
    )
}

const drawerWidth = 260

const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
})

const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
})

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}))

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}))

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
        ...openedMixin(theme),
        '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
        ...closedMixin(theme),
        '& .MuiDrawer-paper': closedMixin(theme),
    }),
}))

const Layout = ({ children, titulo, darkMode, setDarkMode, fuego }) => {
    const { user, logout } = useUserState()
    const router = useRouter()
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
    // const tema = darkMode ? temaDark : temaLight

    const [open, setOpen] = useState(true) // drawer
    const [openSpeedDial, setOpenSpeedDial] = useState(false) // SpeedDial
    const [selectedIndex, setSelectedIndex] = useState(router.route)
    const [drawerVariant, setDrawerVariant] = useState('permanent')

    const matches = useMediaQuery(theme.breakpoints.down('sm'))

    const handleDrawerToggle = () => {
        setOpen(!open)
    }

    const userProfile = useDocument(user ? `usuarios/${user.id}` : null, {
        listen: false,
        ignoreFirestoreDocumentSnapshotField: false,
    })

    const saveConfig = (val) => {
        // val :  'L', 'D', 'Auto'
        const old = { ...userProfile.data }
        userProfile.update({ darkMode: val }, false)
    }

    useEffect(() => {
        // console.log('Layout >> Cambio en perfil: ', userProfile)
        if (userProfile?.data) {
            // Solo deberia haber un resultado.
            if (userProfile?.data?.config?.darkMode == 'Auto') {
                // Este tiene precedencia. Auto significa que se pone lo que dice el browser.
                // console.log('<Auto> DEVICE Broser DarkMode enabled:', window.matchMedia('(prefers-color-scheme: dark)').matches)
                setDarkMode(window.matchMedia('(prefers-color-scheme: dark)').matches)
            } else {
                // console.log('<User> Dark Mode:', userProfile?.data?.config?.darkMode)
                setDarkMode(userProfile?.data?.config?.darkMode === 'D' ? true : false)
            }
        } else {
            // console.log('Layout >> No userProfile!')
        }
    }, [userProfile])

    useEffect(() => {
        // console.log(`theme.breakpoints.up('sm') matches: ${matches}`)
        if (matches) {
            setOpen(false) // si estamos en mobile, cerramos por default.
            // setDrawerVariant('temporary')
            setDrawerVariant('permanent')
        } else {
            setOpen(true) // si estamos en mobile, abrimos por default.
            setDrawerVariant('permanent')
        }
        // setDrawerVariant(matches ? 'temporary' : 'permanent')
    }, [matches])

    // retrun template
    if (typeof user === 'undefined' || !user?.uid) {
        return (
            <div className='root'>
                <Head>
                    <title>Cuentame SiS | Inscripciones</title>
                    <meta charSet='utf-8' />
                    <meta name='description' content='Cuentame SiS' />
                    <meta
                        name='viewport'
                        content='minimun-scale=1, maximum-scale=1, initial-scale=1.0, user-scalable=no, width=device-width'
                    />
                    <meta httpEquiv='X-UA-Compatible' content='IE=edge' />

                    <link rel='manifest' href='/manifest.json' />
                    <link rel='icon' href='/icons/cuentameapp-32.png' />
                    <link rel='shortcut icon' href='/icons/favicon.ico' />

                    <link href='/icons/favicon-16.png' rel='icon' type='image/png' sizes='16x16' />
                    <link href='/icons/favicon-32.png' rel='icon' type='image/png' sizes='32x32' />

                    <link rel='apple-touch-icon' href='/icons/cuentameapp-144.png'></link>
                    <link rel='apple-touch-startup-icon' href='/icons/cuentameapp-144.png' />
                    <meta name='apple-mobile-web-app-status-bar' content={theme.palette.primary.main} />
                    <meta name='apple-mobile-web-app-capable' content='yes' />
                    <meta name='apple-mobile-web-app-status-bar-style' content='black' />
                    <meta name='apple-mobile-web-app-title' content='cuentameapp' />

                    <meta name='application-name' content='cuentameapp' />
                    <meta name='description' content='cuentameapp, el gestor de proyectos' />
                    <meta name='format-detection' content='telephone=no' />
                    <meta name='mobile-web-app-capable' content='yes' />

                    <meta name='theme-color' content={theme.palette.primary.main} />
                </Head>
                <Box sx={{ display: 'flex' }}>
                    <CssBaseline />
                    <AppBar position='fixed' open={open}>
                        <Toolbar
                            className='bg-orange-400'
                            sx={{
                                pr: '24px', // keep right padding when drawer closed
                            }}>
                            <IconButton
                                edge='start'
                                color='inherit'
                                aria-label='open drawer'
                                onClick={handleDrawerToggle}
                                className=''
                                sx={{
                                    marginRight: 5,
                                    ...(open && { display: 'none' }),
                                }}>
                                <MenuIcon />
                            </IconButton>
                            <Typography
                                component='h1'
                                variant='h6'
                                color='inherit'
                                sx={{ flexGrow: 1 }}
                                noWrap
                                className='classes.title'>
                                {titulo}
                            </Typography>
                            <IconButton color='inherit'>
                                <Badge badgeContent={4} color='secondary'>
                                    <NotificationsIcon />
                                </Badge>
                            </IconButton>
                        </Toolbar>
                    </AppBar>
                    <Drawer open={open} variant='permanent'>
                        <DrawerHeader>
                            <Toolbar
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'flex-end',
                                    px: [1],
                                }}>
                                <img className='w-[3.3rem] mr-3' src='/cuentameapp.png' />
                                <h4 className='classes.appName'>Cuentame SiS</h4>
                                <IconButton onClick={handleDrawerToggle}>
                                    <ChevronLeftIcon />
                                </IconButton>
                            </Toolbar>
                        </DrawerHeader>
                        <Divider />
                        <List component='nav' className='bg-orange-50'>
                            <Box className='flex flex-col items-center justify-center'>
                                <img className='h-[3.3rem] m-2' src='/colegioanahuac.svg' />
                            </Box>
                            <Box className='flex flex-row items-center'>
                                <Box className='avatar m-1 mr-2'>
                                    <motion.div
                                        positionTransition
                                        initial={AnimateFadeIn.initial}
                                        animate={AnimateFadeIn.animate}
                                        exit={AnimateFadeIn.exit}>
                                        <Avatar
                                            className='w-[52px] h-[52px] grayscale'
                                            variant='rounded'
                                            src={user?.avatar || user?.photoURL || `https://i.pravatar.cc/128?u=${user?.email}`}
                                        />
                                    </motion.div>
                                </Box>
                                <Box className='classes.cajaUsuario_'>
                                    <Box className='classes.cajaDatos'>
                                        <p className='text-sm font-normal text-slate-500 antialiased'>
                                            {user?.displayName || user?.nombre}
                                        </p>
                                        <p className='text-sm font-normal text-slate-500 antialiased'> {user?.email}</p>
                                    </Box>
                                </Box>
                            </Box>
                            <Box className='flex flex-col items-center justify-center'>
                                <Button
                                    size='small'
                                    variant='contained'
                                    color='error'
                                    className='h-[26px]'
                                    onClick={() => {
                                        logout()
                                    }}
                                    sx={{ display: open ? 'block' : 'none', opacity: open ? 1 : 0 }}>
                                    Cerrar Sesión
                                </Button>
                            </Box>
                            {/* MENU EXTRA */}
                        </List>
                        <Divider />
                        <MainListItems open={open} />
                        <Divider />
                    </Drawer>
                    <Box
                        component='main'
                        sx={{
                            backgroundColor: (theme) =>
                                theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[900],
                            flexGrow: 1,
                            height: '100vh',
                            overflow: 'auto',
                        }}>
                        <Toolbar />
                        <Container maxWidth='lg' sx={{ mt: 4, mb: 4 }}>
                            {children}
                            <Copyright sx={{ pt: 4 }} />
                        </Container>
                    </Box>
                </Box>
            </div>
        )
    } else {
        // NO USER... redireccionar a signin
        return <div class='spinner'></div>
    }
}
export default Layout
