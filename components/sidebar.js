import Head from 'next/head'
import clsx from 'clsx'
import Box from '@material-ui/core/Box'
import { makeStyles } from '@material-ui/core/styles'
import { useState, useEffect } from 'react'
import useMediaQuery from '@material-ui/core/useMediaQuery'

import Drawer from '@material-ui/core/Drawer'

const useStyles = makeStyles((theme) => ({
    root: {
        margin: theme.spacing(2),
    },
}))

const Sidebar = ({ children, isOpen, toggle, tema }) => {
    const classes = useStyles()
    // const [isOpen, setIsOpen] = useState(true)
    const [anchor, setAnchor] = useState('right')

    const matches = useMediaQuery(tema.breakpoints.down('sm'))

    // const toggle = () => {
    //     setIsOpen(!isOpen)
    // }

    useEffect(() => {
        // Si es mobile, lo mostramos arriba, si no a la derecha.
        setAnchor(matches ? 'top' : 'right')
    }, [matches])

    return (
        <>
            <Drawer anchor={anchor} open={isOpen} onClose={toggle}>
                <Box className={classes.root}>{children}</Box>
            </Drawer>
        </>
    )
}

export default Sidebar
