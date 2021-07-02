const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const routes = require('./routes/routes')

const app = express();
app.set("port", process.env.PORT || 9000);

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/rouleteDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Set up headers ans cors.
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

//Routes
app.use('/api', routes())

//Listenting
app.listen(app.get("port"), () => {
  console.log("Server is listening on port ", app.get("port"));
});
