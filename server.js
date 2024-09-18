import express, { urlencoded } from 'express'
import cors from 'cors'
import client from './src/common/db.js'
import actorRoutes from './src/actor/routes.js'
import peliculaRoutes from './src/pelicula/routes.js'

const PORTS = process.env.PORT || 3000
const app = express()

app.use(express.json())
app.use(urlencoded({ extended: true }))
app.use(cors())

app.all('/', (req, res) => { 
    return res.status(200).send('Bienvenido al Cine!')
})

app.use('/api', actorRoutes)
app.use('/api', peliculaRoutes)

await client.connect()
.then(() => {
    console.log('Conectado al cluster')
    app.listen(PORTS, () => { 
        console.log(`Servidor corriendo en http://localhost:${PORTS}`) 
    })
})
.catch((error) => {
    console.log('Error al conectarse con la db:', error)
})
