const express = require("express");
const route = require("./route/router");
const mongoose = require("mongoose");
var cors = require('cors')
const app = express();
app.use(cors())
const multer = require("multer")
app.use(express.json());
app.use(multer().any())

mongoose
  .connect(
    "mongodb+srv://DeeptirthaMukherjee:QYKI3k8QSKC4I7FZ@cluster1.khatgm1.mongodb.net/zomato?retryWrites=true&w=majority",
    { UseNewUrlParser: true }
  )
  .then(() => console.log("Mongo-Db is connected"))
  .catch((err) => console.log(err.message));

app.use("/", route);

app.listen(process.env.PORT || 3001, function () {
  console.log("listening at " + (process.env.PORT || 3001));
});
