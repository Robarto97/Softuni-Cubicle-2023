const express = require("express");
// const path = require("path");

function expressConfig(app) {
  app.use(express.static("src/public"));
  app.use(express.urlencoded({ extended: false }));
}

module.exports = expressConfig;
