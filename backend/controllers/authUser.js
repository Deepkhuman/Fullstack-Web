const bcrypt = require("bcrypt");
const { Usermodel } = require("../models/User");
const jwt = require("jsonwebtoken");
require("dotenv").config();

async function getuser(req, res) {
  try {
    const User = await Usermodel.find({});
    res.send(User);
  } catch (error) {
    console.error("_____.....>", first);
  }
}

async function login(req, res) {
  const { email, password } = req.body;

  try {
    const user = await Usermodel.findOne({ email });
    if (!user) {
      return res
        .status(401)
        .json({ message: "User  not found", success: false });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ message: "Invalid password", success: false });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      {
        expiresIn: "24h",
      }
    );

    res.status(200).json({
      message: "Login success",
      token,
      name: user.firstname,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error during login",
      error: error.message,
    });
  }
}

async function postdata(req, res) {
  try {
    const { firstname, lastname, company, email, password } = req.body;
    const user = await Usermodel.findOne({ email });
    if (user) {
      return res
        .status(409)
        .json({ message: "User Alraedy Exists", success: false });
    }
    if (!firstname || !lastname || !email || !password) {
      return res.status(400).json({
        message: "All fields are required.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await Usermodel.create({
      firstname,
      lastname,
      company,
      email,
      password: hashedPassword,
    });
    res.status(201).json({
      message: "User  created successfully",
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error creating user",
      error: error.message,
      success: false,
    });
  }
}
module.exports = {
  getuser,
  postdata,
  login,
};
