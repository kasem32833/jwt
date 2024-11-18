const User = require("../models/userModel");
const data = require("../src/data");

const seedController = async(req, res, next)=>{
    try {
        await User.deleteMany({})
        const users = await User.insertMany(data.users)
        res.status(201).json({message: "all users deleted", users })
    } catch (error) {
        next(error)
    }
}

module.exports = {seedController,}