import { ObjectId } from "mongodb"
import client from "../common/db.js"
import { Actor } from './actor.js'

const peliculaCollection = client.db('cine-db').collection('peliculas');
const actorCollection = client.db('cine-db').collection('actores')



async function handleInsertActorRequest(req, res) {
    let data = req.body
    let actor = Actor

    actor.nombre = data.nombre
    actor.idPelicula = data.idPelicula
    actor.edad = data.edad
    actor.estaRetirado = data.estaRetirado
    actor.premios = data.premios


    try{
        let pelicula = await peliculaCollection.findOne({ _id: ObjectId.createFromHexString(actor.idPelicula) })
         if(pelicula === null) return res.status(400).send('La pelicula asociada no existe')

        await actorCollection.insertOne(actor)
        .then((data) => {
            if(data === null) return res.status(400).send('Error al guardar registro')
    
            return res.status(201).send(data)
            })
        .catch((e) => { return res.status(500).send({ error: e }) })

    }catch(e){
        return res.status(500).send({ error: 'Error al procesar la solicitud' })
    }
}

async function handleGetActoresRequest(req, res) {
    await actorCollection.find({}).toArray()
        .then((data) => { return res.status(200).send(data) })
        .catch((e) => { return res.status(500).send({ error: e }) })
}


async function handleGetActoresByPeliculaIdRequest(req, res) {
    const idPelicula = req.params.pelicula;

   
    if (!ObjectId.isValid(idPelicula)) {
        res.status(400).send('id mal formado');
        return;
    }

    try {
        const actores = await actorCollection.find({ idPelicula: ObjectId(idPelicula) }).toArray();

        if (actores.length === 0) {
            res.status(404).send('No se encontraron actores para la película proporcionada');
            return;
        }

        res.status(200).send(actores);
    } catch (error) {
        res.status(500).send({ error: error.code || 'Error' });
    }
}


async function handleGetActorByIdRequest(req, res) {
    let id = req.params.id;
     try {
        let oid = ObjectId.createFromHexString(id)
        await actorCollection.findOne({ _id: oid })
            .then((data) => {
                if (data === null) return res.status(404).send(data)
                return res.status(200).send(data)
            })
            .catch((e) => { 
                return res.status(500).send({ error: e.code }) 
            })
    } catch (e) {
        return res.status(400).send('Id mal formado')
    }
}
export default {
    handleInsertActorRequest,
    handleGetActoresRequest,
    handleGetActorByIdRequest,
    handleGetActoresByPeliculaIdRequest
}