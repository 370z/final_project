const express = require("express");
const helmet = require("helmet");
const app = express();
const cors = require('cors');
app.use(cors({ credentials: true, origin: ['http://localhost:3000','*'] }));

const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const errorMiddleware = require("./middlewares/error");
// Setting up config file
if (process.env.NODE_ENV !== "PRODUCTION")
  require("dotenv").config({ path: "config/config.env" });

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(fileUpload({useTempFiles: true}));

// Import all routes
const products = require("./routes/product");
const auth = require("./routes/auth");
const payment = require("./routes/payment");
const order = require("./routes/order");
const device = require("./routes/device");

app.use("/api/v1", products);
app.use("/api/v1", auth);
app.use("/api/v1", payment);
app.use("/api/v1", order);
app.use("/api/v1", device);

// Middleware to handle errors
app.use(errorMiddleware);
module.exports = app;
