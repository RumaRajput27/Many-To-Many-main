const { DataTypes } = require('sequelize');
const sequelize = require('../database/db');  // Import the Sequelize instance
const User_Details = require('./userModel');  // Import User model
const Product_Details = require('./productModel');  // Import Product model

// Define the Cart model (join table)
const Cart_Details = sequelize.define('Cart_Details', {
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1  // Default quantity is 1 when adding to the cart
  },
  user_id: {
    type: DataTypes.INTEGER,
    references: {
      model: User_Details,  // Reference to User table
      key: 'user_id'        // Primary key of User table
    },
    allowNull: false
  },
  product_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Product_Details,  // Reference to Product table
      key: 'product_id'        // Primary key of Product table
    },
    allowNull: false
  }
}, {
  tableName: 'cart',  // Name the join table
  timestamps: false   // Disable timestamps
});

// Establish many-to-many associations through the Cart table
User_Details.belongsToMany(Product_Details, { through: Cart_Details, foreignKey: 'user_id' });
Product_Details.belongsToMany(User_Details, { through: Cart_Details, foreignKey: 'product_id' });

module.exports = Cart_Details;
