import { Sequelize } from "sequelize";
import db from "../src/dbConfig.js";

const Task = db.define("Task", {
    task_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },

    title: {
        type: Sequelize.STRING,
        allowNull: false
    },

    description: {
        type: Sequelize.STRING,
        allowNull: false
    },

    due_date: {
        type: Sequelize.DATE,
        allowNull: false
    },

    priority: {
        type: Sequelize.STRING,
        allowNull: false
    },

    status: {
        type: Sequelize.ENUM("Not Assigned", "In Progress", "Completed"),
        allowNull: false,
    },
    
    task_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
})

export default Task;