import express from 'express';
import db from '../src/dbConfig.js';

const createDbRouter = express.Router();

createDbRouter.route('/create').get(async (req, res) => {
    try{
        await db.sync({force : true})    
        res.status(201).json({message : 'created'})
    }
    catch(err){
        console.error(err.message);
        res.status(500).json({ message: 'server error', error: err.message });
    }
});

export default createDbRouter;