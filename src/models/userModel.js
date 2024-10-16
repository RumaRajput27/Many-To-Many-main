const { DataTypes } = require('sequelize');
const sequelize = require('../database/db');  // Import the Sequelize instance
// Define the Product model
const User_Details = sequelize.define('User_Details', {
user_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
user_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
user_address: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'user',  // Define the table name
  timestamps: false       // Disable Sequelize's automatic timestamps (optional)
});
module.exports = User_Details;