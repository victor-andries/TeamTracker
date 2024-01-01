import mysql from "mysql2/promise";
import env from "dotenv";
import User from "./User.js";
import Admin from "./Admin.js"
import Manager from "./Manager.js";
import Task from "./Task.js";

env.config();

function Create_DB(){
    let conn;

    mysql.createConnection({
    user : process.env.DB_USERNAME,
    password : process.env.DB_PASSWORD
    })
    .then((connection) => {
    conn = connection
    return connection.query('CREATE DATABASE IF NOT EXISTS TEAMTRACKER')
    })
    .then(() => {
    return conn.end()
    })
    .catch((err) => {
    console.warn(err.stack)
    })
}

function FK_Config()
{
    Manager.hasMany(User, {as : "Useri", foreignKey: "manager_id"});
    User.belongsTo(Manager, {foreignKey: "manager_id"});

    User.hasMany(Task, {as : "Taskuri", foreignKey: "task_id"});
    Task.belongsTo(User, {foreignKey: "task_id"});

}

function DB_Init(){
    Create_DB();
    FK_Config();
}

export default DB_Init;