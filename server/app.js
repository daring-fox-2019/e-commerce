require("dotenv").config();

const express = require("express"),
  app = express(),
  port = process.env.PORT || 3000,
  mongoose = require("mongoose"),
  cors = require("cors"),
  routes = require("./routes/index");

app.use(cors());
app.use(
  express.urlencoded({
    extended: false,
    // limit : "2mb"
  })
);

app.use(express.json());

mongoose.connect("mongodb+srv://novi:novi@phase2-porto-novi-l3m3t.gcp.mongodb.net/ecommerce" + process.env.NODE_ENV + "?retryWrites=true", {
  useNewUrlParser: true
});

var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function callback() {
  console.log("success connect to atlas");
});

app.use("/", routes);

// app.listen(port, ()=>{
//   console.log("listen")
// })


module.exports = app
