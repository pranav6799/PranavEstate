const User = require("../Models/userModel");
const { errorHandler } = require("../utils/error");
const JWT = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.register = async (req, resp, next) => {
  try {
    const { username, email, password } = req.body;

    const newUser = await User.create(req.body);

    resp.status(200).json({
      status: true,
      message: "User created Successfully",
      newUser,
    });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, resp, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return next(errorHandler(400, "User not found"));
    }

    const match = await user.comparePassword(user.password, password);

    if (!match) {
      return next(errorHandler(402, "Invalid Creditials"));
    }


    const token = JWT.sign({ id: user._id }, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });

    const expiryDate = new Date(Date.now() + 3600000)

    resp
      .cookie("token", token, { httpOnly: true,expires:expiryDate})
      .status(200)
      .json({
        status: true,
        message: "User Logged in Successfully",
        user,
      });
  } catch (error) {
    next(error);
  }
};

exports.google = async (req, resp, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      const token = JWT.sign({ id: user._id }, process.env.SECRET_KEY);
      const expiryDate = new Date(Date.now() + 3600000)
      resp
        .cookie("token", token, { httpOnly: true,expires:expiryDate})
        .status(200)
        .json({
          user
        });
    } else {
      const generatePassword = Math.random().toLocaleString(36).slice(-8);
      const hashPassword = bcrypt.hashSync(generatePassword, 10);
      const user = new User({
        username:req.body.name.split(" ").join("") +
          Math.random().toLocaleString(36).slice(-8),
        email: req.body.email,
        password: hashPassword,
        avatar: req.body.avatar,
      });
      await user.save()
      const token = JWT.sign({id:user._id},process.env.SECRET_KEY)
      const expiryDate = new Date(Date.now() + 3600000)
      resp.cookie('token',token,{httpOnly:true,expires:expiryDate}).status(200).json({
        status:true,
        user
      })
    }
  } catch (err) {
    next(err)
  }
};
