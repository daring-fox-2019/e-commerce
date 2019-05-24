require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const routes = require("./routes");
const errorHandler = require("./middlewares/error-handler");
const app = express();
const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || "development";

mongoose.connect(`mongodb://localhost:27017/shopenguin_${NODE_ENV}`, { useNewUrlParser: true }, function(err) {
  if (err) {
    console.log("Failed to connect to database:", err);
  } else {
    console.log("Connected to database.");
  }
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use("/", routes);
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server started on port PORT`));
module.exports = app;