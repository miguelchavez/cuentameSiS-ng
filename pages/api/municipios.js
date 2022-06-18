/**
 * Lista de Municipios de colima
 *
 */

import stream, { Readable } from 'stream'
import { promisify } from 'util'

import { getMunicipios } from '../../utils/strings'

export default async function handler(req, res) {
    if (req.method === 'GET') {
        console.log('Query:', req.query)
        const estado = req.query.estado
        try {
            const resultado = getMunicipios(estado)
            const final = resultado.map((mpo) => ({ nombre: mpo }))
            console.log('Municipios:', final)
            res.status(200).json(final)
        } catch (error) {
            console.log('ERROR', error)
            res.status(500).json({ message: `ERROR: ${error}` })
        }
    } else {
        // Handle any other HTTP method
        res.status(405).json({ message: 'El request debe ser un GET' })
    }
}
