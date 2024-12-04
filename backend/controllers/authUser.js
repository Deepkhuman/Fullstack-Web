const bcrypt = require("bcrypt");
const { Usermodel } = require("../models/User");
const jwt = require("jsonwebtoken");
require("dotenv").config();

async function getuser() {
  const data = await Usermodel.find({});
  console.log(data);
}

async function login(req, res) {
  const { email, password } = req.body;

  try {
    const user = await Usermodel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User  not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    res.status(200).json({
      message: "Login successful",
      token,
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({
      message: "Error during login",
      error: error.message,
    });
  }
}

async function postdata(req, res) {
  try {
    const { firstname, lastname, company, email, password } = req.body;
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
      user: {
        firstname: newUser.firstname,
        lastname: newUser.lastname,
        company: newUser.company,
        email: newUser.email,
      },
    });
    console.log(newUser);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({
      message: "Error creating user",
      error: error.message,
    });
  }
}
module.exports = {
  getuser,
  postdata,
  login,
};
