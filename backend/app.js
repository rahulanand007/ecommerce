const express = require('express');
const app = express();
const errorMiddleware = require('./middleware/error')

app.use(express.json())

//Route imports
const product = require("./routes/productRoute")

//middleware for error
app.use(errorMiddleware)


app.use("/api/v1",product);

module.exports = app