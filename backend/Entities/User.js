import { Sequelize } from "sequelize";
import db from "../src/dbConfig.js";

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
        type: Sequelize.ENUM("user", "manager", "admin"),
        allowNull: false,
    },

    manager_id: {
        type: Sequelize.INTEGER,
        allowNull: true
    },

    team_name: {
        type: Sequelize.STRING,
        allowNull: true
    },

    profile_photo: {
        type: Sequelize.BLOB,
        allowNull: true
    }
})

export default User;