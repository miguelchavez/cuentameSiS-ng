import React from 'react'

// MUI
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import ListItemIcon from '@mui/material/ListItemIcon'
import ExitToAppIcon from '@mui/icons-material/ExitToApp'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import DashboardIcon from '@mui/icons-material/Dashboard'
import UserIcon from '@mui/icons-material/Person'
import CuestionariosIcon from '@mui/icons-material/AssignmentTurnedIn'
import AboutIcon from '@mui/icons-material/Info'
import NotificationsIcon from '@mui/icons-material/Notifications'

import { useRouter } from 'next/router'

export const MainListItems = (props) => {
    const { user, signout, open } = props
    const router = useRouter()
    return (
        <List>
            <ListItem key='inicio' disablePadding sx={{ display: 'block' }}>
                <ListItemButton
                    sx={{
                        minHeight: 48,
                        justifyContent: open ? 'initial' : 'center',
                        px: 2.5,
                    }}
                    onClick={(e) => {
                        e.preventDefault()
                        router.push('/', '/')
                    }}>
                    <ListItemIcon
                        sx={{
                            minWidth: 0,
                            mr: open ? 3 : 'auto',
                            justifyContent: 'center',
                        }}>
                        <DashboardIcon />
                    </ListItemIcon>
                    <ListItemText primary='Inicio' sx={{ opacity: open ? 1 : 0 }} />
                </ListItemButton>
            </ListItem>
            <ListItem key='perfil' disablePadding sx={{ display: 'block' }}>
                <ListItemButton
                    sx={{
                        minHeight: 48,
                        justifyContent: open ? 'initial' : 'center',
                        px: 2.5,
                    }}
                    onClick={(e) => {
                        e.preventDefault()
                        router.push('/perfil', '/perfil')
                    }}>
                    <ListItemIcon
                        sx={{
                            minWidth: 0,
                            mr: open ? 3 : 'auto',
                            justifyContent: 'center',
                        }}>
                        <UserIcon />
                    </ListItemIcon>
                    <ListItemText primary='Mi Perfil de usuario' sx={{ opacity: open ? 1 : 0 }} />
                </ListItemButton>
            </ListItem>
            <ListItem key='expedientes' disablePadding sx={{ display: 'block' }}>
                <ListItemButton
                    sx={{
                        minHeight: 48,
                        justifyContent: open ? 'initial' : 'center',
                        px: 2.5,
                    }}
                    onClick={(e) => {
                        e.preventDefault()
                        router.push('/expedientes/listar', '/expedientes/listar')
                    }}>
                    <ListItemIcon
                        sx={{
                            minWidth: 0,
                            mr: open ? 3 : 'auto',
                            justifyContent: 'center',
                        }}>
                        <UserIcon />
                    </ListItemIcon>
                    <ListItemText primary='Expedientes de mis estudiantes' sx={{ opacity: open ? 1 : 0 }} />
                </ListItemButton>
            </ListItem>
        </List>
    )
}

export const SecondaryListItems = () => {
    const router = useRouter()
    return (
        <div>
            <ListItem
                button
                onClick={(e) => {
                    e.preventDefault()
                    router.push('/acerca_de', '/acerca_de')
                }}>
                <ListItemIcon>
                    <AboutIcon />
                </ListItemIcon>
                <ListItemText primary='Acera de...' />
            </ListItem>
        </div>
    )
}
