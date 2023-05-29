const express = require("express");
const mongoose = require("mongoose");

const expressConfig = require("./config/expressConfig");
const handlebarsConfig = require("./config/handlebarsConfig");
const dbConnect = require("./config/dbConfig");
const routes = require("./routes");

const app = express();

const PORT = 5000;

dbConnect()
  .then(() => console.log("DB connected successfully"))
  .catch((err) => console.log("Db error:", err));

expressConfig(app);
handlebarsConfig(app);
app.use(routes);

app.listen(PORT);
