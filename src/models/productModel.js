const { DataTypes } = require('sequelize');
const sequelize = require('../database/db');  // Import the Sequelize instance
// Define the Product model
const Product_Details = sequelize.define('Product_Details', {
  product_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  product_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  price: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  ispurchased: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  }
}, {
  tableName: 'product',  // Define the table name
  timestamps: false       // Disable Sequelize's automatic timestamps (optional)
});
module.exports = Product_Details;