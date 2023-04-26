const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();
const userRoute = require("./routes/userRoute");
const productRoute = require("./routes/productRoute");
const roleRoute = require("./routes/roleRoute");
const cors = require("cors");
const errorMiddleware = require('./middleware/error');

app.use(cors());
app.use(express.json());
app.use((req, res, next) => {delete req.headers['If-None-Match']; next();})
//Routes
app.use("/api/v1", userRoute);
app.use("/api/v1", roleRoute); 
app.use("/api/v1/", productRoute);

//Error Middleware
app.use(errorMiddleware);
module.exports = app;