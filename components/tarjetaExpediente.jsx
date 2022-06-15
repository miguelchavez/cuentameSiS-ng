import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import { Button, CardActionArea, CardActions } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import Box from '@mui/material/Box'
import Avatar from '@mui/material/Avatar'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import { useDocument } from 'swr-firestore-v9'

const TarjetaExpediente = (props) => {
    const { expediente } = props
    const router = useRouter()

    const [dialogOpen, setDialogOpen] = useState(false)

    const { deleteDocument } = useDocument(expediente?.id ? `expedientes/${expediente.id}` : null, {
        listen: false, // No queremos que al estar editando se sobre escriban datos...
        shouldRetryOnError: false,
        onSuccess: () => {
            console.log('[ 28 editarExpediente :: onUseDocument got ] Expediente:', expediente)
        },
        onError: (error) => {
            console.log('[ 58 editarExpediente :: onUseDocument got ] ERROR AL OBTENER Expediente:', error)
        },
    })

    const handleDialogClick = () => {
        setDialogOpen(!dialogOpen)
    }

    const handleDeleteQuestion = (e) => {
        setDialogOpen(true) // lanzamos dialog de pregunta
    }

    const handleDeleteDoc = (e) => {
        //TODO: Checar que se pueda borrar (que no haya un alumno ya relacionado)
        deleteDocument(expediente?.id)
        setDialogOpen(false)
    }

    return (
        <div>
            <Dialog
                open={dialogOpen}
                onClose={handleDialogClick}
                aria-labelledby='alert-dialog-title'
                aria-describedby='alert-dialog-description'>
                <DialogTitle id='alert-dialog-title'>{`Borrar`}</DialogTitle>
                <DialogContent>
                    <DialogContentText id='alert-dialog-description'>
                        ¿Realmente desea borrar el expediente de {expediente?.nombre} {expediente?.apaterno}?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialogClick}>No</Button>
                    <Button onClick={handleDeleteDoc} autoFocus>
                        Si
                    </Button>
                </DialogActions>
            </Dialog>
            {expediente?.id ? (
                <Card sx={{ maxWidth: 345 }}>
                    <CardActionArea
                        onClick={(e) => {
                            e.preventDefault()
                            router.push('/expedientes/editar/[...params]', `/expedientes/editar/${encodeURIComponent(expediente?.id)}`)
                        }}>
                        <CardMedia component='img' image='/colegioanahuac.svg' alt='logo' className='p-4' />
                        <CardContent>
                            <Box className='flex flex-row items-center'>
                                <Box className='avatar m-1 mr-2'>
                                    <Avatar
                                        className='w-[52px] h-[52px]'
                                        variant='rounded'
                                        src={expediente.genero == 'Femenino' ? '/girl1.svg' : '/boy.svg'}
                                    />
                                </Box>
                                <Box className='cajaUsuario'>
                                    <Box className='cajaDatos'>
                                        <p className='text-sm font-normal text-slate-500 antialiased'>
                                            {expediente?.nombre} {expediente?.apaterno} {expediente?.amaterno}
                                        </p>
                                        <div className='text-sm flex flex-row items-center flex-auto justify-items-start'>
                                            <span className='text-slate-400 m-1'>Grado solicitado</span>
                                            <span className='text-black bg-slate-300 m-1 rounded-md pr-2 pl-2'>
                                                {expediente.grado_solicitado}
                                            </span>
                                        </div>
                                    </Box>
                                </Box>
                            </Box>
                        </CardContent>
                    </CardActionArea>
                    <CardActions>
                        <Button
                            color='success'
                            onClick={(e) => {
                                e.preventDefault()
                                router.push(
                                    '/expedientes/editar/[...params]',
                                    `/expedientes/editar/${encodeURIComponent(expediente?.id)}`
                                )
                            }}>
                            <EditIcon /> Editar
                        </Button>
                        <Button color='primary' onClick={handleDeleteQuestion}>
                            <DeleteIcon /> Borrar
                        </Button>
                    </CardActions>
                </Card>
            ) : (
                <span></span>
            )}
        </div>
    )
}

export default TarjetaExpediente
