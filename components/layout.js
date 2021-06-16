import Head from 'next/head'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'

// import Link from '@material-ui/core/Link'
import Link from 'next/link'
import Drawer from '@material-ui/core/Drawer'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Badge from '@material-ui/core/Badge'
import Container from '@material-ui/core/Container'
import List from '@material-ui/core/List'
import Typography from '@material-ui/core/Typography'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListSubheader from '@material-ui/core/ListSubheader'
import Switch from '@material-ui/core/Switch'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import Avatar from '@material-ui/core/Avatar'
import Divider from '@material-ui/core/Divider'
import { withStyles } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'
import SpeedDial from '@material-ui/lab/SpeedDial'
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon'
import SpeedDialAction from '@material-ui/lab/SpeedDialAction'
import AssistantIcon from '@material-ui/icons/Assistant'
import AddIcon from '@material-ui/icons/Add'
import PersonAddIcon from '@material-ui/icons/PersonAdd'
import PeopleIcon from '@material-ui/icons/People'
import AboutIcon from '@material-ui/icons/Info'
import SettingsIcon from '@material-ui/icons/Settings'
import LocalAtmIcon from '@material-ui/icons/LocalAtm'
import AccountBalanceIcon from '@material-ui/icons/AccountBalance'
import PaymentIcon from '@material-ui/icons/Payment'
import MenuIcon from '@material-ui/icons/Menu'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import NotificationsIcon from '@material-ui/icons/Notifications'
import Brightness3Icon from '@material-ui/icons/Brightness3'
import BrightnessAutoIcon from '@material-ui/icons/BrightnessAuto'
import WbSunnyIcon from '@material-ui/icons/WbSunny'
import PeopleAltIcon from '@material-ui/icons/PeopleAlt'
import ExpandLess from '@material-ui/icons/ExpandLess'
import ExpandMore from '@material-ui/icons/ExpandMore'
import AssistantPhotoIcon from '@material-ui/icons/AssistantPhoto'
import BeenhereIcon from '@material-ui/icons/Beenhere'
import CategoryIcon from '@material-ui/icons/Category'
import GroupWorkIcon from '@material-ui/icons/GroupWork'
import LiveHelpIcon from '@material-ui/icons/LiveHelp'
import SecurityIcon from '@material-ui/icons/Security'
import LocationCityIcon from '@material-ui/icons/LocationCity'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'

import { temaLight, temaDark } from '../style/temaCuentameApp'
import MultiSwitch from './tristateswitch'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import React from 'react'

import { motion } from 'framer-motion'
import { AnimateFadeIn } from '../utils/motion-variants'

// https://github.com/mui-org/material-ui/blob/master/docs/src/pages/getting-started/templates/dashboard/Dashboard.js

const drawerWidth = 240
const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    toolbar: {
        paddingRight: 24, // keep right padding when drawer closed
    },
    toolbarIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    flexcontainer: {
        display: 'flex',
        flexFlow: 'row nowrap!important',
        alignItems: 'center',
        fontSize: '1rem',
        cursor: 'pointer',
    },
    appName: {
        marginLeft: 10,
        fontWeight: 300,
    },
    iconoApp: {
        flex: '0 1 auto',
        margin: '0px',
        padding: 0,
        width: '40px !important',
        height: '40px !important',
    },
    iconoNoche: {
        color: '#424242',
        fontSize: '1.25rem',
        padding: '0.1rem',
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        boxShadow: '0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.24),0px 1px 3px 0px rgba(0,0,0,0.22)',
        // boxShadow: '0px 2px 1px -1px rgba(255,255,255,0.2),0px 1px 1px 0px rgba(255,255,255,0.14),0px 1px 3px 0px rgba(255,255,255,0.12)',
        borderRadius: '50%',
    },
    iconoDia: {
        backgroundColor: theme.palette.warning.main,
        color: '#424242',
        fontSize: '1.25rem',
        padding: '0.1rem',
        boxShadow: '0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.24),0px 1px 3px 0px rgba(0,0,0,0.22)',
        borderRadius: '50%',
    },
    iconoAuto: {
        backgroundColor: theme.palette.esmeralda.light,
        color: '#424242',
        fontSize: '1.25rem',
        padding: '0.1rem',
        boxShadow: '0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.24),0px 1px 3px 0px rgba(0,0,0,0.22)',
        borderRadius: '50%',
    },
    appBar: {
        backgroundColor: theme.palette.primary.main,
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
    },
    menuButtonHidden: {
        display: 'none',
    },
    title: {
        flexGrow: 1,
    },
    drawerPaper: {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerPaperClose: {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9),
        },
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    },
    container: {
        padding: theme.spacing(3),
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(1),
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    fixedHeight: {
        height: 240,
    },
    cajaUsuario: {
        display: 'flex',
        marginTop: '-8px',
        padding: 5,
        paddingLeft: 2,
        backgroundColor: theme.palette.userBoxBackground.main,
    },
    cajaDatos: {
        display: 'flex',
        flexFlow: 'column',
        marginLeft: 5,
        marginRight: 10,
        textAlign: 'left',
    },
    avatar: {
        width: 55,
        height: 55,
        margin: 'auto',
    },
    nombre: {
        fontSize: 14,
        color: theme.palette.grey[600],
        marginBottom: '1px',
        marginTop: 0,
    },
    email: {
        fontSize: 11,
        color: theme.palette.grey[500],
        marginTop: '0px',
        marginBottom: '1px',
    },
    botonSignout: {
        maxHeight: 20,
        fontSize: '0.65rem',
        padding: '4px 6px',
        margin: 0,
        backgroundColor: theme.palette.warning.light,
        '&:hover': {
            backgroundColor: 'rgb(255, 155, 9)',
        },
    },
    speedDialWrapper: {
        position: 'relative',
        marginTop: theme.spacing(3),
        height: 380,
    },
    speedDial: {
        position: 'absolute',
        '&.MuiSpeedDial-directionUp, &.MuiSpeedDial-directionLeft': {
            bottom: theme.spacing(2),
            right: theme.spacing(1),
        },
        '&.MuiSpeedDial-directionDown, &.MuiSpeedDial-directionRight': {
            top: theme.spacing(1),
            left: theme.spacing(1),
        },
    },
    nested: {
        paddingLeft: theme.spacing(5),
    },
    iconRootDense: {
        // minWidth: 34,
    },
}))

function Copyright() {
    return (
        <Typography variant='body2' color='textSecondary' align='center'>
            {'Copyright © '}
            {new Date().getFullYear()} <a>&nbsp;Miguel Chavez, codea.me</a>
        </Typography>
    )
}

const Layout = ({ children, titulo, user, darkMode, setDarkMode, signout, fuego, userProfile, authUser }) => {
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
    const tema = darkMode ? temaDark : temaLight

    const router = useRouter()
    const [open, setOpen] = useState(true) // drawer
    const [openSpeedDial, setOpenSpeedDial] = useState(false) // SpeedDial
    const [selectedIndex, setSelectedIndex] = useState(router.route)

    const handleDrawerToggle = () => {
        setOpen(!open)
    }
    const handleCloseSpeedDial = () => {
        setOpenSpeedDial(false)
    }
    const handleOpenSpeedDial = () => {
        setOpenSpeedDial(true)
    }
    const classes = useStyles()
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight)

    const speedDialActions = [
        { icon: <AccountBalanceIcon />, name: 'Financiadora' },
        { icon: <PaymentIcon />, name: 'Solicitud de Gasto' },
        { icon: <LocalAtmIcon />, name: 'Orden de Pago' },
    ]

    const saveConfig = (val) => {
        // val :  'L', 'D', 'Auto'
        const old = { ...userProfile.data }
        userProfile.update({ darkMode: val }, false)
    }

    const matches = useMediaQuery(tema.breakpoints.down('xs'))
    const [drawerVariant, setDrawerVariant] = useState('permanent')

    useEffect(() => {
        // console.log(`theme.breakpoints.up('md') matches: ${matches}`)
        if (matches) {
            setOpen(false) // si estamos en mobile, cerramos por default.
        }
        setDrawerVariant(matches ? 'temporary' : 'permanent')
    }, [matches])

    return (
        <>
            <div className={classes.root}>
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
                    <meta name='apple-mobile-web-app-status-bar' content={tema.palette.primary.main} />
                    <meta name='apple-mobile-web-app-capable' content='yes' />
                    <meta name='apple-mobile-web-app-status-bar-style' content='black' />
                    <meta name='apple-mobile-web-app-title' content='cuentameapp' />

                    <meta name='application-name' content='cuentameapp' />
                    <meta name='description' content='cuentameapp, el gestor de proyectos' />
                    <meta name='format-detection' content='telephone=no' />
                    <meta name='mobile-web-app-capable' content='yes' />

                    <meta name='theme-color' content={tema.palette.primary.main} />
                </Head>
                <CssBaseline />

                <AppBar position='absolute' className={clsx(classes.appBar, open && classes.appBarShift)}>
                    <Toolbar className={classes.toolbar}>
                        <IconButton
                            edge='start'
                            color='inherit'
                            aria-label='open drawer'
                            onClick={handleDrawerToggle}
                            className={clsx(classes.menuButton, open && classes.menuButtonHidden)}>
                            <MenuIcon />
                        </IconButton>
                        <Typography component='h1' variant='h6' color='inherit' noWrap className={classes.title}>
                            {titulo}
                        </Typography>
                        <IconButton color='inherit'>
                            <Badge badgeContent={1} color='secondary'>
                                <NotificationsIcon />
                            </Badge>
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <Drawer
                    variant={drawerVariant}
                    classes={{
                        paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
                    }}
                    open={open}
                    ModalProps={{ onBackdropClick: handleDrawerToggle, onEscapeKeyDown: handleDrawerToggle }}>
                    <div className={classes.toolbarIcon}>
                        <Typography component='h1' variant='h6' color='inherit' noWrap className={classes.title}>
                            <div
                                className={classes.flexcontainer}
                                onClick={(e) => {
                                    e.preventDefault()
                                    handleDrawerToggle()
                                }}>
                                <img className={classes.iconoApp} src='/cuentameapp.png' />
                                <h4 className={classes.appName}>Cuentame SiS</h4>
                            </div>
                        </Typography>
                        <IconButton onClick={handleDrawerToggle}>
                            <ChevronLeftIcon />
                        </IconButton>
                    </div>
                    <Divider />
                    <List dense>
                        <Box className={classes.cajaUsuario}>
                            <Box className={classes.cajaDatos}>
                                <motion.div
                                    positionTransition
                                    initial={AnimateFadeIn.initial}
                                    animate={AnimateFadeIn.animate}
                                    exit={AnimateFadeIn.exit}>
                                    <Avatar
                                        className={classes.avatar}
                                        src={
                                            authUser?.avatar ||
                                            authUser?.photoURL ||
                                            `https://i.pravatar.cc/128?u=${authUser?.email}`
                                        }
                                    />
                                    <Box></Box>
                                </motion.div>
                            </Box>
                            <Box className={classes.cajaUsuario_}>
                                <Box className={classes.cajaDatos}>
                                    <p className={classes.nombre}>{authUser?.displayName || authUser?.nombre}</p>
                                    <p className={classes.email}> {authUser?.email}</p>
                                    <Button
                                        size='small'
                                        variant='contained'
                                        className={classes.botonSignout}
                                        onClick={() => {
                                            console.log('Signout...')
                                            signout()
                                        }}>
                                        Cerrar Sesión
                                    </Button>
                                    <MultiSwitch
                                        values={[
                                            { icon: <WbSunnyIcon className={classes.iconoDia} />, value: 'L' },
                                            {
                                                icon: <BrightnessAutoIcon className={classes.iconoAuto} />,
                                                value: 'Auto',
                                            },
                                            { icon: <Brightness3Icon className={classes.iconoNoche} />, value: 'D' },
                                        ]}
                                        selected={
                                            userProfile?.data?.darkMode == 'D'
                                                ? { icon: <Brightness3Icon className={classes.iconoNoche} />, value: 'D' }
                                                : { icon: <WbSunnyIcon className={classes.iconoDia} />, value: 'L' }
                                        }
                                        onChange={(val) => {
                                            console.log('LAYOUT >>> MultiSwitch On Change:', val)
                                            // Guardamos en Settings del usuario
                                            saveConfig(val)
                                        }}
                                    />
                                </Box>
                            </Box>
                        </Box>
                        <Divider />
                        {user && roles && roles.includes('admin') && (
                            <>
                                <ListSubheader inset>Administración</ListSubheader>
                                <ListItem
                                    button
                                    selected={selectedIndex === '/roles'}
                                    onClick={(e) => {
                                        e.preventDefault()
                                        setSelectedIndex(router.route)
                                        router.push('/roles', '/roles')
                                    }}>
                                    <ListItemIcon className={classes.iconRootDense}>
                                        <SecurityIcon />
                                    </ListItemIcon>
                                    <ListItemText primary='Roles y permisos' />
                                </ListItem>
                                <ListItem
                                    button
                                    selected={selectedIndex === '/orgs' || selectedIndex.includes('/org/')}
                                    onClick={(e) => {
                                        e.preventDefault()
                                        setSelectedIndex(router.route)
                                        router.push('/orgs', '/orgs')
                                    }}>
                                    <ListItemIcon className={classes.iconRootDense}>
                                        <LocationCityIcon />
                                    </ListItemIcon>
                                    <ListItemText primary='Organizaciones' />
                                </ListItem>
                                <ListItem
                                    button
                                    selected={selectedIndex === '/usuarios' || selectedIndex.includes('/usuario/')}
                                    onClick={(e) => {
                                        router.push('/usuarios', '/usuarios')
                                        setSelectedIndex(router.route)
                                    }}>
                                    <ListItemIcon className={classes.iconRootDense}>
                                        <PeopleAltIcon />
                                    </ListItemIcon>
                                    <ListItemText primary='Usuarios' />
                                </ListItem>
                            </>
                        )}
                        <ListSubheader inset>General</ListSubheader>
                        <ListItem
                            button
                            selected={selectedIndex === '/financiadoras' || selectedIndex.includes('/financiadora/')}
                            onClick={(e) => {
                                router.push('/proyectos', '/financiadoras')
                                setSelectedIndex(router.route)
                            }}>
                            <ListItemIcon className={classes.iconRootDense}>
                                <AccountBalanceIcon />
                            </ListItemIcon>
                            <ListItemText primary='Financiadoras' />
                        </ListItem>
                    </List>
                    {/* Contenido de menu: components/menuItems.js */}
                    <Divider />
                    <List>
                        {/* {SecondaryListItems} */}
                        <ListItem button>
                            <ListItemIcon className={classes.iconRootDense}>
                                <SettingsIcon />
                            </ListItemIcon>
                            <ListItemText primary='Ajustes' />
                        </ListItem>
                    </List>
                    <div className={classes.exampleWrapper}>
                        <SpeedDial
                            ariaLabel='SpeedDial example'
                            className={classes.speedDial}
                            icon={<SpeedDialIcon />}
                            onClose={handleCloseSpeedDial}
                            onOpen={handleOpenSpeedDial}
                            open={openSpeedDial}
                            direction='up'>
                            {speedDialActions.map((action) => (
                                <SpeedDialAction
                                    key={action.name}
                                    icon={action.icon}
                                    tooltipTitle={action.name}
                                    tooltipOpen={true}
                                    onClick={() => {
                                        // switch (action.name) {
                                        //     case 'Proyecto':
                                        //         setOpenDialogAddProject(true)
                                        //         break
                                        //     case 'Tarea':
                                        //         setOpenDialogAddTarea(true) // open dialog
                                        //         break
                                        // }
                                        // // finally close the speed dial
                                        // return handleCloseSpeedDial()
                                    }}
                                />
                            ))}
                        </SpeedDial>
                    </div>
                    {/* Fin Contenido de menu */}
                </Drawer>
                {/* Fin del drawer */}

                {/* Contenido principal */}
                <main className={classes.content}>
                    <div className={classes.appBarSpacer} />
                    <Container maxWidth='xl' className={classes.container}>
                        {children}
                        <Box pt={4}>
                            <Copyright />
                        </Box>
                    </Container>
                </main>
            </div>
        </>
    )
}

export default Layout
