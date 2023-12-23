import { Sequelize } from "sequelize";
import db from "./dbConfig.js";

const Manager = db.define("Manager", {
    manager_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },

    manager_name: {
        type: Sequelize.STRING,
        allowNull: false
    },

    team_name: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

Manager.belongsTo(db.User, { foreignKey: 'manager_id', targetKey: 'manager_id' })

export default Manager;