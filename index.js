const express = require('express');
const userRoutes = require('./src/routes/userRoutes');
const productRoutes = require('./src/routes/productRoutes');
const cartRoutes = require('./src/routes/cartRoutes');
// Load models and associations

const app = express();
const port = 4400;

// Middleware to parse JSON bodies
app.use(express.json());

// Use the routes defined in routes.js
app.use('/users', userRoutes);
app.use('/products', productRoutes);
app.use('/cart', cartRoutes);
// Sync Sequelize models and start the server
const sequelize = require('./src/database/db');  // Import the Sequelize instance

sequelize.sync()  // This creates the table if it doesn't exist
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error('Unable to sync the database:', err);
  });
