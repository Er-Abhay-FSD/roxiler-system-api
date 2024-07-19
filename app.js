const express = require('express'); // 🌟 Importing Express framework
const mongoose = require('mongoose'); // 🌟 Importing Mongoose for MongoDB
const swaggerUi = require('swagger-ui-express'); // 🌟 Importing Swagger UI for API documentation
const YAML = require('yamljs'); // 🌟 Importing YAML parser
const dotenv = require('dotenv'); // 🌟 Importing dotenv for environment variables
const apiRoutes = require('./routes/api'); // 🌟 Importing API routes

dotenv.config(); // 🌟 Loading environment variables from .env file

const app = express(); // 🌟 Creating an Express application instance

// Connect to database
console.log('🔄 Connecting to database...'); // 🌟 Logging database connection status
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('✅ Database connected successfully!')) // ✅ Successfully connected to the database
  .catch(err => console.error('❌ Failed to connect to MongoDB', err)); // ❌ Error connecting to the database

// Middleware
app.use(express.json()); // 🌟 Middleware to parse incoming JSON requests
console.log('🔄 Middleware: JSON parser initialized.'); // 🌟 Logging JSON parser initialization

// Swagger configuration using YAML
const swaggerDocument = YAML.load('./swagger.yaml'); // 🌟 Load YAML file
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument)); // 🌟 Setting up Swagger UI at /api-docs
console.log('📄 Swagger UI documentation initialized at /api-docs'); // 📄 Swagger UI setup

// Routes
app.use('/api', apiRoutes); // 🌟 Setting up API routes
console.log('🔄 Routes: API routes initialized.'); // 🌟 Logging API routes initialization

// Start server
const PORT = process.env.PORT || 5000; // 🌟 Setting server port
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`)); // 🚀 Server started
