import Head from 'next/head'

import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import { useFadedShadowStyles } from '@mui-treasury/styles/shadow/faded'
import { useGutterBorderedGridStyles } from '@mui-treasury/styles/grid/gutterBordered'

import BusinessCenterIcon from '@material-ui/icons/BusinessCenter'
import AssignmentIcon from '@material-ui/icons/Assignment'
import Avatar from '@material-ui/core/Avatar'

import { motion } from 'framer-motion'
import { Container, Item } from '../utils/motion-variants'

import Layout from '../components/layout'

import { useRouter } from 'next/router'
import { useUser } from '../utils/auth/useUser'
import { useCollection, useDocument } from '@nandorojo/swr-firestore'
import { useState, useEffect } from 'react'

// Styles
const useStyles = makeStyles(({ palette }) => ({
    rootGrid: {
        flexGrow: 1,
    },
    card: {
        borderRadius: 12,
        width: '100%',
        textAlign: 'center',
        margin: '10px',
        marginBottom: '30px',
    },
    taskCard: {
        maxWidth: '250px',
        minWidth: '200px',
        textAlign: 'center',
    },
    grow: {
        flexGrow: 1,
        textAlign: 'left',
    },
    cajaTitulo: {
        display: 'flex',
        margin: -14,
        marginBottom: 16,
        padding: 8,
        backgroundColor: palette.background.defaultTitle,
        borderBottom: '1px #6f6f6f63 solid',
    },
    fabAddCustomer: {
        width: 28,
        height: 28,
        minHeight: '28px !important',
        maxHeight: '28px !important',
        color: palette.secondary.contrastText,
        backgroundColor: palette.secondary.light,
        '&:hover': {
            backgroundColor: palette.secondary.main,
        },
    },
    fabAddProject: {
        width: 28,
        height: 28,
        minHeight: '28px !important',
        maxHeight: '28px !important',
        color: palette.primary.contrastText,
        backgroundColor: palette.esmeralda.dark,
        '&:hover': {
            backgroundColor: palette.esmeralda.main,
        },
    },
    fabAddTask: {
        width: 28,
        height: 28,
        minHeight: '28px !important',
        maxHeight: '28px !important',
        color: palette.primary.contrastText,
        backgroundColor: palette.salmon.dark,
        '&:hover': {
            backgroundColor: palette.salmon.main,
        },
    },
    tituloTarjeta: {
        fontSize: '1.1rem',
        marginBottom: '2px',
        marginLeft: '5px',
        cursor: 'default',
        textAlign: 'left',
        flexGrow: 1,
    },
    itemList: {
        display: 'flex',
        flexFlow: 'column nowrap',
        alignItems: 'flex-start',
    },
    item: {
        display: 'flex',
        flexFlow: 'row nowrap',
        textAlign: 'left',
        alignItems: 'flex-start',
        marginBottom: '5px',
    },
    itemImg: {
        width: 22,
        height: 22,
        margin: 'auto',
        marginRight: '5px',
    },
    itemLabel: {
        fontSize: 14,
        color: palette.grey[600],
        marginBottom: '1px',
        marginTop: 0,
    },
    subItemLabel: {
        fontSize: 12,
        color: palette.grey[500],
        marginTop: '0px',
        marginBottom: '1px',
    },
    statLabel: {
        fontSize: 14,
        color: palette.grey[500],
        fontWeight: 400,
        fontFamily:
            '"Roboto Condensed", "Source Sans Pro", Cantarell, Lato, Candara,"Segoe UI",  Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
        margin: 0,
    },
    statLabelSmall: {
        fontSize: 11,
        color: palette.grey[500],
        fontWeight: 600,
        fontFamily:
            'Lato, "Roboto Condensed", "Source Sans Pro", Cantarell, Candara,"Segoe UI",  Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
        margin: 0,
    },
    statValue: {
        fontSize: 13,
        fontWeight: 900,
        color: palette.grey[700],
        marginBottom: 4,
        letterSpacing: '1px',
        fontFamily:
            'Lato, "Roboto Condensed", "Source Sans Pro", Cantarell, Candara,"Segoe UI",  Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
    },
    statValueSmall: {
        fontSize: 11,
        fontWeight: 'normal',
        color: palette.grey[700],
        marginBottom: 4,
        letterSpacing: '1px',
        fontFamily:
            'Lato, "Roboto Condensed", "Source Sans Pro", Cantarell, Candara,"Segoe UI",  Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
    },
    botonSignout: {
        maxHeight: 20,
        fontSize: '0.65rem',
        padding: '4px 6px',
        margin: 0,
        backgroundColor: palette.warning.light,
        '&:hover': {
            backgroundColor: 'rgb(255, 155, 9)',
        },
    },
}))

export default function Home(props) {
    const router = useRouter()
    const styles = useStyles()
    const shadowStyles = useFadedShadowStyles()
    const borderedGridStyles = useGutterBorderedGridStyles({
        borderColor: 'rgba(0, 0, 0, 0.08)',
        height: '50%',
    })

    const { user, logout } = useUser()
    const { toggleDarkMode, darkMode, setDarkMode } = props

    // if (user && sessionState == 1)
    return (
        <Layout
            toggleDarkMode={toggleDarkMode}
            darkMode={darkMode}
            setDarkMode={setDarkMode}
            userMeta={{}}
            signout={logout}
            titulo='Bienvenido a Cuentame SiS | Inscripciones'>
            <Head>
                <title>Cuentame SiS | Inscripciones</title>
            </Head>
            <motion.div variants={Container} initial='hidden' animate='show'>
                <Grid container className={styles.rootGrid} direction='row' spacing={2}>
                    <Grid item xs={12}>
                        <Grid container spacing={3} justify='flex-start' alignItems='flex-start'>
                            {/* Projects Card  */}
                            {/* <Grid item key='2'>
                                    <motion.div positionTransition key='2' variants={Item}>
                                        <Card className={clsx(styles.taskCard, shadowStyles.root)}>
                                            <CardContent>
                                                <Box className={styles.cajaTitulo}>
                                                    <BusinessCenterIcon color='primary' style={{ fontSize: '1.65rem' }} />
                                                    <span className={styles.tituloTarjeta}>Proyectos</span>
                                                </Box>
                                                <Box className={styles.itemList}>
                                                    {(projects && projects.length) || loadingProjects ? (
                                                        projects.map((project) => (
                                                            <Box className={styles.cajaDatos} key={project?._id}>
                                                                <Box className={styles.item}>
                                                                    <Avatar
                                                                        variant='rounded'
                                                                        className={styles.itemImg}
                                                                        src={project?.logoUrl}>
                                                                        {project?.name[0]}
                                                                    </Avatar>
                                                                    <p className={styles.itemLabel} name={project?._id}>
                                                                        {project?.name}
                                                                    </p>
                                                                </Box>
                                                            </Box>
                                                        ))
                                                    ) : (
                                                        <span className={styles.itemLabel}>No tienes proyectos</span>
                                                    )}
                                                </Box>
                                            </CardContent>
                                        </Card>
                                    </motion.div>
                                </Grid> */}
                            {/* END Cards */}
                        </Grid>
                    </Grid>
                </Grid>
            </motion.div>
        </Layout>
    )
}
