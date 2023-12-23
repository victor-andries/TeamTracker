import Sequelize from 'sequelize';
import { DB_USERNAME, DB_PASSWORD } from './Const';

const db = new Sequelize({
    dialect: 'mysql',
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: 'TeamTracker',
    logging: true,
    define: {
        timestamps: false,
        freezeTableName: true
    }
})

export default db;
