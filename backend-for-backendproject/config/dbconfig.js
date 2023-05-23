import {Sequelize} from "sequelize";

const db = new Sequelize('backendproject','root','', {
    host: 'localhost',
    dialect: 'mysql'
})

export default db;