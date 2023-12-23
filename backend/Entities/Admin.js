import { Sequelize } from "sequelize";
import db from "./dbConfig.js";

const Admin = db.define("Admin", {
    admin_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },

    admin_name: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

export default Admin;