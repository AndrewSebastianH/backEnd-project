import {Sequelize} from "sequelize";
import db from "../config/dbconfig.js"

const {DataTypes} = Sequelize;

const Sneakers = db.define('sneakers',{
    sneakerName: DataTypes.STRING,
    brand: DataTypes.STRING,
    price: DataTypes.INTEGER,
    description: DataTypes.TEXT,
    imageUrl: DataTypes.STRING
},{
    freezeTableName:true
});

export default Sneakers;

(async()=>{
    await  db.sync();
})();