import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import { useFadedShadowStyles } from '@mui-treasury/styles/shadow/faded'
import { useGutterBorderedGridStyles } from '@mui-treasury/styles/grid/gutterBordered'
import PersonAddIcon from '@material-ui/icons/PersonAdd'

import { motion } from 'framer-motion'
import { Container, Item } from '../utils/motion-variants'

import { useState, useEffect } from 'react'

import Layout from '../components/layout'
import Sidebar from '../components/sidebar'
import FormaUsuarios from '../components/usuarios'

import PouchDB from 'pouchdb'
import Authentication from 'pouchdb-authentication'
import PouchDBFind from 'pouchdb-find'
import { useFind, useDoc } from 'use-pouchdb'
import useSession from '../utils/auth/useSession'

import { useRouter } from 'next/router'
import Head from 'next/head'

import TarjetaUsuario from '../components/tarjeta_usuarios'

// Styles
const useStyles = makeStyles((theme) => ({
    rootGrid: {
        flexGrow: 1,
    },
    XsmallButton: {
        width: 22,
        height: 22,
        marginLeft: 10,
    },
    XsmallButtonText: {
        fontSize: '1.3rem',
    },
    TopMenuBox: {
        margin: 0,
        padding: 0,
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
    },
    TopMenuButtonContainer: {
        margin: theme.spacing(0),
        flexFlow: 'row wrap',
        justifyContent: 'flex-end',
    },
    TopMenuButton: {
        marginLeft: theme.spacing(2),
        marginBottom: theme.spacing(1),
        flexFlow: 'row wrap',
        justifyContent: 'flex-end',
    },
    gridItem: {
        padding: '8px!important',
    },
    grow: {
        flexGrow: 1,
        textAlign: 'left',
    },
    item: {
        display: 'flex',
        flexFlow: 'row nowrap',
        textAlign: 'left',
        alignItems: 'flex-start',
    },

    itemImg: {
        width: 18,
        height: 18,
        marginRight: '5px',
    },
    itemLabel: {
        fontSize: 14,
        color: theme.palette.grey[600],
        marginBottom: '1px',
        marginTop: 0,
    },
    flexible: {
        display: 'flex',
        flex: '1 1 auto',
        flexDirection: 'column',
        lineHeight: '1.4 !important',
    },
    tituloTrunco: {
        width: 180,
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
    },
    grupoFlex: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
}))

export default function Usuarios(props) {
    const router = useRouter()
    const styles = useStyles()
    const shadowStyles = useFadedShadowStyles()
    const borderedGridStyles = useGutterBorderedGridStyles({
        borderColor: 'rgba(0, 0, 0, 0.08)',
        height: '50%',
    })

    const [isOpen, setIsOpen] = useState(false)

    const toggleDrawer = () => {
        setIsOpen(!isOpen)
    }

    const { toggleDarkMode, darkMode, setDarkMode, tema } = props

    const { sessionState, user, userMetadata, alfredLocalDb, userLocalDb, usersLocalDb, remoteCouch } = useSession()
    PouchDB.plugin(Authentication)
    PouchDB.plugin(PouchDBFind)

    const options_admin_users = {
        index: {
            fields: ['type', 'app'],
        },
        selector: {
            type: 'user',
            app: 'alfred',
        },
        db: 'usersDb',
    }

    const options_other_users = {
        index: {
            fields: ['type', 'org', 'app'],
        },
        selector: {
            type: 'user',
            app: 'alfred',
            org: `${userMetadata.org}`,
        },
        db: 'usersDb',
    }

    const { docs: users, loading: loadingUsers } = useFind(
        userMetadata &&
            userMetadata.app_roles &&
            (userMetadata.app_roles.includes('Admin') || userMetadata.app_roles.includes('admin'))
            ? options_admin_users
            : options_other_users
    )

    const org_id = userMetadata && userMetadata.org
    const {
        doc: org,
        loading: loadingOrg,
        error: errorOrg,
    } = useDoc(`org:${org_id}`, null, () => ({ nombre: 'root', cuota_miembros: 9999, miembros: [] }))

    const [editData, setEditData] = useState({ title: '', usuario: {} })

    useEffect(() => {
        console.log('Cuota <= miembros:', parseInt(org.cuota_miembros) <= parseInt(org.miembros.length))
    }, [org])

    return (
        <Layout
            user={user}
            remoteCouch={remoteCouch}
            localDb={alfredLocalDb}
            userDb={userLocalDb}
            usersDb={usersLocalDb}
            userMeta={userMetadata}
            toggleDarkMode={toggleDarkMode}
            darkMode={darkMode}
            setDarkMode={setDarkMode}
            titulo='Usuarios'>
            <Head>
                <title>Alfred</title>
            </Head>
            <Sidebar tema={tema} toggle={toggleDrawer} isOpen={isOpen}>
                <FormaUsuarios
                    user={user}
                    userMeta={userMetadata}
                    localDb={alfredLocalDb}
                    remoteCouch={remoteCouch}
                    toggle={toggleDrawer}
                    isOpen={isOpen}
                    tema={tema}
                    editData={editData}
                />
            </Sidebar>
            {userMetadata &&
                userMetadata.app_roles &&
                userMetadata.app_perms &&
                (userMetadata.app_roles.includes('admin') ||
                    userMetadata.app_roles.includes('Admin') ||
                    userMetadata.app_perms.includes('org_admin')) && (
                    <Grid container className={styles.rootGrid} direction='row' spacing={2}>
                        <Grid item xs={12}>
                            <Box className={styles.TopMenuBox}>
                                <span></span>
                                <Box className={styles.TopMenuButtonContainer}>
                                    <Button
                                        color='secondary'
                                        size='small'
                                        startIcon={<PersonAddIcon />}
                                        disabled={
                                            userMetadata.app_roles.includes('admin') ||
                                            userMetadata.app_roles.includes('Admin')
                                                ? false
                                                : parseInt(org.cuota_miembros) <= parseInt(org.miembros.length)
                                        }
                                        className={styles.TopMenuButton}
                                        onClick={(e) => {
                                            e.preventDefault()
                                            setEditData({})
                                            setIsOpen(true)
                                        }}>
                                        Agregar Usuario
                                    </Button>
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>
                )}
            <motion.div variants={Container} initial='hidden' animate='show'>
                <Grid container className={styles.rootGrid} direction='row' spacing={2}>
                    <Grid item xs={12}>
                        <Grid container spacing={3} justify='flex-start' alignItems='flex-start'>
                            {/* User Cards  */}
                            {(users && users.length) || loadingUsers ? (
                                users.map((usr) => (
                                    <Grid item key={usr._id} className={styles.gridItem}>
                                        <motion.div positionTransition key={usr._id} variants={Item}>
                                            <TarjetaUsuario usrData={usr} setIsOpen={setIsOpen} setEditData={setEditData} />
                                        </motion.div>
                                    </Grid>
                                ))
                            ) : (
                                <span className={styles.itemLabel}>No tienes usuarios</span>
                            )}
                            {/* END usre Cards */}
                        </Grid>
                    </Grid>
                </Grid>
            </motion.div>
        </Layout>
    )
}
