import controller from './controller.js'
import express from 'express'


const autorRoutes = express.Router()

autorRoutes.get('/actores', controller.handleGetActoresRequest)
autorRoutes.post('/actor', controller.handleInsertActorRequest)
autorRoutes.get('/actor/:id', controller.handleGetActorByIdRequest)
autorRoutes.get('/actores/pelicula/:pelicula', controller.handleGetActoresByPeliculaIdRequest)

export default autorRoutes