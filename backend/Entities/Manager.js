import { Sequelize } from "sequelize";
import db from "../src/dbConfig.js";

const Manager = db.define("Manager", {
    manager_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },

    team_name: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

export default Manager;