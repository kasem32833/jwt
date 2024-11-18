const express = require('express');
const { verifyUser, getUsers, getUserById, deleteUserById, processRegister  } = require('../controller/userController');
const userRouter = express.Router();

// create user
userRouter.post('/process-register', processRegister);
userRouter.post('/verify-user', verifyUser);
// get all user
userRouter.get('/all',  getUsers)
userRouter.get('/:id',  getUserById)
userRouter.delete('/:id',  deleteUserById)


module.exports = userRouter;