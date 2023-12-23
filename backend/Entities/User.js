import { Sequelize } from "sequelize";
import db from "./dbConfig.js";

const User = db.define("User", {
    user_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },

    user_name: {
        type: Sequelize.STRING,
        allowNull: false
    },

    password: {
        type: Sequelize.STRING,
        allowNull: false
    },

    email: {
        type: Sequelize.STRING,
        allowNull: false
    },

    logged_in: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    },

    user_type: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            isIn: [["user", "manager", "admin"]]
        }
    },

    manager_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
})

export default User;