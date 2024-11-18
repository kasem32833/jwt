const express = require("express");
const { seedController } = require("../controller/seedController");
const seedRouter = express.Router();


seedRouter.get('/users', seedController);


module.exports = seedRouter;
