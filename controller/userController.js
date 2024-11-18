const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const checkLogin = require("../middlewares/checkLogin");
const crateError = require("http-errors");
const { findItemById } = require("../src/services/findItemById");
const { verifyEmail } = require("../src/helper/verifyEmail");
const { smtpUser, smtpPassword, jwtSecretKey } = require("../src/secret");
const { merge } = require("../routers/userRouter");
const { createJSONWebToken } = require("../src/helper/jsonwebtoken");

// Register user
const processRegister = async (req, res, next) => {
  console.log(jwtSecretKey);

  const { name, email, password } = req.body;
  try {
    if (!name || !email || !password) {
      res.status(400);
      throw new Error("Add all field");
    }

    // check if user exists
    const existsUser = await User.exists({ email });
    if (existsUser) {
      res.status(400);
      throw new Error("User already exist");
    }
    // hashed Password
    const hashedPassword = await bcrypt.hash(password, 10);
    // user info for token
    const userInfo = {
      name,
      email,
      password: hashedPassword,
    };
    // generate token
    const token = createJSONWebToken(userInfo, jwtSecretKey, {
      expiresIn: "1h",
    });
    // mail data
    const mailData = {
      from: smtpUser,
      to: userInfo.email,
      subject: "Account Activation Email",
      html: "<b>Please <a href=`http://localhost:5000/api/users/verify-user/${token}`>Click Me</a> to activater your accoutn</b>",
    };
    // send mail using nodemailer
    const info = await verifyEmail(mailData);
    if (info) {
      res.status(200).json({
        message: "Please check your email to verify account",
        token,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

const verifyUser = async () => {};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400);
      throw new Error("Please add all fields");
    }
    const user = await User.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      res.status(200).json({
        _id: user.id,
        name: user.name,
        email: user.email,
        token: generateToken(user.id),
      });
    } else {
      res.status(400);
      throw new Error("invalid user data");
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// get all users
const getUsers = async (req, res, next) => {
  try {
    const serach = req.query.serach || "";
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 5;

    const seratchRegExp = new RegExp("");

    const filter = {
      isAdmin: { $ne: true },
    };

    const users = await User.find(filter);
    res.status(200).send({
      message: "Users were returned",
      users,
    });
  } catch (error) {
    next(error);
  }
};
// get signle user by id
const getUserById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const options = { password: 0 };
    const user = await findItemById(id, options);
    res.status(200).send({
      message: "Users were returned",
      user,
    });
  } catch (error) {
    next(error);
  }
};

// delete signle user by id
const deleteUserById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const options = { password: 0 };
    const user = await findItemById(id, options);

    res.status(200).send({
      message: "User were deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  processRegister,
  verifyUser,
  loginUser,
  getUsers,
  getUserById,
  deleteUserById,
};
