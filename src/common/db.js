import { MongoClient, ServerApiVersion } from "mongodb";

const uri = 'mongodb+srv://gian:iplacex123@cine-db.cse0m.mongodb.net/?retryWrites=true&w=majority&appName=cine-db'

const client = new MongoClient(uri, {
    ServerApi:{
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErros: true
    }
})

export default client