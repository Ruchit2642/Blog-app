const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");

const IndexRoute = require("./Routers/index");
const connectDatabase = require("./Helpers/database/connectDatabase");
const customErrorHandler = require("./Middlewares/Errors/customErrorHandler");

// Load environment variables from config.env file
dotenv.config({
  path: "config.env",
});

// Connect to the MongoDB database
connectDatabase();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/", IndexRoute);

// Error handling middleware
app.use(customErrorHandler);

const PORT = process.env.PORT || 5000;

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, "public")));

// Start the server
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} in ${process.env.NODE_ENV} mode`);
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
  console.error(`Logged Error: ${err}`);
  server.close(() => process.exit(1));
});
