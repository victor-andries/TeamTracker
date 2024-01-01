import express from 'express'
import cors from 'cors'
import env from 'dotenv'
import DB_Init from '../Entities/DB_init.js'
import createDB from '../database/createDBRoute.js'
import { loginRouter } from '../routes/LoginRouter.js'

env.config();

// trebuie adaugat .env in functie de datele de conectare la mariaDB

let app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

DB_Init();

app.use("/api", createDB);
app.use('/api', loginRouter);

let port = process.env.PORT || 8001;
app.listen(port)
console.log('API is runnning at ' + port);