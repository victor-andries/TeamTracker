import express from 'express'
import env from 'dotenv'
import DB_Init from '../Entities/DB_init.js'
import createDB from '../database/createDBRoute.js'

env.config();

// trebuie adaugat .env in functie de datele de conectare la mariaDB

let app = express();

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

DB_Init();

app.use("/api", createDB);


let port = process.env.PORT || 8001;
app.listen(port)
console.log('API is runnning at ' + port);