import express from 'express'
import cors from 'cors'
import env from 'dotenv'
import DB_Init from '../Entities/DB_init.js'
import createDB from '../database/createDBRoute.js'
import { loginRouter } from '../routes/LoginRouter.js'
import { adminRouter } from '../routes/AdminRouter.js'
import { taskRouter } from '../routes/TaskRouter.js'
import multer from 'multer'

env.config();

// trebuie adaugat .env in functie de datele de conectare la mariaDB

let app = express();

const upload = multer({dest: 'uploads/'});

const corsOptions = {
    origin: 'http://localhost:3000',
    methods: 'GET,PUT,PATCH,POST,DELETE'
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

DB_Init();

app.use("/api", createDB);
app.use('/api', loginRouter);
app.use("/api", adminRouter);
app.use("/api", taskRouter);

let port = process.env.PORT || 8001;
app.listen(port)
console.log('API is runnning at ' + port);