const express = require('express');
const { testServer } = require('../controller/testController');
const testRouter = express.Router();


testRouter.post('/test', testServer)


module.exports = testRouter;